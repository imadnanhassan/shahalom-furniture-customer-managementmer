import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import Button from '../../../../common/Button/Button'

export default function EditColor() {
  const [color, setColor] = useState('#ff0000')
  const isDarkMode = useSelector(state => state.theme.isDarkMode)
  const handleColorChange = event => {
    setColor(event.target.value)
  }

  const handleColorNameChange = event => {
    setColor(event.target.value)
  }
  return (
    <div className="flex gap-5 pb-5">
      <div
        className={` w-full py-5 rounded ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
      >
        <div className="px-5">
          <h2 className="lg:text-2xl sm:text-xl text-lg font-bold mb-4">
            Add New Color{' '}
          </h2>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
            >
              Color Name
            </label>
            <div className="relative">
              <input
                type="text"
                id="colorName"
                name="Color Name"
                placeholder="Black"
                className={`mt-1 p-3 border block w-full shadow-sm sm:text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText' : 'bg-lightColor hover:border-primaryColor/80 hover:transition-all duration-200'}`}
              />
            </div>
          </div>
          <div className="mb-4">
            <label
              htmlFor="productName"
              className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
            >
              Color Code
            </label>
            <div className="relative flex items-center">
              <input
                type="text"
                id="colorName"
                name="Color Code"
                placeholder="#000000"
                value={color}
                onChange={handleColorNameChange}
                className={`mt-1 p-3 border block w-full shadow-sm sm:text-sm rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText' : 'bg-lightColor hover:border-primaryColor/80 hover:transition-all duration-200'}`}
              />
              <input
                type="color"
                id="favcolor"
                name="favcolor"
                value={color}
                onChange={handleColorChange}
                className=" rounded-md shadow-sm  focus:ring-indigo-300 focus:ring-opacity-50"
              />
            </div>
          </div>

          <Button
            text="Update"
            className="bg-primaryColor py-3 px-4 rounded text-white text-[14px] flex gap-2 items-center"
          ></Button>
        </div>
      </div>
    </div>
  )
}
