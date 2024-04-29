import React, { useState } from 'react'
import { FaPlus, FaTimes } from 'react-icons/fa'
import { useSelector } from 'react-redux'
import Button from '../../../../common/Button/Button'

export default function EditBrand() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [selectedFile, setSelectedFile] = useState(null)
  const [previewUrl, setPreviewUrl] = useState(null)
  const isDarkMode = useSelector(state => state.theme.isDarkMode)

  // File Upload
  const handleFileChange = event => {
    const file = event.target.files[0]
    setSelectedFile(file)
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setPreviewUrl(imageUrl)
    }
  }

  const handleCancelUpload = () => {
    setSelectedFile(null)
    setPreviewUrl(null)
  }
  return (
    <div
      className={`px-5 py-5 rounded w-full ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
    >
      <div className="flex gap-5 pb-5">
        <div
          className={` w-full py-5 rounded ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
        >
          <div className="px-5">
            <h2 className="text-2xl font-bold mb-4">Add New Brand</h2>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
              >
                Brand Name
              </label>
              <div className="relative">
                <input
                  type="text"
                  id="productName"
                  name="Brand Name"
                  placeholder="Enter brand name"
                  className={`form-control mt-1 p-3 border block w-full shadow-sm sm:text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText' : 'bg-lightColor hover:border-primaryColor/80 hover:transition-all duration-200'}`}
                />
              </div>
            </div>

            {/* Media */}
            <div className="mb-4">
              <label
                htmlFor="productName"
                className={`block text-sm font-medium mb-2 ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
              >
                File Upload
              </label>
              <input
                type="file"
                id="productName"
                name="productName"
                onChange={handleFileChange}
                className={`w-full text-sm border file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4  rounded focus:outline-none  focus:border-primaryColor ${isDarkMode ? 'bg-darkColorCard file:bg-primaryColor border-primaryColor text-lightColor file:text-black ' : 'bg-lightColor hover:border-primaryColor/50 file:text-white file:bg-primaryColor file:hover:bg-primaryColor/90 border-primaryColor/30 text-black'}`}
              />
              {previewUrl && (
                <div className="mt-4 flex items-center gap-20 ">
                  <div>
                    <p
                      className={`text-sm  ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                    >
                      Preview:
                    </p>
                    <img
                      src={previewUrl}
                      alt="Preview"
                      className="mt-2 max-w-28"
                    />
                  </div>
                  <button
                    onClick={handleCancelUpload}
                    className="text-red-500 hover:text-red-700 "
                  >
                    <FaTimes />
                  </button>
                </div>
              )}
            </div>
            <div className="mb-4">
              <label
                htmlFor="productName"
                className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
              >
                Meta Title
              </label>
              <input
                type="text"
                id="productName"
                name="productName"
                placeholder="Enter Meta Title"
                className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm  rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-primaryColor/80 hover:transition-all duration-200'}`}
              />
            </div>
            <div className="mb-4">
              <label
                className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
              >
                Meta Description
              </label>
              <textarea
                rows="4"
                placeholder="Meta Description"
                className={`mt-1 p-3  border block w-full shadow-sm sm:text-sm  rounded-md  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText focus:outline-none' : 'text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-primaryColor hover:border-primaryColor/80 hover:transition-all duration-200'}`}
              ></textarea>
            </div>
            <Button
              text="Update"
              className="bg-primaryColor py-3 px-4 rounded text-white text-[14px] flex gap-2 items-center"
              icon={FaPlus}
            ></Button>
          </div>
        </div>
      </div>
    </div>
  )
}
