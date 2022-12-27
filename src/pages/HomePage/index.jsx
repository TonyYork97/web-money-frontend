import React, { useState } from 'react'
import { BarChart } from '../../components/BarChart'
import { ChartBlock } from '../../components/ChartBlock'
import { Container } from '../../components/Container'
import { ShadowBlock } from '../../components/ShadowBlock'
import { links } from '../../links'
import { History } from '../../components/History'
import { Link, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { userIsAuth } from '../../store/slices/authSlice'
import { fetchGetMontExpense, fetchGetMontRevenue, fetchGetOperations, fetchGetTodayExpense, fetchGetTotalCash, fetchGetYearExpense } from '../../store/slices/operationsSlice'
import { MainLoading } from '../../components/MainLoading'
import { useResize } from '../../hooks/Rezise'

export const HomePage = () => {
    const [isAllLoading, setisAllLoading] = useState(false);
    const dispatch = useDispatch();
    const isAuth = useSelector(userIsAuth);
    const navigate = useNavigate();
    const { width } = useResize()
    const isLoading = useSelector(state => state.auth.isLoading)
    const {
        data,
        isLoadingOperations,
        todayExpense,
        totalCash,
        monthExpense,
        monthRevenue,
        isLoadingMonthExpense,
        isLoadingMonthRevenue,
        isLoadingTodayExpense,
        isLoadingTotalCash,
        isLoadingYearExpense,
        yearExpense } = useSelector(state => state.operations)

    const getOperations = async () => {
        setisAllLoading(true)
        dispatch(fetchGetMontExpense())
        dispatch(fetchGetMontRevenue())
        dispatch(fetchGetOperations({ limit: 8 }))
        dispatch(fetchGetTodayExpense())
        dispatch(fetchGetTotalCash())
        await dispatch(fetchGetYearExpense())
        setisAllLoading(false)
    }

    useEffect(() => {
        if (!localStorage.getItem('token') || !isAuth) {
            navigate('/', { replace: true })
        } else {
            getOperations()
        }
    }, [isAuth])



    if (isLoading) {
        return <div className='w-full h-screen flex justify-center items-center'><MainLoading size={100} /></div>
    }


    return (
        <Container>
            <div className='pb-2'>
                <div className='flex flex-col-reverse gap-3 md:items-center md:flex-row mb-6 justify-between'>
                    <div className='flex  flex-col sm:flex-row  gap-4'>
                        {/* <Link to="add">Добавить доход</Link> */}
                        <Link className='w-full md:w-auto  rounded-3xl text-center border border-mainGreen py-4 px-4 md:py-6 font-bold  hover:bg-secondBackground transition-colors' to={links.addExpense}>Добавить расход</Link>
                        <Link className='w-full md:w-auto rounded-3xl bg-mainGreen text-center text-background py-4 md:py-6 px-4 font-bold  hover:bg-secondGreen transition-colors' to={links.addRevenue}>Добавить доход</Link>
                    </div>
                    <div className={`flex gap-3 items-center flex-row ${width < 375 ? 'flex-wrap' : ''}`}>
                        <div className='w-full md:min-w-[152px] lg:w-auto px-2 sm:px-3 py-2 rounded-xl bg-blackMenu border-textPrime border'>
                            <div className='  text-right ml-auto'>
                                <p className='text-sm mb-1 text-textOpacity'>Потрачено сегодня</p>
                                {isLoadingTodayExpense
                                    ? <MainLoading size={23} />
                                    : <p className='font-bold text-lg whitespace-nowrap' >{todayExpense} &#8381;</p>
                                }
                            </div>
                        </div>
                        <div className='w-full md:min-w-[152px] lg:w-auto px-2 sm:px-3 py-2 rounded-xl bg-blackMenu border-textPrime border'>
                            <div className='text-right'>
                                <p className='text-sm mb-1 text-textOpacity'>Всего средств</p>
                                {isLoadingTotalCash
                                    ? <MainLoading size={23} />
                                    : <p className='font-bold text-lg text-mainGreen whitespace-nowrap'>{totalCash} &#8381;</p>
                                }
                            </div>
                        </div>
                    </div>
                </div>
                <div className=' flex flex-wrap md:grid md:grid-cols-2 md:grid-rows-2  xl:grid-rows-1 xl:grid xl:grid-cols-4 gap-3 mb-3'>
                    <ShadowBlock>
                        <ChartBlock
                            title='Расход'
                            monthExpense={monthExpense}
                            isLoading={isLoadingMonthExpense}
                        />
                    </ShadowBlock>
                    <ShadowBlock>
                        <ChartBlock
                            title='Доход'
                            link={links.income}
                            monthExpense={monthRevenue}
                            isLoading={isLoadingMonthRevenue}

                        />
                    </ShadowBlock>
                    <div className='flex w-full md:col-span-2'>
                        <ShadowBlock>
                            <History title='История операций' data={data} isLoading={isLoadingOperations} />
                        </ShadowBlock>
                    </div>
                </div>
                <div className='grid grid-cols-4'>
                    <div className='col-span-4  xl:col-span-2'>
                        <ShadowBlock>
                            <BarChart isLoading={isLoadingYearExpense} yearExpense={yearExpense} />
                        </ShadowBlock>
                    </div>
                </div>
            </div>
        </Container >
    )
}
