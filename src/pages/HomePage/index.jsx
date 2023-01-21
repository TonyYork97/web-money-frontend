import React from 'react'
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
import { TodayExpense } from '../../components/TodayExpense'
import { TotalCash } from '../../components/TotalCash'
import moment from 'moment'
import { useState } from 'react'
import axios from '../../axios'

export const HomePage = () => {
    const dispatch = useDispatch();
    const isAuth = useSelector(userIsAuth);
    const navigate = useNavigate();
    const { width } = useResize()
    const isLoading = useSelector(state => state.auth.isLoading)
    const [time, setTime] = useState('')
    const {
        data,
        dataError,
        isLoadingOperations,
        todayExpense,
        totalCash,
        isLoadingTotalCash,
        totalCashError,
        monthExpense,
        monthExpenseError,
        monthRevenue,
        monthRevenueError,
        isLoadingMonthExpense,
        isLoadingMonthRevenue,
        isLoadingTodayExpense,
        isLoadingYearExpense,
        todayExpenseError,
        yearExpense,
        yearExpenseError } = useSelector(state => state.operations)

    const getOperations = async () => {
        dispatch(fetchGetMontExpense())
        dispatch(fetchGetMontRevenue())
        dispatch(fetchGetOperations({
            limit: 8,
            dateFrom: moment().add(-11, 'M').startOf('M').format('YYYY-MM-DD'),
            dateTo: moment().format('YYYY-MM-DD')
        }))
        dispatch(fetchGetTodayExpense({
            date: moment().format('YYYY-MM-DD')
        }))
        dispatch(fetchGetTotalCash())
        dispatch(fetchGetYearExpense())
    }

    const reloadMonthExpense = () => {
        dispatch(fetchGetMontExpense())
    }
    const reloadMonthRevenue = () => {
        dispatch(fetchGetMontRevenue())
    }
    const reloadTodayExpense = () => {
        dispatch(fetchGetTodayExpense())
    }
    const reloadTotalCash = () => {
        dispatch(fetchGetTotalCash())
    }
    const reloadOperations = () => {
        dispatch(fetchGetOperations({ limit: 8 }))
    }
    const reloadYearExpense = () => {
        dispatch(fetchGetYearExpense())
    }

    const getTimeFunc = async () => {
        const { data } = await axios.post('/app/get-time', {
            params: {
                time: moment().format()
            }
        })
        setTime(moment(data).format('DD-MM HH:mm:ss'))
    }

    useEffect(() => {
        getTimeFunc()
    }, [])


    useEffect(() => {
        if (!localStorage.getItem('token') || !isAuth) {
            navigate('/', { replace: true })
        } else {
            getOperations()
        }
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])



    if (isLoading) {
        return <div className='w-full h-screen flex justify-center items-center'><MainLoading size={100} /></div>
    }


    return (
        <Container>
            <div className='pb-2'>
                <div className='flex flex-col-reverse gap-3 md:items-center md:flex-row mb-4 justify-between'>
                    <div className='flex  flex-col sm:flex-row  gap-4'>
                        <Link className='w-full md:w-auto  rounded-3xl text-center border border-mainGreen py-4 px-4 md:py-6 font-bold  hover:bg-secondBackground  dark:hover:bg-bggTop transition-colors' to={links.addExpense}>Добавить расход</Link>
                        <Link className='w-full md:w-auto rounded-3xl  bg-gradient-to-r from-mainGreen to-bggGreen text-center text-background py-4 md:py-6 px-4 font-bold  hover:from-mainGreen hover:to-mainGreen transition-colors' to={links.addRevenue}>Добавить доход</Link>

                        {/* <div>{time}</div> */}
                        {/* <button onClick={getTimeFunc}>Get time</button> */}
                    </div>
                    <div className={`flex gap-3 items-center flex-row ${width < 375 ? 'flex-wrap' : ''}`}>
                        <TodayExpense data={todayExpense} isLoading={isLoadingTodayExpense} reload={reloadTodayExpense} error={todayExpenseError} />
                        <TotalCash data={totalCash} isLoading={isLoadingTotalCash} reload={reloadTotalCash} error={totalCashError} />
                    </div>
                </div>
                <div className=' flex flex-wrap md:grid md:grid-cols-2 md:grid-rows-2  xl:grid-rows-1 xl:grid xl:grid-cols-4 gap-3 mb-3'>
                    <ShadowBlock>
                        <ChartBlock
                            title='Расход'
                            monthExpense={monthExpense}
                            isLoading={isLoadingMonthExpense}
                            error={monthExpenseError}
                            reload={reloadMonthExpense}
                        />
                    </ShadowBlock>
                    <ShadowBlock>
                        <ChartBlock
                            title='Доход'
                            link={links.income}
                            monthExpense={monthRevenue}
                            isLoading={isLoadingMonthRevenue}
                            error={monthRevenueError}
                            reload={reloadMonthRevenue}
                        />
                    </ShadowBlock>
                    <div className='flex w-full md:col-span-2'>
                        <ShadowBlock>
                            <History
                                title='История операций'
                                data={data}
                                isLoading={isLoadingOperations}
                                reloadAll={getOperations}
                                reload={reloadOperations}
                                error={dataError}
                            />
                        </ShadowBlock>
                    </div>
                </div>
                <div className='grid grid-cols-4'>
                    <div className='col-span-4  xl:col-span-2'>
                        <ShadowBlock>
                            <BarChart
                                isLoading={isLoadingYearExpense}
                                yearExpense={yearExpense}
                                reload={reloadYearExpense}
                                error={yearExpenseError}
                            />
                        </ShadowBlock>
                    </div>
                </div>
            </div>
        </Container >
    )
}
