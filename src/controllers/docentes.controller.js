const docentes = require('../../datos/docentes.json')

const getAllDocentes = (req, res)=>{
    res.json( docentes ).status(200)
}

const getDocenteByLegajo = (req, res) => {
    const dni = req.params.dni
    const resultado = docentes.find( alumno => alumno.dni == dni)
    if(resultado) {
        res.status(200).json(resultado).status(200)
    } else {
        res.status(404).json({ mensaje: `El alumno con dni ${dni} no fue encontrado`} )
    }
}

const deleteDocenteByLegajo = (req, res) => {
    const legajo = req.params.legajo
    const indice = docentes.findIndex( docente => docente.legajo == legajo )
    if(indice==-1) {
        res.status(404).
        json(
            {
            resultado: "La operación de borrado no pudo ser realizada",
            mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    } else {
        const docente = docentes[indice];
        const resultado = docentes.splice(indice,1)
        res.status(200)
        .json(
            {resultado: "La operación de borrado pudo realizarse con exito",
            docente: docente
            }
        )
    }
}

const crateDocente = (req, res) => {
    const docentesData = req.body
    const existe = docentes.find(docente => docente.dni == docentesData.legajo)
    if (!existe) {
        if( !docentesData.concursado)
        docentesData.concursado = false
    
        if (!docentesData.nombre) {
            res.status(400).json({mensaje: `No puedo generar el docente con legajo ${docentesData.legajo} por no tener nombre`})    
        } else  {
            docentes.push(docentesData)
            res.status(201).json({mensaje: `El docente con legajo ${docentesData.legajo} fue creado correctamente`})
        }
    } else {
        res.status(400).json({mensaje: `El alumno con dni ${docentesData.legajo} ya existe en la base de datos`})
    }
}

const updateDocente = (req, res)=>{
    const legajo = req.params.legajo  
    const docentesData = req.body 
    const indice = docentes.findIndex(docente => docente.legajo == legajo)
    if ( indice >= 0 ) {
        docentes[indice].nombre = docentesData.nombre
        if (docentesData.carrera!==undefined) {
            docentes[indice].carrera = docentesData.carrera 
        }
        res.status(201).json({"Docente": docentes[indice]})
    }
    else {
        res.status(404).
        json(
            {
                resultado: "La operación de modicar no pudo ser realizada",
                mensaje: `El docente con legajo ${legajo} no fue encontrado`
            }
        )
    }
}

module.exports = { 
    getAllDocentes,
    getDocenteByLegajo,
    deleteDocenteByLegajo,
    crateDocente,
    updateDocente
}