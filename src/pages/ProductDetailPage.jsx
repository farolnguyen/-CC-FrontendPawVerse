import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import './ProductDetailPage.css';

const SAMPLE_PRODUCTS = [
  { id: 1, name: 'Thức ăn hạt Royal Canin cho chó Adult', brand: 'Royal Canin', category: 1, categoryName: 'Thức ăn', price: 450000, originalPrice: 520000, rating: 4.8, sold: 1234, stock: 50, images: ['https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop'], description: 'Thức ăn hạt cao cấp Royal Canin dành riêng cho chó trưởng thành từ 1 tuổi trở lên. Được nghiên cứu bởi đội ngũ bác sĩ thú y và chuyên gia dinh dưỡng hàng đầu, sản phẩm cung cấp đầy đủ dưỡng chất thiết yếu giúp chó khỏe mạnh, năng động và có bộ lông bóng mượt. Thành phần tự nhiên, không chất bảo quản có hại.' },
  { id: 2, name: 'Cát vệ sinh mèo Biokat\'s Classic', brand: 'Biokats', category: 2, categoryName: 'Vệ sinh', price: 185000, originalPrice: 220000, rating: 4.5, sold: 892, stock: 120, images: ['https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=600&fit=crop'], description: 'Cát vệ sinh Biokat\'s Classic với công thức kháng khuẩn tiên tiến, khử mùi hiệu quả lên đến 7 ngày. Hạt cát mịn, ít bụi bẩn, thân thiện với bàn chân mèo và không gây hại cho sức khỏe. Lý tưởng cho mọi loại khay vệ sinh.' },
  { id: 3, name: 'Vòng cổ dạ quang cho thú cưng', brand: 'PawVerse', category: 3, categoryName: 'Phụ kiện', price: 89000, originalPrice: null, rating: 4.6, sold: 567, stock: 200, images: ['https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&h=600&fit=crop', 'https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=600&fit=crop'], description: 'Vòng cổ dạ quang PawVerse thiết kế thông minh, phát sáng trong bóng tối giúp bạn dễ dàng nhìn thấy thú cưng vào ban đêm. Chất liệu cao su mềm mại, không gây kích ứng da, có thể điều chỉnh kích thước phù hợp với nhiều giống chó mèo.' },
  { id: 4, name: 'Đồ chơi cần câu cho mèo Feather Wand', brand: 'Catit', category: 4, categoryName: 'Đồ chơi', price: 125000, originalPrice: 155000, rating: 4.7, sold: 430, stock: 80, images: ['https://images.unsplash.com/photo-1573865526739-10659fec78a5?w=600&h=600&fit=crop'], description: 'Đồ chơi cần câu lông vũ Catit kích thích bản năng săn mồi tự nhiên của mèo. Lông vũ đầy màu sắc, di chuyển linh hoạt tạo cảm giác như con mồi thật. Cán câu dài giúp chủ nuôi dễ dàng chơi cùng mèo mà không cần ngồi sàn.' },
  { id: 5, name: 'Pate Whiskas cho mèo vị cá ngừ', brand: 'Whiskas', category: 1, categoryName: 'Thức ăn', price: 25000, originalPrice: 30000, rating: 4.3, sold: 3210, stock: 500, images: ['https://images.unsplash.com/photo-1548802673-380ab8ebc7b7?w=600&h=600&fit=crop'], description: 'Pate Whiskas vị cá ngừ đậm đà, giàu protein và omega-3 tốt cho mèo. Kết cấu mịn mượt dễ tiêu hóa, phù hợp cho mèo mọi lứa tuổi. Bổ sung taurine thiết yếu giúp duy trì thị lực và sức khỏe tim mạch.' },
  { id: 6, name: 'Lồng vận chuyển thú cưng cao cấp', brand: 'PawVerse', category: 5, categoryName: 'Nhà & Ổ', price: 680000, originalPrice: 780000, rating: 4.9, sold: 215, stock: 30, images: ['https://images.unsplash.com/photo-1425082661705-1834bfd09dca?w=600&h=600&fit=crop'], description: 'Lồng vận chuyển PawVerse cao cấp với khung nhôm chắc chắn, lưới thông thoáng 360 độ. Thiết kế gấp gọn tiện lợi, tay cầm chắc chắn và có thể đeo vai. Dung lượng rộng rãi phù hợp cho chó mèo dưới 8kg.' },
  { id: 7, name: 'Shampoo cho chó Espree Natural', brand: 'Espree', category: 6, categoryName: 'Chăm sóc', price: 220000, originalPrice: null, rating: 4.4, sold: 678, stock: 90, images: ['https://images.unsplash.com/photo-1583511655857-d19b40a7a54e?w=600&h=600&fit=crop'], description: 'Dầu gội thiên nhiên Espree được chiết xuất 100% từ thực vật, không paraben, không sulfate. Làm sạch sâu, tăng độ bóng mượt lông, hương thơm dịu nhẹ. Phù hợp cho mọi loại lông chó, kể cả da nhạy cảm.' },
  { id: 8, name: 'Bát ăn inox đôi cho thú cưng', brand: 'PawVerse', category: 3, categoryName: 'Phụ kiện', price: 135000, originalPrice: 160000, rating: 4.6, sold: 892, stock: 0, images: ['https://images.unsplash.com/photo-1537151625747-768eb6cf92b2?w=600&h=600&fit=crop'], description: 'Bộ bát đôi inox 304 cao cấp không gỉ, không độc hại, an toàn tuyệt đối cho thú cưng. Thiết kế chống trượt, đáy silicon giữ bát cố định. Dễ vệ sinh, có thể rửa trong máy rửa bát.' },
  { id: 9, name: 'Hạt Hill\'s Science Diet cho mèo', brand: 'Hills', category: 1, categoryName: 'Thức ăn', price: 580000, originalPrice: 650000, rating: 4.8, sold: 445, stock: 60, images: ['https://images.unsplash.com/photo-1592194996308-7b43878e84a6?w=600&h=600&fit=crop'], description: 'Thức ăn khoa học Hill\'s Science Diet được phát triển dựa trên hơn 80 năm nghiên cứu dinh dưỡng. Công thức cân bằng giúp duy trì cân nặng lý tưởng, tăng cường hệ miễn dịch và cải thiện sức khỏe tổng thể cho mèo nhà.' },
  { id: 10, name: 'Đệm nằm cho chó mèo siêu êm', brand: 'PawVerse', category: 5, categoryName: 'Nhà & Ổ', price: 320000, originalPrice: null, rating: 4.7, sold: 321, stock: 45, images: ['https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&h=600&fit=crop'], description: 'Đệm nằm PawVerse với lớp foam memory cao cấp ôm ấp cơ thể thú cưng, giảm áp lực lên khớp. Vỏ nhung mịn mềm mại, giữ ấm tốt vào mùa đông và thoáng mát mùa hè. Có thể tháo và giặt máy.' },
  { id: 11, name: 'Dây dắt chó phản quang', brand: 'Ruffwear', category: 3, categoryName: 'Phụ kiện', price: 175000, originalPrice: 210000, rating: 4.5, sold: 543, stock: 110, images: ['https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&h=600&fit=crop'], description: 'Dây dắt chó Ruffwear với sợi phản quang độc quyền, tăng khả năng nhìn thấy trong điều kiện ánh sáng yếu. Chịu lực kéo lên đến 50kg, khóa inox chống rỉ sét, tay cầm bọc cao su chống trượt thoải mái khi nắm.' },
  { id: 12, name: 'Snack thưởng chó Pedigree Dentastix', brand: 'Pedigree', category: 1, categoryName: 'Thức ăn', price: 75000, originalPrice: 85000, rating: 4.4, sold: 1876, stock: 300, images: ['https://images.unsplash.com/photo-1583511666372-62fc211f8377?w=600&h=600&fit=crop'], description: 'Snack Pedigree Dentastix với công thức X-shape độc đáo, hiệu quả làm sạch cao răng lên đến 80%. Thành phần tự nhiên, không đường, bổ sung kẽm và tripolyphosphate giúp kiểm soát cao răng và hơi thở thơm mát.' },
];

