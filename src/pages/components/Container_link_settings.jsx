import React from 'react'
function Container_link_settings({ icon: Icon, titre }) {
  return (
    <div className="flex items-center gap-2">
      <Icon size={24} className="text-gris" />
      <span className="font-body">{titre}</span>
    </div>
  )
}

export default Container_link_settings