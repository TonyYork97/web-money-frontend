import React, { useState } from 'react'
import LogoImg from '../../assets/images/logo.png'
import Burger from '../../assets/images/burger.svg'
import Close from '../../assets/images/close.svg'
import { NavMobile } from '../NavMobile'
import { Nav } from '../Nav'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'
import { links } from '../../links'

const nav = [
    {
        title: 'Мой профиль',
        link: 'app/profile/account'
    },
    {
        title: 'Главная',
        link: 'app/home',
    },
    {
        title: 'История',
        link: '',
        submenu: [
            {
                title: 'Вся история',
                link: 'app/history',
            },
            {
                title: 'Все расходы',
                link: 'app/expenses',
            },
            {
                title: 'Все доходы',
                link: 'app/income',
            },
        ]
    },
    {
        title: 'О нас',
        link: 'app/about'
    },
    {
        title: 'Контакты',
        link: 'app/contacts'
    },
];

export const Header = () => {
    const [isOpenNav, setIsOpenNav] = useState(false);
    const closeNav = () => {
        setIsOpenNav(false)
    }

    return (
        <div className={styles.header}>
            <Link to={links.home} className='flex items-center gap-3'>
                <div className="w-10 md:w-13 h-auto animate-spin-slow">
                    <img className='w-full h-auto' src={LogoImg} alt="logo" />
                </div>
            </Link>
            <Nav list={nav} />

            <div className='md:hidden absolute right-3 top-2' onClick={() => setIsOpenNav(!isOpenNav)}>
                {isOpenNav
                    ? <button className='w-9'><img className='w-full' src={Close} alt="close" /></button>
                    : <button className='w-9'><img className='w-full' src={Burger} alt="menu" /></button>
                }
            </div>
            <NavMobile isOpenNav={isOpenNav} list={nav} closeNav={closeNav} />
        </div>
    )
}