import React, { useContext, useState } from 'react'
import { AppContext } from '../../context/AppContext'
import { useNavigate } from 'react-router-dom'
import { Upload } from "lucide-react"
import toast from 'react-hot-toast'

const Addcategory = () => {
  const { axios, loading, setLoading } = useContext(AppContext)
  const [formData, setFormData] = useState({ name: "", image: null })
  const [file, setFile] = useState(null)
  const [preview, setPreview] = useState(null)
  const navigate = useNavigate()

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0]
    if (!selectedFile) return

    setFile(selectedFile)
    setFormData({ ...formData, image: selectedFile })
    setPreview(URL.createObjectURL(selectedFile))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setLoading(true)

      const payload = new FormData()
      payload.append("name", formData.name)
      payload.append("image", formData.image)

      const { data } = await axios.post("/api/category/add", payload, {
        headers: { "Content-Type": "multipart/form-data" }
      })

      if (data.success) {
        toast.success(data.message)
        navigate("/admin/categories")
      } else {
        toast.error(data.message)
      }

    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='py-12'>
      <form onSubmit={handleSubmit} className='max-w-md w-full flex flex-col gap-5'>
        {preview && <img src={preview} alt='preview' className='w-1/2' />}

        <div>
          <label className='text-sm block font-medium text-gray-700 mb-2'>
            Category Name *
          </label>
          <input
            type="text"
            name='name'
            value={formData.name}
            onChange={handleChange}
            placeholder='Enter Category Name'
            required
            className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:border-transparent'
          />
        </div>

        <div>
          <label className='text-sm block font-medium text-gray-700 mb-2'>
            Category Image *
          </label>

          <input
            type="file"
            id='fileUpload'
            className='hidden'
            onChange={handleFileChange}
            accept="image/*"
            required
          />

          <label
            htmlFor="fileUpload"
            className='flex flex-col items-center justify-center w-full h-32 border border-dashed border-gray-300 rounded cursor-pointer focus:outline-none focus:ring-2 transition'
          >
            <Upload className='w-8 h-8 text-gray-500 mb-2' />
            <span className='text-gray-600 text-sm'>
              {file ? file.name : "Click to upload an image"}
            </span>
          </label>
        </div>

        <button
          type="submit"
          className='bg-orange-500 text-white px-8 py-3 cursor-pointer'
        >
          {loading ? "Adding..." : "Add Category"}
        </button>
      </form>
    </div>
  )
}

export default Addcategory
