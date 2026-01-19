import React, { useContext } from 'react'
import {Routes,Route, useLocation} from "react-router-dom"
import Home from './pages/Home'
import Menu from "./pages/Menu"
import MenuDetails from "./pages/MenuDetails"
import Contact from './pages/Contact'
import Cart from "./pages/Cart"
import Checkout from "./pages/Checkout"
import BookTable from './pages/BookTable'
import MyBookings from "./pages/MyBookings"
import MyOrders from "./pages/MyOrders"
import Login from "./pages/Login"
import Signup from "./pages/Signup"
import Navbar from './components/Navbar'
import {Toaster} from "react-hot-toast"
import Footer from './components/Footer'
import Adminlayout from './pages/admin/Adminlayout'
import { AppContext } from './context/AppContext'
import Adminlogin from './pages/admin/Adminlogin'
import Dashboard from './pages/admin/Dashboard'
import Addcategory from './pages/admin/Addcategory'
import AddMenu from './pages/admin/AddMenu'
import Categories from './pages/admin/Categories'
import Menus from './pages/admin/Menus'
import Orders from './pages/admin/Orders'
import Bookings from './pages/admin/Bookings'
const App = () => {
  const adminPath = useLocation().pathname.includes("admin")
  const {admin} =useContext(AppContext)
  return (
    <div>
      <Toaster/>
      {!adminPath && <Navbar/>}
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/menu" element={<Menu/>}/>
        <Route path="/menu-details/:id" element={<MenuDetails/>}/>
        <Route path="/contact" element={<Contact/>}/>
        <Route path="/cart" element={<Cart/>}/>
        <Route path="/checkout" element={<Checkout/>}/>
        <Route path="/book-table" element={<BookTable/>}/>
        <Route path="/my-bookings" element={<MyBookings/>}/>
        <Route path="/my-orders" element={<MyOrders/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/signup" element={<Signup/>}/>
        
        {/* admin routes */}
        <Route path='/admin' element={admin ?<Adminlayout/>:<Adminlogin/>}>
          <Route index element={admin ? <Dashboard/> : <Adminlogin/>}/>
          <Route path='add-category' element={admin ? <Addcategory/> : <Adminlogin/>}/>
          <Route path='add-menu' element={admin ? <AddMenu/> : <Adminlogin/>}/>
          <Route path='categories' element={admin ? <Categories/> : <Adminlogin/>}/>
          <Route path='menus' element={admin ? <Menus/> : <Adminlogin/>}/>
          <Route path='orders' element={admin ? <Orders/> : <Adminlogin/>}/>
          <Route path='bookings' element={admin ? <Bookings/> : <Adminlogin/>}/>
        </Route>
      </Routes>
      {!adminPath && <Footer/>}
    </div>
  )
}

export default App
