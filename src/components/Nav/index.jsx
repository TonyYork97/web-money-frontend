import React from 'react'
import { Link } from 'react-router-dom';

export const Nav = ({ list = [] }) => {
    return (
        <nav className='hidden md:flex gap-4'>
            {list.map(el => <Link className='py-1 px-3 border-b-2 border-transparent  box-border hover:border-b-2 hover:border-textPrime transition-all' to={el.link} key={el.title}>{el.title}</Link>)}
        </nav>
    )
}
