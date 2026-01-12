import express from "express"

import {protect,adminOnly} from "../middlewares/authMiddleware.js"

import { addTocart, getCart, removeFromCart } from "../controllers/cartController.js"


const cartRoutes = express.Router()

cartRoutes.post("/add",protect,addTocart)
cartRoutes.get("/get",protect,getCart)
cartRoutes.delete("/remove",protect,removeFromCart)



export default cartRoutes