import Booking from "../models/bookingModel.js"

export const createBooking = async (req, res) => {
    try {
        const { id } = req.user

        const { name, phone, numberofPeople, date, time, note } = req.body
        if (!name || !phone || !numberofPeople || !date || !time) {
            return res.status(400).json({
                message: "all fields are required",
                success: false
            })
        }
        //check for overlapping bookings
        const existingBooking = await Booking.findOne({
            date, time, status: { $ne: "Cancelled" },
        })

        if (existingBooking) {
            return res.status(400).json({
                message: "This time slot is already booked",
                success: false
            })
        }

        const booking = await Booking.create({
            user: id,
            name, phone, numberofPeople, date, time, note
        })
        res.status(201).json({
            success: true,
            message: "Table booked Successfully",
            booking
        })


    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getUserBooking = async (req, res) => {
    try {
        const { id } = req.user
        const bookings = await Booking.find({ user: id }).sort({ createdAt: -1 })
        res.status(200).json(bookings)

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const getAllBooking = async (req, res) => {
    try {
        const bookings = await Booking.find().populate("user", "name email")
        res.status(200).json(bookings)

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const updateBookingStatus = async (req, res) => {
    try {
        const {bookingId} = req.params
        const {status}=req.body
        const booking = await Booking.findById(bookingId)
        if(!booking){
            return res.status(404).json({
                message:"Booking not found"
            })
        }
        booking.status = status
        await booking.save()
        res.status(200).json({
            success:true,
            message:"Booking status Update",
            booking
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}