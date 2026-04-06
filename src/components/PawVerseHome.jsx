import React, { useState, useEffect } from 'react';
import '../styles/PawVerseHome.css';

const PawVerseHome = () => {
  const [cartCount, setCartCount] = useState(0);
  const [searchTerm, setSearchTerm] = useState('');
  const [favorites, setFavorites] = useState(new Set());
  const [notification, setNotification] = useState('');

  // Show notification
  const showNotification = (message) => {
    setNotification(message);
    setTimeout(() => setNotification(''), 3000);
  };

  // Toggle favorite
  const toggleFavorite = (productId) => {
    const newFavorites = new Set(favorites);
    if (newFavorites.has(productId)) {
      newFavorites.delete(productId);
      showNotification('Đã xóa khỏi yêu thích!');
    } else {
      newFavorites.add(productId);
      showNotification('Đã thêm vào yêu thích!');
    }
    setFavorites(newFavorites);
  };

  // Add to cart
  const addToCart = () => {
    setCartCount(prev => prev + 1);
    showNotification('Đã thêm vào giỏ hàng!');
  };

  // Handle search
  const handleSearch = () => {
    if (searchTerm.trim()) {
      showNotification('Tìm kiếm: ' + searchTerm);
    }
  };

  // Handle newsletter submit
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    if (email) {
      showNotification(`Cảm ơn bạn đã đăng ký! Voucher 10% đã được gửi đến: ${email}`);
      e.target.reset();
    }
  };

  return (
    <div className="pawverse-home">
      {/* Notification */}
      {notification && (
        <div className="notification">
          {notification}
        </div>
      )}

      {/* Header */}
      <header className="header">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <h1>PawVerse</h1>
            </div>
            
            <nav className="nav-menu">
              <ul>
                <li><a href="#" className="active">Home</a></li>
                <li><a href="#">Product</a></li>
                <li><a href="#">Service</a></li>
              </ul>
            </nav>
            
            <div className="header-actions">
              <div className="search-bar">
                <input 
                  type="text" 
                  placeholder="Tìm kiếm..." 
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                />
                <button className="search-btn" onClick={handleSearch}>🔍</button>
              </div>
              
              <div className="cart-icon" onClick={() => showNotification(`Giỏ hàng của bạn có ${cartCount} sản phẩm`)}>
                <span>🛒</span>
                <span className="cart-count">{cartCount}</span>
              </div>
              
              <div className="user-icon" onClick={() => showNotification('Đăng nhập / Đăng ký')}>
                <span>👤</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Banner */}
      <section 
        className="banner" 
        style={{
          backgroundImage: 'url("/Images/bgcute.png")',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat'
        }}
      >
        <div className="container">
          <div className="banner-content">
            <div className="banner-text">
              <h2>PawVerse</h2>
              <h3>A pet store with everything you need</h3>
              <p>Chúng tôi cung cấp mọi thứ cho thú cưng của bạn - từ thực phẩm, đồ chơi đến phụ kiện thời trang</p>
              <button className="cta-button">MUA NGAY</button>
            </div>
            <div className="banner-images">
              <div className="banner-image-middle">
                <img src="/Images/banner-cat-middle.png" alt="Cat in middle" />
              </div>
              <div className="banner-image-right">
                <img src="/Images/banner-right.png" alt="Right side image" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Danh mục sản phẩm */}
      <section className="categories">
        <div className="container">
          <h2 className="section-title">DANH MỤC SẢN PHẨM</h2>
          <div className="category-grid">
            <div className="category-card" onClick={() => showNotification('Xem danh mục: Phụ kiện & Đồ chơi')}>
              <div className="category-icon">
                <img src="/Images/categories/DoChoi.png" alt="Phụ kiện & Đồ chơi" />
              </div>
              <h3>Phụ kiện & Đồ chơi</h3>
              <p>245 sản phẩm</p>
            </div>
            <div className="category-card" onClick={() => showNotification('Xem danh mục: Thực phẩm')}>
              <div className="category-icon">
                <img src="/Images/categories/ThucAnHat.png" alt="Thực phẩm" />
              </div>
              <h3>Thực phẩm</h3>
              <p>189 sản phẩm</p>
            </div>
            <div className="category-card" onClick={() => showNotification('Xem danh mục: Trang phục')}>
              <div className="category-icon">
                <img src="/Images/categories/catetrangphuc.png" alt="Trang phục" />
              </div>
              <h3>Trang phục</h3>
              <p>156 sản phẩm</p>
            </div>
            <div className="category-card" onClick={() => showNotification('Xem danh mục: Dụng cụ')}>
              <div className="category-icon">
                <img src="/Images/categories/DungCu.png" alt="Dụng cụ" />
              </div>
              <h3>Dụng cụ</h3>
              <p>98 sản phẩm</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sản phẩm nổi bật */}
      <section className="featured-products">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SẢN PHẨM NỔI BẬT</h2>
            <div className="carousel-controls">
              <button className="carousel-btn prev" onClick={() => showNotification('Xem sản phẩm trước đó')}>‹</button>
              <button className="carousel-btn next" onClick={() => showNotification('Xem thêm sản phẩm')}>›</button>
            </div>
          </div>
          <div className="product-grid">
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/dochoi/chuong_huan_luyen.png" alt="Đồ chơi cho chó con" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('product1');
                  }}
                >
                  {favorites.has('product1') ? '❤️' : '🤍'}
                </button>
              </div>
              <h4>Chuông huấn luyện</h4>
              <p className="price">₫250,000</p>
            </div>
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/phukien/Vongco_Heart.png" alt="Quần áo mùa đông" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('product2');
                  }}
                >
                  {favorites.has('product2') ? '❤️' : '🤍'}
                </button>
              </div>
              <h4>Vòng cổ tim</h4>
              <p className="price">₫180,000</p>
            </div>
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/pate/pate_rc.png" alt="Pate cho mèo" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('product3');
                  }}
                >
                  {favorites.has('product3') ? '❤️' : '🤍'}
                </button>
              </div>
              <h4>Pate Royal Canin</h4>
              <p className="price">₫95,000</p>
            </div>
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/dungcu/batancham.png" alt="Lồng chó cao cấp" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('product4');
                  }}
                >
                  {favorites.has('product4') ? '❤️' : '🤍'}
                </button>
              </div>
              <h4>Bát ăn chậm</h4>
              <p className="price">₫1,200,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sản phẩm bán chạy */}
      <section className="best-selling">
        <div className="container">
          <div className="section-header">
            <h2 className="section-title">SẢN PHẨM BÁN CHẠY NHẤT</h2>
            <div className="carousel-controls">
              <button className="carousel-btn prev" onClick={() => showNotification('Xem sản phẩm trước đó')}>‹</button>
              <button className="carousel-btn next" onClick={() => showNotification('Xem thêm sản phẩm')}>›</button>
            </div>
          </div>
          <div className="product-grid">
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/best/pate.png" alt="Best Seller 1" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('best1');
                  }}
                >
                  {favorites.has('best1') ? '❤️' : '🤍'}
                </button>
                <span className="best-seller-badge">Bán chạy</span>
              </div>
              <h4>Pate cho chó</h4>
              <p className="price">₫45,000</p>
            </div>
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/best/catvesinh.png" alt="Best Seller 2" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('best2');
                  }}
                >
                  {favorites.has('best2') ? '❤️' : '🤍'}
                </button>
                <span className="best-seller-badge">Bán chạy</span>
              </div>
              <h4>Cát vệ sinh</h4>
              <p className="price">₫120,000</p>
            </div>
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/best/vongco.png" alt="Best Seller 3" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('best3');
                  }}
                >
                  {favorites.has('best3') ? '❤️' : '🤍'}
                </button>
                <span className="best-seller-badge">Bán chạy</span>
              </div>
              <h4>Dây dắt đi dạo</h4>
              <p className="price">₫85,000</p>
            </div>
            <div className="product-card" onClick={addToCart}>
              <div className="product-image">
                <img src="/Images/product/best/batandoi.png" alt="Best Seller 4" />
                <button 
                  className="favorite-btn" 
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleFavorite('best4');
                  }}
                >
                  {favorites.has('best4') ? '❤️' : '🤍'}
                </button>
                <span className="best-seller-badge">Bán chạy</span>
              </div>
              <h4>Bát ăn đôi</h4>
              <p className="price">₫350,000</p>
            </div>
          </div>
        </div>
      </section>

      {/* Service */}
      <section className="services">
        <div className="container">
          <h2 className="section-title">DỊCH VỤ CỦA CHÚNG TÔI</h2>
          <div className="service-grid">
            <div className="service-card">
              <h3>Hotel Service</h3>
              <div className="price">₫200,000<span>/đêm</span></div>
              <ul>
                <li>Phòng ốc tiện nghi</li>
                <li>Cho ăn 3 bữa/ngày</li>
                <li>Chơi đùa và dạo đi</li>
                <li>Theo dõi sức khỏe</li>
              </ul>
              <button className="service-btn" onClick={() => showNotification('Đã đặt lịch dịch vụ: Hotel Service')}>
                Đặt lịch
              </button>
            </div>
            <div className="service-card">
              <h3>Grooming Service</h3>
              <div className="price">₫150,000<span>/lần</span></div>
              <ul>
                <li>Tắm sấy</li>
                <li>Cắt tỉa lông</li>
                <li>Vệ sinh tai</li>
                <li>Cắt móng</li>
              </ul>
              <button className="service-btn" onClick={() => showNotification('Đã đặt lịch dịch vụ: Grooming Service')}>
                Đặt lịch
              </button>
            </div>
            <div className="service-card">
              <h3>Training Service</h3>
              <div className="price">₫300,000<span>/buổi</span></div>
              <ul>
                <li>Huấn luyện cơ bản</li>
                <li>Sửa hành vi</li>
                <li>Tương tác xã hội</li>
                <li>Bảo hành kết quả</li>
              </ul>
              <button className="service-btn" onClick={() => showNotification('Đã đặt lịch dịch vụ: Training Service')}>
                Đặt lịch
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Đánh giá */}
      <section className="testimonials">
        <div className="container">
          <h2 className="section-title">NHỮNG NGƯỜI YÊU THÚ CƯNG NÓI GÌ VỀ SÓP</h2>
          <div className="testimonial-grid">
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Rất hài lòng với dịch vụ! Chú chó của tôi rất thích ở đây. Nhân viên nhiệt tình và chuyên nghiệp."</p>
              <div className="customer">
                <img src="/Images/customer/ImgJackNho.png" alt="Customer" />
                <div>
                  <h4>Anh Việt</h4>
                  <p>Khách hàng thân thiết</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Sản phẩm chất lượng, giá cả hợp lý. Mèo nhà tôi rất thích đồ chơi ở đây. Sẽ tiếp tục ủng hộ!"</p>
              <div className="customer">
                <img src="/Images/customer/ImgJackTo.png" alt="Customer" />
                <div>
                  <h4>Chị Mai</h4>
                  <p>Khách hàng mới</p>
                </div>
              </div>
            </div>
            <div className="testimonial-card">
              <div className="stars">⭐⭐⭐⭐⭐</div>
              <p>"Dịch vụ grooming tuyệt vời! Cún nhà tôi trở nên xinh xắn hơn rất nhiều. Cảm ơn PawVerse!"</p>
              <div className="customer">
                <img src="/Images/customer/ImgVong.png" alt="Customer" />
                <div>
                  <h4>Anh Hùng</h4>
                  <p>Khách hàng thường xuyên</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="newsletter">
        <div className="container">
          <div className="newsletter-content">
            <div className="newsletter-image">
              <img src="/Images/bigdog.png" alt="Happy Pet" />
            </div>
            <div className="newsletter-form">
              <h2>ĐĂNG KÝ NHẬN TIN TỨC NGAY</h2>
              <p>Nhận ngay voucher 10% cho lần mua hàng đầu tiên!</p>
              <form onSubmit={handleNewsletterSubmit}>
                <input type="email" name="email" placeholder="Email của bạn" required />
                <button type="submit" className="newsletter-btn">Đăng ký</button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="container">
          <div className="footer-content">
            <div className="footer-section">
              <div className="logo">
                <h2>PawVerse</h2>
              </div>
              <div className="social-links">
                <a href="#" onClick={(e) => {e.preventDefault(); showNotification('Facebook');}}>📘 Facebook</a>
                <a href="#" onClick={(e) => {e.preventDefault(); showNotification('Instagram');}}>📷 Instagram</a>
                <a href="#" onClick={(e) => {e.preventDefault(); showNotification('Twitter');}}>🐦 Twitter</a>
                <a href="#" onClick={(e) => {e.preventDefault(); showNotification('YouTube');}}>📺 YouTube</a>
              </div>
            </div>
            
            <div className="footer-section">
              <h3>Về PawVerse</h3>
              <p>PawVerse là cửa hàng thú cưng uy tín với hơn 10 năm kinh nghiệm. Chúng tôi cam kết mang đến những sản phẩm và dịch vụ tốt nhất cho các boss của bạn.</p>
            </div>
            
            <div className="footer-section">
              <h3>Liên hệ</h3>
              <p>📍 123 Nguyễn Huệ, Q.1, TP.HCM</p>
              <p>📞 090 123 4567</p>
              <p>✉️ info@pawverse.vn</p>
              <p>🕐 Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
            </div>
          </div>
          
          <div className="footer-bottom">
            <p>&copy; 2024 PawVerse. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PawVerseHome;
