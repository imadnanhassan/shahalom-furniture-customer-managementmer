import { GoHome } from 'react-icons/go'
import { FiEdit } from 'react-icons/fi'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { useSelector } from 'react-redux'
import Breadcrumbs from '../../../../common/Breadcrumbs/Breadcrumbs'
import Button from '../../../../common/Button/Button'
import Tooltip from '../../../../common/Tooltip/Tooltip'
import { useState } from 'react'
import EditColor from './EditColor'
import { RxCross1 } from 'react-icons/rx'

export default function AddColor() {
  const [color, setColor] = useState('#ff0000')
  const [isOpen, setIsOpen] = useState(false)
  const isDarkMode = useSelector(state => state.theme.isDarkMode)

  const handleColorChange = event => {
    setColor(event.target.value)
  }

  const handleColorNameChange = event => {
    setColor(event.target.value)
  }

  // Breadcrumbs
  const pageTitle = 'Color'
  const productLinks = [
    { title: <GoHome />, link: '/' },
    { title: 'Products' },
    { title: 'Color' },
  ]

  // colorFakeData
  const colorData = [
    { id: 1, name: 'Red', color: '#E74C3C' },
    { id: 2, name: 'Blue', color: '#3498DB' },
    { id: 3, name: 'Green', color: '#2ECC71' },
    { id: 4, name: 'Yellow', color: '#F1C40F' },
    { id: 5, name: 'Orange', color: '#F39C12' },
    { id: 6, name: 'Purple', color: '#9B59B6' },
    { id: 7, name: 'Pink', color: '#E91E63' },
    { id: 8, name: 'Cyan', color: '#00BCD4' },
    { id: 9, name: 'Teal', color: '#009688' },
    { id: 10, name: 'Indigo', color: '#3F51B5' },
  ]

  const handleClickOpen = () => setIsOpen(true)
 
  const handleClickClose = () => setIsOpen(false)
  return (
    <section
      className={`main-container ${isDarkMode ? 'bg-darkColorBody' : 'bg-lightColorBody'}`}
    >
      <Breadcrumbs title={pageTitle} breadcrumbs={productLinks} />

      <div className="lg:flex  gap-5">
        <div
          className={`px-5 py-5 rounded lg:w-[60%] w-full ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
        >
          {/* search product and Attributes */}
          <div className="flex items-center justify-between lg:gap-6  py-3 ">
            <h2 className="lg:text-2xl  w-[50%] sm:text-xl text-lg font-bold mb-4">
              Color List
            </h2>
            <div className="search flex items-center gap-4">
              <div
                className={` rounded-md flex items-center justify-between border border-[#4800C9] ${isDarkMode ? 'text-darkColorText ' : 'bg-[#ffffff]'}`}
              >
                <input
                  type="search"
                  className={`py-2 pl-7  bg-transparent w-full focus:outline-none cursor-pointer ${isDarkMode ? 'placeholder:text-slate-400' : 'placeholder:text-textColor'}`}
                  placeholder="Type Name & Enter"
                />
                <button className="btn mt-0 rounded-[0px] rounded-r-md px-3">
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </div>
            </div>
          </div>

          {/* Attributes table*/}
          <div className="py-5">
            <div className="container mx-auto overflow-x-auto">
              <table
                id="data-table"
                className={`min-w-full border  table-auto  ${isDarkMode ? 'border-darkColorBody' : 'border-gray-200 divide-y divide-gray-200'}`}
              >
                <thead
                  className={`${isDarkMode ? 'bg-[#131A26]' : 'bg-gray-100'}`}
                >
                  <tr>
                    <th className="p-2">
                      <p>#</p>
                    </th>

                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      COLOR NAME
                    </th>

                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      #HEX code
                    </th>
                    <th
                      className={`px-6 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      ACTIONS
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {colorData.map(({ id, name, color }) => (
                    <tr key={id}>
                      <td className="p-2">{id}</td>
                      <td
                        className={`px-6 py-4 text-[13px] whitespace-nowrap ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                      >
                        {name}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap flex gap-2">
                        <span
                          className="text-[12px] px-1 rounded py-1"
                          style={{
                            backgroundColor: color,
                            color: isDarkMode ? '#ffffff' : '#000000',
                          }}
                        >
                          {color}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center space-x-2">
                          <Tooltip text="Edit">
                            <button
                              key={color.id}
                              onClick={handleClickOpen}
                              colorData={color}
                              className="focus:outline-none transition-all duration-100 p-2 rounded bg-[#60a5fa1a] text-[#60a5fa] hover:bg-[#60a5fa] hover:text-lightColor"
                            >
                              <FiEdit className="text-[12px]" />
                            </button>
                          </Tooltip>
                          {isOpen && (
                            <div className="fixed inset-0 bg-gray-800/10  transition-all duration-300 z-50">
                              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white w-full max-w-5xl rounded-md p-4">
                                <EditColor />
                                <button
                                  onClick={handleClickClose}
                                  className="absolute top-2 right-2 focus:outline-none transition-all duration-300 p-2 rounded-full bg-[#f43f5e1a] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-lightColor"
                                >
                                  <RxCross1 size={20} />
                                </button>
                              </div>
                            </div>
                          )}
                          <Tooltip text="Delete">
                            <button className="focus:outline-none transition-all duration-300 p-2 rounded bg-[#f43f5e1a] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-lightColor">
                              <RiDeleteBin7Line className="text-[12px]" />
                            </button>
                          </Tooltip>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <div
          className={`px-5 py-5 rounded lg:w-[40%] w-full lg:mt-0 mt-5 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
        >
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
                  text="Save"
                  className="bg-primaryColor py-3 px-4 rounded text-white text-[14px] flex gap-2 items-center"
                ></Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
