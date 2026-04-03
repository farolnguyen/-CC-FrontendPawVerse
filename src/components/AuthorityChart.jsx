import React from 'react'

const AuthorityChart = () => {
  const data = [
    { label: 'Cư dân hệ thống (USER)', value: 8, color: '#3b82f6' },
    { label: 'Điều hành viên (STAFF)', value: 1, color: '#10b981' },
    { label: 'Kiểm soát viên (ADMIN)', value: 2, color: '#8b5cf6' }
  ]

  const maxValue = Math.max(...data.map(d => d.value))

  return (
    <div className="chart-container">
      <h3>Cơ cấu quyền hạn</h3>
      <div className="bar-chart">
        {data.map((item, index) => (
          <div key={index} className="bar-item">
            <div className="bar-label">{item.label}</div>
            <div className="bar-container">
              <div className="bar-track">
                <div 
                  className="bar-fill" 
                  style={{ 
                    width: `${(item.value / maxValue) * 100}%`,
                    backgroundColor: item.color 
                  }}
                ></div>
              </div>
              <span className="bar-value">{item.value} sessions</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AuthorityChart
