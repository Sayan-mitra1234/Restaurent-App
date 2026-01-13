import express from "express"

import {protect,adminOnly} from "../middlewares/authMiddleware.js"
import { getAllOrders, getUserOrders, placeOrder, updateOrderStatus } from "../controllers/orderController.js"




const orderRoutes = express.Router()

orderRoutes.post("/place",protect,placeOrder)
orderRoutes.get("/myorder",protect,getUserOrders)
orderRoutes.get("/orders",adminOnly,getAllOrders)
orderRoutes.put("/updateStatus/:orderId",adminOnly,updateOrderStatus)



export default orderRoutes