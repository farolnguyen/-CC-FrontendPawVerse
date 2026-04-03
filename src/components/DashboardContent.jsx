import React from 'react'
import StatCard from './StatCard'
import RevenueChart from './RevenueChart'
import OrderChart from './OrderChart'
import AuthorityChart from './AuthorityChart'
import NewEntities from './NewEntities'
import PopularProducts from './PopularProducts'

const DashboardContent = () => {
  return (
    <div className="dashboard-content">
      <div className="dashboard-header">
        <h1>PAWVERSE DASHBOARD</h1>
        <p>Tổng quan hoạt động kinh doanh vận hành</p>
      </div>

      <div className="stats-grid">
        <StatCard 
          title="Tổng Doanh Thu" 
          value="1,250,000 đ" 
          icon="💵" 
          color="green"
        />
        <StatCard 
          title="Đơn Hàng" 
          value="23" 
          icon="🛒" 
          color="blue"
        />
        <StatCard 
          title="Sản Kết Nối" 
          value="11" 
          icon="👥" 
          color="purple"
        />
        <StatCard 
          title="Danh mục Boss" 
          value="49" 
          icon="📦" 
          color="orange"
        />
      </div>

      <div className="dashboard-grid">
        <div className="chart-section">
          <RevenueChart />
        </div>
        <div className="chart-section">
          <OrderChart />
        </div>
      </div>

      <div className="dashboard-grid">
        <div className="admin-stats-section">
          <h2>PAWVERSE ADMIN OS</h2>
          <div className="admin-stats-grid">
            <StatCard 
              title="Tổng Tài Khoản" 
              value="11" 
              icon="👤" 
              color="blue"
            />
            <StatCard 
              title="QUẢN TRỊ VIÊN" 
              value="2" 
              icon="👑" 
              color="purple"
            />
            <StatCard 
              title="Nhân viên vận hành" 
              value="1" 
              icon="👷" 
              color="green"
            />
            <StatCard 
              title="Danh sách đơn" 
              value="0" 
              icon="📋" 
              color="orange"
            />
          </div>
        </div>
        
        <div className="new-entities-section">
          <NewEntities />
        </div>
      </div>

      <div className="authority-section">
        <AuthorityChart />
      </div>

      <div className="popular-products-section">
        <PopularProducts />
      </div>
    </div>
  )
}

export default DashboardContent
