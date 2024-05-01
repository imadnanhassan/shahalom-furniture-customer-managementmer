import React, { useEffect, useState } from 'react'
import SideBar from './SideBar/SideBar'
import MainContent from './MainContent/MainContent'
import PreLoader from '../../common/Loader/PreLoader'

// export default function DashboardLayout() {
//   const [isSideBarOpen, setIsSideBarOpen] = useState(false)

//   // Function to toggle sidebar open/close
//   const toggleSidebar = () => {
//     setIsSideBarOpen(!isSideBarOpen)
//   }
//   return (
//     <div>
//       <div className="flex h-screen">
//         <SideBar isSideBarOpen={isSideBarOpen} />
//         <MainContent
//           isSideBarOpen={isSideBarOpen}
//           toggleSidebar={toggleSidebar}
//         />
//       </div>
//     </div>
//   )
// }

export default function DashboardLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setTimeout(() => {
      setLoading(false)
    }, 3000)
  }, [])

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <>
      {loading ? (
        <PreLoader />
      ) : (
        <div className="flex h-screen">
          <SideBar isSideBarOpen={isSideBarOpen} />
          <MainContent
            isSideBarOpen={isSideBarOpen}
            toggleSidebar={toggleSidebar}
          />
        </div>
      )}
    </>
  )
}
