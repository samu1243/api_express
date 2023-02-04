const { response } = require("express");
const express = require("express");
const router = express.Router();
router.use(express.json());

const listaCategorias = [{
    id: 1,
    tipo: 'vehiculo'
},
{
    id: 2,
    tipo: 'camioneta'
},
{
    id:3,
    tipo: 'camion'
}]

router.get('/', async (req, res) => {
    return res.status(200).json(listaCategorias)
})


router.get('/:id', async (req, res) => {
    const result = listaCategorias.filter(categorias => categorias.id == req.params.id)
    res.json(result)
})


router.post('/add', async (req, res) => {

    try {

        const {id, tipo} = req.body;
    
        categoriaExists = false
    
        listaCategorias.forEach((categoria) => {
            if (categoria.tipo.toLowerCase() == tipo.toLowerCase() || categoria.id == id){
                categoriaExists = true
            }
        })
        if (categoriaExists){
            return res.status(409).json({success: false, message: 'Categoria ya existe y/o id en uso'})
        }
        if (!(id && tipo)){
            return res.status(400).send('Rellena los campos')
        }
    
        listaCategorias.push({id , tipo: tipo.toLowerCase()})
        return res.status(200).json({success: true, message: 'Categoria creada'})
    }
    catch(error){
        console.log(error)
    }
})

router.put('/:id', async (req, res) => {

    const {id, tipo} = req.body

    categoriaExists = false

    listaCategorias.forEach((categoria) => {
        if (categoria.tipo.toLowerCase() == tipo.toLowerCase()){
            categoriaExists = true
        }
    })
        if (categoriaExists){
            return res.status(409).json({success: false, message: 'Categoria ya existe'})
        }

    const cambio = listaCategorias.find(categoria => categoria.id == id)
    cambio.tipo = tipo
    return res.status(200).json({success:true, message: 'Tipo de categoria cambiada exitosamente'})

})


module.exports = router