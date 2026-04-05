import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { path: '/dashboard', label: 'Dashboard', icon: '📊' },
    { path: '/products', label: 'Sản phẩm', icon: '📦' },
    { path: '/orders', label: 'Đơn hàng', icon: '�' },
    { path: '/staff', label: 'Nhân viên', icon: '�' },
    { path: '/settings', label: 'Cài đặt', icon: '⚙️' }
  ]

  const accountItems = [
    { path: '/accounts', label: 'Quản lý tài khoản', icon: '👥' },
    { path: '/history', label: 'Lịch sử hoạt động', icon: '📜' }
  ]

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <div className="logo">
          <span className="logo-icon">🐾</span>
          <span className="logo-text">PawVerse</span>
        </div>
      </div>
      
      <nav className="sidebar-nav">
        <ul className="nav-list">
          {menuItems.map(item => (
            <li key={item.id} className="nav-item">
              <Link 
                to={item.path}
                className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              >
                <span className="nav-icon">{item.icon}</span>
                <span className="nav-label">{item.label}</span>
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <button className="add-new-btn">
          <span className="btn-icon">➕</span>
          <span className="btn-text">Thêm mới</span>
        </button>
      </div>
    </div>
  )
}

export default Sidebar
