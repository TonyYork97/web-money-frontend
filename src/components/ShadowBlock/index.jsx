import React from 'react'

//  min-h-[480px] sm:min-h-[532px]
export const ShadowBlock = ({ children }) => {
    return (
        <div className={`w-full min-h-[516px]  relative  md:min-w-[240px] px-1 min-w-[260px]   sm:px-3 py-3 rounded-xl shadow-block bg-secondBackground`}>
            {children}
        </div>
    )
}
