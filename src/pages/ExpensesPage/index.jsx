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
import { fetchGetMontExpense } from '../../store/slices/operationsSlice'
import { History } from '../../components/History'
import { userIsAuth } from '../../store/slices/authSlice'
import { useNavigate } from 'react-router-dom'
import { useRef } from 'react'
import { useResize } from '../../hooks/Rezise'
import { setActiveCategory, setCurCategory, setCurCategoryAmount, setIsOpen } from '../../store/slices/filterSlice'


export const ExpensesPage = () => {
    // const [isOpen, setIsOpen] = useState(false);
    const [curMonth, setCurMonth] = useState(moment().format('YYYY-MM-DD'))
    // const [curCategory, setCurCategory] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    const [operations, setOperations] = useState([]);
    // const [curCategoryAmount, setCurCategoryAmount] = useState(0);
    // const [activeCategory, setActiveCategory] = useState(0);
    const [flag, setFlag] = useState(false)
    const { width } = useResize()

    const dispatch = useDispatch()
    const { monthExpense, isLoadingMonthExpense } = useSelector(state => state.operations);
    const { curCategory, curCategoryAmount, activeCategory, isOpen } = useSelector(state => state.filter);

    const isAuth = useSelector(userIsAuth);
    const navigate = useNavigate();

    const classBlock = ` ${isOpen ? '' : 'translate-x-full'} md:translate-x-0  transition-all fixed md:static top-0 bottom-0 left-0 right-0 z-[500] md:z-0 overflow-auto bg-blackMenu md:bg-transparent rounded-xl`

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
                    type: 'expense',
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

            await dispatch(fetchGetMontExpense({ currentMonth: curMonth })).then(async (data) => {
                if (!curCategory) {
                    dispatch(setCurCategory(data.payload?.categories[0]?.title || ''))
                }
                await axios.get('app/operation/history/category-operations', {
                    params: {
                        type: 'expense',
                        currentMonth: curMonth,
                        category: curCategory || data.payload?.categories[0]?.title || ''
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
        window.scrollTo(0, 0)
        return () => {
            dispatch(setCurCategory(''))
            dispatch(setCurCategoryAmount(0))
            dispatch(setActiveCategory(0))
            dispatch(setIsOpen(false))
        }
    }, [])

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
                <div className='grid md:grid-cols-2 gap-2 items-start'>

                    <ShadowBlock>
                        <ChartBlock
                            scrollToIntoView={scrollToIntoView}
                            isLoading={isLoadingMonthExpense}
                            activeCategory={activeCategory}
                            changeMonth={changeMonth}
                            setOperations={setOperations}
                            curMonth={curMonth}
                            setCurMonth={setCurMonth}
                            title='Расход'
                            monthExpense={monthExpense}
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
                                {monthExpense.categories
                                    ? monthExpense.categories[curCategoryAmount]?.amount !== undefined
                                        ? <p className=' whitespace-nowrap'>{monthExpense.categories[curCategoryAmount]?.amount} &#8381;</p>
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
