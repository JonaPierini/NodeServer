import mongoose from "mongoose"

//Aca voy a definir mis entidades (que seria mis talbas de la base de datos)

const authSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

})

//CON ESTE ESQUEMA CREO MI MODELO QUE VA A SER COMO INTERACTUO CON LA BASE DE DATOS

export const AuthModel = mongoose.model('Auth', authSchema)