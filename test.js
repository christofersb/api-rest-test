const cursoSchema = new mongoose.Schema({
    nombre: String,
    autor: String,
    etiquetas: [String],
    fecha: { type: Date, default: Date.now },
    publicado: Boolean,
});

const Curso = mongoose.model("Curso", cursoSchema);

async function crearCurso() {
    const curso = new Curso({
        nombre: "Angular para principiantes",
        autor: "Luis Silva",
        etiquetas: ["Desarrollo web", "front end"],
        publicado: false,
    });

    const resultado = await curso.save();
    console.log(resultado);
}
crearCurso();
console.log(process.env.DATABASE_URL);
/*
async function listarCursos() {
    // eq (equal, igual)
    // ne (not equal, no igual)
    // gt (greater than, mayor que)
    // gte (greater thna or equal to, mayor o igual que)
    // lt (less than, menor que)
    // lte (less than or equal to, menor o igual que)
    // in
    // nin (not in)
    // or
    // and
    const numeroPage = 2;
    const sizePage = 10;
    const cursos = await Curso
        //find({ publicado: true })
        //.find({precio:{$gte:10, $lte:30}})
        //.find({precio:{$in:[10,15,25]}})
        //.find()
        //.and([{ auto: "Christofer Sierra" }, { publicado: false }])
        // Empiece con la palabra Chri
        //.find({ autor: /^Chri/ })
        // Cuando terminar en una palabra o expresión
        //.find({ autor: /rra$/ })
        // Cuando un campo tiene un contenido especifico

        .find()
        .skip((numeroPage - 1) * sizePage)
        .limit(sizePage)
        .sort({ autor: -1 })
        .select({ nombre: 1, etiquetas: 1, autor: 1 });
    console.log(cursos.length);
    console.log(cursos);
}

//listarCursos();
crearCurso();

async function actualizarCurso(id) {
    /*const curso = await Curso.findById(id);
                              if (!curso) {
                                  console.log("El curso no existe");
                                  return;
                              }
                              /*curso.publicado=false
                                    curso.autor='Mirza Sierra'
                              curso.set({
                                  publicado: false,
                                  autor: "Mirza Sierra",
                              });*/

/*const resultado = await curso.save();
                            console.log(resultado);*/

/*const resultado = await Curso.updateOne({
                          _id: id,
                      }, {
                          $set: {
                              autor: "Christofer Sierra Bastidas",
                              publicado: true,
                          },
                      });
                      console.log(resultado);

    const resultado = await Curso.findByIdAndUpdate(
        id, {
            $set: {
                autor: "Juan Peréz",
                publicado: false,
            },
        }, { new: true }
    );
    console.log(resultado);
}

//actualizarCurso("62224d26aba770bcc72d2991");

async function eliminarDocumento(id) {
    const resultado = await Curso.deleteOne({ _id: id });
    const resultado = await Curso.findByIdAndDelete(id);
    console.log(resultado);
}

eliminarDocumento("62224d26aba770bcc72d2991");*/