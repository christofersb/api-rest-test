const jwt = require("jsonwebtoken");
const config = require("config");

let verificarToken = (req, res, next) => {
    const bearerHeader = req.headers["authorization"];

    if (bearerHeader) {
        const bearer = bearerHeader.split(" ");
        const bearerToken = bearer[1];

        jwt.verify(
            bearerToken,
            config.get("configToken.SEED"),
            (error, decoded) => {
                if (error) {
                    return res.status(401).json({
                        error: "ok",
                        msj: "Token inválido",
                    });
                }
                req.usuario = decoded.usuario;
                next();
            }
        );
    } else {
        res.status(403).json({
            err: "ok",
            msj: "No autorizado",
        });
    }
};

module.exports = verificarToken;