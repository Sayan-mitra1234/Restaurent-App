import express from "express"
import dotenv from "dotenv/config"
import cors from "cors"
import cookieParser from "cookie-parser"
import { dbConnect } from "./src/config/db.js"
import authRoutes from "./src/routes/authRoutes.js"

const app = express()

const PORT =process.env.PORT

app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use("/api/auth",authRoutes)
dbConnect()

app.listen(PORT,()=>{
    console.log(`server running at port:${PORT}`)
})