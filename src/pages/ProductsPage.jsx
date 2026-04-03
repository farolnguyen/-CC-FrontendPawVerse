import { useMemo, useState } from 'react';
import './ProductsPage.css';

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Thức ăn hạt Royal Canin cho chó Adult', brand: 'Royal Canin', category: 1, price: 450000, originalPrice: 520000, rating: 4.8, sold: 1234, stock: 50, image: 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=400&h=400&fit=crop', description: 'Thức ăn cao cấp dành cho chó trưởng thành, giàu dinh dưỡng' },
  { id: 2, name: 'Cát vệ sinh mèo Biokat\'s Classic', brand: 'Biokats', category: 2, price: 185000, originalPrice: 220000, rating: 4.5, sold: 892, stock: 120, image: 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=400&h=400&fit=crop', description: 'Cát vệ sinh kháng khuẩn, khử mùi hiệu quả' },
  { id: 3, name: 'Vòng cổ dạ quang cho thú cưng', brand: 'PawVerse', category: 3, price: 89000, originalPrice: null, rating: 4.6, sold: 567, stock: 200, image: 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400&h=400&fit=crop', description: 'Vòng cổ dạ quang an toàn, dễ nhìn vào ban đêm' },
  { id: 4, name: 'Đồ chơi cần câu cho mèo Feather Wand', brand: 'Catit', category: 4, price: 125000, originalPrice: 155000, rating: 4.7, sold: 430, stock: 80, image: 'https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=400&h=400&fit=crop', description: 'Đồ chơi lông vũ kích thích bản năng săn mồi của mèo' },
  { id: 5, name: 'Pate Whiskas cho mèo vị cá ngừ', brand: 'Whiskas', category: 1, price: 25000, originalPrice: 30000, rating: 4.3, sold: 3210, stock: 500, image: 'https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=400&h=400&fit=crop', description: 'Thức ăn ướt bổ dưỡng cho mèo mọi lứa tuổi' },
  { id: 6, name: 'Lồng vận chuyển thú cưng cao cấp', brand: 'PawVerse', category: 5, price: 680000, originalPrice: 780000, rating: 4.9, sold: 215, stock: 30, image: 'https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=400&h=400&fit=crop', description: 'Lồng vận chuyển chắc chắn, thông thoáng và tiện lợi' },
  { id: 7, name: 'Shampoo cho chó Espree Natural', brand: 'Espree', category: 6, price: 220000, originalPrice: null, rating: 4.4, sold: 678, stock: 90, image: 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=400&h=400&fit=crop', description: 'Dầu gội thiên nhiên làm bóng mượt lông chó' },
  { id: 8, name: 'Bát ăn inox đôi cho thú cưng', brand: 'PawVerse', category: 3, price: 135000, originalPrice: 160000, rating: 4.6, sold: 892, stock: 0, image: 'https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=400&h=400&fit=crop', description: 'Bộ bát đôi inox không gỉ, dễ vệ sinh' },
  { id: 9, name: 'Hạt Hill\'s Science Diet cho mèo', brand: 'Hills', category: 1, price: 580000, originalPrice: 650000, rating: 4.8, sold: 445, stock: 60, image: 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=400&h=400&fit=crop', description: 'Thức ăn khoa học dành riêng cho mèo nhà' },
  { id: 10, name: 'Đệm nằm cho chó mèo siêu êm', brand: 'PawVerse', category: 5, price: 320000, originalPrice: null, rating: 4.7, sold: 321, stock: 45, image: 'https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400&h=400&fit=crop', description: 'Đệm lót siêu mềm mại, giữ ấm tốt cho thú cưng' },
  { id: 11, name: 'Dây dắt chó phản quang', brand: 'Ruffwear', category: 3, price: 175000, originalPrice: 210000, rating: 4.5, sold: 543, stock: 110, image: 'https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=400&h=400&fit=crop', description: 'Dây dắt chó phản quang an toàn, chịu lực cao' },
  { id: 12, name: 'Snack thưởng chó Pedigree Dentastix', brand: 'Pedigree', category: 1, price: 75000, originalPrice: 85000, rating: 4.4, sold: 1876, stock: 300, image: 'https://images.unsplash.com/photo-1583511666372-62fc211f8377?w=400&h=400&fit=crop', description: 'Snack giúp làm sạch răng và thơm miệng cho chó' },
];

const PRODUCT_TABS = ['Tất cả', 'Thức ăn', 'Đồ chơi', 'Phụ kiện', 'Vệ sinh'];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN').format(price) + ' đ';
}

function getCategoryName(categoryId) {
  const categoryMap = {
    1: 'Thức ăn',
    2: 'Vệ sinh',
    3: 'Phụ kiện',
    4: 'Đồ chơi',
    5: 'Nhà & ổ',
    6: 'Chăm sóc',
  };

  return categoryMap[categoryId] || 'Khác';
}

export default function ProductsPage() {
  const [activeTab, setActiveTab] = useState('Tất cả');
  const [searchTerm, setSearchTerm] = useState('');

  const filteredProducts = useMemo(() => {
    return SAMPLE_PRODUCTS.filter((product) => {
      const matchesTab = activeTab === 'Tất cả' || getCategoryName(product.category) === activeTab;
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTab && matchesSearch;
    }).slice(0, 4);
  }, [activeTab, searchTerm]);

  const productStats = [
    { title: 'Tổng sản phẩm', value: '1,284', detail: '+12%', tone: 'pink', icon: '📦' },
    { title: 'Sắp hết hàng', value: '18', detail: 'Sắp hết', tone: 'green', icon: '⚠' },
    { title: 'Sản phẩm mới', value: '45', detail: 'Tháng này', tone: 'blue', icon: '✹' },
    { title: 'Hiển thị hàng', value: '04', detail: 'Cảnh báo', tone: 'peach', icon: '⦸' },
  ];

  return (
    <div className="products-admin-page">
      <aside className="products-admin-sidebar">
        <div>
          <div className="products-brand-block">
            <h2>Admin Gate</h2>
            <p>Phòng quản lý</p>
          </div>

          <nav className="products-admin-nav">
            <a className="products-admin-nav-item" href="/dashboard">Dashboard</a>
            <a className="products-admin-nav-item" href="/orders">Đơn hàng</a>
            <a className="products-admin-nav-item active" href="/products">Thú cưng</a>
            <a className="products-admin-nav-item" href="/accounts">Nhân viên</a>
            <a className="products-admin-nav-item" href="/history">Báo cáo</a>
          </nav>
        </div>

        <div className="products-sidebar-footer">
          <button className="products-create-btn">+ Thêm mới</button>
          <div className="products-sidebar-links">
            <span>Hỗ trợ</span>
            <span>Đăng xuất</span>
          </div>
        </div>
      </aside>

      <main className="products-admin-main">
        <header className="products-admin-topbar">
          <div>
            <h1>QUẢN LÝ SẢN PHẨM</h1>
            <p>Phòng quản lý</p>
          </div>
          <div className="products-topbar-actions">
            <div className="products-search-box">
              <span>⌕</span>
              <input value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} type="text" placeholder="Tìm tên sản phẩm..." />
            </div>
            <button className="products-icon-btn">◦</button>
            <button className="products-icon-btn">⚙</button>
            <div className="products-user-chip">
              <img src="https://i.pravatar.cc/60?img=15" alt="Admin" />
            </div>
          </div>
        </header>

        <section className="products-stats-grid">
          {productStats.map((stat) => (
            <article key={stat.title} className={`products-stat-card ${stat.tone}`}>
              <div className="products-stat-icon">{stat.icon}</div>
              <div className="products-stat-detail">{stat.detail}</div>
              <h3>{stat.title}</h3>
              <strong>{stat.value}</strong>
            </article>
          ))}
        </section>

        <section className="products-panel">
          <div className="products-panel-toolbar">
            <div className="products-filter-tabs">
              {PRODUCT_TABS.map((tab) => (
                <button key={tab} className={`products-filter-tab ${activeTab === tab ? 'active' : ''}`} onClick={() => setActiveTab(tab)}>
                  {tab}
                </button>
              ))}
            </div>
            <button className="products-advanced-filter">Lọc nâng cao</button>
          </div>

          <div className="products-admin-grid">
            {filteredProducts.map((product) => (
              <article key={product.id} className="products-admin-card">
                <div className="products-admin-badge-row">
                  <span className={`products-stock-badge ${product.stock > 0 ? 'available' : 'soldout'}`}>
                    {product.stock > 0 ? 'Còn hàng' : 'Hết hàng'}
                  </span>
                </div>

                <div className="products-admin-image-wrap">
                  <img src={product.image} alt={product.name} loading="lazy" />
                </div>

                <div className="products-admin-card-body">
                  <h3>{product.name}</h3>
                  <p>Danh mục: {getCategoryName(product.category)}</p>
                  <strong>{formatPrice(product.price)}</strong>
                  <div className="products-card-footer">
                    <span>{product.stock} sản phẩm</span>
                    <button className="products-update-btn">Cập nhật</button>
                  </div>
                </div>

                <button className="products-more-btn">⋮</button>
              </article>
            ))}
          </div>

          <div className="products-panel-footer">
            <button className="products-view-more-btn">Xem thêm sản phẩm</button>
          </div>
        </section>

        <button className="products-floating-btn">+</button>
      </main>
    </div>
  );
}