const SAMPLE_REVIEWS = [
  { id: 1, productId: 1, username: 'Nguyễn Văn An', rating: 5, comment: 'Sản phẩm rất tốt! Chú chó nhà mình rất thích ăn, lông bóng mượt hẳn sau 2 tuần dùng. Đóng gói cẩn thận, giao hàng nhanh.', date: '2025-03-15', staffReply: 'Cảm ơn bạn đã tin tưởng PawVerse! Chúng tôi rất vui khi bé nhà bạn thích sản phẩm 🐾' },
  { id: 2, productId: 1, username: 'Trần Thị Bích', rating: 4, comment: 'Hạt thơm, chó ăn hết sạch bát. Giá hơi cao nhưng chất lượng xứng đáng. Sẽ mua lại lần sau.', date: '2025-02-28', staffReply: null },
  { id: 3, productId: 1, username: 'Lê Minh Khoa', rating: 5, comment: 'Mua lần thứ 3 rồi, không có gì để chê cả. Chó khỏe, năng động, tiêu hóa tốt. Tin tưởng Royal Canin.', date: '2025-01-20', staffReply: null },
  { id: 4, productId: 2, username: 'Phạm Thu Hà', rating: 4, comment: 'Cát thơm, ít bụi, mèo dùng rất thích. Khử mùi tốt khoảng 4-5 ngày. Sẽ mua lại!', date: '2025-03-10', staffReply: null },
  { id: 5, productId: 2, username: 'Hoàng Duy Bắc', rating: 5, comment: 'Dùng thử lần đầu thấy rất ổn. Hạt mịn, không dính chân mèo, phòng không có mùi hôi.', date: '2025-02-14', staffReply: 'Cảm ơn bạn! Hãy thử thêm dòng Premium của chúng tôi nhé 🐱' },
];

