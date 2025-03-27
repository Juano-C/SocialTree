import express from 'express' // ECM ecmascript modules
import 'dotenv/config'
import router from './router'
import { connectDB } from './config/db'

const app = express() // Aplicacion principal

connectDB()

// Leer datos de formularios
app.use(express.json())

// Utilizar dominio principal del proyecto
app.use('/', router) 

export default app
