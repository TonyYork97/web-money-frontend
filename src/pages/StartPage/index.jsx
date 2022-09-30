import React from 'react'
import { Link } from 'react-router-dom';
import { Container } from '../../components/Container'
import { useResize } from '../../hooks/Rezise'

// <div>
//                             <div className='flex justify-between items-center relative'>
//                                 <h1 className='text-[84px] md:text-[128px] font-bold text-mainGreen'>WEB</h1>
//                                 <h3
//                                     className='sm:text-[14px] md:text-[26px] sm:absolute w-[240px] md:w-[400px] right-[70px] md:right-[60px] bottom-[26px] md:bottom-[50px] tracking-widest leading-7'
//                                 >-УНИКАЛЬНЫЙ СЕРВИС ДЛЯ ФИНАСОВОГО УЧЕТА</h3>
//                             </div>
//                             <div className='relative'>
//                                 <h1 className='text-right font-bold text-[84px] md:text-[128px] sm:absolute bottom-[-66px] md:bottom-[-100px] right-2 md:right-0'>MONEY</h1>
//                             </div>
//                         </div>

export const StartPage = () => {
    const { width } = useResize();

    return (
        <Container>
            <div className='pt-16'>
                <div className='w-full sm:max-w-3xl mx-auto py-20 mb-4'>
                    {width < 640
                        ? <div className='leading-[70px]'>
                            <h1 className='text-[80px] font-bold text-mainGreen'>WEB</h1>
                            <h1 className='text-[80px] font-bold'>MONEY</h1>
                            <p className='text-xs leading-7'>-УНИКАЛЬНЫЙ СЕРВИС ДЛЯ ФИНАСОВОГО УЧЕТА</p>
                        </div>

                        : <div className='leading-[68px] md:leading-[100px]'>
                            <div className='flex justify-between items-end'>
                                <h1 className='text-[86px] md:text-[128px] font-bold text-mainGreen'>WEB</h1>
                                <h3
                                    className='sm:text-[14px] md:text-[26px]  tracking-widest leading-7'
                                >-УНИКАЛЬНЫЙ СЕРВИС ДЛЯ ФИНАСОВОГО УЧЕТА</h3>
                            </div>
                            <div className='relative'>
                                <h1 className='text-right font-bold text-[86px] md:text-[128px] '>MONEY</h1>
                            </div>
                        </div>}
                </div>
                <div className='max-w-md mx-auto flex-col sm:flex-row flex justify-between gap-5 font-bold text-center items-center'>
                    <Link to="/login" className='w-full py-2 px-3 border border-mainGreen rounded-3xl hover:bg-secondBackground transition-colors'>Войти</Link>
                    <Link to="/signup" className='w-full py-2 px-3 bg-mainGreen rounded-3xl text-totalBlack hover:bg-secondGreen transition-colors'>Зарегистрироваться</Link>
                </div>
            </div>
        </Container>
    )
}
