import React, { useState } from 'react'
import LogoImg from '../../assets/images/logo.png'
import Burger from '../../assets/images/burger2.png'
import Close from '../../assets/images/close.png'
import { NavMobile } from '../NavMobile'
import { Nav } from '../Nav'
import styles from './styles.module.scss'
import { Link } from 'react-router-dom'

const nav = [
    {
        title: 'Мой профиль',
        link: '/profile'
    },
    {
        title: 'Главная',
        link: '/home'
    },
    {
        title: 'Все расходы и доходы',
        link: '/history'
    },
    {
        title: 'О нас',
        link: '/about'
    },
    {
        title: 'Контакты',
        link: '/contacts'
    },
];

export const Header = () => {
    const [isOpenNav, setIsOpenNav] = useState(false);

    return (
        <div className='py-2 px-3 flex justify-between items-center h-[52px] fixed w-full bg-background z-[100]'>
            <Link to='/home' className='flex items-center gap-3'>
                <div className="w-10 md:w-13 h-auto animate-spin-slow">
                    <img className='w-full h-auto' src={LogoImg} alt="logo" />
                </div>
            </Link>
            <Nav list={nav} />

            <div className='md:hidden absolute right-3 top-2' onClick={() => setIsOpenNav(!isOpenNav)}>
                {isOpenNav
                    ? <button className='w-9'><img className='w-full' src={Close} alt="logo" /></button>
                    : <button className='w-9'><img className='w-full' src={Burger} alt="logo" /></button>
                }
            </div>
            <NavMobile isOpenNav={isOpenNav} list={nav} />
        </div>
    )
}