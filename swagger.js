const express = require("express");
const app = express()


const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")


const options = {
    definition: {
        openapi: "3.0.0",
        info: {title: "TEST Samuel Djekki"}
    },
    apis: ["./routes/*.js"]
}

const swaggerSpec = swaggerJsDoc(options)

const swaggerDocs = swaggerJsDoc(options);
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocs))


module.exports = app
