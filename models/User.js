const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    nombre: {
     type: String, 
     required: true, 
     unique: true 
    },
  apellido:
   {
     type: String, 
     required: true 
    },
    usuario:{
      type: String, 
      required: true 
     },
     contresena:{
      type: String, 
      required: true 
     },
     correo:{
      type: String, 
      required: true 
     },
});

const User = mongoose.model('User', UserSchema);

module.exports = User;
