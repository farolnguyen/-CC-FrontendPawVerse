import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import ProductsPage from './pages/ProductsPage'
import ProductDetailPage from './pages/ProductDetailPage'
import OrdersPage from './components/OrdersPage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/products" replace />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/products/:id" element={<ProductDetailPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
