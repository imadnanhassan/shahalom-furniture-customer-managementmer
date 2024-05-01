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

    //get customer
    getCustomer: build.query({
      query: id => ({
        url: `${CUSTOMER_URL}/edit/${id}`,
      }),
      providesTags: [tagTypes.customer],
    }),

    //get all customer
    getCustomers: build.query({
      query: data => ({
        url: `${CUSTOMER_URL}?page=${data?.page}&search=${data?.search}&perPage=${data?.perPage}`,
      }),
      providesTags: [tagTypes.customer],
    }),

    //update customer
    updateCustomer: build.mutation({
      query: data => {
        console.log(data)
        return {
          url: `${CUSTOMER_URL}/update/${data.id}`,
          method: 'POST',
          body: data.body,
        }
      },
      invalidatesTags: [tagTypes.customer],
    }),

    //delete customer
    deleteCustomer: build.mutation({
      query: id => ({
        url: `${CUSTOMER_URL}/delete/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.customer],
    }),
  }),
})

export const {
  useAddCustomerMutation,
  useGetCustomersQuery,
  useDeleteCustomerMutation,
  useUpdateCustomerMutation,
  useGetCustomerQuery,
} = customerApi
