import React from 'react'
import { Link } from 'react-router-dom'
import StickerSignup from '../../assets/images/sticker2.png'
import { AuthContainer } from '../../components/AuthContainer'
import styles from './styles.module.scss'

export const SignupPage = () => {
    return (
        <AuthContainer>
            <div className={`w-full md:w-auto  h-[100vh]  md:min-w-[448px] flex flex-col justify-center px-1 sm:px-7`}>
                <h2 className='text-2xl sm:text-3xl mb-4 font-bold'>Зарегистрироваться</h2>
                <form className='flex flex-col mb-8'>
                    <label htmlFor="email" className='mb-1'>Email</label>
                    <input id='email' type="email" className='py-3 px-3 rounded-xl border border-textPrime  bg-secondBackground mb-3 w-full active:outline-none focus:outline-none focus:shadow-whiteShadow placeholder:opacity-25' placeholder='Введите email' />
                    <label htmlFor="password" className='mb-1'>Пароль</label>
                    <input id='password' type="password" className='py-3 px-3 rounded-xl border border-textPrime bg-secondBackground mb-3 w-full active:outline-none focus:outline-none focus:shadow-whiteShadow placeholder:opacity-25' placeholder='Введите пароль' />
                    <button className='bg-mainGreen py-3 px-3 text-background rounded-xl hover:bg-secondGreen transition-colors font-bold mt-5'>Зарегистрироваться</button>
                </form>
                <p className='text-xs text-center'>Уже есть аккаунт? Тогда <Link to="/login" className='underline underline-offset-2 hover:text-mainGreen transition-colors'>войдите</Link></p>
            </div>
            <div className='hidden md:flex md:justify-center md:items-center'>
                <div className='w-[180px] md:w-[220px] lg:w-[280px]'>
                    <img src={StickerSignup} alt="sticker" className='w-full' />
                </div>
            </div>
        </AuthContainer>
    )
}
