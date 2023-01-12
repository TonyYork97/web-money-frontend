import React from 'react'
import { Link } from 'react-router-dom'

export const ShowMoreButton = ({ title, to }) => {
  return (
    <Link
      to={to}
      className='text-mainGreen hover:text-bggGreen dark:text-darkBlack dark:hover:text-textPrime font-light text-sm transition-colors'
    >
      {title}
    </Link>
  )
}
