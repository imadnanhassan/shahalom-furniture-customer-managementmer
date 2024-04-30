import { tagTypes } from '../../tag-types'
import { baseApi } from '../api/basaApi/baseApi'

const CUSTOMER_URL = '/customer'

export const customerApi = baseApi.injectEndpoints({
  endpoints: build => ({
    //new customeer added
    addCustomer: build.mutation({
      query: data => ({
        url: `${CUSTOMER_URL}/add`,
        method: 'POST',
        body: data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    //get all customer
    getCustomers: build.query({
      query: () => ({
        url: `${CUSTOMER_URL}`,
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
})

export const { useAddCustomerMutation, useGetCustomersQuery } = customerApi
