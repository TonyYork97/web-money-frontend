import React, { useRef, useState } from 'react'
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import Percent from '../../assets/images/percent.png'
import Ruble from '../../assets/images/ruble.png'
import { Link } from 'react-router-dom';
import { links } from '../../links';
import { useEffect } from 'react';
import { CategoryItem } from '../CategoryItem';
import { useSelector } from 'react-redux';
import moment from 'moment'
import { MainLoading } from '../MainLoading';
ChartJS.register(ArcElement, Legend);

export const ChartBlock = (
    {
        scrollToIntoView,
        setActiveCategory,
        activeCategory,
        changeMonth,
        setCurCategoryAmount,
        setPage,
        title = '',
        full = false,
        setIsOpen = false,
        monthExpense = {},
        divededMonth,
        curMonth,
        setCurCategory,
        isLoading

    }) => {
    const [isPercent, setIsPercent] = useState(false)
    // const [allCategory, setAllCategory] = useState([])
    const [percentCategory, setPercentCategory] = useState([])

    const intoViewRef = useRef(null)

    useEffect(() => {
        // setAllCategory(monthExpense?.categories?.filter((_, idx) => idx < 3))
        setPercentCategory(monthExpense?.categories?.map((el, idx) => {
            return Math.round(el.amount * 100 / monthExpense.totalMonthAmount)
        }))
    }, [])
    const data = {
        datasets: [
            {
                label: '# of Votes',
                // data: divededMonth.amounts.length ? divededMonth?.amounts : [],
                // backgroundColor: divededMonth ? divededMonth?.colorHex : [],
                // borderColor: divededMonth ? divededMonth?.colorHex : [],
                data: monthExpense?.categories ? monthExpense.categories.map(el => el.amount) : [],
                backgroundColor: monthExpense?.categories ? monthExpense.categories.map(el => el.colorHex) : [],
                borderColor: monthExpense?.categories ? monthExpense.categories.map(el => el.colorHex) : [],
                borderWidth: 1,
            },
        ],
        // labels: divededMonth.titles.length ? divededMonth?.titles : [],
        labels: monthExpense?.categories ? monthExpense.categories.map(el => el.title) : [],
    }
    const options = {
        plugins: {
            legend: {
                display: false,
            }
        }
    }

    const handleClick = (title, idx) => {
        scrollToIntoView()
        setCurCategory(title)
        setIsOpen(true)
        setCurCategoryAmount(idx)
        setActiveCategory(idx)
    }

    if (isLoading) {

        return <div className='absolute top-1/2 left-1/2 -translate-x-1/2'><MainLoading size={32} /></div>
    }

    return (
        <div className='flex flex-col justify-between h-full'>
            <div className=''>
                <div className=' mb-5 flex justify-between text-lg font-bold gap-1'>
                    <h3 className='capitalize'>{title} {monthExpense.month}</h3>
                    <p className='whitespace-nowrap'>{monthExpense.totalMonthAmount} &#8381;</p>
                </div>
                <div className='max-full mx-auto mb-7 relative'>
                    {full
                        ? curMonth === moment().add(-11, 'M').format('YYYY-MM-DD')
                            ? ''
                            :
                            <div
                                onClick={() => changeMonth(-1)}
                                className='select-none absolute top-1/2 -translate-y-1/2 cursor-pointer'
                            ><svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-8 h-8'
                            ><path
                                d="M353 450a15 15 0 0 1-10.61-4.39L157.5 260.71a15 15 0 0 1 0-21.21L342.39 54.6a15 15 0 1 1 21.22 21.21L189.32 250.1l174.29 174.29A15 15 0 0 1 353 450Z"
                                data-name="1"
                                fill="#eeeeee"
                                className="fill-000000"

                            ></path></svg></div>
                        : ''
                    }
                    {monthExpense?.categories.length
                        ? <div className='max-w-[208px] sm:max-w-[320px] md:max-w-[260px] lg:max-w-[360px] mx-auto'> <Doughnut data={data}
                            options={options}
                            height={400}
                        /></div>
                        : title === 'Расход'
                            ? <div className='flex flex-col justify-center items-center gap-8 h-[360px] max-w-[360px] mx-auto w-full'>
                                <h3 className='font-bold text-lg max-w-[220px] text-center mx-auto'>Добавь свой первый расход в этом месяце</h3>
                                <Link to={links.addExpense}
                                    className="w-[160px] sm:w-full md:w-auto  rounded-3xl text-center border border-mainGreen py-4 px-4 md:py-6 font-bold  hover:bg-secondBackground transition-colors "
                                >Добавить расход</Link>
                            </div>
                            : <div className='flex flex-col justify-center items-center gap-8 h-[360px] max-w-[360px] mx-auto w-full'>
                                <h3 className='font-bold text-lg max-w-[220px] text-center mx-auto'>Добавь свой первый доход в этом месяце</h3>
                                <Link to={links.addRevenue}
                                    className="w-[160px] sm:w-full mx-7 sm:mx-0 md:w-auto rounded-3xl bg-mainGreen text-center text-background py-4 md:py-6 px-4 font-bold  hover:bg-secondGreen transition-colors"
                                >Добавить доход</Link>
                            </div>
                    }
                    {full
                        ? curMonth === moment().format('YYYY-MM-DD')
                            ? ''
                            : <div
                                onClick={() => changeMonth(1)}
                                className='select-none absolute top-1/2 right-0 -translate-y-1/2 cursor-pointer'
                            ><svg
                                viewBox="0 0 512 512"
                                xmlns="http://www.w3.org/2000/svg"
                                className='w-8 h-8 rotate-180'
                            ><path
                                d="M353 450a15 15 0 0 1-10.61-4.39L157.5 260.71a15 15 0 0 1 0-21.21L342.39 54.6a15 15 0 1 1 21.22 21.21L189.32 250.1l174.29 174.29A15 15 0 0 1 353 450Z"
                                data-name="1"
                                fill="#eeeeee"
                                className="fill-000000"

                            ></path></svg></div>
                        : ''
                    }
                </div>
                <div className='flex justify-end mb-3 select-none'>
                    {monthExpense?.categories.length ? isPercent
                        ? <img className='w-5 h-5 block mr-1 cursor-pointer' onClick={() => setIsPercent(false)} src={Ruble} alt="ruble" />

                        : <img className='w-5 h-5 block mr-1 cursor-pointer' onClick={() => setIsPercent(true)} src={Percent} alt="percent" />

                        : ''
                    }


                </div>
                <ul className='flex flex-col mb-1 flex-1'>
                    {monthExpense?.categories
                        ? full
                            ? monthExpense.categories.length
                                ? monthExpense.categories.map((el, i) => <CategoryItem
                                    onClick={handleClick}
                                    id={i}
                                    key={el.title}
                                    title={el.title}
                                    amount={el.amount}
                                    percentAmount={el.percentAmount}
                                    isPercent={isPercent}
                                    colorHex={el.colorHex}
                                    activeCategory={activeCategory}
                                />)
                                : ''
                            : monthExpense.categories.map((el, i) => i < 3 ? <CategoryItem
                                key={el.title}
                                title={el.title}
                                amount={el.amount}
                                isPercent={isPercent}

                                percentAmount={el.percentAmount}
                                colorHex={el.colorHex}
                            /> : '')
                        : ''
                    }
                </ul >
            </div>
            {monthExpense?.categories.length ? !full &&
                < div className='text-right py-1 '>
                    <Link
                        to={title === 'Расход' ? links.expenses : links.income}
                        className='text-mainGreen font-light text-sm hover:text-green-500 transition-colors'
                    >
                        Показать больше
                    </Link>
                </div>
                : ''
            }



        </div>
    )
}
