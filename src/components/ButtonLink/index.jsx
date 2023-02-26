import React from 'react'
import { Link } from 'react-router-dom'

export const ButtonLink = ({ link, title }) => {
  return (
    <Link
      to={link}
      className=' p-3 text-background rounded-xl text-center transition-colors font-bold bg-mainGreen hover:bg-secondGreen'
    >
      {title}
    </Link>
  )
}
