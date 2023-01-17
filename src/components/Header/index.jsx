import React, { useRef, useState } from 'react'
import LogoImg from '../../assets/images/logo.png'
import Burger from '../../assets/images/burger.svg'
import BurgerLight from '../../assets/images/burger-light.svg'
import Close from '../../assets/images/close.svg'
import CloseLight from '../../assets/images/close-light.svg'
import { NavMobile } from '../NavMobile'
import { Nav } from '../Nav'
import { Link } from 'react-router-dom'
import { links } from '../../links'
import styles from './styles.module.scss'

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
    const intoViewfRef = useRef()
    const closeNav = () => {
        setIsOpenNav(false)
    }

    const scrollToIntoView = () => {
        intoViewfRef.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    return (
        <div className="py-2 px-3 flex justify-between items-center h-[52px] fixed w-full bg-background dark:bg-gradient-to-r dark:from-bggBottom dark:via-bggTop dark:to-white z-[100]">
            <Link to={links.home} ref={intoViewfRef} onClick={scrollToIntoView} className='flex items-center gap-3'>
                <div className="w-10 md:w-13 h-auto animate-spin-slow">
                    <img className='w-full h-auto' src={LogoImg} alt="logo" />
                </div>
            </Link>
            <Nav list={nav} />

            <div className='md:hidden absolute right-3 top-2' onClick={() => setIsOpenNav(!isOpenNav)}>
                {isOpenNav
                    ? localStorage.getItem('theme') === 'dark'
                        ? <button className='w-9'><img className='w-full' src={Close} alt="close" /></button>
                        : <button className='w-9'><img className='w-full' src={CloseLight} alt="close" /></button>
                    : localStorage.getItem('theme') === 'dark'
                        ? <button className='w-9'><img className='w-full' src={Burger} alt="menu" /></button>
                        : <button className='w-9'><img className='w-full' src={BurgerLight} alt="menu" /></button>
                }
            </div>
            <NavMobile isOpenNav={isOpenNav} list={nav} closeNav={closeNav} />
        </div>
    )
}