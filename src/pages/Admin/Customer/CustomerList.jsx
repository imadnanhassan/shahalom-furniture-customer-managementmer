import { useState } from 'react'
import { RiDeleteBin7Line } from 'react-icons/ri'
import { FiEdit, FiEye } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa6'
import { useDispatch, useSelector } from 'react-redux'
import { GoHome } from 'react-icons/go'
import { GrPowerReset } from 'react-icons/gr'
import {
  toggleCheckbox,
  toggleSelectAll,
} from '../../../redux/features/checkBox/checkBoxSlice'

import { Link } from 'react-router-dom'
import Breadcrumbs from '../../../common/Breadcrumbs/Breadcrumbs'
import Button from '../../../common/Button/Button'
import Pagination from '../../../common/Pagination/Pagination'
import {
  useDeleteCustomerMutation,
  useGetCustomersQuery,
  useUpdateCustomerMutation,
} from '../../../redux/features/customer/customerApi'
import SingleCustomerDetails from './SingleCustomerDetails'
import { imagePath } from '../../../helper/imagePath'
import PreLoader from '../../../common/Loader/PreLoader'
import Swal from 'sweetalert2'
import ImagePreviews from './ImagePreviews'
import { toast } from 'react-toastify'
import Select from 'react-select'
import CardSkeleton from '../../../common/Loader/CardSkeleton'

