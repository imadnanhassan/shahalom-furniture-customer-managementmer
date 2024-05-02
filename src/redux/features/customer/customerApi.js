import { tagTypes } from '../../tag-types'
import { baseApi } from '../api/basaApi/baseApi'
import { getFromLocalStorage } from '../../../utils/local-storage'
import { authkey } from '../../../constants/authkey'

const CUSTOMER_URL = '/customer'
const token = getFromLocalStorage(authkey)

export const customerApi = baseApi.injectEndpoints({
  endpoints: build => ({
    //new customeer added
    addCustomer: build.mutation({
      query: data => ({
        url: `${CUSTOMER_URL}/add`,
        method: 'POST',
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: data,
      }),
      invalidatesTags: [tagTypes.customer],
    }),

    //get customer
    getCustomer: build.query({
      query: id => ({
        url: `${CUSTOMER_URL}/edit/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
      }),
      providesTags: [tagTypes.customer],
    }),

    //get all customer
    getCustomers: build.query({
      query: data => ({
        url: `${CUSTOMER_URL}?page=${data?.page}&search=${data?.search}&perPage=${data?.perPage}`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }),
      providesTags: [tagTypes.customer],
    }),

    //update customer
    updateCustomer: build.mutation({
      query: data => {
        return {
          url: `${CUSTOMER_URL}/update/${data.id}`,
          method: 'POST',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: data.body,
        }
      },
      invalidatesTags: [tagTypes.customer],
    }),

    //delete customer
    deleteCustomer: build.mutation({
      query: id => ({
        url: `${CUSTOMER_URL}/delete/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        method: 'DELETE',
      }),
      invalidatesTags: [tagTypes.customer],
    }),
    //delete image
    deleteImage: build.mutation({
      query: id => ({
        url: `${CUSTOMER_URL}/delete-photo/${id}`,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
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
  useDeleteImageMutation
} = customerApi
