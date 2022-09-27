import React from 'react'

export const Container = ({ children }) => {
    return (
        <div className='max-w-[1440px] mx-auto px-1' >
            {children}
        </div>
    )
}
