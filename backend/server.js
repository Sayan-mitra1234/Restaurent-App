import express from "express"
import dotenv from "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbConnect } from "./src/config/db.js"
import authRoutes from "./src/routes/authRoutes.js"
import categoryRoutes from "./src/routes/categoryRoutes.js"
import connectCloudinary from "./src/config/cloudinary.js"
import menuRoutes from "./src/routes/menuRoutes.js"
import cartRoutes from "./src/routes/cartRoutes.js"
import orderRoutes from "./src/routes/orderRoutes.js"
import bookingRoutes from "./src/routes/bookingRoutes.js"

const app = express()
dbConnect()
connectCloudinary()

const PORT =process.env.PORT

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
app.use("/api/category",categoryRoutes)
app.use("/api/menu",menuRoutes)
app.use("/api/cart",cartRoutes)
app.use("/api/order",orderRoutes)
app.use("/api/booking",bookingRoutes)


app.listen(PORT,()=>{
    console.log(`server running at port:${PORT}`)
})