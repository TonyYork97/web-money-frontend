import React from 'react'

export const Container = ({ children }) => {
  return (
    <div className='scroll-smooth max-w-[1440px] mx-auto px-1 pt-14'>
      {children}
    </div>
  )
}
