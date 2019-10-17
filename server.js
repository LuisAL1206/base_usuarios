const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')

const { usuarios } = require('./usuarios')
console.log(usuarios)

const app = express();

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT || 4001;

app.get('/', (request, response) => {

    response.send({ message: 'Server on' })
})

app.get('/all/users', (req, res) => {
    usuarios.find().populate().exec()
        .then(usuarios => res.send(usuarios))
        .catch(err => res.status(409).send(err));
});

app.delete('/delete/user:id',(req,res)=>{
    const { id } = req.params;
    usuarios.findByIdAndDelete(id).exec()
    .then(usuarios => res.status(200).send({message:'Se ha borrado exitosamente',usuarios:usuarios}) )
    .catch(error => res.status(409).send({message:'No se ha podido borrar el usuario',error:error}))
});

app.post('/create/user', (req, res) => {
    const {
        Nombre,
        correo,
        contrasena,
        direccion,
        telefono,
        Tarjeta,
        Fecha_de_expiracion,
        cvv,
    } = req.body

    const newUser = usuarios({
        Nombre,
        correo,
        contrasena,
        direccion,
        telefono,
        Tarjeta,
        Fecha_de_expiracion,
        cvv,
    });

    
    newUser.save((err, documentoUsuario) => {
        err
            ? res.status(400).send(err)
            : res.status(201).send({ message: 'Has publicado un nuevo usuario', usuarios: documentoUsuario })
    });
});



app.listen(PORT, () => {
    console.log(`Server inicializado en el puerto ${PORT}`)
});