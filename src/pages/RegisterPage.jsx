import { useState } from 'react'
import { Link } from 'react-router-dom'
import './RegisterPage.css'

function RegisterPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: '',
    fullName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: ''
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('Register data:', formData)
  }

  const PasswordToggle = ({ show, onClick }) => (
    <button
      type="button"
      className="register-password-toggle"
      onClick={onClick}
    >
      {show ? (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
          <circle cx="12" cy="12" r="3"/>
        </svg>
      ) : (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"/>
          <line x1="1" y1="1" x2="23" y2="23"/>
        </svg>
      )}
    </button>
  )

  return (
    <div className="register-page">
      {/* Logo */}
      <div className="register-logo">
        <div className="register-dog-icon"></div>
      </div>

      {/* Title */}
      <div className="register-title-section">
        <h1 className="register-title">
          THAM GIA <span className="register-brand">PAWVERSE</span>
        </h1>
        <p className="register-subtitle">
          KHỞI ĐẦU HÀNH TRÌNH HẠNH PHÚC<br />CỦA THÚ CƯNG
        </p>
      </div>

      {/* Form */}
      <form className="register-form" onSubmit={handleSubmit}>
        <div className="register-form-row">
          <div className="register-form-group">
            <label className="register-label">TÊN ĐĂNG NHẬP</label>
            <div className="register-input-wrapper">
              <input
                type="text"
                name="username"
                className="register-input"
                placeholder="pawverse_urser"
                value={formData.username}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">HỌ VÀ TÊN</label>
            <div className="register-input-wrapper">
              <input
                type="text"
                name="fullName"
                className="register-input"
                placeholder="pawverse_urser"
                value={formData.fullName}
                onChange={handleInputChange}
              />
            </div>
          </div>
        </div>

        <div className="register-form-row">
          <div className="register-form-group">
            <label className="register-label">Email</label>
            <div className="register-input-wrapper">
              <input
                type="email"
                name="email"
                className="register-input"
                placeholder="contact@pawverse.vn"
                value={formData.email}
                onChange={handleInputChange}
              />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">Số điện thoại</label>
            <div className="register-input-wrapper">
              <input
                type="tel"
                name="phone"
                className="register-input"
                placeholder="091 *** ***"
                value={formData.phone}
                onChange={handleInputChange}
              />
              <PasswordToggle show={false} onClick={() => {}} />
            </div>
          </div>
        </div>

        <div className="register-form-row">
          <div className="register-form-group">
            <label className="register-label">Mật khẩu</label>
            <div className="register-input-wrapper">
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                className="register-input"
                placeholder="**********"
                value={formData.password}
                onChange={handleInputChange}
              />
              <PasswordToggle show={showPassword} onClick={() => setShowPassword(!showPassword)} />
            </div>
          </div>

          <div className="register-form-group">
            <label className="register-label">Xác nhận mật khẩu</label>
            <div className="register-input-wrapper">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                name="confirmPassword"
                className="register-input"
                placeholder="**********"
                value={formData.confirmPassword}
                onChange={handleInputChange}
              />
              <PasswordToggle show={showConfirmPassword} onClick={() => setShowConfirmPassword(!showConfirmPassword)} />
            </div>
          </div>
        </div>

        <button type="submit" className="register-button">
          BẮT ĐẦU NGAY
        </button>
      </form>

      {/* Terms */}
      <p className="register-terms">
        BẰNG VIỆC ĐĂNG KÝ, BẠN ĐỒNG Ý VỚI{' '}
        <Link to="/terms">ĐIỀU KHOẢN</Link> VÀ{' '}
        <Link to="/privacy">CHÍNH SÁCH</Link><br />
        CỦA CHÚNG TÔI
      </p>

      {/* Login Link */}
      <p className="register-login-link">
        ĐÃ CÓ TÀI KHOẢN? <Link to="/login">ĐĂNG NHẬP</Link>
      </p>
    </div>
  )
}

export default RegisterPage
