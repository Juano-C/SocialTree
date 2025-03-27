import mongoose, { Schema } from "mongoose";

export interface IUser {
    handle: string
    name: string
    email: string
    password: string
}

// Schema de datos requeridos para guardar un usuario
const userSchema = new Schema({
    handle: { // Descripcion del handle
        type: String, // Tipo de dato
        required: true, // Dato obligatorio
        trim: true, // Elimina espacios como primer caracter
        lowercase: true, // Coloca en minusculas cada letra
        unique: true // No se repite el email dentro de la base de datos
    },
    name: { // Descripcion del nombre
        type: String, // Tipo de dato
        required: true, // Dato obligatorio
        trim: true, // Elimina espacios como primer caracter
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        trim: true,
    },
})

const User = mongoose.model<IUser>('User', userSchema) // Creando modelo del usuario "userSchema"
export default User // Para poder utilizarlo en cualquier lugar de mi codigo