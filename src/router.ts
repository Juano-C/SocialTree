import { Router } from 'express'
import { body } from 'express-validator' // Libreria para verificar si los datos ingresados son permitidos
import { createAccount } from './handlers'

const router = Router()

/** Autenticacion y registro */
router.post('/auth/register',

    // Mensaje de error del handle
    body('handle')
    .notEmpty()
    .withMessage('El handle no puede ir vacio'),

    // Mensaje de error del name
    body('name')
    .notEmpty()
    .withMessage('El name no puede ir vacio'),

    // Mensaje de error del email 
    body('email')
    .isEmail()
    .withMessage('El email no valido'),

    // Mensaje de error del password
    body('password')
    .isLength({min: 8})
    .withMessage('El password debe tener minimo 8 caracteres'),

    createAccount)

export default router
