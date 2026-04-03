import React from 'react'

const OrderChart = () => {
  const data = [
    { label: 'Chờ xử lí', value: 35, color: '#fbbf24' },
    { label: 'Đã giao', value: 45, color: '#10b981' },
    { label: 'Đã hủy', value: 20, color: '#ef4444' }
  ]

  const total = data.reduce((sum, item) => sum + item.value, 0)
  let currentAngle = 0

  return (
    <div className="chart-container">
      <h3>Quy mô đơn hàng</h3>
      <div className="donut-chart-container">
        <div className="donut-chart">
          <svg width="150" height="150" viewBox="0 0 150 150">
            {data.map((segment, index) => {
              const percentage = (segment.value / total) * 100
              const angle = (percentage / 100) * 360
              const startAngle = currentAngle
              const endAngle = currentAngle + angle
              
              const x1 = 75 + 60 * Math.cos((startAngle - 90) * Math.PI / 180)
              const y1 = 75 + 60 * Math.sin((startAngle - 90) * Math.PI / 180)
              const x2 = 75 + 60 * Math.cos((endAngle - 90) * Math.PI / 180)
              const y2 = 75 + 60 * Math.sin((endAngle - 90) * Math.PI / 180)
              
              const largeArcFlag = angle > 180 ? 1 : 0
              
              const pathData = [
                `M 75 75`,
                `L ${x1} ${y1}`,
                `A 60 60 0 ${largeArcFlag} 1 ${x2} ${y2}`,
                'Z'
              ].join(' ')
              
              currentAngle = endAngle
              
              return (
                <path
                  key={index}
                  d={pathData}
                  fill={segment.color}
                  stroke="white"
                  strokeWidth="2"
                />
              )
            })}
            <circle cx="75" cy="75" r="30" fill="white" />
          </svg>
        </div>
        <div className="chart-legend">
          {data.map((item, index) => (
            <div key={index} className="legend-item">
              <div 
                className="legend-color" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="legend-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default OrderChart
