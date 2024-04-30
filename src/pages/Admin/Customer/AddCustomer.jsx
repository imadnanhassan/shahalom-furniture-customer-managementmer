import React from 'react'
import 'react-quill/dist/quill.snow.css'
import 'filepond/dist/filepond.min.css'

import { GoHome } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import Breadcrumbs from '../../../common/Breadcrumbs/Breadcrumbs'
import { useForm } from 'react-hook-form'
import { useAddCustomerMutation } from '../../../redux/features/customer/customerApi'

// Register FilePond plugins if needed
registerPlugin(/* plugins */)
export default function AddCustomer() {
  // const [uploadedFiles, setUploadedFiles] = useState([])
  const isDarkMode = useSelector(state => state.theme.isDarkMode)
  const [addCustomer] = useAddCustomerMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  // Breadcrumbs
  const pageTitle = 'Customer Add'
  const productLinks = [
    { title: <GoHome />, link: '/dashboard' },
    { title: 'Customer List', link: '/dashboard/all-customers' },
    { title: 'Customer Add ' },
  ]

  const handleOnSubmit = async data => {
    try {
      const formData = new FormData()

      // Append other form data fields
      formData.append('invoice_number', data.invoice_number)
      formData.append('product_details', data.product_details)
      formData.append('name', data.name)
      formData.append('location', data.location)
      formData.append('number', data.number)

      // Append uploaded file(s)
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images[]', data.images[i])
      }

      const res = await addCustomer(formData)
      
      console.log(data)
      console.log(res)
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <section
      className={`main-container ${isDarkMode ? 'bg-darkColorBody' : 'bg-lightColorBody'}`}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs title={pageTitle} breadcrumbs={productLinks} />

      {/* Add Product field */}
      <form
        onSubmit={handleSubmit(handleOnSubmit)}
        className="lg:flex gap-5 pb-5"
      >
        <div
          className={`lg:w-[65%]  w-full py-5 rounded ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
        >
          <div className="px-5">
            <h2 className="text-2xl font-bold mb-4">Add New Customer</h2>
            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="invoicenumber"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                >
                  Invoice Number
                </label>
                <input
                  type="text"
                  id="invoicenumber"
                  name="invoice_number"
                  placeholder="Enter Invoice Number"
                  className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                  {...register('invoice_number', {
                    required: 'Must be provide Invoice Number',
                  })}
                />
              </div>
              {errors.invoice_number && (
                <span className="text-red-500">
                  {errors.invoice_number?.message}
                </span>
              )}
            </div>

            <div className="mb-4">
              <label
                className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                htmlFor="productdetails"
              >
                Product Details
              </label>
              <textarea
                rows="4"
                id="productdetails"
                className={`mt-1 p-3  border block w-full shadow-sm sm:text-sm  rounded-md  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText focus:outline-none' : 'text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-primaryColor hover:border-gray-400 border-gray-300'}`}
                {...register('product_details', {
                  required: 'Product Details is requied!',
                })}
              ></textarea>
              {errors.product_details && (
                <span className="text-red-500">
                  {errors.product_details?.message}
                </span>
              )}
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="file"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                >
                  Images
                </label>
                <input
                  type="file"
                  {...register('images', { required: 'Please select file(s)' })}
                  multiple
                />
              </div>
              {errors.images && (
                <span className="text-red-500">{errors.images?.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-[35%] w-full bg-lightColor py-5 rounded">
          {/* select 2 */}
          <div className="px-9">
            <div className="lg:flex gap-3 items-center">
              <div className="w-full mr:auto ml:auto lg:mt-0 md:mt-2 mt-4 sm:mt-3">
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label
                      htmlFor="name"
                      className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                    >
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      placeholder="Enter Name"
                      className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                      {...register('name', {
                        required: 'Name is requied!',
                      })}
                    />
                    {errors.name && (
                      <span className="text-red-500">
                        {errors.name?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label
                      className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                      htmlFor="location"
                    >
                      Location
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Enter Location"
                      className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                      {...register('location', {
                        required: 'Location is requied!',
                      })}
                    />
                    {errors.location && (
                      <span className="text-red-500">
                        {errors.location?.message}
                      </span>
                    )}
                  </div>
                </div>
                <div className="mb-4 flex gap-4">
                  <div className="flex-1">
                    <label
                      className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                      htmlFor="number"
                    >
                      Number
                    </label>
                    <input
                      type="text"
                      id="number"
                      name="number"
                      placeholder="Enter Number"
                      className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                      {...register('number', {
                        required: 'Number is requied!',
                      })}
                    />
                    {errors.number && (
                      <span className="text-red-500">
                        {errors.number?.message}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* file upload */}

          {/* <div className=" px-5 py-5">
            <div className="lg:flex gap-3 items-center px-4">
              <div className=" w-full mr:auto ml:auto">
                <label
                  for="productCategory"
                  className="block text-sm mb-2 font-medium text-gray-700"
                >
                  Upload a Thumbnail
                </label>
                <div className="">
                  <FilePond
                    files={uploadedFiles}
                    allowMultiple={true}
                    maxFiles={4}
                    onupdatefiles={handleFileUpdate}
                    labelIdle='Drag & Drop your files or <span className="filepond--label-action">Browse</span>'
                  />
                  <div className="flex gap-2">
                    {uploadedFiles.map(file => (
                      <img
                        key={file.id}
                        src={file.source}
                        alt={file.filename}
                        style={{
                          maxWidth: '100px',
                          maxHeight: '100px',
                          margin: '5px',
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div> */}

          <button
            type="submit"
            className="bg-primaryColor py-3 px-4 rounded text-white text-[14px] flex gap-2 items-center"
          >
            Submit
          </button>
        </div>
      </form>
    </section>
  )
}
