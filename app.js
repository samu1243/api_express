const express = require("express");
const app = express()
const port = 3000

const userRoute = require('./routes/Users')
const categoriasRoute = require('./routes/Categorias')
const productosRoute = require('./routes/Productos')

app.get('/', (req, res) => {
    res.send('How you doing')
} )

// Rutas de usuarios

app.use('/users', userRoute)
app.use('/categorias', categoriasRoute)
app.use('/productos', productosRoute)






app.listen(port, () => {
    console.log('server is up!')
})