import express from "express"
import productsCtrl from "./products.controller.js"

const router = express.Router()

router.route("/").get(productsCtrl.apiGetRestaurants)

export default router