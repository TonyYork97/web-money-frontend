import React from 'react'
import { useState } from 'react';
import { Link } from 'react-router-dom'
import styles from './styles.module.scss';

export const NavMobileItem = ({ closeNav, link, title, submenu = [] }) => {
    const [activeSubmenu, setActiveSubmenu] = useState(false)

    const handleClick = () => {
        if (submenu.length) {
            setActiveSubmenu(!activeSubmenu)
        } else {
            closeNav()
        }
    }

    const handleClose = () => {
        closeNav();
        setActiveSubmenu(false);
    }

    return (
        <div className='w-full'>
            <div className='text-center'>
                <Link onClick={handleClick} to={link ? link : null} className={`${styles.element} inline-block`}>{title}</Link>
            </div>

            <div className={`${activeSubmenu ? 'h-[calc(100%-50px)] ' : 'h-0'} overflow-hidden  transition-all flex flex-col bg-blackMenu dark:bg-bggTop w-full`}>
                {submenu.map(el => <div key={el.title} className='text-center'> <Link onClick={handleClose} className={`${styles.element} inline-block`} to={el.link} >{el.title}</Link></div>)}
            </div>

        </div>
    )
}
