const { response } = require("express");
const express = require("express");
const router = express.Router();
router.use(express.json());


//Documentacion 

/**
 * @openapi
 * components:
 *  schemas:
 *      Categoria:
 *          type: object
 *          properties:
 *              id:
 *                  type: integer
 *              tipo:
 *                  type: string
 * paths:
 * 
 *  /categorias:
 *      get:
 *          summary: Obtiene todas las categorias
 *          responses:
 *              '200':
 *                  description: Lista de todas las categorias
 *                  content:
 *                      application/json:
 *                          schema:
 *                              type: array
 *                              items:
 *                                  $ref: '#/components/schemas/Categoria'
 * 
 *  /categorias/{id}:
 *      get:
 *          summary: Obtiene una sola categoria
 *          parameters:
 *              - in: path
 *                name: id
 *          responses:
 *              '200':
 *                  description: Categoria individual
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Categoria'
 *              '404':
 *                  description: La categoria no fue encontrada
 * 
 *  /categorias/add:
 *      post:
 *          summary: Crea una nueva categoria
 *          tags:   [Categorias]
 *          requestBody:
 *              required: True
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Categoria'
 *          responses:
 *              200:
 *                  description: Categoria creada satisfactoriamente
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Categoria'
 *              500:
 *                  description: Server error
 * 
 */

 /** 
 * @openapi
 *  /categorias/{id}:
 *      put:
 *          summary: Modifica una categoria por su id
 *          tags: [Categoria]
 *          requestBody:
 *              required: true
 *              content:
 *                  application/json:
 *                      schema:
 *                          $ref: '#/components/schemas/Categoria'
 *          responses:
 *              200:
 *                  description: La categoria fue modificada
 *                  content:
 *                      application/json:
 *                          schema:
 *                              $ref: '#/components/schemas/Categoria'
 *              404:
 *                  description: La categoria no fue encontrada
 * 
 */

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
    if(!(result)){
        res.status(404).send('Categoria no existe')
    }
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