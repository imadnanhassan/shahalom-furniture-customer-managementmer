/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect, useRef, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { imagePath } from '../../../helper/imagePath'
import { useReactToPrint } from 'react-to-print'
import { numberWithCommas } from '../../../utils/thousandSeperator'

export default function SingleCustomerDetails({ isOpen, onClose, customer }) {
  const [createDate, setCreateDate] = useState(null)
  const [error, setError] = useState(null)
  const formatDate = () => {
    const date = new Date()
    const options = {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
      timeZone: 'Asia/Dhaka',
    }
    const formattedDate = date.toLocaleString('en-US', options)
    return formattedDate
  }
  const componentRef = useRef()
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  })

  useEffect(() => {
    if (customer && customer.created_at) {
      const dateString = customer.created_at
      const dateObj = new Date(dateString)

      if (!isNaN(dateObj.getTime())) {
        // Check if the date is valid
        const formattedDate = dateObj.toISOString().split('T')[0]
        setCreateDate(formattedDate)
      } else {
        setError('Invalid date format')
      }
    }
  }, [customer]) // Run this effect whenever 'customer' changes
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/5 z-50">
          <div className="relative bg-white rounded shadow max-h-[90vh] overflow-y-auto p-5">
            <div className="absolute right-0 top-0 z-10">
              <button
                onClick={onClose}
                className="focus:outline-none transition-all duration-300 p-2 rounded-full bg-[#f43f5e1a] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-lightColor"
              >
                <RxCross1 size={10} />
              </button>
            </div>
            <div
              ref={componentRef}
              className="w-[842px] h-auto mx-auto rounded border relative overflow-hidden"
            >
              <div className="bg-black h-[40px]"></div>
              <div className="bg-sky-500 absolute h-28 w-28 -top-14 -left-14 rotate-45"></div>
              <div className='px-5'>
                <div className="flex justify-between">
                  <h1 className="text-5xl font-extrabold my-5 uppercase px-2">
                    Invoice
                  </h1>
                  <img
                    src="/assets/images/logo/invoice-logo.png"
                    alt="invoice-logo"
                    className="absolute object-contain -top-10 right-20 h-[300px]"
                  />
                </div>
                <div className="flex justify-between px-2 pb-4">
                  <table>
                    <thead>
                      <tr>
                        <th className="text-left">
                          <p className="text-2xl">Bill To:</p>
                        </th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr>
                        <td>
                          <strong>Customer Name</strong>
                        </td>
                        <td>
                          <strong>: </strong> <span>{customer?.name}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Phone Number</strong>
                        </td>
                        <td>
                          <strong>: </strong> <span>{customer?.number}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Location</strong>
                        </td>
                        <td>
                          <strong>: </strong> <span>{customer?.location}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <thead className="invisible">
                      <tr>
                        <th className="text-left">
                          <p className="text-2xl">ff</p>
                        </th>
                        <th className="">fdf</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr className="invisible">
                        <td>ff</td>
                        <td>ff</td>
                      </tr>
                      <tr className="pt-10">
                        <td>
                          <strong>Invoice No.</strong>
                        </td>
                        <td>
                          <strong>:</strong>{' '}
                          <span>{customer?.invoice_number}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Invoice Date</strong>
                        </td>
                        <td>
                          <strong>: </strong> <span>{createDate}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div>
                  <h2 className="text-2xl font-semibold px-2">
                    Product Details:
                  </h2>
                </div>
                <div className="mt-3 overflow-x-auto border-b">
                  <table className="min-w-full text-sm">
                    <thead>
                      <tr className={`bg-black text-white border-b`}>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-left">
                          No.
                        </th>
                        <th className="px-4 py-2 font-semibold text-center">
                          Description of Products
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr className={`${'bg-gray-50'} border-b`}>
                        <td className="whitespace-nowrap px-4 py-2 text-wrap inline-block">
                          1
                        </td>
                        <td className="px-4 py-2 text-center">
                          <p className="text-wrap">
                            {customer?.product_details}
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table className="text-sm ml-auto">
                    <thead>
                      <tr className={`border-b`}>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-left"></th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-center"></th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-center"></th>
                        <th className="whitespace-nowrap px-4 py-2 font-semibold text-right">
                          Price
                        </th>
                      </tr>
                    </thead>

                    <tbody>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-1 text-wrap inline-block"></td>
                        <td className="whitespace-nowrap px-4 py-1 text-center"></td>
                        <td className="whitespace-nowrap px-4 py-1 text-center">
                          Total
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 text-right">
                          ৳{numberWithCommas(customer?.price)}
                        </td>
                      </tr>
                      <tr className={`border-b`}>
                        <td className="whitespace-nowrap px-4 py-1 text-wrap inline-block"></td>
                        <td className="whitespace-nowrap px-4 py-1 text-center"></td>
                        <td className="whitespace-nowrap px-4 py-1 text-center">
                          Payment Price
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 text-right">
                          ৳{numberWithCommas(customer?.payment_price)}
                        </td>
                      </tr>
                      <tr>
                        <td className="whitespace-nowrap px-4 py-1 text-wrap inline-block"></td>
                        <td className="whitespace-nowrap px-4 py-1 text-center"></td>
                        <td className="whitespace-nowrap px-4 py-1 text-center">
                          Due Price
                        </td>
                        <td className="whitespace-nowrap px-4 py-1 text-right">
                          ৳{numberWithCommas(customer?.due_price)}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 mb-3 flex flex-wrap items-center">
                  {customer?.images.map((preview, index) => (
                    <div key={index}>
                      <img
                        src={`${imagePath}/${preview?.name}`}
                        alt={`Preview ${index}`}
                        className="h-36 mr-1 mb-2 object-contian rounded "
                      />
                    </div>
                  ))}
                </div>
                <div className="bg-black">
                  <h2 className="text-white p-2 text-2xl font-semibold">
                    Company Informations:
                  </h2>{' '}
                </div>
                <div className="flex justify-between px-2 py-4">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h1 className="text-xl font-bold">PR. MD. SHOHEL</h1>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p>
                            Sonargoan Janapath Road, Sector # 13 <br />
                            Moilar mur, Uttara Model Town <br />
                            Dhaka-1230
                          </p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr className="pt-10 invisible">
                        <td>
                          <strong>IJFKN</strong>
                        </td>
                        <td>
                          <strong>:</strong>{' '}
                          <span>{customer?.invoice_number}</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Date</strong>
                        </td>
                        <td>
                          <strong>: </strong> <span>{formatDate()}</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <div className="flex justify-between px-2 py-4">
                  <table>
                    <tbody>
                      <tr>
                        <td>
                          <h5 className="text-xl font-semibold">Questions:</h5>
                        </td>
                        <td>
                          <h5 className="text-xl font-semibold"></h5>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Md. Shohel</strong>
                        </td>
                        <td>
                          <strong>:</strong>
                          <span>01720-310520</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>A. Rashid</strong>
                        </td>
                        <td>
                          <strong>:</strong>
                          <span>01784-731853</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <strong>Md. Kamal</strong>
                        </td>
                        <td>
                          <strong>:</strong>
                          <span>01990-078494</span>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <table>
                    <tbody>
                      <tr className="pt-10 invisible">
                        <td>
                          <strong>IJFKN</strong>
                        </td>
                      </tr>
                      <tr className="invisible">
                        <td>
                          <strong>IJFKN</strong>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <span>----------------------------</span>
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <p className="text-center">MD. SHOHEL</p>
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
              <div className="bg-black h-[40px]"></div>
              <div className="bg-sky-500 absolute h-28 w-28 -bottom-14 -right-14 rotate-45"></div>
            </div>
            <div className="flex justify-end pr-8">
              <button
                className="bg-gray-500 text-white px-5 py-2 rounded mt-2"
                onClick={handlePrint}
              >
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
