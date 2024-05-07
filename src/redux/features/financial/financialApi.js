import { tagTypes } from '../../tag-types'
import { baseApi } from '../api/basaApi/baseApi'
import { getFromLocalStorage } from '../../../utils/local-storage'
import { authkey } from '../../../constants/authkey'

const FINANCIAL_URL = '/customer/financial-data'
const token = getFromLocalStorage(authkey)

export const financialApi = baseApi.injectEndpoints({
  endpoints: build => ({
    // get all financial calculation
    getFinancial: build.query({
      query: (data) => ({
        url: `${FINANCIAL_URL}?day=${data?.day}`,
        headers: {
          Accept: 'application/json',
          Authorization: 'Bearer ' + token,
        },
      }),
      providesTags: [tagTypes.financial],
    }),
  }),
})

export const { useGetFinancialQuery } = financialApi
