import React from 'react'

export const MainLoading = ({ size = 100 }) => {
    return (
        <div style={{ width: `${size}px`, height: `${size}px` }} className='border-dashed border-8 rounded-full inline-block border-mainGreen dark:border-black animate-spin'></div>
    )
}
