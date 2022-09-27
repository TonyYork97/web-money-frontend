import React from 'react'
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';

export const NavMobile = ({ isOpenNav, list = [] }) => {
    return (
        <nav className={`${isOpenNav ? 'translate-x-0' : 'translate-x-[100%] hidden'} ${styles.navMobile}`}>
            {list.map(el => <Link className='py-2 px-3 border-b-2 border-transparent hover:border-b-2 hover:border-textPrime mb-3 transition-all' to={el.link} key={el.title}>{el.title}</Link>)}
            <button className='py-2 px-3 block text-red-600 border-b-2 box-border border-transparent hover:border-b-2 hover:border-red-600 transition-all'>Выйти</button>
        </nav>
    )
}
