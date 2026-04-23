import React from 'react'

function Card_settings({children}) {
  return (
    <>
        <div className='w-full bg-white flex justify-between items-center p-4 rounded-sm'>{children}</div>
    </>
  )
}

export default Card_settings