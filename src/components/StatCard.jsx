import React from 'react'

const StatCard = ({ title, value, icon, color }) => {
  const getColorClass = (color) => {
    switch(color) {
      case 'green': return 'stat-card green'
      case 'blue': return 'stat-card blue'
      case 'purple': return 'stat-card purple'
      case 'orange': return 'stat-card orange'
      default: return 'stat-card blue'
    }
  }

  return (
    <div className={getColorClass(color)}>
      <div className="stat-icon">{icon}</div>
      <div className="stat-content">
        <h3 className="stat-title">{title}</h3>
        <p className="stat-value">{value}</p>
      </div>
    </div>
  )
}

export default StatCard
