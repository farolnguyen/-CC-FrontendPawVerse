import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Quản lí sản phẩm', icon: '📦' },
    { path: '/orders', label: 'Quản lí đơn hàng', icon: '🛒' },
    { path: '/services', label: 'Quản lí đặt dịch vụ', icon: '🔧' },
    { path: '/categories', label: 'Quản lí danh mục', icon: '📂' },
    { path: '/brands', label: 'Quản lí thương hiệu', icon: '🏷️' },
    { path: '/vouchers', label: 'Quản lí voucher', icon: '🎫' }
  ]

  const accountItems = [
    { path: '/accounts', label: 'Quản lý tài khoản', icon: '👥' },
    { path: '/history', label: 'Lịch sử hoạt động', icon: '📜' }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">PAWVERSE STAFF GATE</h2>
      </div>
      
      <div className="sidebar-section">
        <h3 className="section-title">Vận hành hệ thống</h3>
        <nav className="sidebar-nav">
          {menuItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-section">
        <h3 className="section-title">Quản lý tài khoản</h3>
        <nav className="sidebar-nav">
          {accountItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-item ${location.pathname === item.path ? 'active' : ''}`}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">👤</div>
          <span className="user-name">Nguyễn Văn Staff</span>
        </div>
        <div className="sidebar-actions">
          <button className="action-btn home-btn">🏠 HOME</button>
          <button className="action-btn exit-btn">🚪 EXIT</button>
        </div>
      </div>
    </div>
  )
}

export default Sidebar
