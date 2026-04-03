import React from 'react'

const PopularProducts = () => {
  const products = [
    { name: 'Sữa tắm cho chó lông trắng SOS', price: '540.000đ' },
    { name: 'Chuồng vận chuyển chó mèo size M', price: '900.000đ' }
  ]

  return (
    <div className="popular-products">
      <h3>SẢN PHẨM BOSS ƯA THÍCH</h3>
      <div className="products-list">
        {products.map((product, index) => (
          <div key={index} className="product-item">
            <div className="product-info">
              <div className="product-name">{product.name}</div>
              <div className="product-price">{product.price}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default PopularProducts
