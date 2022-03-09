const express = require("express");

const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario_model");
const Joi = require("@hapi/joi");
const verificarToken = require("../middlewares/auth");
const ruta = express.Router();

const schema = Joi.object({
    nombre: Joi.string().min(3).max(30).required(),
    password: Joi.string().pattern(/^[a-zA-Z0-9]{3,30}$/),
    email: Joi.string()
        .email({
            minDomainSegments: 2,
            tlds: { allow: ["com", "net"] },
        })
        .required(),
});

ruta.get("/", verificarToken, (req, res) => {
    let resultado = listarUsuariosActivos();
    resultado
        .then((usuarios) => {
            res.json(usuarios);
        })
        .catch((error) => res.status(400).json({ error }));
});

ruta.post("/", verificarToken, (req, res) => {
    let body = req.body;

    Usuario.findOne({ email: body.email }, (err, user) => {
        if (err) {
            return res.status(400).json({
                error: "Server error",
            });
        }
        if (user) {
            // Usuario si existe
            return res.status(400).json({
                msg: "El usuario ya existe",
            });
        }
    });
    const { error, value } = schema.validate({
        nombre: body.nombre,
        email: body.email,
    });
    if (!error) {
        let resultado = crearUsuario(body);

        resultado
            .then((user) => {
                res.json({
                    nombre: user.nombre,
                    email: user.email,
                });
            })
            .catch((error) => {
                res.status(400).json({ error });
            });
    } else {
        res.status(400).json({
            error,
        });
    }
});

ruta.put("/:email", verificarToken, (req, res) => {
    let body = req.body;
    let email = req.params.email;
    const { error, value } = schema.validate({
        nombre: body.nombre,
    });
    if (!error) {
        let resultado = actualizarUsuario(email, body);

        resultado
            .then((valor) => {
                res.json({
                    nombre: valor.nombre,
                    email: valor.email,
                });
            })
            .catch((error) => {
                res.status(400).json({
                    error,
                });
            });
    } else {
        res.status(400).json({
            error,
        });
    }
});

ruta.delete("/:email", verificarToken, (req, res) => {
    let email = req.params.email;
    let resultado = desactivarUsuario(email);
    resultado
        .then((valor) => {
            res.json({
                nombre: valor.nombre,
                email: valor.email,
            });
        })
        .catch((error) => {
            res.status(400).json({
                error,
            });
        });
});

async function listarUsuariosActivos() {
    let usuarios = await Usuario.find({ estado: true }).select({
        nombre: 1,
        email: 1,
    });
    return usuarios;
}
async function crearUsuario(body) {
    let usuario = new Usuario({
        email: body.email,
        nombre: body.nombre,
        password: bcrypt.hashSync(body.password, 10),
    });

    return await usuario.save();
}

async function actualizarUsuario(email, body) {
    let usuario = await Usuario.findOneAndUpdate(
        email, {
            $set: {
                nombre: body.nombre,
                password: body.password,
            },
        }, { new: true }
    );

    return usuario;
}

async function desactivarUsuario(email) {
    let usuario = await Usuario.findOneAndUpdate(
        email, {
            $set: {
                estado: false,
            },
        }, { new: true }
    );

    return usuario;
}

module.exports = ruta;