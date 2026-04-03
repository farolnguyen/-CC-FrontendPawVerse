import React from 'react'

const RevenueChart = () => {
  const data = [
    { day: '03-13', value: 180000 },
    { day: '03-14', value: 220000 },
    { day: '03-15', value: 150000 },
    { day: '03-16', value: 280000 },
    { day: '03-17', value: 320000 },
    { day: '03-18', value: 250000 },
    { day: '03-19', value: 290000 }
  ]

  const maxValue = Math.max(...data.map(d => d.value))
  const chartHeight = 200

  return (
    <div className="chart-container">
      <h3>Biểu đồ doanh thu</h3>
      <div className="line-chart">
        <div className="chart-y-axis">
          <span>{(maxValue / 1000).toFixed(0)}k</span>
          <span>{(maxValue / 2000).toFixed(0)}k</span>
          <span>0</span>
        </div>
        <div className="chart-content">
          <svg width="100%" height={chartHeight} className="chart-svg">
            {data.map((point, index) => {
              const x = (index / (data.length - 1)) * 100
              const y = 100 - (point.value / maxValue) * 100
              return (
                <g key={index}>
                  <circle
                    cx={`${x}%`}
                    cy={`${y}%`}
                    r="4"
                    fill="#10b981"
                  />
                  {index > 0 && (
                    <line
                      x1={`${((index - 1) / (data.length - 1)) * 100}%`}
                      y1={`${100 - (data[index - 1].value / maxValue) * 100}%`}
                      x2={`${x}%`}
                      y2={`${y}%`}
                      stroke="#10b981"
                      strokeWidth="2"
                    />
                  )}
                </g>
              )
            })}
          </svg>
          <div className="chart-x-axis">
            {data.map((point, index) => (
              <span key={index}>{point.day}</span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default RevenueChart
