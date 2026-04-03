import React, { useState } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import './ShoppingCartPage.css';

const ShoppingCartPage = () => {
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "BÁT ÂN HÌNH TRÁI DẦU",
      price: 350000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Bát+Trái+Dầu"
    },
    {
      id: 2,
      name: "CÁT VỆ SINH CHO MÈO",
      price: 280000,
      quantity: 2,
      image: "https://via.placeholder.com/100x100?text=Cát+Vệ+Sinh"
    },
    {
      id: 3,
      name: "NỆM SONICE DA BẢO",
      price: 1500000,
      quantity: 1,
      image: "https://via.placeholder.com/100x100?text=Nệm+Sonice"
    }
  ]);

  const [discountCode, setDiscountCode] = useState('');
  const [appliedDiscount, setAppliedDiscount] = useState(0);

  const updateQuantity = (id, newQuantity) => {
    if (newQuantity < 1) return;
    
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const shippingFee = subtotal >= 500000 ? 0 : 30000;
  const discountAmount = subtotal * (appliedDiscount / 100);
  const total = subtotal + shippingFee - discountAmount;

  const applyDiscount = () => {
    if (discountCode.toLowerCase() === 'pawverse10') {
      setAppliedDiscount(10);
    } else if (discountCode.toLowerCase() === 'pawverse20') {
      setAppliedDiscount(20);
    } else {
      alert('Mã giảm giá không hợp lệ');
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', {
      style: 'currency',
      currency: 'VND'
    }).format(price);
  };

  const freeShippingProgress = Math.min((subtotal / 500000) * 100, 100);
  const remainingForFreeShipping = Math.max(500000 - subtotal, 0);

  return (
    <div className="shopping-cart-page">
      <Header />
      
      <main className="cart-main">
        <div className="cart-container">
          <div className="cart-content">
            <div className="cart-items-section">
              <h1 className="cart-title">Giỏ hàng của bạn</h1>
              
              {cartItems.length === 0 ? (
                <div className="empty-cart-message">
                  <p>Giỏ hàng của bạn đang trống</p>
                </div>
              ) : (
                <div className="cart-items">
                  {cartItems.map(item => (
                    <div key={item.id} className="cart-item">
                      <div className="item-image">
                        <img src={item.image} alt={item.name} />
                      </div>
                      
                      <div className="item-details">
                        <h3 className="item-name">{item.name}</h3>
                        <p className="item-price">{formatPrice(item.price)}</p>
                      </div>
                      
                      <div className="item-quantity">
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <span className="quantity-value">{item.quantity}</span>
                        <button 
                          className="quantity-btn"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                      
                      <div className="item-total">
                        {formatPrice(item.price * item.quantity)}
                      </div>
                      
                      <button 
                        className="remove-btn"
                        onClick={() => removeItem(item.id)}
                      >
                        <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18"/>
                          <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6"/>
                          <path d="M8 6V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="continue-shopping">
                <a href="/products" className="continue-link">← Tiếp tục mua sắm</a>
              </div>
            </div>

            <div className="order-summary-section">
              <div className="order-summary">
                <h2 className="summary-title">Tóm tắt đơn hàng</h2>
                
                <div className="summary-row">
                  <span>Tạm tính</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                
                <div className="summary-row">
                  <span>Phí vận chuyển</span>
                  <span>{shippingFee === 0 ? 'Miễn phí' : formatPrice(shippingFee)}</span>
                </div>
                
                {shippingFee > 0 && (
                  <div className="free-shipping-progress">
                    <div className="progress-bar">
                      <div 
                        className="progress-fill" 
                        style={{ width: `${freeShippingProgress}%` }}
                      ></div>
                    </div>
                    <p className="progress-text">
                      Chỉ cần thêm {formatPrice(remainingForFreeShipping)} để được miễn phí vận chuyển
                    </p>
                  </div>
                )}
                
                <div className="discount-section">
                  <input
                    type="text"
                    placeholder="Nhập mã giảm giá"
                    value={discountCode}
                    onChange={(e) => setDiscountCode(e.target.value)}
                    className="discount-input"
                  />
                  <button onClick={applyDiscount} className="apply-btn">Áp dụng</button>
                </div>
                
                {appliedDiscount > 0 && (
                  <div className="summary-row discount">
                    <span>Giảm giá ({appliedDiscount}%)</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                
                <div className="summary-row total">
                  <span>Tổng cộng</span>
                  <span>{formatPrice(total)}</span>
                </div>
                
                <button className="checkout-btn">
                  Thanh toán ngay
                </button>
                
                <div className="guarantees">
                  <div className="guarantee-item">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 2L2 7v10c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V7l-10-5z"/>
                    </svg>
                    <span>Thanh toán an toàn</span>
                  </div>
                  <div className="guarantee-item">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                    </svg>
                    <span>Đổi trả trong 14 ngày</span>
                  </div>
                  <div className="guarantee-item">
                    <svg viewBox="0 0 24 24" width="16" height="16" fill="currentColor">
                      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm2.07-7.75l-.9.92C13.45 12.9 13 13.5 13 15h-2v-.5c0-1.1.45-2.1 1.17-2.83l1.24-1.26c.37-.36.59-.86.59-1.41 0-1.1-.9-2-2-2s-2 .9-2 2H8c0-2.21 1.79-4 4-4s4 1.79 4 4c0 .88-.36 1.68-.93 2.25z"/>
                    </svg>
                    <span>Hỗ trợ 24/7</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default ShoppingCartPage;
