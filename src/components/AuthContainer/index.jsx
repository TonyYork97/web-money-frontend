import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../../assets/images/logo.png'
import styles from './styles.module.scss'

export const AuthContainer = ({ children }) => {
  return (
    <>
      <div className='h-[51px]'>
        <Link to='/' className=' w-14 md:w-13 block p-2 animate-spin-slow'>
          <img src={Logo} alt='logo' className='w-full' />
        </Link>
      </div>
      <div className=' flex justify-center gap-x-[156px] md:pt-20'>
        {children}
      </div>
    </>
  )
}
