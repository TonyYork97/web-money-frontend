import React from 'react'

export const ShadowBlock = ({ children }) => {
  return (
    <div
      className={`w-full  min-h-[516px]  relative  md:min-w-[240px] px-1 min-w-[260px]   sm:px-3 py-3 rounded-xl shadow-block dark:shadow-blockLight bg-gradient-to-b from-secondBackground to-blackMenu  dark:bg-gradient-to-b dark:from-bggTop dark:to-bggBottom `}
    >
      {children}
    </div>
  )
}
