import React, { useEffect, useState } from 'react'

export default function Pagination({
  totalDatas,
  setPage,
  currentPage,
  itemsPerPage,
  setItemsPerPage,
}) {
  const [visiblePages, setVisiblePages] = useState([]);
  const pagesToShow = 5;// Default to 10 items
  const totalPages = Math.ceil(totalDatas / itemsPerPage)
  const startItemIndex = (currentPage - 1) * itemsPerPage + 1
  const endItemIndex = Math.min(currentPage * itemsPerPage, totalDatas)
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  useEffect(() => {
    const calculateVisiblePages = () => {
      const startPage = Math.max(1, currentPage - Math.floor(pagesToShow / 2));
      const endPage = Math.min(totalPages, startPage + pagesToShow - 1);

      const newVisiblePages = Array.from(
        { length: endPage - startPage + 1 },
        (_, i) => startPage + i
      );
      setVisiblePages(newVisiblePages);
    };

    calculateVisiblePages();
  }, [currentPage, totalPages, pagesToShow]);

  const handleItemClick = items => {
    setItemsPerPage(items)
    setIsDropdownOpen(false)
  }

  const handlePageChange = (itemPerPage) => {
    setPage(itemPerPage)
  }

  return (
    <div className="flex flex-col lg:flex-row justify-between">
      <div className="flex flex-col lg:flex-row items-center space-x-2 text-xs">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="py-2 px-4 bg-white text-gray-600 font-medium rounded hover:bg-gray-100 active:bg-gray-200 disabled:opacity-50 inline-flex items-center"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              {itemsPerPage} items
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5 ml-2"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
          {isDropdownOpen && (
            <div className="origin-top-right absolute top-[-152px] mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
              <div
                className="py-1"
                role="menu"
                aria-orientation="vertical"
                aria-labelledby="options-menu"
              >
                {[5, 10, 15, 20].map(items => (
                  <button
                    key={items}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                    onClick={() => handleItemClick(items)}
                  >
                    {items} items
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <p className="text-gray-500 mt-4 lg:mt-0">
          Showing {startItemIndex} to {endItemIndex} of {totalDatas} entires
        </p>
      </div>
      <nav
        aria-label="Pagination"
        className="flex justify-center gap-1 items-center text-gray-600 mt-8 lg:mt-0"
      >
        {/* Previous page button */}
        <button
          className={`p-2 mr-4 rounded hover:bg-Vindigo-800 hover:text-lightColor ${
            currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''
          }`}
          onClick={e => {
            if (currentPage === 1) {
              e.preventDefault() // Prevent navigation if button is disabled
              return
            }
            handlePageChange(currentPage - 1)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
        </button>

        {/* Pagination buttons */}
        {visiblePages.map(
          pageNumber => (
            <button
              key={pageNumber}
              className={`px-4 py-2 rounded ${currentPage === pageNumber ? 'bg-primaryColor text-lightColor font-medium hover:bg-Vindigo-800' : 'hover:bg-Vindigo-800 hover:text-lightColor'}`}
              onClick={() => handlePageChange(pageNumber)}
            >
              {pageNumber}
            </button>
          ),
        )}

        {/* Next page button */}
        <button
          className={`p-2 ml-4 rounded hover:bg-Vindigo-800 hover:text-lightColor ${
            currentPage === totalPages ||
            currentPage * itemsPerPage >= totalDatas
              ? 'opacity-50 cursor-not-allowed'
              : ''
          }`}
          onClick={e => {
            if (
              currentPage === totalPages ||
              currentPage * itemsPerPage >= totalDatas
            ) {
              e.preventDefault() // Prevent navigation if button is disabled
              return
            }
            handlePageChange(currentPage + 1)
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M9 5l7 7-7 7"
            />
          </svg>
        </button>
      </nav>
    </div>
  )
}
