import React, { useState } from 'react'
import 'react-quill/dist/quill.snow.css'

import { toast } from 'react-toastify'
import { GoHome } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import Breadcrumbs from '../../../common/Breadcrumbs/Breadcrumbs'
import { useAddCustomerMutation } from '../../../redux/features/customer/customerApi'

// import { IoCloseOutline } from 'react-icons/io5'
export default function AddCustomer() {
  const [imagePreviews, setImagePreviews] = useState([])
  const isDarkMode = useSelector(state => state.theme.isDarkMode)
  const [addCustomer, { isLoading }] = useAddCustomerMutation()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const navigate = useNavigate()

  // Breadcrumbs
  const pageTitle = 'Customer Add'
  const productLinks = [
    { title: <GoHome />, link: '/dashboard' },
    { title: 'Customer List', link: '/dashboard/all-customers' },
    { title: 'Customer Add ' },
  ]

  const handleFileChange = e => {
    const files = Array.from(e.target.files)
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const handleOnSubmit = async data => {
    try {
      if (Number(data.price) < Number(data.payment_price)) {
        return toast.error('Payment price would be lessthan price!')
      }
      const formData = new FormData()

      // Append other form data fields
      formData.append('invoice_number', data.invoice_number)
      formData.append('product_details', data.product_details)
      formData.append('name', data.name)
      formData.append('location', data.location)
      formData.append('number', data.number)
      formData.append('price', data.price)
      formData.append('payment_price', data.payment_price)
      formData.append('delivery_date', data.delivery_date)
      formData.append('reference_name', data.reference_name ? data.reference_name : "")

      const due = Number(data.price) - Number(data.payment_price)

      formData.append('due_price', due)

      // Append uploaded file(s)
      for (let i = 0; i < data.images.length; i++) {
        formData.append('images[]', data.images[i])
      }
      console.log(data.reference_name)


      const res = await addCustomer(formData)
      if (res?.data?.status === 200) {
        toast.success(res?.data?.message)
        navigate('/dashboard/all-customers')
      } else if (res?.data?.status === 401) {
        res?.data?.errors.forEach(errorItem => toast.error(errorItem))
      }
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
          className={`lg:w-[50%]  w-full py-5 rounded ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
        >
          <div className="px-5">
            <h2 className="text-2xl font-bold mb-4">Product Information</h2>
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
                {errors.invoice_number && (
                  <span className="text-red-500">
                    {errors.invoice_number?.message}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="reference_name"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                >
                  Reference Name(Optional)
                </label>
                <input
                  type="text"
                  id="reference_name"
                  name="reference_name"
                  placeholder="Enter Reference Name"
                  className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                  {...register('reference_name')}
                />
              </div>
            </div>

            <div className="mb-4 flex gap-4">
              <div className="flex-1">
                <label
                  htmlFor="price"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                >
                  Price
                </label>
                <input
                  type="text"
                  id="price"
                  name="price"
                  placeholder="Enter Price"
                  className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                  {...register('price', {
                    required: 'Must be provide Price',
                  })}
                />
                {errors.price && (
                  <span className="text-red-500">{errors.price?.message}</span>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="payment_price"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                >
                  Payment Price
                </label>
                <input
                  type="text"
                  id="payment_price"
                  name="payment_Price"
                  placeholder="Enter Payment Price"
                  className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                  {...register('payment_price', {
                    required: 'Must be provide Payment Price',
                  })}
                />
                {errors.payment_price && (
                  <span className="text-red-500">
                    {errors.payment_price?.message}
                  </span>
                )}
              </div>
              <div className="flex-1">
                <label
                  htmlFor="delivery_date"
                  className={`block text-sm font-medium ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
                >
                  Delivery Date(Optional)
                </label>
                <input
                  className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                  type="date"
                  name="delivery_date"
                  id="delivery_date"
                  {...register('delivery_date')}
                />
              </div>
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
                placeholder="Enter Your Product Details"
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
                  Images (Optional)
                </label>
                <input
                  type="file"
                  className={`w-full text-sm border file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4  rounded focus:outline-none  focus:border-primaryColor ${isDarkMode ? 'bg-darkColorCard file:bg-primaryColor border-primaryColor text-lightColor file:text-black ' : 'bg-lightColor hover:border-primaryColor/50 file:text-white file:bg-primaryColor file:hover:bg-primaryColor/90 border-primaryColor/30 text-black'}`}
                  onChange={handleFileChange}
                  {...register('images')}
                  multiple
                />
                <div className="mt-4 flex items-center  relative ">
                  {imagePreviews.map((preview, index) => (
                    <div key={index}>
                      <img
                        src={preview}
                        alt={`Preview ${index}`}
                        className="w-36 h-36 mr-2 mb-2 border rounded "
                      />
                      {/* <IoCloseOutline
                  onClick={handleCencelPhoto}
                  className=" text-[17px] bg-primaryColor text-white hover:text-white hover:bg-error-200 transition-all duration-200 cursor-pointer rounded -mt-[133px] relative -left-6"
                /> */}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className={`lg:w-[50%]  w-full py-5 rounded ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
        >
          {/* select 2 */}
          <div className="px-9">
            <h2 className="text-2xl font-bold mb-4">Customer Information</h2>
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
                      Location(optional)
                    </label>
                    <input
                      type="text"
                      id="location"
                      name="location"
                      placeholder="Enter Location"
                      className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                      {...register('location')}
                    />
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

          {isLoading ? (
            <button
              type="button"
              disabled
              className="bg-primaryColor py-3 mr-10 mt-10 ml-auto px-4 rounded text-white text-[14px] flex gap-2 items-center"
            >
              Submiting...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primaryColor py-3 mr-10 mt-10 ml-auto px-4 rounded text-white text-[14px] flex gap-2 items-center"
            >
              Submit
            </button>
          )}
        </div>
      </form>
    </section>
  )
}
