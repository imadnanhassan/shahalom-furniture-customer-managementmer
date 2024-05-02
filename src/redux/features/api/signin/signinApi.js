import { authkey } from '../../../../constants/authkey'
import { getFromLocalStorage } from '../../../../utils/local-storage'
import { tagTypes } from '../../../tag-types'
import { baseApi } from '../basaApi/baseApi'

const token = getFromLocalStorage(authkey)

export const loginApi = baseApi.injectEndpoints({
  endpoints: builder => ({
    addLogin: builder.mutation({
      query: data => {
        return {
          url: '/customer/login',
          method: 'POST',
          body: data,
        }
      },
      invalidatesTags: [tagTypes.login],
    }),
    checkauth: builder.query({
      query: () => {
        return {
          url: '/checkAuth',
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      },
      providesTags: [tagTypes.login],
    }),
  }),
})

export const { useAddLoginMutation, useCheckauthQuery } = loginApi
