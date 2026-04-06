import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
<<<<<<< HEAD
import Sidebar from './components/Sidebar'
import ProductManagement from './pages/ProductManagement'
import OrderManagement from './pages/OrderManagement'
import './App.css'
=======
import HomePage from './pages/HomePage'
import DashboardPage from './pages/DashboardPage'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import OrdersPage from './components/OrdersPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import EmptyCartPage from './pages/EmptyCartPage'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
>>>>>>> main

function App() {
  return (
    <BrowserRouter>
<<<<<<< HEAD
      <div className="app">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Navigate to="/products" replace />} />
            <Route path="/dashboard" element={<div>Dashboard Page</div>} />
            <Route path="/products" element={<ProductManagement />} />
            <Route path="/orders" element={<OrderManagement />} />
            <Route path="/staff" element={<div>Staff Management Page</div>} />
            <Route path="/settings" element={<div>Settings Page</div>} />
          </Routes>
        </div>
      </div>
=======
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/cart/empty" element={<EmptyCartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Routes>
>>>>>>> main
    </BrowserRouter>
  )
}

export default App
