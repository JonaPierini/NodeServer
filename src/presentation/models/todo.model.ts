import mongoose from "mongoose"

//Aca voy a definir mis entidades (que seria mis talbas de la base de datos)

const todoSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    terminado: {
        type: Boolean,
        default: false,
    },
    createdAt: {
        type: Date,
        required: true,
        default: Date.now  // Si no se proporciona, se usará la fecha actual
    }
})

//CON ESTE ESQUEMA CREO MI MODELO QUE VA A SER COMO INTERACTUO CON LA BASE DE DATOS

export const TodoModel = mongoose.model('Todo', todoSchema)