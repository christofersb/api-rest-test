const usuarios = require("./routes/usuarios");
const cursos = require("./routes/cursos");
const auth = require("./routes/auth");
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
mongoose
    .connect(process.env.DATABASE_URL, {
        useUnifiedTopology: true,
        useNewUrlParser: true,
        tls: true,
        tlsCAFile: "./ca-certificate.crt",
    })
    .then(() => console.log("Conectado a MongoDB..."))
    .catch((err) => console.log("No se pudo conectar con a MongoDB...", err));

const app = express();
app.use(express.urlencoded({ extended: true }));

app.use("/api/usuarios", usuarios);
app.use("/api/cursos", cursos);
app.use("/api/auth", auth);

app.use(express.json());
const port = process.env.port || 3000;
app.listen(port, () => {
    console.log("Api RESTful ok, y ejecutandos ", port);
});