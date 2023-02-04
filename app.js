const express = require("express");
const app = express()
const port = 3000

const userRoute = require('./routes/Users')
const categoriasRoute = require('./routes/Categorias')
const productosRoute = require('./routes/Productos')
const { swaggerDocs } = require('./swagger')

app.get('/', (req, res) => {
    res.send('How you doing')
} )

// Ruta de usuarios

app.use('/users', userRoute)

//Ruta de categorias

app.use('/categorias', categoriasRoute)

//Ruta de productos

app.use('/productos', productosRoute)

//Ruta para documentacion

app.use('/docs', require('./swagger'))




app.listen(port, () => {
    console.log('server is up!')
})