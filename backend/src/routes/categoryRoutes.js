import express from "express"

import {protect,adminOnly} from "../middlewares/authMiddleware.js"
import upload from "../middlewares/multer.js"
import { addCategory, deleteCategory, getAllcategory, updateCategory } from "../controllers/categoryController.js"

const categoryRoutes = express.Router()

categoryRoutes.post("/add",adminOnly,upload.single("image"),addCategory)
categoryRoutes.get("/get",getAllcategory)
categoryRoutes.put("/update/:id",adminOnly,upload.single("image"),updateCategory)
categoryRoutes.delete("/delete/:id",adminOnly,deleteCategory)



export default categoryRoutes