import React, { useState } from 'react';
import './OrderManagement.css';

const OrderManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState('all');

  const stats = [
    { title: 'Tổng đơn hàng', value: '1,284', icon: '📋', color: '#4CAF50' },
    { title: 'Chờ xác nhận', value: '18', icon: '⏳', color: '#FF9800' },
    { title: 'Đang giao', value: '45', icon: '🚚', color: '#2196F3' },
    { title: 'Hoàn thành', value: '1,221', icon: '✅', color: '#9C27B0' }
  ];

  const orders = [
    {
      id: '#DH001',
      customer: 'Nguyễn Văn A',
      phone: '0912345678',
      date: '01/04/2025',
      total: '450,000đ',
      status: 'pending',
      items: 3
    },
    {
      id: '#DH002',
      customer: 'Trần Thị B',
      phone: '0923456789',
      date: '01/04/2025',
      total: '320,000đ',
      status: 'confirmed',
      items: 2
    },
    {
      id: '#DH003',
      customer: 'Lê Văn C',
      phone: '0934567890',
      date: '02/04/2025',
      total: '180,000đ',
      status: 'delivering',
      items: 1
    },
    {
      id: '#DH004',
      customer: 'Phạm Thị D',
      phone: '0945678901',
      date: '02/04/2025',
      total: '750,000đ',
      status: 'completed',
      items: 5
    },
    {
      id: '#DH005',
      customer: 'Hoàng Văn E',
      phone: '0956789012',
      date: '03/04/2025',
      total: '220,000đ',
      status: 'pending',
      items: 2
    },
    {
      id: '#DH006',
      customer: 'Vũ Thị F',
      phone: '0967890123',
      date: '03/04/2025',
      total: '580,000đ',
      status: 'confirmed',
      items: 4
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return '#FF9800';
      case 'confirmed': return '#2196F3';
      case 'delivering': return '#9C27B0';
      case 'completed': return '#4CAF50';
      default: return '#666';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'pending': return 'Chờ xác nhận';
      case 'confirmed': return 'Đã xác nhận';
      case 'delivering': return 'Đang giao';
      case 'completed': return 'Hoàn thành';
      default: return 'Không xác định';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.customer.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.phone.includes(searchTerm);
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const ordersPerPage = 5;
  const totalPages = Math.ceil(filteredOrders.length / ordersPerPage);
  const startIndex = (currentPage - 1) * ordersPerPage;
  const paginatedOrders = filteredOrders.slice(startIndex, startIndex + ordersPerPage);

  return (
    <div className="order-management">
      <div className="header">
        <h1>QUẢN LÝ ĐƠN HÀNG</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm đơn hàng..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button className="search-btn">🔍</button>
        </div>
      </div>

      <div className="stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-card" style={{ borderColor: stat.color }}>
            <div className="stat-icon" style={{ backgroundColor: stat.color }}>
              {stat.icon}
            </div>
            <div className="stat-content">
              <h3>{stat.title}</h3>
              <p>{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="content-section">
        <div className="filters">
          <select 
            className="status-filter"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="all">Tất cả trạng thái</option>
            <option value="pending">Chờ xác nhận</option>
            <option value="confirmed">Đã xác nhận</option>
            <option value="delivering">Đang giao</option>
            <option value="completed">Hoàn thành</option>
          </select>
        </div>

        <div className="orders-table">
          <table>
            <thead>
              <tr>
                <th>Mã đơn hàng</th>
                <th>Khách hàng</th>
                <th>Số điện thoại</th>
                <th>Ngày đặt</th>
                <th>Số lượng</th>
                <th>Tổng tiền</th>
                <th>Trạng thái</th>
                <th>Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {paginatedOrders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td className="customer-name">{order.customer}</td>
                  <td className="phone">{order.phone}</td>
                  <td className="date">{order.date}</td>
                  <td className="items-count">{order.items}</td>
                  <td className="total">{order.total}</td>
                  <td className="status">
                    <span 
                      className="status-badge"
                      style={{ backgroundColor: getStatusColor(order.status) }}
                    >
                      {getStatusText(order.status)}
                    </span>
                  </td>
                  <td className="actions">
                    <button className="action-btn view-btn">👁️</button>
                    <button className="action-btn edit-btn">✏️</button>
                    <button className="action-btn delete-btn">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="pagination">
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
            disabled={currentPage === 1}
          >
            ←
          </button>
          
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index + 1}
              className={`pagination-btn ${currentPage === index + 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          
          <button 
            className="pagination-btn"
            onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
            disabled={currentPage === totalPages}
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderManagement;
