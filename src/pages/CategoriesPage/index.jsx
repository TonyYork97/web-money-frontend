import React from 'react'
import { ChartBlock } from '../../components/ChartBlock'
import axios from '../../axios'
import { NavHistory } from '../../components/NavHisory'
import { ShadowBlock } from '../../components/ShadowBlock'
import Close from '../../assets/images/close.svg'
import CloseLight from '../../assets/images/close-light.svg'
import { useDispatch, useSelector } from 'react-redux'
import moment from 'moment'
import { useState } from 'react'
import { useEffect } from 'react'
import { fetchGetMontExpense, fetchGetMontRevenue } from '../../store/slices/operationsSlice'
import { History } from '../../components/History'
import { userIsAuth } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useResize } from '../../hooks/Rezise'
import { setActiveCategory, setCurCategory, setCurCategoryAmount, setIsOpen } from '../../store/slices/filterSlice'


export const CategoriesPage = ({ type }) => {
    // const [isOpen, setIsOpen] = useState(false);
    // const [curCategoryAmount, setCurCategoryAmount] = useState(0);
    // const [curCategory, setCurCategory] = useState('')
    // const [activeCategory, setActiveCategory] = useState(0);
    const [curMonth, setCurMonth] = useState(moment().format('YYYY-MM-DD'))
    const [isLoading, setIsLoading] = useState(false)
    const [operations, setOperations] = useState([]);
    const [flag, setFlag] = useState(false)
    const [errorOperation, setErrorOperation] = useState(null)
    const { width } = useResize()

    const dispatch = useDispatch()
    const { monthExpense, monthRevenue, isLoadingMonthExpense, isLoadingMonthRevenue, monthExpenseError, monthRevenueError } = useSelector(state => state.operations);
    const { curCategory, curCategoryAmount, activeCategory, isOpen } = useSelector(state => state.filter);

    const isAuth = useSelector(userIsAuth);
    const navigate = useNavigate();

    const classBlock = ` ${isOpen ? '' : 'translate-x-full'} md:translate-x-0  transition-all fixed md:static top-0 bottom-0 left-0 right-0 z-[500] md:z-0 overflow-auto bg-blackMenu dark:bg-bggTop  md:bg-transparent rounded-xl`

    const intoViefRefTwo = useRef(null)
    const changeMonth = async (direction) => {
        setOperations([])
        dispatch(setCurCategoryAmount(0))
        dispatch(setActiveCategory(0))
        dispatch(setCurCategory(''))
        setCurMonth(moment(curMonth).add(direction, 'M').format('YYYY-MM-DD'))
    }

    const scrollToIntoView = () => {
        intoViefRefTwo.current.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        })
    }

    const getOperations = async () => {
        try {
            setOperations([])
            setIsLoading(true);
            await axios.get('app/operation/history/category-operations', {
                params: {
                    type,
                    currentMonth: curMonth,
                    category: curCategory
                }
            }).then(({ data }) => {
                if (data?.message) {
                    setOperations([])
                    setErrorOperation('error')
                }
                setErrorOperation(null)
                setOperations([...data.operations])
            })
        } catch (err) {
            console.log(err);
            setErrorOperation('error')
            setOperations([])
        } finally {
            setIsLoading(false);
        }
    }

    const getExpense = async () => {
        try {
            setFlag(true)
            setIsLoading(true)
            setOperations([])
            if (type === 'expense') {

                await dispatch(fetchGetMontExpense({ currentMonth: curMonth })).then(async (data) => {
                    if (!curCategory) {
                        dispatch(setCurCategory(data.payload?.categories[0]?.title || ''))
                    }
                    await axios.get('app/operation/history/category-operations', {
                        params: {
                            type,
                            currentMonth: curMonth,
                            category: curCategory || data.payload?.categories[0]?.title || ''
                        }
                    }).then(({ data }) => {
                        setOperations([...data.operations])
                    })
                })
            } else {
                await dispatch(fetchGetMontRevenue({ currentMonth: curMonth })).then(async (data) => {
                    if (!curCategory) {
                        dispatch(setCurCategory(data.payload?.categories[0]?.title || ''))
                    }
                    await axios.get('app/operation/history/category-operations', {
                        params: {
                            type,
                            currentMonth: curMonth,
                            category: curCategory || data.payload?.categories[0]?.title || ''
                        }
                    }).then(({ data }) => {
                        setOperations([...data.operations])
                    })
                })
            }
        } catch (err) {
            console.log(err);
        } finally {
            setIsLoading(false)
            setFlag(false)
        }
    }

    const resetParams = () => {
        dispatch(setCurCategory(''))
        dispatch(setCurCategoryAmount(0))
        dispatch(setActiveCategory(0))
        dispatch(setIsOpen(false))
        setCurMonth(moment().format('YYYY-MM-DD'))
    }

    useEffect(() => {
        if (!localStorage.getItem('token') && !isAuth) {
            navigate('/', { replace: true })
        }
        if (isAuth) {
            getExpense()
        }
    }, [curMonth, isAuth, type])
    useEffect(() => {
        window.scrollTo(0, 0)
        return () => {
            resetParams()
        }
    }, [type])

    useEffect(() => {
        if (curCategory && !flag) {
            getOperations()
        }
    }, [curCategory]);


    return (
        <>
            <NavHistory
                ref={intoViefRefTwo}
                reset={resetParams}
            >
                <div className='grid md:grid-cols-2 gap-2 items-start'>

                    <ShadowBlock>
                        <ChartBlock
                            scrollToIntoView={scrollToIntoView}
                            isLoading={type === 'expense' ? isLoadingMonthExpense : isLoadingMonthRevenue}
                            activeCategory={activeCategory}
                            changeMonth={changeMonth}
                            setOperations={setOperations}
                            curMonth={curMonth}
                            setCurMonth={setCurMonth}
                            title={type === 'expense' ? 'Расход' : 'Доход'}
                            monthExpense={type === 'expense' ? monthExpense : monthRevenue}
                            error={type === 'expense' ? monthExpenseError : monthRevenueError}
                            reload={getExpense}
                            full
                        />
                    </ShadowBlock>

                    <div className={`${width < 768 ? classBlock : ''}`} >
                        <ShadowBlock>
                            <div
                                className='flex max-h-14 justify-between items-center text-lg font-bold fixed md:static mb-3 bg-background dark:bg-bggTop md:bg-transparent left-0 right-0 top-0 z-[501] py-2 px-1 md:py-0 gap-1'>
                                <div className='flex items-center gap-1'>
                                    {localStorage.getItem('theme') === 'dark'
                                        ? <img
                                            src={Close}
                                            alt="close category"
                                            className='w-8 h-8 md:hidden'
                                            onClick={() => dispatch(setIsOpen(false))}
                                        />
                                        : <img
                                            src={CloseLight}
                                            alt="close category"
                                            className='w-8 h-8 md:hidden'
                                            onClick={() => dispatch(setIsOpen(false))}
                                        />
                                    }
                                    <div className=' text-sm sm:text-base font-thin sm:font-bold dark:text-darkBlack'>
                                        <h3>{curCategory}</h3>
                                    </div>
                                </div>
                                {type === 'expense'
                                    ? monthExpense.categories
                                        ? monthExpense.categories[curCategoryAmount]?.amount !== undefined
                                            ? <p className=' whitespace-nowrap'>{monthExpense.categories[curCategoryAmount]?.amount} &#8381;</p>
                                            : ''
                                        : ''

                                    : monthRevenue.categories
                                        ? monthRevenue.categories[curCategoryAmount]?.amount !== undefined
                                            ? <p className=' whitespace-nowrap'>{monthRevenue.categories[curCategoryAmount]?.amount} &#8381;</p>
                                            : ''
                                        : ''
                                }
                            </div>
                            <div className='pt-12 md:hidden'></div>
                            <History
                                data={operations}
                                full
                                isLazyLoading={isLoading}
                                error={errorOperation}
                                reload={getOperations}
                            />
                        </ShadowBlock>
                    </div>
                </div>
            </NavHistory>
        </>
    )
}
