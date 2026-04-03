import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import OrdersPage from './components/OrdersPage'
import ShoppingCartPage from './pages/ShoppingCartPage'
import EmptyCartPage from './pages/EmptyCartPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/orders" element={<OrdersPage />} />
        <Route path="/cart" element={<ShoppingCartPage />} />
        <Route path="/cart/empty" element={<EmptyCartPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
