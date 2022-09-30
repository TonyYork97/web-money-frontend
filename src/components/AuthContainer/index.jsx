import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import styles from './styles.module.scss'

export const AuthContainer = ({ children }) => {
    return (
        <div className=''>
            <div className='relative flex justify-center gap-11'>
                <Link to="/start" className='absolute w-10 md:w-13 inline-block top-2 left-2 animate-spin-slow'>

                    <img src={Logo} alt="logo" className='w-full' />
                </Link>
                {children}
            </div>
        </div>
    )
}
