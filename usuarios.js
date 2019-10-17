const mongoose = require('mongoose');

const URL_MONGO = "mongodb+srv://AL1206:12345al@cluster0-4smrv.mongodb.net/Usuarios?retryWrites=true&w=majority";

mongoose.connect(URL_MONGO, { useNewUrlParser: true }, (error) => {
    if (!error) {
        console.log('Conexión existosa con mongoDB')
    } else {
        console.log(error)
    }
})

const Schema = mongoose.Schema;

const userSchema = new Schema({
    Nombre: String,
    correo: String,
    contrasena: String,
    direccion:{
        calle: String,
        CP: Number,
        Colonia: String,
        Ciudad: String,
    },
    telefono: Number,
    Tarjeta: Number,
    Fecha_de_expiracion: String,
    cvv: Number,

}, { timestamps: true });

const usuarios = mongoose.model('usuarios', userSchema);

module.exports = {
    usuarios

}