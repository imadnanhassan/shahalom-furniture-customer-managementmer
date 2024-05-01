import React from 'react'
import { RxCross1 } from 'react-icons/rx'

export default function SingleCustomerDetails({ isOpen, onClose, customer }) {
  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/5 ">
          <div className="relative overflow-hidden left-[10px] text-left bg-white rounded shadow w-full lg:w-6/12 p-6 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between">
              <h3
                className="text-[26px] font-bold text-[#0A0A0A] capitalize"
                id="modal-title"
              >
                Customer Information
              </h3>
              <button
                onClick={onClose}
                className="focus:outline-none transition-all duration-300 p-2 rounded-full bg-[#f43f5e1a] text-[#f43f5e] hover:bg-[#f43f5e] hover:text-lightColor"
              >
                <RxCross1 size={20} />
              </button>
            </div>

            <div id="invoicePrintArea">
              <div className="flex items-start justify-between mx-8 mt-6 gap-14">
                <table className="table-auto">
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
                      <td className="px-2 py-1 w-[150px]">
                        <strong>Producr Details </strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {customer?.product_details}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong>Invoice Number</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong>
                        {customer?.invoice_number}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong>Phone Number</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {customer?.number}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong>Location</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {customer?.location}
                      </td>
                    </tr>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong>Total Price</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {customer?.price}.00 ৳
                      </td>
                    </tr>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong>Payment Price</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {customer?.payment_price}.00 ৳
                      </td>
                    </tr>
                    <tr className="">
                      <td className="px-2 py-1">
                        <strong>Due Price</strong>
                      </td>
                      <td className="px-2 py-1">
                        <strong>: </strong> {customer?.due_price}.00 ৳
                      </td>
                    </tr>
                  </tbody>
                </table>

                {/* <table className="table-auto">
                  {selectedData && (
                    <tbody>
                      <tr>
                        <td className="px-2 py-1 w-[150px]">
                          <strong>Customer Name </strong>
                        </td>
                        <td className="px-2 py-1">
                          <strong>: </strong>
                          {selectedData.customerName}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-2 py-1">
                          <strong>Customer Phone</strong>
                        </td>
                        <td className="px-2 py-1">
                          <strong>: </strong> {selectedData.phone}
                        </td>
                      </tr>
                      <tr className="">
                        <td className="px-2 py-1">
                          <strong>Division</strong>
                        </td>
                        <td className="px-2 py-1">
                          <strong>: </strong> Division
                        </td>
                      </tr>
                      <tr>
                        <td className="px-2 py-1 w-[180px]">
                          <strong>District </strong>
                        </td>
                        <td className="px-2 py-1">
                          <strong>: </strong>
                          District
                        </td>
                      </tr>

                      <tr className="">
                        <td className="px-2 py-1">
                          <strong>City</strong>
                        </td>
                        <td className="px-2 py-1">
                          <strong>: </strong>
                          City
                        </td>
                      </tr>
                    </tbody>
                  )}
                </table> */}
              </div>
              <div className="mt-4 flex items-center  relative ">
                {customer?.images.map((preview, index) => (
                  <div key={index}>
                    <img
                      src={`http://127.0.0.1:8000/storage/customer/${preview?.name}`}
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

            {/* <div className="flex items-center justify-center px-3 my-1">
             
              Order Invoice
            </div> */}
          </div>
        </div>
      )}
    </>
  )
}
