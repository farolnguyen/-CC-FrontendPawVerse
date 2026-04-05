import React from 'react'
import { Link, useLocation } from 'react-router-dom'

const Sidebar = () => {
  const location = useLocation()
  
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: '📊', path: '/dashboard' },
    { id: 'products', label: 'Sản phẩm', icon: '📦', path: '/products' },
    { id: 'orders', label: 'Đơn hàng', icon: '📋', path: '/orders' },
    { id: 'staff', label: 'Nhân viên', icon: '👥', path: '/staff' },
    { id: 'settings', label: 'Cài đặt', icon: '⚙️', path: '/settings' }
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
