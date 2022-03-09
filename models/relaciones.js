//Relaciones por referencia (normalización) -> Consistencia

let usuario = {
    id: "U0001",
    nombre: "Christofer",
    email: "christofer@gmail.com",
};

let curso = {
    id: "C0001",
    id_alumnos: ["U0001", "U0002", "U0003"],
    titulo: "JavaScript Moderno",
    descripcion: "xxxx",
};

// let curso_alumno = {
//     id: "0001",
//     id_curso: "C0001",
//     id_alumno: "A0001",
// };

//Relaciones por documentos embebidos o subdocumentos (Desnormalización) -> Performance

let curso = {
    id: "C0001",
    autor: {
        nombre: "Carlos Perez",
        email: "carlos@gmail.com",
    },
    id_alumnos: [
        { id: "A0001", nombre: "Chris", email: "xxx@gmail.com" },
        { id: "A0002", nombre: "Luis", email: "xxx@gmail.com" },
    ],
    titulo: "JavaScript Moderno",
    descripcion: "xxxx",
};