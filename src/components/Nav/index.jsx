import React from 'react'
import { NavItem } from '../NavItem'

export const Nav = ({ list = [] }) => {
  return (
    <nav className='hidden md:flex gap-3 '>
      {list.map((el) => (
        <NavItem
          key={el.title}
          title={el.title}
          submenu={el.submenu}
          link={el.link}
        />
      ))}
    </nav>
  )
}
