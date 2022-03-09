const express = require("express");
const bcrypt = require("bcrypt");
const Usuario = require("../models/usuario_model");
const jwt = require("jsonwebtoken");
const config = require("config");
//const Joi = require("@hapi/joi");
const ruta = express.Router();

ruta.post("/", (req, res) => {
    console.log(req.body);
    Usuario.findOne({ email: req.body.email })
        .then((datos) => {
            if (datos) {
                const passwordValido = bcrypt.compareSync(
                    req.body.password,
                    datos.password
                );
                if (!passwordValido)
                    return res
                        .status(400)
                        .json({ error: "ok", msj: "Usuario o contraseña incorrecta." });

                const jwToken = jwt.sign({
                        usuario: {
                            _id: datos._id,
                            nombre: datos.nombre,
                            email: datos.email,
                        },
                    },
                    config.get("configToken.SEED"), { expiresIn: config.get("configToken.expiration") }
                );
                //jwt.sign({ _id: datos._id, nombre: datos.nombre, email: datos.email },

                //);

                res.json({
                    usuario: {
                        _id: datos._id,
                        nombre: datos.nombre,
                        email: datos.email,
                    },
                    jwToken,
                });
            } else {
                res.status(400).json({
                    error: "ok",
                    msj: "Usuario o contraseña incorrecta",
                });
            }
        })
        .catch((err) => {
            res.status(400).json({
                error: "ok",
                msj: "Error en el servicio",
            });
        });
});

module.exports = ruta;