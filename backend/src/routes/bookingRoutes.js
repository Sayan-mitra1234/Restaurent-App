import express from "express"

import {protect,adminOnly} from "../middlewares/authMiddleware.js"
import { createBooking, getAllBooking, getUserBooking, updateBookingStatus } from "../controllers/bookingController.js"




const bookingRoutes = express.Router()

bookingRoutes.post("/create",protect,createBooking)
bookingRoutes.get("/mybooking",protect,getUserBooking)
bookingRoutes.get("/allBooking",adminOnly,getAllBooking)
bookingRoutes.put("/updateStatus/:bookingId",adminOnly,updateBookingStatus)



export default bookingRoutes