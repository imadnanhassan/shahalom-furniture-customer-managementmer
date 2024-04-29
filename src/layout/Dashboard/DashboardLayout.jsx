import React, { useState } from 'react'
import SideBar from './SideBar/SideBar'
import MainContent from './MainContent/MainContent'

export default function DashboardLayout() {
  const [isSideBarOpen, setIsSideBarOpen] = useState(false)

  // Function to toggle sidebar open/close
  const toggleSidebar = () => {
    setIsSideBarOpen(!isSideBarOpen)
  }
  return (
    <div>
      <div className="flex h-screen">
        <SideBar isSideBarOpen={isSideBarOpen} />
        <MainContent
          isSideBarOpen={isSideBarOpen}
          toggleSidebar={toggleSidebar}
        />
      </div>
    </div>
  )
}
