import React from 'react';
import './OrdersPage.css';
import Footer from './Footer';

const OrdersPage = () => {
  // Dữ liệu đơn hàng mẫu
  const orders = [
    {
      id: '#19',
      date: '27/01/2026\n09:15',
      address: '80 lbb huahdos, Xã Hồng Thái,\nhuyện Na Hang, Tỉnh Tuyên Quang',
      phone: '0329222698',
      total: '450.000đ',
      status: 'Chờ xác nhận'
    }
  ];

  return (
    <div className="orders-page">
      <div className="orders-container">
        <h1 className="orders-title">Đơn hàng của tôi</h1>
        
        <div className="orders-table-wrapper">
          <table className="orders-table">
            <thead>
              <tr>
                <th>MÃ ĐƠN HÀNG</th>
                <th>NGÀY ĐẶT</th>
                <th>ĐỊA CHỈ GIAO HÀNG</th>
                <th>SỐ ĐIỆN THOẠI</th>
                <th>TỔNG TIỀN</th>
                <th>TRẠNG THÁI</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              {orders.map((order) => (
                <tr key={order.id}>
                  <td className="order-id">{order.id}</td>
                  <td className="order-date">
                    {order.date.split('\n').map((line, idx) => (
                      <span key={idx}>
                        {line}
                        {idx < order.date.split('\n').length - 1 && <br />}
                      </span>
                    ))}
                  </td>
                  <td className="order-address">{order.address}</td>
                  <td className="order-phone">{order.phone}</td>
                  <td className="order-total">{order.total}</td>
                  <td>
                    <span className="order-status pending">{order.status}</span>
                  </td>
                  <td>
                    <button className="view-btn">Xem</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default OrdersPage;
