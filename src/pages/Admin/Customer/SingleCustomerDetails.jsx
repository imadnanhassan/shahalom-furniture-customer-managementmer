import React, { useEffect, useRef, useState } from 'react'
import { RxCross1 } from 'react-icons/rx'
import { imagePath } from '../../../helper/imagePath'
import { useReactToPrint } from 'react-to-print'

export default function SingleCustomerDetails({ isOpen, onClose, customer }) {
  const [createDate, setCreateDate] = useState(null)
  const [error, setError] = useState(null);
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
      const dateString = customer.created_at;
      const dateObj = new Date(dateString);

      if (!isNaN(dateObj.getTime())) { // Check if the date is valid
        const formattedDate = dateObj.toISOString().split('T')[0];
        setCreateDate(formattedDate);
      } else {
        setError('Invalid date format');
      }
    }
  }, [customer]); // Run this effect whenever 'customer' changes
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 ">
          <div className="relative overflow-hidden left-[10px] text-left bg-white rounded shadow w-full sm:w-8/12 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <div></div>
              <button
                onClick={onClose}
                className="focus:outline-none transition-all duration-300 p-2 rounded-full bg-[#f43f5e1a] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-lightColor"
              >
                <RxCross1 size={20} />
              </button>
            </div>
            <div
              ref={componentRef}
              className="w-[842px] h-auto mx-auto border rounded px-2 py-5"
            >
              <h5 className="text-center">Invoice</h5>
              <h1 className="text-2xl text-center mb-3 font-bold">
                Shah Alam Furniture
              </h1>
              <address className="text-center text-wrap">
                Sonargaon janapath road, sector # 13, moilar mor, Uttara model
                town, Dhaka-1230
              </address>
              <p className="text-center mt-2 font-semibold">
                (Md. Sohel) 01720-310520, (Abdur Rashid) 01784-731853,(Md.
                Kamal) 01990-078494
              </p>
              <div className="flex justify-between py-3">
                <p>
                  <span>Invoice No. </span>
                  <span>{customer?.invoice_number}</span>
                </p>
                <p>
                  <span>Date: </span>
                  <span>{createDate}</span>
                </p>
              </div>
              <table>
                <tbody>
                  <tr>
                    <td className="px-2 py-1 w-[150px]">
                      <strong>Custome Name </strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {customer?.name}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">
                      <strong>Phone Number</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {customer?.number}
                    </td>
                  </tr>
                  <tr>
                    <td className="px-2 py-1">
                      <strong>Location</strong>
                    </td>
                    <td className="px-2 py-1">
                      <strong>: </strong> {customer?.location}
                    </td>
                  </tr>
                </tbody>
              </table>
              <div className="mt-5 overflow-x-auto rounded bg-gray-200">
                <table className="min-w-full divide-y divide-gray-200 text-sm">
                  <thead>
                    <tr>
                      <th className="whitespace-nowrap px-4 py-2 font-semibold text-left">
                        #SL
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-semibold text-center">
                        Product Details
                      </th>
                      <th className="whitespace-nowrap px-4 py-2 font-semibold text-center"></th>
                      <th className="whitespace-nowrap px-4 py-2 font-semibold text-right">
                        Price
                      </th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-gray-200">
                    <tr className={`border-b`}>
                      <td className="whitespace-nowrap px-4 py-2 text-wrap inline-block">
                        #
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-center">
                        {customer?.product_details}
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-center">
                        Total
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right">
                        {customer?.price}
                      </td>
                    </tr>
                    <tr className={`${'bg-gray-200'} border-b`}>
                      <td className="whitespace-nowrap px-4 py-2 text-wrap inline-block">
                        #
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-center"></td>
                      <td className="whitespace-nowrap px-4 py-2 text-center">
                        Payment Price
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right">
                        {customer?.payment_price}
                      </td>
                    </tr>
                    <tr className={`${'bg-gray-200'} border-b`}>
                      <td className="whitespace-nowrap px-4 py-2 text-wrap inline-block">
                        #
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-center"></td>
                      <td className="whitespace-nowrap px-4 py-2 text-center">
                        Due Price
                      </td>
                      <td className="whitespace-nowrap px-4 py-2 text-right">
                        {customer?.due_price}
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <p className="mt-5">
                All information generated from{' '}
                <span className="text-blue-500 underline">
                  shahalamfurniture.com
                </span>{' '}
                at {formatDate()}
              </p>
              <div className="mt-4 grid grid-cols-6 gap-3 items-center  relative ">
                {customer?.images.map((preview, index) => (
                  <div key={index}>
                    <img
                      src={`${imagePath}/${preview?.name}`}
                      alt={`Preview ${index}`}
                      className="h-36 mr-2 mb-2 border rounded "
                    />
                  </div>
                ))}
              </div>
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
