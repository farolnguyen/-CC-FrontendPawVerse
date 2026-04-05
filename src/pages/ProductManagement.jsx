import React, { useState } from 'react';
import './ProductManagement.css';

const ProductManagement = () => {
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const stats = [
    { title: 'Tổng sản phẩm', value: '1,284', icon: '📦', color: '#4CAF50' },
    { title: 'Đang bán', value: '18', icon: '🛒', color: '#2196F3' },
    { title: 'Hết hàng', value: '45', icon: '⚠️', color: '#FF9800' },
    { title: 'Đang ẩn', value: '04', icon: '👁️', color: '#9C27B0' }
  ];

  const tabs = [
    { id: 'all', label: 'Tất cả' },
    { id: 'food', label: 'Thức ăn' },
    { id: 'accessories', label: 'Phụ kiện' },
    { id: 'hygiene', label: 'Vệ sinh' }
  ];

  const products = [
    { id: 1, name: 'Royal Canin', price: '450,000', category: 'food', image: '🐕' },
    { id: 2, name: 'Hạt Pedigree', price: '320,000', category: 'food', image: '🐕' },
    { id: 3, name: 'Vòng cổ', price: '150,000', category: 'accessories', image: '🦴' },
    { id: 4, name: 'Dầu gội cho chó', price: '180,000', category: 'hygiene', image: '🧼' },
    { id: 5, name: 'Pate cho mèo', price: '280,000', category: 'food', image: '🐱' },
    { id: 6, name: 'Cát vệ sinh', price: '220,000', category: 'hygiene', image: '🐾' }
  ];

  const filteredProducts = products.filter(product => {
    const matchesTab = activeTab === 'all' || product.category === activeTab;
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  return (
    <div className="product-management">
      <div className="header">
        <h1>QUẢN LÝ SẢN PHẨM</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Tìm kiếm sản phẩm..."
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
        <div className="tabs">
          {tabs.map(tab => (
            <button
              key={tab.id}
              className={`tab-button ${activeTab === tab.id ? 'active' : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="products-grid">
          {filteredProducts.map(product => (
            <div key={product.id} className="product-card">
              <div className="product-image">
                <span className="product-emoji">{product.image}</span>
              </div>
              <div className="product-info">
                <h4>{product.name}</h4>
                <p className="price">{product.price} đ</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductManagement;
