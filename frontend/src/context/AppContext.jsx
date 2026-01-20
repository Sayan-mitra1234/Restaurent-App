import { createContext, useEffect, useState } from "react";

import axios from "axios"
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true

export const AppContext = createContext()

const AppContextProvider = ({children})=>{
  
    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState(null)
    const [admin,setAdmin] = useState(null)
    const [categories,setCategories] = useState([])

    const fetchCategories= async()=>{
        try {
            const {data} = await axios.get("/api/category/get")
            if(data.success){
                setCategories(data.categories)
            }else{
                console.log("failed to fetch the categories")
            }
        } catch (error) {
            console.log("Error fetching categories",error)
        }
    }

    const isAuth=async()=>{
        try {
            const {data}=await axios.get("/api/auth/is-auth")
            if(data.success){
                setUser(data.user)
            }
        } catch (error) {
            console.log(error)
        }
    }
    useEffect(()=>{
        isAuth()
        fetchCategories()
    },[])
    const value={loading,setLoading,user,setUser,axios,admin,setAdmin,categories,fetchCategories}
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider