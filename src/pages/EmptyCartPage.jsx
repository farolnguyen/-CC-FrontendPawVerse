import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './EmptyCartPage.css';

const EmptyCartPage = () => {
  const recommendedProducts = [
    {
      id: 1,
      name: "bột giảm mảng bám",
      price: "149.000đ",
      image: "https://via.placeholder.com/200x200?text=Bột+Giảm+Mảng+Bám"
    },
    {
      id: 2,
      name: "Nhà vệ sinh Sonice Pull",
      price: "450.000đ",
      image: "https://via.placeholder.com/200x200?text=Nhà+Vệ+Sinh+Sonice"
    },
    {
      id: 3,
      name: "Vòng cổ trắng - có chuông",
      price: "89.000đ",
      image: "https://via.placeholder.com/200x200?text=Vòng+Cổ"
    },
    {
      id: 4,
      name: "Pate mèo Royal Canin",
      price: "125.000đ",
      image: "https://via.placeholder.com/200x200?text=Pate+Royal+Canin"
    }
  ];

  return (
    <div className="empty-cart-page">
      <Header />
      
      <main className="empty-cart-main">
        <div className="empty-cart-container">
          <div className="empty-cart-content">
            <div className="corgi-illustration">
              <img 
                src="https://via.placeholder.com/400x300?text=Corgi+with+Empty+Bowl" 
                alt="Corgi with empty bowl"
                className="corgi-image"
              />
            </div>
            
            <h1 className="empty-cart-title">Giỏ hàng đang "đói" meo!</h1>
            <p className="empty-cart-subtitle">
              Thêm sản phẩm vào giỏ để không bỏ lỡ những deal hời
            </p>
            
            <button className="shop-now-button">
              Khám phá Pawverse ngay →
            </button>
          </div>
        </div>

        <div className="recommendations-section">
          <div className="recommendations-container">
            <h2 className="recommendations-title">Có thể sen sẽ thích!</h2>
            
            <div className="products-grid">
              {recommendedProducts.map(product => (
                <div key={product.id} className="product-card">
                  <div className="product-image">
                    <img src={product.image} alt={product.name} />
                  </div>
                  <h3 className="product-name">{product.name}</h3>
                  <p className="product-price">{product.price}</p>
                </div>
              ))}
            </div>
            
            <div className="view-all-container">
              <button className="view-all-button">Xem tất cả</button>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default EmptyCartPage;
