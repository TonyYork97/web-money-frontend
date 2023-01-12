import React, { useRef } from 'react'
import { ChartBlock } from '../../components/ChartBlock'
import axios from '../../axios'
import { NavHistory } from '../../components/NavHisory'
import { ShadowBlock } from '../../components/ShadowBlock'
import Close from '../../assets/images/close.svg'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchGetMontRevenue } from '../../store/slices/operationsSlice'
import { History } from '../../components/History'
import { userIsAuth } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useResize } from '../../hooks/Rezise'



export const RevenuePage = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [curMonth, setCurMonth] = useState(moment().format('YYYY-MM-DD'))
    const [curCategory, setCurCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [operations, setOperations] = useState([]);
    const [curCategoryAmount, setCurCategoryAmount] = useState(0);
    const [activeCategory, setActiveCategory] = useState(0);
    const [flag, setFlag] = useState(false)

    const { width } = useResize()
    const classBlock = ` ${isOpen ? '' : 'translate-x-full'} md:translate-x-0  transition-all fixed md:static top-0 bottom-0 left-0 right-0 z-[500] md:z-0 overflow-auto bg-blackMenu md:bg-transparent rounded-xl`


    const dispatch = useDispatch()
    const { monthRevenue, isLoadingMonthRevenue } = useSelector(state => state.operations);
    const isAuth = useSelector(userIsAuth);
    const navigate = useNavigate();

    const intoViefRefTwo = useRef()
    const scrollToIntoView = () => {
        intoViefRefTwo.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',

        })
    }

    const changeMonth = async (direction) => {
        setOperations([])
        setActiveCategory(0)
        setCurCategoryAmount(0)
        setCurMonth(moment(curMonth).add(direction, 'M').format('YYYY-MM-DD'))
    }

    const getOperations = async () => {
        try {
            setOperations([])
            setIsLoading(true);
            await axios.get('app/operation/history/category-operations', {
                params: {
                    type: 'revenue',
                    currentMonth: curMonth,
                    category: curCategory
                }
            }).then(({ data }) => {
                setOperations([...data.operations])
            })
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false);
        }
    }

    const getExpense = async () => {
        try {
            setFlag(true)
            setIsLoading(true)
            setOperations([])

            await dispatch(fetchGetMontRevenue({ currentMonth: curMonth })).then(async (data) => {
                setCurCategory(data.payload?.categories[0]?.title || '')
                await axios.get('app/operation/history/category-operations', {
                    params: {
                        type: 'revenue',
                        currentMonth: curMonth,
                        category: data.payload?.categories[0]?.title || ''
                    }
                }).then(({ data }) => {
                    setOperations([...data.operations])
                })
            })
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
            setFlag(false)
        }
    }

    useEffect(() => {
        if (!localStorage.getItem('token') && !isAuth) {
            navigate('/', { replace: true })
        }
        if (isAuth) {
            getExpense()
        }
    }, [curMonth, isAuth])

    useEffect(() => {

        if (curCategory && !flag) {
            getOperations()
        }
    }, [curCategory]);
    return (
        <>
            <NavHistory
                ref={intoViefRefTwo}
            >
                <div className='grid  md:grid-cols-2 gap-2 items-start'>
                    <ShadowBlock>
                        <ChartBlock
                            scrollToIntoView={scrollToIntoView}
                            isLoading={isLoadingMonthRevenue}
                            setActiveCategory={setActiveCategory}
                            activeCategory={activeCategory}
                            changeMonth={changeMonth}
                            setCurCategoryAmount={setCurCategoryAmount}
                            setOperations={setOperations}
                            setCurCategory={setCurCategory}
                            curMonth={curMonth}
                            setCurMonth={setCurMonth}
                            setIsOpen={setIsOpen}
                            title='Доход'
                            monthExpense={monthRevenue}
                            full
                        />
                    </ShadowBlock>
                    <div className={`${width < 768 ? classBlock : ''}`} >

                        <ShadowBlock>
                            <div
                                className='flex max-h-14 justify-between items-center text-lg font-bold fixed md:static mb-3  bg-background md:bg-transparent left-0 right-0 top-0 z-[501] py-2 px-1 md:py-0 gap-1'>
                                <div className='flex items-center gap-1'>
                                    <img
                                        src={Close}
                                        alt="close category"
                                        className='w-8 h-8 md:hidden'
                                        onClick={() => setIsOpen(false)}
                                    />
                                    <div className=' text-sm sm:text-base font-thin sm:font-bold'>
                                        <h3>{curCategory}</h3>
                                    </div>
                                </div>
                                {monthRevenue.categories
                                    ? monthRevenue.categories[curCategoryAmount]?.amount !== undefined
                                        ? <p className='whitespace-nowrap'>{monthRevenue.categories[curCategoryAmount]?.amount} &#8381;</p>
                                        : ''
                                    : ''
                                }

                            </div>
                            <div className='pt-12 md:hidden'></div>
                            <History
                                data={operations}
                                full
                                isLazyLoading={isLoading}
                            />
                        </ShadowBlock>
                    </div>
                </div>

            </NavHistory>
        </>
    )
}
