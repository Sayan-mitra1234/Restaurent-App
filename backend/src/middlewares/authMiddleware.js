import jwt from "jsonwebtoken";
import dotenv from "dotenv/config";
export const protect = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "not authorize",
            success: false
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey)
        req.user = decoded;
        next()
    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
}

export const adminOnly = (req, res, next) => {
    const token = req.cookies.token
    if (!token) {
        return res.status(401).json({
            message: "not authorize",
            success: false
        })
    }
    try {
        const decoded = jwt.verify(token, process.env.secretKey)
        req.admin = decoded;
        if (req.admin.email === process.env.ADMIN_LOGIN) {
            next()
        }

    } catch (error) {
        return res.status(401).json({
            message: "invalid token"
        })
    }
}