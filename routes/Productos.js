const express = require("express");
const { route } = require("./Users");
const router = express.Router();
router.use(express.json());


const productos = [{
    id: 1,
    marca: 'Toyota',
    precio: 20000,
    tipo: 'vehiculo',
},
{
    id: 2,
    marca: 'Renault',
    precio: 6500,
    tipo: 'vehiculo'
}]


router.get('/', (req, res) => {
    res.json(productos)
})

router.get('/:id', async (req, res) =>{
    const results = productos.filter(producto => producto.id == req.params.id)
    res.json(results)
})

router.post('/add', async (req, res) => {
    
    const newProduct = {
        id: productos.length + 1,
        marca: req.body.marca,
        precio: req.body.precio,
        tipo: req.body.tipo
    }
    if (!(newProduct.marca && newProduct.precio && newProduct.tipo)){
       return res.status(400).send('Rellena los campos')
    }
    if (!(Number(newProduct.precio))){
        return res.status(400).send('El precio tiene que ser un numero')
    }
    productos.push(newProduct)
    return res.status(200).json({success: true, message: newProduct})
})

router.put('/:id', async (req, res) => {
    
    const id = Number(req.params.id)

    let cambio = productos.findIndex(productos => productos.id == id)

    const changeProduct = {
        id: productos[cambio].id,
        marca: req.body.marca,
        precio: req.body.precio,
        tipo: req.body.tipo
    }
    if (!(id && changeProduct.marca && changeProduct.precio && changeProduct.tipo)){
        return res.status(400).send('todos los campos han de ser rellenados')
    }
    if (!(Number(changeProduct.precio))){
        return res.status(400).send('El precio tiene que ser un numero')
    }
    productos[cambio] = changeProduct

    res.status(200).json({success: true, message: 'Producto cambiado exitosamente', producto: productos[cambio]})
})




module.exports = router

