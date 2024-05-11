import { useSelector } from 'react-redux'
// import { RiShoppingCartLine } from 'react-icons/ri'
// import { MdOutlineShoppingBag } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { AiFillDollarCircle } from 'react-icons/ai'
// import { GiStabbedNote } from 'react-icons/gi'
import ColumnChart from '../../../components/ColumnChart/ColumnChart'
// import TotalOrder from './TotalOrder'
// import TopCategory from './TopCategory'
// import TopBrands from './TopBrands'
import AreaCharts from '../../../components/ColumnChart/AreaCharts'
import { useGetFinancialQuery } from '../../../redux/features/financial/financialApi'
import { useState } from 'react'
import { numberWithCommas } from '../../../utils/thousandSeperator'

const Dashboard = () => {
  const [selectedValue, setSelectedValue] = useState(0)
  const isDarkMode = useSelector(state => state.theme.isDarkMode)
  const query = {}
  query['day'] = Number(selectedValue)
  const { data, isLoading } = useGetFinancialQuery(query)


  return (
    <section
      className={`main-container ${isDarkMode ? 'bg-darkColorBody' : 'bg-lightColorBody'}`}
    >
      <div className="mb-5">
        <div
          className={`py-3 px-10 flex item-center justify-between rounded ${isDarkMode ? 'bg-darkColorCard' : 'bg-lightColor'}`}
        >
          <h2
            className={`lg:text-lg sm:text-[14px] text-[14px] font-semibold mt-[6px]  ${isDarkMode ? 'text-darkColorText' : 'text-gray-700'}`}
          >
            Dashboard
          </h2>
          <div>
            <select
              onChange={e => setSelectedValue(e.target.value)}
              name="option"
              id="option"
              className={`form-control p-2 border block w-full shadow-sm sm:text-sm border-gray-300 rounded-md focus:outline-none focus:ring-indigo-500 focus:border-primaryColor  ${isDarkMode ? 'bg-darkColorCard border-darkColorBody text-darkColorText ' : 'bg-lightColor hover:border-gray-400'}`}
            >
              <option value={0}>Every Time</option>
              <option value={1}>Today</option>
              <option value={7}>One Week</option>
              <option value={30}>One Month</option>
              <option value={180}>6 Months</option>
              <option value={365}>This Year</option>
            </select>
          </div>
        </div>
      </div>
      {/* total info */}
      {isLoading ? (
        <div className="md:grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ">
          <div className="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-200">
            <div className="w-1/3 bg-gray-300 dark:bg-gray-200"></div>

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

              <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-500"></p>

              <div className="flex mt-4 item-center gap-x-2">
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
              </div>

              <div className="flex justify-between mt-6 item-center">
                <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

                <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-200">
            <div className="w-1/3 bg-gray-300 dark:bg-gray-200"></div>

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

              <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-500"></p>

              <div className="flex mt-4 item-center gap-x-2">
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
              </div>

              <div className="flex justify-between mt-6 item-center">
                <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

                <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-200">
            <div className="w-1/3 bg-gray-300 dark:bg-gray-200"></div>

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

              <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-500"></p>

              <div className="flex mt-4 item-center gap-x-2">
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
              </div>

              <div className="flex justify-between mt-6 item-center">
                <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

                <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
          <div className="flex w-full max-w-md mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-200">
            <div className="w-1/3 bg-gray-300 dark:bg-gray-200"></div>

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

              <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-500"></p>

              <div className="flex mt-4 item-center gap-x-2">
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
              </div>

              <div className="flex justify-between mt-6 item-center">
                <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

                <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
        </div>
      ) : (
        <div className="md:grid 2xl:grid-cols-4 xl:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-5 ">
          <div
            className={` rounded w-full py-5  ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
          >
            <div className="dashboardCard">
              <div className="bg-[#EFF6FE] px-4 py-3 rounded flex flex-col items-center justify-center">
                <FaUser className="text-[32px] bg-[#F43F5E] rounded text-white p-2" />
              </div>
              <div className="md:mt-2">
                <p className="lg:text-[14px] md:text-[12px] font-normal lg:mb-1 md:mb-[2px]">
                  Total Customers
                </p>
                <p
                  className={`text-[20px]  font-medium mb-1 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText'}`}
                >
                  {numberWithCommas(data?.financial_data?.total_customer)}
                </p>
                {/* <p className="text-[12px]">
                Increased by <strong className="text-error-100">-12.2%</strong>
              </p> */}
              </div>
            </div>
          </div>

          <div
            className={`rounded w-full py-5 lg:mt-0 md:mt-0 mt-2 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
          >
            <div className="dashboardCard">
              <div className="bg-[#FEEBEF] px-4 py-3 rounded flex flex-col items-center justify-center">
                <AiFillDollarCircle className="text-[32px] bg-[#4ba9e9] rounded text-white p-2" />
              </div>
              <div className="md:mt-2">
                <p className="lg:text-[14px] md:text-[12px] font-normal lg:mb-1 md:mb-[2px]">
                  Total Price
                </p>
                <p
                  className={`text-[20px] font-medium mb-1 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText'}`}
                >
                  {numberWithCommas(data.financial_data?.total_price)}
                </p>
                {/* <p className="text-[12px]">
                Increased by{' '}
                <strong className="text-success-300">+12.2%</strong>
              </p> */}
              </div>
            </div>
          </div>

          <div
            className={`rounded w-full py-5 lg:mt-0 md:mt-0 mt-2 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
          >
            <div className="dashboardCard">
              <div className="bg-[#FDF7E6] px-4 py-3 rounded flex flex-col items-center justify-center">
                <AiFillDollarCircle className="text-[32px] bg-[#35d69e] rounded text-white p-2" />
              </div>
              <div className="md:mt-2">
                <p className="lg:text-[14px] md:text-[12px] font-normal lg:mb-1 md:mb-[2px]">
                  Total Income
                </p>
                <p
                  className={`text-[20px] font-medium mb-1 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText'}`}
                >
                  {numberWithCommas(data?.financial_data?.income)}
                </p>
                {/* <p className="text-[12px]">
                Increased by{' '}
                <strong className="text-success-300">+12.2%</strong>
              </p> */}
              </div>
            </div>
          </div>

          <div
            className={`rounded w-full py-5 lg:mt-0 md:mt-0 mt-2 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
          >
            <div className="dashboardCard">
              <div className="bg-[#EDF1FA] px-4 py-3 rounded flex flex-col items-center justify-center">
                <AiFillDollarCircle className="text-[32px] bg-[#f7d74c] rounded text-white p-2" />
              </div>
              <div className="md:mt-2">
                <p className="lg:text-[14px] md:text-[12px] font-normal lg:mb-1 md:mb-[2px]">
                  Total Due Price
                </p>
                <p
                  className={`text-[20px] font-medium mb-1 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText'}`}
                >
                  {numberWithCommas(data?.financial_data?.due_price)}
                </p>
                {/* <p className="text-[12px]">
                Increased by{' '}
                <strong className="text-success-300">+12.2%</strong>
              </p> */}
              </div>
            </div>
          </div>

          {/* <div
          className={`rounded w-full py-5 lg:mt-0 md:mt-0 mt-2 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
        >
          <div className="dashboardCard">
            <div className="bg-[#E8F9EF] px-4 py-3 rounded flex flex-col items-center justify-center">
              <FaHeart className="text-[32px] bg-success-200 rounded text-white p-2" />
            </div>
            <div className="md:mt-2">
              <p className="lg:text-[14px] md:text-[12px] font-normal lg:mb-1 md:mb-[2px]">
                Total Products
              </p>
              <p
                className={`text-[20px] font-medium mb-1 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText'}`}
              >
                12,088
              </p>
              <p className="text-[12px]">
                Increased by{' '}
                <strong className="text-success-300">+12.2%</strong>
              </p>
            </div>
          </div>
        </div> */}

          {/* <div
          className={` rounded w-full py-5 lg:mt-0 md:mt-0 mt-2 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText border'}`}
        >
          <div className="dashboardCard">
            <div className="bg-[#E8F9EF] px-4 py-3 rounded flex flex-col items-center justify-center">
              <FaHeart className="text-[32px] bg-success-200 rounded text-white p-2" />
            </div>
            <div className="md:mt-2">
              <p className="lg:text-[14px] md:text-[12px] font-normal lg:mb-1 md:mb-[2px]">
                Total Products
              </p>
              <p
                className={`text-[20px] font-medium mb-1 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText'}`}
              >
                12,088
              </p>
              <p className="text-[12px]">
                Increased by{' '}
                <strong className="text-success-300">+12.2%</strong>
              </p>
            </div>
          </div>
        </div> */}
        </div>
      )}

      {/* Chart */}

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 py-5 overflow-hidden">
        {isLoading ? (
          <div className="flex w-full h-[400px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-200">
            <div className="w-1/3 bg-gray-300 dark:bg-gray-200"></div>

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

              <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-500"></p>

              <div className="flex mt-4 item-center gap-x-2">
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
              </div>

              <div className="flex justify-between mt-6 item-center">
                <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

                <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={`rounded w-full py-5 px-5 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
          >
            <ColumnChart monthlyDatas={data?.monthly_data} />
          </div>
        )}
        {isLoading ? (
          <div className="flex w-full h-[400px] mx-auto overflow-hidden bg-white rounded-lg shadow-lg animate-pulse dark:bg-gray-200">
            <div className="w-1/3 bg-gray-300 dark:bg-gray-200"></div>

            <div className="w-2/3 p-4 md:p-4">
              <h1 className="w-40 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

              <p className="w-48 h-2 mt-4 bg-gray-200 rounded-lg dark:bg-gray-500"></p>

              <div className="flex mt-4 item-center gap-x-2">
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
                <p className="w-5 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></p>
              </div>

              <div className="flex justify-between mt-6 item-center">
                <h1 className="w-10 h-2 bg-gray-200 rounded-lg dark:bg-gray-500"></h1>

                <div className="h-4 bg-gray-200 rounded-lg w-28 dark:bg-gray-500"></div>
              </div>
            </div>
          </div>
        ) : (
          <div
            className={` rounded w-full py-5 px-5 ${isDarkMode ? 'bg-darkColorCard text-darkColorText' : 'bg-lightColor text-lightColorText '}`}
          >
            <AreaCharts financialData={data?.monthly_data} />
          </div>
        )}
      </div>

      {/* order, top category and top brand */}

      <div className="grid lg:grid-cols-2 grid-cols-1 xl:grid-cols-3 mt-10 lg:gap-5 md:gap-3 mb-5">
        {/* <TotalOrder /> */}
        {/* <TopCategory /> */}
        {/* <TopBrands /> */}
      </div>
    </section>
  )
}
export default Dashboard
