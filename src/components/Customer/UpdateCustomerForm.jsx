import React, { useState } from 'react'
import { toast } from 'react-toastify'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useUpdateCustomerMutation } from '../../redux/features/customer/customerApi'
import { useSelector } from 'react-redux'
import { imagePath } from '../../helper/imagePath'

const UpdateCustomerForm = ({ customer, id }) => {
  const [imagePreviews, setImagePreviews] = useState(
    customer && customer.images ? customer.images : [],
  )
  const [updateCustomer, { isLoading }] = useUpdateCustomerMutation()
  const isDarkMode = useSelector(state => state.theme.isDarkMode)
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

    const navigate = useNavigate()
  const handleFileChange = e => {
    const files = Array.from(e.target.files)
    const previews = files.map(file => URL.createObjectURL(file))
    setImagePreviews(previews)
  }

  const handleOnSubmit = async data => {
    try {
      if (data.price < data.payment_price) {
        return toast.error('Payment price would be lessthan price!')
      }
      const formData = new FormData()

      // Append other form data fields
      formData.append(
        'invoice_number',
        data.invoice_number ? data.invoice_number : customer.invoice_number,
      )
      formData.append(
        'product_details',
        data.product_details ? data.product_details : customer.product_details,
      )
      formData.append('name', data.name ? data.name : customer.name)
      formData.append(
        'location',
        data.location ? data.location : customer.location,
      )
      formData.append('number', data.number ? data.number : customer.numbe)
      formData.append('price', data.price ? data.price : customer.price)
      formData.append(
        'payment_price',
        data.payment_price ? data.payment_price : customer.payment_price,
      )

      const due = Number(data.price) - Number(data.payment_price)

      formData.append('due_price', due)

      // Append uploaded file(s)
      for (let i = 0; i < data.images.length; i++) {
        formData.append(
          'images[]',
          data.images ? data.images[i] : customer.images[i],
        )
      }

      const res = await updateCustomer({ body: formData, id })
        if (res?.data?.status === 200) {
          toast.success(res?.data?.message)
          navigate('/dashboard/all-customers')
        }
    } catch (error) {
      console.error(error)
    }
  }

  //   console.log(imagePreviews)
  return (
    <div>
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
                  defaultValue={customer?.invoice_number}
                  {...register('invoice_number')}
                />
                {errors.invoice_number && (
                  <span className="text-red-500">
                    {errors.invoice_number?.message}
                  </span>
                )}
              </div>
            </div>
            <div className="flex gap-5">
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
                    defaultValue={customer?.price}
                    className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                    {...register('price')}
                  />
                  {errors.price && (
                    <span className="text-red-500">
                      {errors.price?.message}
                    </span>
                  )}
                </div>
              </div>
              <div className="mb-4 flex gap-4">
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
                    defaultValue={customer?.payment_price}
                    className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                    {...register('payment_price')}
                  />
                  {errors.payment_price && (
                    <span className="text-red-500">
                      {errors.payment_price?.message}
                    </span>
                  )}
                </div>
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
                defaultValue={customer?.product_details}
                className={`mt-1 p-3  border block w-full shadow-sm sm:text-sm  rounded-md  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText focus:outline-none' : 'text-gray-700 focus:outline-none focus:ring-indigo-500 focus:border-primaryColor hover:border-gray-400 border-gray-300'}`}
                {...register('product_details')}
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
                  className={`w-full text-sm border file:cursor-pointer cursor-pointer file:border-0 file:py-2 file:px-4 file:mr-4  rounded focus:outline-none  focus:border-primaryColor ${isDarkMode ? 'bg-darkColorCard file:bg-primaryColor border-primaryColor text-lightColor file:text-black ' : 'bg-lightColor hover:border-primaryColor/50 file:text-white file:bg-primaryColor file:hover:bg-primaryColor/90 border-primaryColor/30 text-black'}`}
                  onChange={handleFileChange}
                  {...register('images')}
                  multiple
                />
                <div className="mt-4 flex items-center  relative ">
                  {imagePreviews.map((preview, index) => (
                    <div key={index}>
                      <img
                        src={`${imagePath}/${preview?.name}`}
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
              {errors.images && (
                <span className="text-red-500">{errors.images?.message}</span>
              )}
            </div>
          </div>
        </div>

        <div className="lg:w-[50%] w-full bg-lightColor py-5 rounded">
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
                      defaultValue={customer?.name}
                      className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                      {...register('name')}
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
                      defaultValue={customer?.location}
                      className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                      {...register('location')}
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
                      defaultValue={customer?.number}
                      className={`form-control mt-1 p-3  border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
                      {...register('number')}
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
              Updating...
            </button>
          ) : (
            <button
              type="submit"
              className="bg-primaryColor py-3 mr-10 mt-10 ml-auto px-4 rounded text-white text-[14px] flex gap-2 items-center"
            >
              Update
            </button>
          )}
        </div>
      </form>
    </div>
  )
}

export default UpdateCustomerForm
