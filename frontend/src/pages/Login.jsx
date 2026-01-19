import React, { useContext } from 'react'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Link,useNavigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const Login = () => {
  const navigate = useNavigate();
  const {axios,setLoading,loading,setUser} =useContext(AppContext)
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)
      const { data } = await axios.post("/api/auth/login", formData)
      if (data.success) {
        setUser(true)
        localStorage.setItem("user",true)
        toast.success(data.message)
        navigate("/")
      }
      else {
        toast.error(data.message)
      }
    } catch (error) {
      toast.error(error.response.data.message)
    }
    finally {
      setLoading(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  return (
    <div className='px-12 py-12 flex items-center justify-center'>
      <form
        onSubmit={handleSubmit}
        className="sm:w-87.5 w-full text-center bg-gray-900 border border-gray-800 rounded-2xl px-8">
        <h1 className="text-white text-3xl mt-10 font-medium">
          Login
        </h1>

        <p className="text-gray-400 text-sm mt-2">Please Login to continue</p>


        )

        <div className="flex items-center w-full mt-4 bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <path d="m22 7-8.991 5.727a2 2 0 0 1-2.009 0L2 7" /> <rect x="2" y="4" width="20" height="16" rx="2" /> </svg>
          <input type="email" name="email" placeholder="Email id" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none " value={formData.email} onChange={handleChange} required />
        </div>

        <div className=" flex items-center mt-4 w-full bg-gray-800 border border-gray-700 h-12 rounded-full overflow-hidden pl-6 gap-2 ">
          <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" className="text-gray-400" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"> <rect width="18" height="11" x="3" y="11" rx="2" ry="2" /> <path d="M7 11V7a5 5 0 0 1 10 0v4" /> </svg>
          <input type="password" name="password" placeholder="Password" className="w-full bg-transparent text-white placeholder-gray-400 border-none outline-none" value={formData.password} onChange={handleChange} required />
        </div>



        <button type="submit" className="mt-2 w-full h-11 rounded-full text-white bg-indigo-600 hover:bg-indigo-500 transition " >
          {loading ?"Loading...." : "Login"}
        </button>

        <p className="text-gray-400 text-sm mt-3 mb-11 cursor-pointer" >
          Don't have an account?
          <Link to={"/signup"}>
            <span className="text-indigo-400 hover:underline ml-1">SignUp</span>
          </Link>

        </p>
      </form>
    </div>

  )
}


export default Login
