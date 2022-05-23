//Declares the necessary imports
const express = require("express")
const productsCtrl = require("./products_controller.js")
const userCtrl = require("./user_controller.js")

//Declaration of all the routes to make the requests
const router = express.Router()

//Routes
router.route("/").get(productsCtrl.apiGetProducts)
router.route("/Product").get(productsCtrl.apiGetProductById)
router.route("/Marcas").get(productsCtrl.apiGetProductsMarcas)
router.route("/Categories").get(productsCtrl.apiGetProductsCategories)
router.route("/User").post(userCtrl.apiGetUserById)
router.route("/CreateUser").post(userCtrl.apiCreateUser)
router.route("/UpdateUser").post(userCtrl.apiUpdateUser)

module.exports = router