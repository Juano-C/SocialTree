import express from 'express' // ECM ecmascript modules

const app = express()

// Routing: ventanas de la pagina principal '/' en "app"
app.get('/', (req, res) => {
    res.send('ventana princial')
})

//puerto 
const port = process.env.PORT || 4000

app.listen(port, () => {
    console.log('Servidor Funcionando en el puerto:', port)
})
