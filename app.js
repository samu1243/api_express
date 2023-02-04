const express = require("express");
const app = express()
const port = 3000

const userRoute = require('./routes/Users')
const categoriasRoute = require('./routes/Categorias')

app.get('/', (req, res) => {
    res.send('How you doing')
} )

// Rutas de usuarios

app.use('/users', userRoute)
app.use('/categorias', categoriasRoute)






app.listen(port, () => {
    console.log('server is up!')
})