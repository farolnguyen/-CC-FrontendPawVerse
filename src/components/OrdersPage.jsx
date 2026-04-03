import React from 'react';
import './OrdersPage.css';

const orderStats = [
  { title: 'Tổng đơn hàng', value: '1,284', detail: '+12%', tone: 'pink', icon: '🐾' },
  { title: 'Đang soạn hàng', value: '42', detail: '24 đơn', tone: 'blue', icon: '🚚' },
  { title: 'Đã giao thành công', value: '1,150', detail: '98.5%', tone: 'green', icon: '✅' },
  { title: 'Doanh thu hôm nay', value: '45.2M', detail: 'Mới', tone: 'yellow', icon: '💳' },
];

const orderTabs = [
  'Tất cả đơn',
  'Chờ xác nhận',
  'Đang soạn',
  'Đã giao',
];

const orders = [
  {
    id: '#ORD19AF221',
    customer: 'Lê Quí L. Khánh',
    avatar: 'https://i.pravatar.cc/100?img=32',
    timeLabel: '14:22, Hôm nay',
    total: '1.250.000 đ',
    status: 'Đang soạn hàng',
    statusTone: 'blue',
  },
  {
    id: '#ORD22KX9012',
    customer: 'Nguyễn T. Thị Mai',
    avatar: 'https://i.pravatar.cc/100?img=47',
    timeLabel: '11:05, Hôm nay',
    total: '450.000 đ',
    status: 'Đã giao',
    statusTone: 'green',
  },
  {
    id: '#ORD05PB3542',
    customer: 'Trần Văn Tú',
    avatar: 'https://i.pravatar.cc/100?img=15',
    timeLabel: 'Hôm qua',
    total: '2.180.000 đ',
    status: 'Chờ xác nhận',
    statusTone: 'red',
  },
  {
    id: '#ORD84BG1109',
    customer: 'Phạm Mỹ Linh',
    avatar: 'https://i.pravatar.cc/100?img=5',
    timeLabel: '3 giờ trước',
    total: '890.000 đ',
    status: 'Đang soạn hàng',
    statusTone: 'blue',
  },
];

const OrdersPage = () => {
  return (
    <div className="orders-admin-page">
      <aside className="orders-admin-sidebar">
        <div>
          <div className="orders-brand-block">
            <h2>ADMIN GATE</h2>
            <p>Phòng quản lý</p>
          </div>

          <nav className="orders-admin-nav">
            <a className="orders-admin-nav-item" href="/dashboard">Dashboard</a>
            <a className="orders-admin-nav-item active" href="/orders">Đơn hàng</a>
            <a className="orders-admin-nav-item" href="/products">Thú cưng</a>
            <a className="orders-admin-nav-item" href="/accounts">Nhân viên</a>
            <a className="orders-admin-nav-item" href="/history">Báo cáo</a>
          </nav>
        </div>

        <div className="orders-admin-sidebar-footer">
          <button className="orders-create-btn">+ Thêm mới</button>
          <div className="orders-sidebar-links">
            <span>Hỗ trợ</span>
            <span>Đăng xuất</span>
          </div>
        </div>
      </aside>

      <main className="orders-admin-main">
        <header className="orders-admin-topbar">
          <div>
            <h1>Quản lý Đơn hàng</h1>
            <p>HT HN NG VBN HÀNH PAWVERSE</p>
          </div>
          <div className="orders-topbar-actions">
            <div className="orders-search-box">
              <span>⌕</span>
              <input type="text" placeholder="Tìm mã đơn hàng..." />
            </div>
            <button className="orders-icon-btn">◦</button>
            <button className="orders-icon-btn">⚙</button>
            <div className="orders-user-chip">
              <img src="https://i.pravatar.cc/60?img=12" alt="Admin" />
            </div>
          </div>
        </header>

        <section className="orders-stats-grid">
          {orderStats.map((stat) => (
            <article key={stat.title} className={`orders-stat-card ${stat.tone}`}>
              <div className="orders-stat-icon">{stat.icon}</div>
              <div className="orders-stat-detail">{stat.detail}</div>
              <h3>{stat.title}</h3>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="orders-panel">
          <div className="orders-panel-toolbar">
            <div className="orders-filter-tabs">
              {orderTabs.map((tab, index) => (
                <button key={tab} className={`orders-filter-tab ${index === 0 ? 'active' : ''}`}>
                  {tab}
                </button>
              ))}
            </div>
            <div className="orders-panel-icons">
              <button className="orders-round-btn">☰</button>
              <button className="orders-round-btn">🗓</button>
            </div>
          </div>

          <div className="orders-list">
            {orders.map((order) => (
              <article key={order.id} className="orders-list-item">
                <div className="orders-customer-col">
                  <img src={order.avatar} alt={order.customer} className="orders-customer-avatar" />
                  <div>
                    <h3>{order.customer}</h3>
                    <p>{order.id}</p>
                  </div>
                </div>

                <div className="orders-meta-col">
                  <span>Thời gian</span>
                  <strong>{order.timeLabel}</strong>
                </div>

                <div className="orders-price-col">
                  <span>Giá trị đơn</span>
                  <strong>{order.total}</strong>
                </div>

                <div className="orders-status-col">
                  <span className={`orders-status-badge ${order.statusTone}`}>{order.status}</span>
                </div>

                <div className="orders-actions-col">
                  <button className="orders-update-btn">Cập nhật</button>
                  <button className="orders-next-btn">›</button>
                </div>
              </article>
            ))}
          </div>

          <div className="orders-pagination">
            <button className="orders-page-btn">‹</button>
            <button className="orders-page-btn active">1</button>
            <button className="orders-page-btn">2</button>
            <button className="orders-page-btn">3</button>
            <button className="orders-page-btn">12</button>
            <button className="orders-page-btn">›</button>
          </div>
        </section>
      </main>
    </div>
  );
};

export default OrdersPage;
