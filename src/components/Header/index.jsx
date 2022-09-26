import React from 'react'
import LogoImg from '../../assets/images/logo.png'

export const Header = () => {
    return (
        <div className=''>
            <div className='w-14 h-auto'>
                <img className='w-full' src={LogoImg} alt="logo" />
            </div>
        </div>
    )
}
