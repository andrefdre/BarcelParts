import express from "express"
import productsCtrl from "./products.controller.js"

const router = express.Router()

router.route("/").get(productsCtrl.apiGetProducts)
router.route("/Marcas").get(productsCtrl.apiGetProductsMarcas)

export default router