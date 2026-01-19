import { createContext, useEffect, useState } from "react";

import axios from "axios"
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL
axios.defaults.withCredentials = true

export const AppContext = createContext()

const AppContextProvider = ({children})=>{
  
    const [loading,setLoading] = useState(false)
    const [user,setUser] = useState(null)
    const [admin,setAdmin] = useState(null)
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
    },[])
    const value={loading,setLoading,user,setUser,axios,admin,setAdmin}
    return(
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

export default AppContextProvider