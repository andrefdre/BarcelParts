//Declares the necessary imports
const express = require("express")
const productsCtrl = require("./products_controller.js")
const userCtrl = require("./user_controller.js")
const orderCtrl = require("./orders_controller.js")

//Declaration of all the routes to make the requests
const router = express.Router()

//Routes
router.route("/").get(productsCtrl.apiGetProducts)
router.route("/Product").get(productsCtrl.apiGetProductById)
router.route("/Create_Product").post(productsCtrl.apiCreateProduct)
router.route("/Delete_Product").post(productsCtrl.apiDeleteProduct)
router.route("/Marcas").get(productsCtrl.apiGetProductsMarcas)
router.route("/Categories").get(productsCtrl.apiGetProductsCategories)
router.route("/User").post(userCtrl.apiGetUserByEmail)
router.route("/CreateUser").post(userCtrl.apiCreateUser)
router.route("/UpdateUser").post(userCtrl.apiUpdateUser)
router.route("/CreateOrder").post(orderCtrl.apiCreateOrder)
router.route("/GetOrder").post(orderCtrl.apiGetOrders)

module.exports = router