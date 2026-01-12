import Menu from "../models/menuModel.js"
import {v2 as cloudinary} from "cloudinary"

//add menu

export const addMenuItem = async(req,res)=>{
    try {
        const {name,description,price,category} = req.body
         if(!name || !description || !price || !category || !req.file){
             return res.status(401).json({
                message: "all fields are required",
                success: false
            })
        }
        const result = await cloudinary.uploader.upload(req.file.path);
        const newMenuItem = await Menu.create({
            name,description,price,category,image:result.secure_url
        })
         return res.status(201).json({
            message: "menu Item added",
            success: true,
            menuItem:newMenuItem
        })
    } catch (error) {
         return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//get all menu

export const getAllMenuItems = async(req,res)=>{
    try {
        const menuItem = await Menu.find().populate("category","name").sort({createdAt:-1})
        res.status(200).json({
            success:true,
            menuItem
        })
    } catch (error) {
        console.log(error)
          return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//update menu

export const updateMenuItem = async(req,res)=>{
    try {
        const {id} = req.params
        const {name,description,price,category,isAvailable} = req.body
        const menuItem = await Menu.findById(id)
        if(!menuItem){
            return res.status(401).json({
                success:false,
                message:"menu item not found"
            })
        }
         if(req.file){
            const result = await cloudinary.uploader.upload(req.file.path);
            menuItem.image=result.secure_url
        }
        if(name) menuItem.name = name
        if(description) menuItem.description = description
        if(price) menuItem.price = price
        if(category) menuItem.category= category
        if(isAvailable !== undefined) menuItem.isAvailable=isAvailable

        await menuItem.save()
        
         return res.status(201).json({
            message: "menu item updated",
            success: true,
        })
    } catch (error) {
                  return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}

//delete menu item

export const deleteMenuitem = async(req,res)=>{
    try {
        const {id} = req.params
        const menuItem = await Menu.findByIdAndDelete(id)
        if(!menuItem){
             return res.status(401).json({
                message: "menu not exist",
                success: false
            })
        }

         return res.status(201).json({
            message: "menu deleted",
            success: true
        })

    } catch (error) {
        console.log(error)
         return res.status(500).json({
            message: "Internal server error",
            success: false
        })
    }
}