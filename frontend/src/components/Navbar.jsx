import React, { useContext, useState } from 'react'
import { AppContext } from '../context/AppContext'
import {useNavigate} from "react-router-dom"
import { Link } from 'react-router-dom';
import { Calendar, LogOut, Package, ShoppingCart, UserCircle } from "lucide-react"
import toast from 'react-hot-toast';
const Navbar = () => {
        const navigate = useNavigate();
    const { user, setUser,axios } = useContext(AppContext);
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const [isProfileOpen, setIsProfileOpen] = useState(false)
    const logout=async()=>{
        try {
            const {data}=await axios.post("/api/auth/logout")
            if(data.success){
                setUser(null)
                toast.success(data.message)
                navigate("/")
            }
        } catch (error) {
            console.log(error)
        }
    }
    return (
        <nav className='bg-cyan-50 shadow-md sticky top-0 z-50 py-3'>
            <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8'>
                <div className='flex items-center justify-between h-16'>
                    <div className='flex items-center'>
                        <Link to="/" className="font-Bold text-2xl">
                            LoGO
                        </Link>
                    </div>
                    <div className='hidden md:flex items-center space-x-8'>
                        <Link to={"/"} className='hover:text-blue-600'>Home</Link>
                        <Link to={"/menu"} className='hover:text-blue-600'>Menus</Link>
                        <Link to={"/contact"} className='hover:text-blue-600'>Contact</Link>
                    </div>
                    <div className='flex items-center space-x-4'>
                        <button onClick={()=>navigate("/cart")} className='relative p-2 hover:bg-gray-100 rounded-lg transition-color'>
                            <ShoppingCart />
                            <span className='absolute -top-1 -right-1 bg-orange-500 text-white rounded-full w-5 h-5 flex items-center justify-center font-medium'>3</span>
                        </button>
                        <div className='hidden md:block'>
                            {
                                user ? (
                                    <div className='relative'>
                                        <button className='p-2 hover:bg-gray-100 rounded-lg' onMouseEnter={() => setIsProfileOpen(true)} onClick={() => setIsProfileOpen(false)}>
                                            <UserCircle />
                                        </button>
                                        {
                                            isProfileOpen && (
                                                <div onMouseEnter={() => setIsProfileOpen(true)} onMouseLeave={() => setIsProfileOpen(false)} className='absolute right-0 mt-2 w-48 bg-white rounded-lg border border-gray-100'>
                                                    <Link to={'/my-bookings'} className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                                        <Calendar />
                                                        My Bookings
                                                    </Link>
                                                    <Link to={'/my-orders'} className='flex items-center px-4 py-2 text-gray-700 hover:bg-gray-100'>
                                                        <Package />
                                                        My Orders
                                                    </Link>
                                                <button className='flex items-center w-full px-4 py-2 text-red-600 hover:bg-red-50' onClick={logout}><LogOut/>Logout</button>
                                                </div>
                                            )
                                        }
                                    </div>
                                ) : (
                                    <button onClick={()=>navigate("/login")} className='bg-orange-500 text-white px-6 py-2 rounded-lg hover:bg-orange-600 font-medium cursor-pointer'>Login</button>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </nav >
    )
}

export default Navbar
