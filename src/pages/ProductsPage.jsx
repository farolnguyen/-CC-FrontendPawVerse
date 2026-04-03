import { useState } from 'react';
import { Link } from 'react-router-dom';
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

const CATEGORIES = [
  { id: null, name: 'Tất cả sản phẩm' },
  { id: 1, name: 'Thức ăn' },
  { id: 2, name: 'Vệ sinh' },
  { id: 3, name: 'Phụ kiện' },
  { id: 4, name: 'Đồ chơi' },
  { id: 5, name: 'Nhà & Ổ' },
  { id: 6, name: 'Chăm sóc' },
];

const BRANDS = ['Tất cả', 'Royal Canin', 'Whiskas', 'Hills', 'PawVerse', 'Catit', 'Biokats', 'Espree', 'Pedigree', 'Ruffwear'];

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function StarRating({ rating, size = 12 }) {
  return (
    <div className="product-stars">
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`star${i <= Math.round(rating) ? ' filled' : ''}`} style={{ fontSize: size }}>★</span>
      ))}
    </div>
  );
}

export default function ProductsPage() {
  const [viewMode, setViewMode] = useState('grid');
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedBrand, setSelectedBrand] = useState('Tất cả');
  const [sortBy, setSortBy] = useState('newest');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [appliedMin, setAppliedMin] = useState('');
  const [appliedMax, setAppliedMax] = useState('');
  const [page, setPage] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const PAGE_SIZE = 8;

  let filtered = [...SAMPLE_PRODUCTS];

  if (selectedCategory !== null) {
    filtered = filtered.filter(p => p.category === selectedCategory);
  }

  if (selectedBrand !== 'Tất cả') {
    filtered = filtered.filter(p => p.brand === selectedBrand);
  }

  if (appliedMin) filtered = filtered.filter(p => p.price >= Number(appliedMin));
  if (appliedMax) filtered = filtered.filter(p => p.price <= Number(appliedMax));

  if (sortBy === 'newest') filtered.sort((a, b) => b.id - a.id);
  else if (sortBy === 'popular') filtered.sort((a, b) => b.sold - a.sold);
  else if (sortBy === 'price-asc') filtered.sort((a, b) => a.price - b.price);
  else if (sortBy === 'price-desc') filtered.sort((a, b) => b.price - a.price);

  const totalPages = Math.ceil(filtered.length / PAGE_SIZE);
  const paginated = filtered.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  const handleAddToCart = (e, productId) => {
    e.preventDefault();
    e.stopPropagation();
    setCartCount(c => c + 1);
    const btn = e.currentTarget;
    btn.textContent = 'Đã thêm!';
    setTimeout(() => { btn.textContent = '🛒 Mua ngay'; }, 1200);
  };

  const handleApplyFilter = () => {
    setAppliedMin(minPrice);
    setAppliedMax(maxPrice);
    setPage(1);
  };

  const handleCategoryChange = (id) => {
    setSelectedCategory(id);
    setPage(1);
  };

  const handleBrandChange = (brand) => {
    setSelectedBrand(brand);
    setPage(1);
  };

  return (
    <div className="products-page">
      {/* Navbar */}
      <nav className="products-navbar">
        <Link to="/" className="nav-logo">
          <div className="nav-logo-icon">🐾</div>
          <span className="nav-logo-text">Paw<span>Verse</span></span>
        </Link>
        <ul className="nav-links">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/products" className="active">Sản phẩm</Link></li>
          <li><Link to="#">Về chúng tôi</Link></li>
          <li><Link to="#">Liên hệ</Link></li>
        </ul>
        <div className="nav-actions">
          <button className="nav-cart-btn" title="Giỏ hàng">
            🛒
            {cartCount > 0 && <span className="nav-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      {/* Breadcrumb */}
      <div className="products-breadcrumb">
        <Link to="/">Trang chủ</Link>
        <span className="sep">/</span>
        <span className="current">Sản phẩm</span>
      </div>

      {/* Main Layout */}
      <div className="products-main">
        {/* Sidebar */}
        <aside className="products-sidebar">
          <div className="sidebar-header">
            <div className="sidebar-header-icon">⚙️</div>
            <h3>Bộ lọc</h3>
          </div>

          {/* Categories */}
          <div className="filter-section">
            <div className="filter-section-title">Danh mục</div>
            <ul className="filter-category-list">
              {CATEGORIES.map(cat => (
                <li
                  key={cat.id}
                  className={`filter-category-item${selectedCategory === cat.id ? ' active' : ''}`}
                  onClick={() => handleCategoryChange(cat.id)}
                >
                  <span>{cat.name}</span>
                  <span className="filter-category-count">
                    {cat.id === null
                      ? SAMPLE_PRODUCTS.length
                      : SAMPLE_PRODUCTS.filter(p => p.category === cat.id).length}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Brands */}
          <div className="filter-section">
            <div className="filter-section-title">Thương hiệu</div>
            <div className="filter-brand-chips">
              {BRANDS.map(brand => (
                <button
                  key={brand}
                  className={`brand-chip${selectedBrand === brand ? ' active' : ''}`}
                  onClick={() => handleBrandChange(brand)}
                >
                  {brand}
                </button>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="filter-section">
            <div className="filter-section-title">Khoảng giá</div>
            <div className="price-inputs">
              <div className="price-input-wrap">
                <span className="price-input-label">Từ</span>
                <input
                  type="number"
                  className="price-input"
                  value={minPrice}
                  onChange={e => setMinPrice(e.target.value)}
                  placeholder="0"
                />
              </div>
              <div className="price-input-wrap">
                <span className="price-input-label">Đến</span>
                <input
                  type="number"
                  className="price-input"
                  value={maxPrice}
                  onChange={e => setMaxPrice(e.target.value)}
                  placeholder="∞"
                />
              </div>
            </div>
            <button className="filter-apply-btn" onClick={handleApplyFilter}>
              Áp dụng bộ lọc
            </button>
          </div>

          {/* Rating */}
          <div className="filter-section">
            <div className="filter-section-title">Đánh giá</div>
            <div className="rating-list">
              {[5, 4, 3, 2, 1].map(s => (
                <button key={s} className="rating-item">
                  <div className="rating-stars">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className={`star${i <= s ? ' filled' : ''}`}>★</span>
                    ))}
                  </div>
                  <span>{s === 5 ? '' : 'trở lên'}</span>
                </button>
              ))}
            </div>
          </div>
        </aside>

        {/* Content */}
        <div className="products-content">
          {/* Sort Bar */}
          <div className="products-sort-bar">
            <div className="sort-tabs">
              <span className="sort-label">Sắp xếp:</span>
              <button
                className={`sort-tab${sortBy === 'newest' ? ' active' : ''}`}
                onClick={() => { setSortBy('newest'); setPage(1); }}
              >
                Mới nhất
              </button>
              <button
                className={`sort-tab${sortBy === 'popular' ? ' active' : ''}`}
                onClick={() => { setSortBy('popular'); setPage(1); }}
              >
                Phổ biến
              </button>
              <div className="sort-price-dropdown">
                <button className={`sort-price-btn${sortBy.startsWith('price') ? ' active' : ''}`}>
                  Giá {sortBy === 'price-asc' ? '▲' : sortBy === 'price-desc' ? '▼' : ''} ▾
                </button>
                <div className="sort-dropdown-menu">
                  <button className="sort-dropdown-item" onClick={() => { setSortBy('price-asc'); setPage(1); }}>
                    Giá: Thấp đến Cao
                  </button>
                  <button className="sort-dropdown-item" onClick={() => { setSortBy('price-desc'); setPage(1); }}>
                    Giá: Cao đến Thấp
                  </button>
                </div>
              </div>
            </div>
            <div className="view-mode-btns">
              <button
                className={`view-mode-btn${viewMode === 'grid' ? ' active' : ''}`}
                onClick={() => setViewMode('grid')}
                title="Dạng lưới"
              >
                ⊞
              </button>
              <button
                className={`view-mode-btn${viewMode === 'list' ? ' active' : ''}`}
                onClick={() => setViewMode('list')}
                title="Dạng danh sách"
              >
                ☰
              </button>
            </div>
          </div>

          <p className="products-count">
            Hiển thị <span>{filtered.length}</span> sản phẩm trong cửa hàng
          </p>

          {/* Product List */}
          {paginated.length === 0 ? (
            <div className="products-empty">
              <div className="products-empty-icon">🐾</div>
              <h3>Không tìm thấy sản phẩm</h3>
              <p>Thử thay đổi bộ lọc để tìm sản phẩm phù hợp</p>
            </div>
          ) : viewMode === 'grid' ? (
            <div className="products-grid">
              {paginated.map(product => (
                <ProductCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          ) : (
            <div className="products-list">
              {paginated.map(product => (
                <ProductListCard key={product.id} product={product} onAddToCart={handleAddToCart} />
              ))}
            </div>
          )}

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="products-pagination">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(p => (
                <button
                  key={p}
                  className={`pagination-btn${p === page ? ' active' : ''}`}
                  onClick={() => setPage(p)}
                >
                  {p}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product, onAddToCart }) {
  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  return (
    <div className="product-card">
      <div className="product-card-image-wrap">
        <img src={product.image} alt={product.name} loading="lazy" />

        {/* Overlay */}
        {product.stock > 0 && (
          <div className="product-card-overlay">
            <Link to={`/products/${product.id}`} className="overlay-btn overlay-btn-detail">
              Xem chi tiết
            </Link>
            <button className="overlay-btn overlay-btn-cart" onClick={e => onAddToCart(e, product.id)}>
              🛒 Mua ngay
            </button>
          </div>
        )}

        {/* Badges */}
        <div className="product-badge">
          {discount && <span className="badge-sale">SAVE {discount}%</span>}
          <span className="badge-brand">{product.brand}</span>
        </div>

        {product.stock === 0 && (
          <div className="badge-out">
            <span className="badge-out-text">Hết hàng</span>
          </div>
        )}
      </div>

      <div className="product-card-body">
        <Link to={`/products/${product.id}`} className="product-card-name">
          {product.name}
        </Link>
        <div className="product-card-meta">
          <StarRating rating={product.rating} size={12} />
          <span className="product-sold">Đã bán {product.sold}</span>
        </div>
        <div className="product-card-price">
          <span className="price-current">{formatPrice(product.price)}</span>
          {product.originalPrice && (
            <span className="price-original">{formatPrice(product.originalPrice)}</span>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductListCard({ product, onAddToCart }) {
  return (
    <div className="product-list-card">
      <div className="product-list-image">
        <img src={product.image} alt={product.name} loading="lazy" />
      </div>
      <div className="product-list-info">
        <div>
          <span className="product-list-brand">{product.brand}</span>
          <Link to={`/products/${product.id}`} className="product-list-name">{product.name}</Link>
          <p className="product-list-desc">{product.description}</p>
          <div className="product-list-meta">
            <StarRating rating={product.rating} size={14} />
            <span className="product-list-sold">Đã bán {product.sold}</span>
          </div>
        </div>
        <div className="product-list-actions">
          <div className="product-list-price">
            <div className="product-card-price">
              <span className="price-current">{formatPrice(product.price)}</span>
              {product.originalPrice && (
                <span className="price-original">{formatPrice(product.originalPrice)}</span>
              )}
            </div>
          </div>
          <Link to={`/products/${product.id}`} className="list-btn list-btn-detail">Chi tiết</Link>
          <button
            className="list-btn list-btn-cart"
            disabled={product.stock === 0}
            onClick={e => onAddToCart(e, product.id)}
          >
            🛒 {product.stock === 0 ? 'Hết hàng' : 'Mua ngay'}
          </button>
        </div>
      </div>
    </div>
  );
}
