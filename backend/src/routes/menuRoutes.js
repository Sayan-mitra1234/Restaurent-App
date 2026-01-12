import express from "express"

import {protect,adminOnly} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addMenuItem, deleteMenuitem, getAllMenuItems, updateMenuItem } from "../controllers/menuController.js"


const menuRoutes = express.Router()

menuRoutes.post("/add",adminOnly,upload.single("image"),addMenuItem)
menuRoutes.get("/get",getAllMenuItems)
menuRoutes.put("/update/:id",adminOnly,upload.single("image"),updateMenuItem)
menuRoutes.delete("/delete/:id",adminOnly,deleteMenuitem)



export default menuRoutes