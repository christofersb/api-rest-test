const express = require("express");
const Curso = require("../models/curso_model");
const verificarToken = require("../middlewares/auth");
const ruta = express.Router();

ruta.get("/", verificarToken, (req, res) => {
    let resultado = listarCursosActivos();
    resultado
        .then((cursos) => {
            res.json(cursos);
        })
        .catch((error) => res.status(400).json({ error }));
});

ruta.post("/", verificarToken, (req, res) => {
    let resultado = crearCurso(req);

    resultado
        .then((valor) => {
            res.json({
                valor,
            });
        })
        .catch((error) => {
            console.log(error);
            res.status(400).json({ error });
        });
});

ruta.put("/:id", verificarToken, (req, res) => {
    let body = req.body;
    let id = req.params.id;
    let resultado = actualizarCurso(id, body);

    resultado
        .then((curso) => {
            res.json({
                curso,
            });
        })
        .catch((error) => {
            res.status(400).json({ error });
        });
});

ruta.delete("/:id", verificarToken, (req, res) => {
    let id = req.params.id;
    let resultado = desactivarCurso(id);
    resultado
        .then((valor) => {
            res.json({
                valor,
            });
        })
        .catch((error) => {
            res.status(400).json({
                error,
            });
        });
});
async function listarCursosActivos() {
    let cursos = await Curso.find({ estado: true })
        .select({ __v: 0 })
        .populate("autor", "nombre -_id");
    return cursos;
}
async function crearCurso(req) {
    let curso = new Curso({
        titulo: req.body.titulo,
        autor: req.usuario._id,
        descripcion: req.body.descripcion,
    });

    return await curso.save();
}

async function actualizarCurso(id, body) {
    let curso = await Curso.findByIdAndUpdate(
        id, {
            $set: {
                titulo: body.titulo,
                descripcion: body.desc,
            },
        }, { new: true }
    );

    return curso;
}

async function desactivarCurso(id) {
    let curso = await Curso.findOneAndUpdate(
        id, {
            $set: {
                estado: false,
            },
        }, { new: true }
    );

    return curso;
}

module.exports = ruta;