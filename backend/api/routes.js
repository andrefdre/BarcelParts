//Declares the necessary imports
const express = require("express")
//import productsCtrl from "./products.controller.js"
const productsCtrl = require("./products_controller.js")

//Declaration of all the routes to make the requests
const router = express.Router()

//Routes
router.route("/").get(productsCtrl.apiGetProducts)
router.route("/Marcas").get(productsCtrl.apiGetProductsMarcas)
router.route("/Categories").get(productsCtrl.apiGetProductsCategories)

module.exports = router