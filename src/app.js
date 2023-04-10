const express = require('express');
const app = express()
const PORT = process.env.PORT || 3000;

app.get('/alumnos', (req,res) => {
    res.json({mensaje:"Hola mundo desde alumnos", estado:"ok"}).status(200)
})

app.listen(PORT, ()=>{console.log(`App lista escuhando en el puerto ${PORT}`)} ) 