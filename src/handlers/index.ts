import { Request, Response } from 'express'
import { validationResult } from 'express-validator' // Permite tomar los errores de validacion y manejarlos con el codigo
import slug from 'slug'
import User from "../models/User"
import { hashPassword } from '../utils/auth'

// Intentar evitar "Any"
export const createAccount = async (req: Request, res: Response) => {

    // Manejar errores
    let errors = validationResult(req)

    // Si hay error con el handler, lo captura y manda mensaje
    if(!errors.isEmpty()) {
        return res.status(400).json({errors: errors.array()})
    }

    /* Agrego los datos del usuario a las variables "email" y "password"
    Si :
    email: 'usuario@example.com',
    password: 'secreto123'

    entonces =
    email, con el valor 'usuario@example.com'
    password, con el valor 'secreto123'
    */
    const { email, password} = req.body

    // Encuentra la primer coincidencia de email de la base de datos y deja de buscar
    const userExists = await User.findOne({email})

    // Si el usuario existe, error
    if(userExists) {
        const error = new Error('Usuario ya registrado')
        return res.status(409).json({error : error.message})
    }

    // Adecua el handle para que sea valido en una URL
    const handle = slug(req.body.handle, '')

    // Creamos la variable de handle
    const handleExists = await User.findOne({handle})
   
    // Verificar si el nombre del usuario ya esta en uso
    if(handleExists) {
        const error = new Error('Nombre de usuario no disponible')
        return res.status(409).json({error : error.message})
    }

    // Creacion del user, email y contraseña hasheada
    const user = new User(req.body)
    user.password = await hashPassword(password)

    // Almacenar informacion en la base de datos
    await user.save()

    // Finalizar codigo luego de la creacion del user
    res.status(201).send('Registro creado correctamente')
}
