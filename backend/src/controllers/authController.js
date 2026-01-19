import User from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv/config"

// jwt token create

const generateToken = (res, payload) => {
    const token = jwt.sign(payload, process.env.secretKey, { expiresIn: "1d" })
    res.cookie("token", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 24 * 60 * 60 * 1000
    });
    return token;
}

//register user

export const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body
        const existingUser = await User.findOne({ email })
        if (!name || !email || !password) {
            return res.status(401).json({
                message: "please fill all the fields",
                success: false
            })
        }
        if (existingUser) {
            return res.status(401).json({
                message: "User already exist",
                success: false
            })
        }
        const hashPassword = await bcrypt.hash(password, 10)
        const user = await User.create({ name, email, password: hashPassword })
        return res.status(201).json({
            message: "user register successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//login user

export const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                message: "please fill all the fields",
                success: false
            })
        }
        const user = await User.findOne({ email })
        if (!user) {
            return res.status(401).json({
                message: "User doesnot exist",
                success: false
            })
        }
        const isMatch = await bcrypt.compare(password, user.password)
        if (!isMatch) {
            return res.status(401).json({
                message: "invalid credential",
                success: false
            })
        }
        generateToken(res, { id: user._id, role: user.isAdmin ? "admin" : "user" })
        res.status(201).json({
            message: "user login successfully",
            success: true,
            data: {
                name: user.name,
                email: user.email
            }
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//logout user

export const logoutUser = async (req, res) => {
    try {
        res.clearCookie("token")
        return res.status(201).json({
            message: "logout successfully",
            success: true
        })
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//admin login

export const adminLogin = async (req, res) => {
    try {
        const { email, password } = req.body
        if (!email || !password) {
            return res.status(401).json({
                message: "please fill all the fields",
                success: false
            })
        }
        const adminEmail = process.env.ADMIN_LOGIN;
        const adminPassword = process.env.ADMIN_PASSWORD;
        if (email !== adminEmail || password !== adminPassword) {
            return res.status(401).json({
                message: "invalid credential",
                success: false
            })
        }
        const token = jwt.sign({ email }, process.env.secretKey, {
            expiresIn: "1d"
        })
        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
            maxAge: 24 * 60 * 60 * 1000
        });
        res.status(201).json({
            admin:{admin:adminEmail},
            message: "admin login successfully",
            success: true
        })

    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//user get profile

export const getProfile= async(req,res)=>{
    try {
        const {id} = req.user
        const user = await User.findById(id).select("-password")
        if(!user){
            return res.status(404).json({
                message:"user not found",
                success:false
            })
        }
        res.status(201).json(user)

    } catch (error) {
                return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

export const isAuth = async(req,res)=>{
    try {
        const {id} = req.user
        const user =await User.findById(id).select("-password")
        res.json({success:true,user})
    } catch (error) {
              return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}