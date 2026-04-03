import React from 'react'

const NewEntities = () => {
  const entities = [
    { name: 'Trần Thị A', email: 'tran.a@example.com', role: 'ADMIN' },
    { name: 'Nguyễn Văn B', email: 'nguyen.b@example.com', role: 'USER' },
    { name: 'Lê Thị C', email: 'le.c@example.com', role: 'USER' },
    { name: 'Phạm Văn D', email: 'pham.d@example.com', role: 'ADMIN' }
  ]

  return (
    <div className="new-entities">
      <h3>THỰC THỂ MỚI</h3>
      <div className="entities-list">
        {entities.map((entity, index) => (
          <div key={index} className="entity-item">
            <div className="entity-info">
              <div className="entity-name">{entity.name}</div>
              <div className="entity-email">{entity.email}</div>
            </div>
            <span className={`entity-role ${entity.role.toLowerCase()}`}>
              {entity.role}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NewEntities
