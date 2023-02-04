const { response } = require("express");
const express = require("express");
const router = express.Router();
router.use(express.json());

// datos de prueba

 const users = [{
    id: 1,
    nombre: "juan",
},
{
    id: 2,
    nombre: "luis",
},
{
    id: 3,
    nombre: "carlos",
},
{
    id: 4,
    nombre: "andres",
}];


// Ruta para conseguir todos los usuarios

router.get('/', (req, res) => {
    res.json(users)
})

//Ruta para conseguir usuario utilizando parametro ID

router.get("/:id", (req, res) => {
// Se puede utilizar aca a 'for' loop tambien
    try {
        const results = users.filter(user => user.id == req.params.id);
        res.json(results);
    }
    catch (error){
        console.log(error);
        res.status(500).send('Server Error')
    }
});

//Ruta para crear usuario

router.post('/register', async (req, res) => {

    try {
        
        let userExists = false

        const {id, nombre} = req.body;
        // Chequeo si existe ya un nombre. Con una base de datos como MongoDB se puede utilizar findOne para mas facilidad
        users.forEach((user) =>{
            if (user.nombre.toLowerCase() == nombre.toLowerCase()){
                userExists = true
            }
        })
        if (userExists){
           return res.status(409).json({success: false, message: 'Usuario ya existe'})
        }
        //Revisa si ambos campos han sido rellenados, una forma de crear id sin necesidad de rellenarla es con id: users.length + 1
        if (!(id && nombre)){
           return res.status(400).send('Rellena los campos')
        }
        users.push({id, nombre: nombre.toLowerCase()})

        return res.json({success: true, message: 'usuario agregado'})
    }
    catch (error){
        console.log(error)
    }
})

// Ruta para login

router.post('/login', async (req, res) => {
    try {

        let userExists 

        const {id, nombre} = req.body

        if (!(id && nombre)){
            return res.status(400).json({success: false, message: 'Rellena los campos'})
        }
        users.forEach((user) =>{
            if (user.nombre.toLowerCase() == nombre.toLowerCase()){
                userExists = true
            }
        }) 

        if(userExists){
            return res.status(200).json({success: true, message:'Login exitoso'})
        } else {
            return res.status(404).json({success: false, message: 'Usuario no existe, cree una cuenta'})
        }
    }
    catch (error){
        console.log(error)
    }
})


module.exports = router
