import React from 'react'
import Sidebar from '../components/Sidebar'
import DashboardContent from '../components/DashboardContent'

const DashboardPage = () => {
  return (
    <div className="dashboard-container">
      <Sidebar />
      <DashboardContent />
    </div>
  )
}

export default DashboardPage