export default function CustomerList() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [paidTrue, setPaidTrue] = useState(false)
  const [referenceValue, setReferenceValue] = useState('')
  const [customer, setCustomer] = useState({})
  const [images, setImages] = useState(null)
  const [searchValue, setSearchValue] = useState('')
  const [page, setPage] = useState(1)
  const [itemsPerPage, setItemsPerPage] = useState(10)
  const [modalOpen, setModalOpen] = useState(false)

  const { selectAll, checkboxes } = useSelector(state => state.checkBox)
  const isDarkMode = useSelector(state => state.theme.isDarkMode)
  const dispatch = useDispatch()
  const query = {}
  query['page'] = page

  query['search'] = searchValue
  query['reference_name'] = referenceValue

  query['perPage'] = itemsPerPage

  const { data: getData, isLoading, isFetching } = useGetCustomersQuery(query)
  const [updateCustomer] = useUpdateCustomerMutation()
  const [deleteCustomer] = useDeleteCustomerMutation()
  const handleHeaderCheckboxChange = () => {
    dispatch(toggleSelectAll(!selectAll))
  }

  const handleCheckboxChange = index => () => {
    dispatch(toggleCheckbox(index))
  }

  const pageTitle = 'Customer List'
  const productLinks = [
    { title: <GoHome />, link: '/dashboard' },
    { title: 'Customer list' },
  ]

  const handleDeleteCustomer = id => {
    Swal.fire({
      icon: 'warning',
      title: 'Do you want to Delete?',
      showCancelButton: true,
      confirmButtonText: 'Yes',
    }).then(result => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        deleteCustomer(id)
        Swal.fire('Deleted!', '', 'success')
      } else if (result.isDenied) {
        Swal.fire('Changes are not deleted')
      }
    })
  }

  const handlePaid = async updateData => {
    try {
      const remaingPrice = updateData?.price - updateData?.payment_price
      const dPrice = updateData?.payment_price + remaingPrice

      const remaingDPrice = updateData?.price - dPrice

      const sendData = {
        delivery_date: updateData.delivery_date,
        due_price: remaingDPrice,
        invoice_number: updateData?.invoice_number,
        location: updateData?.location,
        name: updateData?.name,
        number: updateData?.number,
        payment_price: updateData?.payment_price + remaingPrice,
        price: updateData?.price,
        product_details: updateData?.product_details,
        reference_name: updateData?.reference_name,
      }

      Swal.fire({
        icon: 'warning',
        title: 'Do you want to Paid?',
        showCancelButton: true,
        confirmButtonText: 'Yes',
      }).then(async result => {
        // async added here
        if (result.isConfirmed) {
          const res = await updateCustomer({
            id: updateData?.id,
            body: sendData,
          })
          if (res?.data?.status === 200) {
            toast.success('Payment is paid!')
          }
        } else if (result.isDenied) {
          Swal.fire('Changes are not deleted')
        }
      })

      if (!paidTrue) {
        return
      }
    } catch (error) {
      console.error(error)
    }
  }

  // open modal
  const openModal = () => {
    setModalOpen(true)
  }
  // close modal
  const closeModal = () => {
    setModalOpen(false)
    setImages(null)
  }

  if (isLoading) {
    return <PreLoader />
  }

  const uniqueReferName = Array.from(
    new Set(getData?.reference_names?.map(item => item?.reference_name)),
  )

  const referNames = uniqueReferName?.map(name => ({ reference_name: name }))

  return (
    <section
      className={`main-container ${isDarkMode ? 'bg-darkColorBody' : 'bg-lightColorBody'}`}
    >
      <Breadcrumbs title={pageTitle} breadcrumbs={productLinks} />

      <div
        className={`px-5 py-5 rounded  ${isDarkMode ? 'bg-darkColorCard' : 'bg-lightColor'}`}
      >
        {/* search customer and add customer */}
        <div className="flex items-center justify-between gap-6 py-3">
          <div className="flex items-center gap-5">
            <div className="search flex items-center gap-5">
              <div
                className={` rounded-md flex items-center justify-between border border-[#4800C9] ${isDarkMode ? 'text-darkColorText ' : 'bg-[#ffffff]'}`}
              >
                <input
                  type="search"
                  className={`py-2 pl-4 pr-2 bg-transparent w-full focus:outline-none ${isDarkMode ? 'placeholder:text-slate-400' : 'placeholder:text-textColor'}`}
                  placeholder="Search Customer"
                  onChange={e => {
                    setSearchValue(e.target.value)
                    setPage(1)
                  }}
                  value={searchValue}
                />
                <button className="btn mt-0 rounded-[0px] rounded-r-md px-3">
                  <i className="fa-solid fa-magnifying-glass" />
                </button>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="w-[200px]">
                <Select
                  id="color"
                  name="color"
                  required
                  aria-label="Select a sub category"
                  options={referNames}
                  getOptionLabel={x => x?.reference_name}
                  getOptionValue={x => x?.reference_name}
                  onChange={selectedOption => {
                    setReferenceValue(selectedOption?.reference_name)
                    setPage(1)
                  }}
                ></Select>
              </div>
              {referenceValue && (
                <button
                  onClick={() => setReferenceValue('')}
                  className="bg-red-600 py-2 px-2 pr-6 rounded text-white text-[14px] flex gap-2 items-center"
                >
                  <GrPowerReset />
                  <span>Reset</span>
                </button>
              )}
            </div>
          </div>
          <div className="flex items-center gap-[30px]">
            <Link to="/dashboard/add-customer">
              <Button
                text="Add Customer"
                className="bg-primaryColor py-3 px-4 rounded text-white text-[14px] flex gap-2 items-center"
                icon={FaPlus}
              />
            </Link>
          </div>
        </div>

        {/* customer table */}

        <div className="py-5">
          {isFetching ? (
            <CardSkeleton />
          ) : (
            <div className="px-3 lg:px-0">
              <table
                className={`min-w-full overflow-x-scroll border  ${isDarkMode ? 'border-darkColorBody' : 'border-gray-200 divide-y divide-gray-200'}`}
              >
                <thead
                  className={`${isDarkMode ? 'bg-[#131A26]' : 'bg-gray-100'}`}
                >
                  <tr>
                    <th className="p-2">
                      <input
                        type="checkbox"
                        className={`form-checkbox h-4 w-4 ${isDarkMode ? 'text-black' : 'text-indigo-600'}`}
                        checked={selectAll}
                        onChange={handleHeaderCheckboxChange}
                      />
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Name
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Ref. Name
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Number
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Location
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Invoice No.
                    </th>
                    <th
                      className={`whitespace-nowrap w-[100px] border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Product Details
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Products
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Delivery Date
                    </th>
                    <th
                      className={` border-l pl-2 py-3 text-left text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Paid
                    </th>
                    <th
                      className={`border-l pl-2 py-3 text-center text-xs font-medium uppercase tracking-wider ${isDarkMode ? 'text-lightColor' : 'text-gray-500'}`}
                    >
                      Action
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-200">
                  {getData?.customers?.map((item, index) => (
                    <tr key={item?.id}>
                      <td className="p-2">
                        <input
                          type="checkbox"
                          className="form-checkbox h-4 w-4 text-Vindigo-800 "
                          checked={checkboxes[index] || false}
                          onChange={handleCheckboxChange(index)}
                        />
                      </td>
                      <td className="border-l pl-2 py-4 whitespace-nowrap">
                        <h6
                          className={`text-wrap text-[13px] pb-1 font-medium ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                        >
                          {item?.name}
                        </h6>
                      </td>
                      <td className="border-l pl-2 py-4 whitespace-nowrap">
                        <h6
                          className={`text-wrap text-[13px] pb-1 font-medium ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                        >
                          {item?.reference_name ? item?.reference_name : 'N/A'}
                        </h6>
                      </td>
                      <td className="border-l pl-2 py-4 whitespace-nowrap">
                        <h6
                          className={`text-[13px] pb-1 font-medium ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                        >
                          {item?.number}
                        </h6>
                      </td>
                      <td className="border-l pl-2 py-4 whitespace-nowrap overflow-hidden">
                        <h6
                          className={`w-[100px] first-line text-wrap text-[13px] pb-1 font-medium ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                        >
                          {item?.location ? item?.location : 'N/A'}
                        </h6>
                      </td>
                      <td className="border-l pl-2 py-4 whitespace-nowrap">
                        <h6
                          className={`text-[13px] pb-1 font-medium ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                        >
                          {item?.invoice_number}
                        </h6>
                      </td>
                      <td className="border-l pl-2 py-4">
                        <h6
                          className={`w-[200px] text-wrap text-[13px] pb-1 font-medium ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                        >
                          {item?.product_details}
                        </h6>
                      </td>
                      <td
                        className={`border-l  py-2 whitespace-nowrap ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                      >
                        {item?.images?.length === 0 ? (
                          <div
                            className={`w-[50px] h-[50px] mx-auto ${isDarkMode ? 'bg-[#131A26]' : 'bg-[#f2f2f3]'}`}
                          >
                            <img
                              src={`/assets/images/No-image-found.jpg`}
                              alt="image"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        ) : (
                          <div
                            className={`w-[50px] h-[50px] cursor-pointer mx-auto ${isDarkMode ? 'bg-[#131A26]' : 'bg-[#f2f2f3]'}`}
                            onClick={() => setImages(item?.images)}
                          >
                            <img
                              src={`${imagePath}/${item?.images[0]?.name}`}
                              alt="image"
                              className="w-full h-full object-cover rounded"
                            />
                          </div>
                        )}
                      </td>
                      <td
                        className={`border-l pl-2 py-2 whitespace-nowrap ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                      >
                        <span
                          className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status ? 'bg-[#E8F9EF] text-[#22c55e]' : 'bg-gray-100 text-gray-400'}`}
                        >
                          {item?.delivery_date ? item?.delivery_date : 'N/A'}
                        </span>
                      </td>
                      <td
                        className={`border-l pl-2 py-2 whitespace-nowrap ${isDarkMode ? 'text-lightColor' : 'text-textColor'}`}
                      >
                        <label
                          htmlFor={item?.id}
                          className="inline-flex items-center space-x-4 cursor-pointer dark:text-gray-100"
                        >
                          <span className="relative">
                            <input
                              disabled={item?.due_price === 0}
                              id={item?.id}
                              type="checkbox"
                              className="hidden peer"
                              onChange={() => handlePaid(item)}
                              checked={item?.due_price === 0}
                            />
                            <div className="w-10 h-6 rounded-full shadow-inner dark:bg-gray-400 peer-checked:dark:bg-green-500"></div>
                            <div className="absolute inset-y-0 left-0 w-4 h-4 m-1 rounded-full shadow peer-checked:right-0 peer-checked:left-auto dark:bg-gray-700"></div>
                          </span>
                        </label>
                      </td>
                      <td className="border-l pl-2 py-4 whitespace-nowrap">
                        <div className="flex items-center justify-center space-x-2">
                          <button
                            onClick={() => {
                              setCustomer(item)
                              openModal(item?.id)
                            }}
                            className="focus:outline-none transition-all duration-100 p-2 rounded-full bg-[#eab3081a] hover:bg-[#eab308] text-[#eab308] hover:text-lightColor"
                          >
                            <FiEye className="text-[12px]" />
                          </button>

                          <SingleCustomerDetails
                            isOpen={modalOpen}
                            onClose={closeModal}
                            customer={customer}
                          />

                          <Link
                            to={`/dashboard/update-customer/${item?.id}`}
                            className="focus:outline-none transition-all duration-100 p-2 rounded-full bg-[#60a5fa1a] text-[#60a5fa] hover:bg-[#60a5fa] hover:text-lightColor"
                          >
                            <FiEdit className=" text-[12px] " />
                          </Link>
                          <button
                            onClick={() => handleDeleteCustomer(item?.id)}
                            className="focus:outline-none transition-all duration-300 p-2 rounded-full bg-[#f43f5e1a] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-lightColor"
                          >
                            <RiDeleteBin7Line className="text-[12px]" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {getData?.count <= 0 && (
          <div>
            <p className="text-center text-red-500 text-2xl py-10">
              There is no data
            </p>
          </div>
        )}

        {getData?.count > 0 && (
          <Pagination
            currentPage={page}
            totalDatas={getData?.count}
            itemsPerPage={itemsPerPage}
            setItemsPerPage={setItemsPerPage}
            setPage={setPage}
          />
        )}
      </div>

      {images && <ImagePreviews onClose={closeModal} images={images} />}
    </section>
  )
}
