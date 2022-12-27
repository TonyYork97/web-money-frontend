import React from 'react'
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../../components/Container'
import { MainLoading } from '../../components/MainLoading';
import { links } from '../../links';
import { userIsAuth } from '../../store/slices/authSlice';
import Logotip from '../../assets/images/web-money-main.png'

export const StartPage = () => {
    const isAuth = useSelector(userIsAuth);
    const isLoading = useSelector(state => state.auth.isLoading)
    const navigate = useNavigate();
    useEffect(() => {
        if (isAuth) {
            navigate('/app/home', { replace: true })
        }
    })

    if (isLoading) {
        return <div className='w-full h-screen flex justify-center items-center'><MainLoading size={100} /></div>
    }
    return (
        <Container>
            <div className=''>
                <div className='w-full sm:max-w-3xl mx-auto py-20 mb-4'>
                    <div>
                        <img src={Logotip} alt="logo" />
                    </div>
                </div>
                <div className='max-w-md mx-auto flex-col sm:flex-row flex justify-between gap-5 font-bold text-center items-center'>
                    <Link to={links.login} className='w-full py-3 sm:py-2 px-3 border border-mainGreen rounded-3xl hover:bg-secondBackground transition-colors'>Войти</Link>
                    <Link to={links.signup} className='w-full py-3 sm:py-2 px-3 bg-mainGreen rounded-3xl text-totalBlack hover:bg-secondGreen transition-colors'>Зарегистрироваться</Link>
                </div>
            </div>
        </Container>
    )
}
