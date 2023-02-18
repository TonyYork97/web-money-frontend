import React from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { fetchLogOut } from '../../store/slices/authSlice';
import { NavMobileItem } from '../NavMobileItem';
import styles from './styles.module.scss';

export const NavMobile = ({ isOpenNav, list = [], closeNav = () => null }) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const logOutClick = () => {
        dispatch(fetchLogOut())
        navigate('/', { replace: true })
    }

    return (
        <nav className={`${isOpenNav ? 'translate-x-0' : 'translate-x-[100%] hidden'} ${styles.navMobile} bg-background  border-black dark:border-bggBottom dark:bg-gradient-to-r dark:from-bggBottom dark:via-bggTop dark:to-white `}>
            {list.map(el =>
                <NavMobileItem
                    closeNav={closeNav}
                    link={el.link}
                    key={el.title}
                    title={el.title}
                    submenu={el.submenu || []}
                />)}
            <div className='text-center'>
                <button
                    onClick={logOutClick}
                    className='w-full py-2 px-3 block text-red-600 border-b-2 box-border border-transparent hover:border-b-2 hover:border-red-600 transition-all'>
                    Выйти</button>
            </div>
        </nav>

    )
}