const REVIEW_DISTRIBUTION = { 5: 68, 4: 22, 3: 7, 2: 2, 1: 1 };

function formatPrice(price) {
  return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
}

function StarRating({ rating, size = 14 }) {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {[1, 2, 3, 4, 5].map(i => (
        <span key={i} className={`star${i <= Math.round(rating) ? ' filled' : ''}`} style={{ fontSize: size }}>★</span>
      ))}
    </div>
  );
}

export default function ProductDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const productId = parseInt(id);

  const product = SAMPLE_PRODUCTS.find(p => p.id === productId);
  const relatedProducts = SAMPLE_PRODUCTS.filter(p => p.category === product?.category && p.id !== productId).slice(0, 4);
  const reviews = SAMPLE_REVIEWS.filter(r => r.productId === productId);

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [cartCount, setCartCount] = useState(0);
  const [isWished, setIsWished] = useState(false);
  const [showStickyBar, setShowStickyBar] = useState(false);
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [reviewRating, setReviewRating] = useState(5);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewComment, setReviewComment] = useState('');
  const [localReviews, setLocalReviews] = useState(reviews);
  const [addingToCart, setAddingToCart] = useState(false);

  useEffect(() => {
    if (product) document.title = `${product.name} | PawVerse`;
    else document.title = 'PawVerse';
  }, [product]);

  useEffect(() => {
    setLocalReviews(SAMPLE_REVIEWS.filter(r => r.productId === productId));
    setSelectedImage(0);
    setQuantity(1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [productId]);

  useEffect(() => {
    const handleScroll = () => setShowStickyBar(window.scrollY > 600);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleAddToCart = () => {
    if (!product || product.stock === 0 || addingToCart) return;
    setAddingToCart(true);
    setTimeout(() => {
      setCartCount(c => c + quantity);
      setAddingToCart(false);
    }, 600);
  };

  const handleBuyNow = () => {
    handleAddToCart();
    setTimeout(() => navigate('/cart'), 800);
  };

  const handleSubmitReview = () => {
    if (reviewComment.trim().length < 10) return;
    const newReview = {
      id: Date.now(),
      productId,
      username: 'Bạn',
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split('T')[0],
      staffReply: null,
    };
    setLocalReviews(prev => [newReview, ...prev]);
    setShowReviewForm(false);
    setReviewRating(5);
    setReviewComment('');
  };

  if (!product) {
    return (
      <div style={{ textAlign: 'center', padding: '80px 20px', fontFamily: 'Segoe UI, sans-serif' }}>
        <p style={{ fontSize: 64, marginBottom: 16 }}>🐾</p>
        <h2 style={{ fontSize: 24, fontWeight: 900, marginBottom: 12 }}>Không tìm thấy sản phẩm</h2>
        <Link to="/products" style={{ color: '#ff6b35', fontWeight: 700, textDecoration: 'none' }}>
          ← Quay lại danh sách sản phẩm
        </Link>
      </div>
    );
  }

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const avgRating = localReviews.length > 0
    ? localReviews.reduce((s, r) => s + r.rating, 0) / localReviews.length
    : product.rating;

  const images = product.images || [`https://images.unsplash.com/photo-1601758124510-52d02ddb7cbd?w=600&h=600&fit=crop`];

  return (
    <div className="product-detail-page">
      {/* Navbar */}
      <nav className="detail-navbar">
        <Link to="/" className="detail-nav-logo">
          <div className="detail-nav-logo-icon">🐾</div>
          <span className="detail-nav-logo-text">Paw<span>Verse</span></span>
        </Link>
        <ul className="detail-nav-links">
          <li><Link to="/">Trang chủ</Link></li>
          <li><Link to="/products">Sản phẩm</Link></li>
          <li><Link to="#">Về chúng tôi</Link></li>
          <li><Link to="#">Liên hệ</Link></li>
        </ul>
        <div className="detail-nav-actions">
          <button className="detail-cart-btn" title="Giỏ hàng">
            🛒
            {cartCount > 0 && <span className="detail-cart-badge">{cartCount}</span>}
          </button>
        </div>
      </nav>

      <div className="detail-wrapper">
        {/* Breadcrumb */}
        <div className="detail-breadcrumb">
          <Link to="/">Trang chủ</Link>
          <span className="sep">/</span>
          <Link to="/products">Sản phẩm</Link>
          <span className="sep">/</span>
          <span className="current">{product.name}</span>
        </div>

        {/* Main Card */}
        <div className="detail-main-card">
          <div className="detail-grid">
            {/* Gallery */}
            <div className="detail-gallery">
              <div className="detail-main-image">
                <img src={images[selectedImage]} alt={product.name} />
                {discount && (
                  <div className="detail-sale-badge">
                    🎁 SALE {discount}%
                  </div>
                )}
              </div>
              {images.length > 1 && (
                <div className="detail-thumbnails">
                  {images.map((img, idx) => (
                    <div
                      key={idx}
                      className={`detail-thumb${selectedImage === idx ? ' active' : ''}`}
                      onClick={() => setSelectedImage(idx)}
                    >
                      <img src={img} alt={`Ảnh ${idx + 1}`} />
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Info */}
            <div className="detail-info">
              {/* Tags */}
              <div className="detail-tags">
                <span className="detail-tag detail-tag-brand">🐾 {product.brand}</span>
                {product.stock > 0
                  ? <span className="detail-tag detail-tag-stock">✓ Còn hàng</span>
                  : <span className="detail-tag detail-tag-out">✗ Hết hàng</span>
                }
              </div>

              <h1 className="detail-product-name">{product.name}</h1>

              {/* Rating Row */}
              <div className="detail-rating-row">
                <div className="detail-rating-badge">
                  ⭐ {avgRating.toFixed(1)}
                </div>
                <div className="detail-rating-divider" />
                <div className="detail-rating-info">
                  <span className="detail-rating-label">Yêu thích bởi:</span>
                  <span className="detail-rating-value">
                    {localReviews.length} Sen đánh giá &nbsp;|&nbsp; {product.sold} bạn đã mua
                  </span>
                </div>
              </div>

              {/* Price */}
              <div className="detail-price-section">
                <div className="detail-price-row">
                  <span className="detail-price-current">{formatPrice(product.price)}</span>
                  {product.originalPrice && (
                    <span className="detail-price-original">{formatPrice(product.originalPrice)}</span>
                  )}
                </div>
                <div className="detail-certified">
                  <span className="detail-certified-icon">✅</span>
                  <span className="detail-certified-text">Chính hãng & An toàn cho thú cưng</span>
                </div>
              </div>

              {/* Actions */}
              {product.stock > 0 && (
                <div className="detail-actions">
                  <div className="detail-qty-row">
                    <span className="detail-qty-label">Số lượng cho bé:</span>
                    <div className="detail-qty-controls">
                      <button className="detail-qty-btn" onClick={() => setQuantity(q => Math.max(1, q - 1))}>−</button>
                      <span className="detail-qty-num">{quantity}</span>
                      <button className="detail-qty-btn" onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}>+</button>
                    </div>
                  </div>

                  <div className="detail-btn-row">
                    <button
                      className="detail-btn-cart"
                      onClick={handleAddToCart}
                      disabled={addingToCart}
                    >
                      🛒 {addingToCart ? 'Đang thêm…' : 'Thêm vào giỏ'}
                    </button>
                    <button className="detail-btn-buy" onClick={handleBuyNow} disabled={addingToCart}>
                      Mua ngay
                    </button>
                    <button
                      className={`detail-btn-wish${isWished ? ' active' : ''}`}
                      onClick={() => setIsWished(w => !w)}
                      title={isWished ? 'Xóa yêu thích' : 'Thêm yêu thích'}
                    >
                      {isWished ? '❤️' : '🤍'}
                    </button>
                  </div>
                </div>
              )}

              {/* Trust */}
              <div className="detail-trust-grid">
                <div className="detail-trust-item">
                  <div className="detail-trust-icon">🚚</div>
                  <span className="detail-trust-label">Giao hàng</span>
                  <span className="detail-trust-sub">Trong 2h</span>
                </div>
                <div className="detail-trust-item">
                  <div className="detail-trust-icon">✅</div>
                  <span className="detail-trust-label">Uy tín</span>
                  <span className="detail-trust-sub">Chính hãng</span>
                </div>
                <div className="detail-trust-item">
                  <div className="detail-trust-icon">❤️</div>
                  <span className="detail-trust-label">An toàn</span>
                  <span className="detail-trust-sub">Kiểm định</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description Card */}
        <div className="detail-desc-card">
          <div className="detail-section-header">
            <div className="detail-section-icon">🐾</div>
            <h2>Mô tả sản phẩm</h2>
          </div>

          <div className="detail-desc-grid">
            <div>
              <div className="detail-desc-text">
                <p>{product.description}</p>
              </div>
              <div className="detail-values">
                <div className="detail-value-item">
                  <div className="detail-value-icon-wrap">🛡️</div>
                  <div>
                    <div className="detail-value-title">An toàn tuyệt đối</div>
                    <div className="detail-value-desc">Kiểm chứng bởi bác sĩ thú y PawVerse</div>
                  </div>
                </div>
                <div className="detail-value-item">
                  <div className="detail-value-icon-wrap">🌿</div>
                  <div>
                    <div className="detail-value-title">Tự nhiên 100%</div>
                    <div className="detail-value-desc">Không chất bảo quản gây hại cho bé</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Specs */}
            <div className="detail-specs-card">
              <div className="detail-specs-inner">
                <div className="detail-specs-header">
                  <div className="detail-specs-header-icon">🐾</div>
                  <h4>Thông số sản phẩm</h4>
                </div>
                <div className="detail-spec-rows">
                  <div className="detail-spec-row">
                    <span className="detail-spec-label">Mã sản phẩm</span>
                    <span className="detail-spec-value">#PV-{product.id.toString().padStart(4,'0')}</span>
                  </div>
                  <div className="detail-spec-row">
                    <span className="detail-spec-label">Thương hiệu</span>
                    <span className="detail-spec-value">{product.brand}</span>
                  </div>
                  <div className="detail-spec-row">
                    <span className="detail-spec-label">Danh mục</span>
                    <span className="detail-spec-value">{product.categoryName}</span>
                  </div>
                  <div className="detail-spec-row">
                    <span className="detail-spec-label">Tình trạng</span>
                    <span className={`detail-spec-value${product.stock > 0 ? ' success' : ''}`}>
                      {product.stock > 0 ? `Còn hàng (${product.stock})` : 'Hết hàng'}
                    </span>
                  </div>
                  <div className="detail-spec-row">
                    <span className="detail-spec-label">Đã bán</span>
                    <span className="detail-spec-value">{product.sold.toLocaleString('vi-VN')}</span>
                  </div>
                </div>
                <div className="detail-specs-footer">
                  <span>✅ Cam kết chất lượng PawVerse</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="detail-related">
            <div className="detail-related-header">
              <div className="detail-related-header-left">
                <span>Có thể bạn quan tâm</span>
                <h2>Sản phẩm khác</h2>
              </div>
              <Link to="/products" className="detail-related-viewall">Xem tất cả</Link>
            </div>
            <div className="detail-related-grid">
              {relatedProducts.map(item => (
                <Link key={item.id} to={`/products/${item.id}`} className="detail-related-card">
                  <div className="detail-related-img">
                    <img src={item.images[0]} alt={item.name} loading="lazy" />
                  </div>
                  <div className="detail-related-body">
                    <div className="detail-related-name">{item.name}</div>
                    <div className="detail-related-footer">
                      <span className="detail-related-price">{formatPrice(item.price)}</span>
                      <div className="detail-related-rating">
                        <span style={{ color: '#fbbf24' }}>★</span>
                        {item.rating.toFixed(1)}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )}

        {/* Reviews */}
        <div className="detail-reviews-card">
          <div className="detail-reviews-top">
            <div className="detail-reviews-top-left">
              <h2>
                <span className="reviews-icon">💬</span>
                Sen nói gì?
              </h2>
              <p>Phản hồi của bạn giúp PawVerse hoàn thiện hơn mỗi ngày</p>
            </div>
            {!showReviewForm && (
              <button className="detail-review-write-btn" onClick={() => setShowReviewForm(true)}>
                ✏️ Gửi phản hồi
              </button>
            )}
          </div>

          {/* Stats */}
          <div className="detail-reviews-stats">
            <div className="detail-avg-rating">
              <span className="detail-avg-num">{avgRating.toFixed(1)}</span>
              <div className="detail-avg-stars">
                {[1,2,3,4,5].map(i => (
                  <span key={i} className={`star${i <= Math.round(avgRating) ? ' filled' : ''}`} style={{ fontSize: 16 }}>★</span>
                ))}
              </div>
              <span className="detail-avg-count">{localReviews.length} đánh giá</span>
            </div>
            <div className="detail-rating-bars">
              {[5,4,3,2,1].map(star => {
                const pct = REVIEW_DISTRIBUTION[star] || 0;
                return (
                  <button key={star} className="detail-rating-bar-row">
                    <span className="detail-rating-bar-num">
                      {star} <span className="star" style={{ color: '#fbbf24' }}>★</span>
                    </span>
                    <div className="detail-rating-bar-track">
                      <div className="detail-rating-bar-fill" style={{ width: `${pct}%` }} />
                    </div>
                    <span className="detail-rating-bar-pct">{pct}%</span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* Review Form */}
          {showReviewForm && (
            <div className="detail-review-form">
              <h3>✏️ Viết phản hồi mới</h3>
              <div className="form-star-row">
                {[1,2,3,4,5].map(s => (
                  <span
                    key={s}
                    className={`form-star${s <= (hoverRating || reviewRating) ? ' filled' : ''}`}
                    onMouseEnter={() => setHoverRating(s)}
                    onMouseLeave={() => setHoverRating(0)}
                    onClick={() => setReviewRating(s)}
                  >★</span>
                ))}
              </div>
              <textarea
                className="form-textarea"
                rows={4}
                placeholder="Chia sẻ trải nghiệm của bạn (ít nhất 10 ký tự)…"
                value={reviewComment}
                onChange={e => setReviewComment(e.target.value)}
              />
              <div className="form-actions">
                <button className="form-btn-cancel" onClick={() => { setShowReviewForm(false); setReviewComment(''); }}>
                  Hủy
                </button>
                <button
                  className="form-btn-submit"
                  onClick={handleSubmitReview}
                  disabled={reviewComment.trim().length < 10}
                >
                  Gửi đánh giá
                </button>
              </div>
            </div>
          )}

          {/* Review List */}
          {localReviews.length === 0 ? (
            <div className="detail-reviews-empty">
              <div className="detail-reviews-empty-icon">🐾</div>
              <p>Chưa có đánh giá nào. Hãy là người đầu tiên!</p>
            </div>
          ) : (
            <div className="detail-review-list">
              {localReviews.map(review => (
                <div key={review.id} className="detail-review-item">
                  <div className="review-item-header">
                    <div className="review-avatar">
                      {review.username.charAt(0).toUpperCase()}
                    </div>
                    <div className="review-meta">
                      <div className="review-username">{review.username}</div>
                      <div className="review-date">{review.date}</div>
                    </div>
                  </div>
                  <div className="review-stars-row">
                    {[1,2,3,4,5].map(i => (
                      <span key={i} className={`star${i <= review.rating ? ' filled' : ''}`} style={{ fontSize: 14 }}>★</span>
                    ))}
                  </div>
                  <p className="review-comment">{review.comment}</p>
                  {review.staffReply && (
                    <div className="review-staff-reply">
                      <div className="review-staff-label">🐾 PawVerse phản hồi</div>
                      <p className="review-staff-text">{review.staffReply}</p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Sticky Bar */}
      <div className={`detail-sticky-bar${showStickyBar ? '' : ' hidden'}`}>
        <div className="sticky-product-info">
          <div className="sticky-product-img">
            <img src={images[0]} alt={product.name} />
          </div>
          <div>
            <div className="sticky-product-name">{product.name}</div>
            <div className="sticky-product-price">{formatPrice(product.price)}</div>
          </div>
        </div>
        <div className="sticky-actions">
          <button className="sticky-btn-cart" onClick={handleAddToCart} disabled={product.stock === 0 || addingToCart}>
            🛒 {addingToCart ? 'Đang thêm…' : 'Thêm vào giỏ'}
          </button>
          <button className="sticky-btn-buy" onClick={handleBuyNow} disabled={product.stock === 0 || addingToCart}>
            Mua ngay
          </button>
        </div>
      </div>
    </div>
  );
}
