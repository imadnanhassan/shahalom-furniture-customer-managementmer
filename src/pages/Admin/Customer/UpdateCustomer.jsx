import React from 'react'
import 'react-quill/dist/quill.snow.css'
import 'filepond/dist/filepond.min.css'

import { GoHome } from 'react-icons/go'
import { useSelector } from 'react-redux'
import { registerPlugin } from 'react-filepond'
import 'filepond/dist/filepond.min.css'
import Breadcrumbs from '../../../common/Breadcrumbs/Breadcrumbs'
import UpdateCustomerForm from '../../../components/Customer/UpdateCustomerForm'
import { useParams } from 'react-router-dom'
import { useGetCustomerQuery } from '../../../redux/features/customer/customerApi'

// Register FilePond plugins if needed
registerPlugin(/* plugins */)
export default function UpdateCustomer() {
  const isDarkMode = useSelector(state => state.theme.isDarkMode)
  const { id } = useParams()
  const { data, isLoading } = useGetCustomerQuery(id)

  // Breadcrumbs
  const pageTitle = 'Customer Update'
  const productLinks = [
    { title: <GoHome />, link: '/dashboard' },
    { title: 'Customer List', link: '/dashboard/all-customers' },
    { title: 'Customer Update' },
  ]

  if(isLoading){
    return null
  }

  return (
    <section
      className={`main-container ${isDarkMode ? 'bg-darkColorBody' : 'bg-lightColorBody'}`}
    >
      {/* Breadcrumbs */}
      <Breadcrumbs title={pageTitle} breadcrumbs={productLinks} />

      {/* Add Product field */}
      <UpdateCustomerForm customer={data?.customer} id={id} />
    </section>
  )
}
