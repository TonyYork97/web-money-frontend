import React from 'react'

export const ShadowBlock = ({ children }) => {
    return (
        <div className='w-full  overflow-hidden  md:min-w-[240px] px-3 py-3 rounded-xl shadow-block bg-secondBackground min-h-full sm:min-h-[532px]'>
            {children}
        </div>
    )
}
