import React, { useState } from 'react'
import { Chart as ChartJS, ArcElement, Legend } from 'chart.js';
import { Doughnut } from 'react-chartjs-2';
import { Link, useNavigate } from 'react-router-dom';
import { links } from '../../routes/links';
import { CategoryItem } from '../CategoryItem';
import { useDispatch } from 'react-redux';
import moment from 'moment'
import { MainLoading } from '../MainLoading';
import { ShowMoreButton } from '../ShowMoreButton';
import { setActiveCategory, setCurCategory, setCurCategoryAmount, setIsOpen, setUpdateFlag } from '../../store/slices/filterSlice';
import { ButtonError } from '../ButtonError';
ChartJS.register(ArcElement, Legend);

export const ChartBlock = (
    {
        scrollToIntoView,
        activeCategory,
        changeMonth,
        title = '',
        full = false,
        monthExpense = {},
        curMonth,
        isLoading,
        error,
        reload

    }) => {
    const [isPercent, setIsPercent] = useState(false)
    const dispatch = useDispatch()

    const navigate = useNavigate()

    const data = {
        datasets: [
            {
                label: '# of Votes',
                data: monthExpense?.categories ? monthExpense.categories.map(el => el.amount) : [],
                backgroundColor: monthExpense?.categories ? monthExpense.categories.map(el => el.colorHex) : [],
                borderColor: monthExpense?.categories ? monthExpense.categories.map(el => el.colorHex) : [],
                borderWidth: 1,
            },
        ],
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
        dispatch(setIsOpen(true))
        dispatch(setCurCategory(title))
        dispatch(setCurCategoryAmount(idx))
        dispatch(setActiveCategory(title))
    }
    const navigateLink = (titleItem, idx) => {
        navigate(title === 'Расход' ? links.expenses : links.income)
        dispatch(setIsOpen(true))
        dispatch(setCurCategory(titleItem))
        dispatch(setCurCategoryAmount(idx))
        dispatch(setActiveCategory(titleItem))
        dispatch(setUpdateFlag(false))
    }


    if (isLoading) {
        return <div className='absolute top-1/2 left-1/2 -translate-x-1/2'><MainLoading size={32} /></div>
    }
    if (error) {
        <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
            <ButtonError update={reload} />
        </div>
    }

    return (
        <>
            {
                error
                    ? <div className='absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
                        <ButtonError update={reload} />
                    </div>
                    :
                    < div className='flex flex-col justify-between h-full' >
                        <div className=''>
                            <div className=' mb-5 flex justify-between text-lg font-bold gap-1'>
                                <h3 className='capitalize'>{title} {monthExpense?.month}</h3>
                                <p className='whitespace-nowrap'>{monthExpense?.totalMonthAmount} &#8381;</p>
                            </div>
                            <div className='max-full mx-auto mb-3 relative'>
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
                                            fill={localStorage.getItem('theme') === 'dark' ? "#eeeeee" : '#292929'}
                                            className="fill-000000"

                                        ></path></svg></div>
                                    : ''
                                }
                                {monthExpense?.categories?.length
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
                                                className="w-[160px] sm:w-full mx-7 sm:mx-0 md:w-auto rounded-3xl  bg-gradient-to-r from-mainGreen to-bggGreen text-center text-background py-4 md:py-6 px-4 font-bold  hover:from-mainGreen hover:to-mainGreen transition-colors"
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
                                            fill={localStorage.getItem('theme') === 'dark' ? "#eeeeee" : '#292929'}
                                            className="fill-000000"
                                        ></path></svg></div>
                                    : ''
                                }
                            </div>
                            <div className='flex justify-end mb-3 select-none'>
                                {monthExpense?.categories?.length ? isPercent
                                    ? <svg
                                        onClick={() => setIsPercent(false)}
                                        className='w-5 h-5 block mr-1 cursor-pointer'
                                        viewBox="0 0 256 256"
                                        xmlns="http://www.w3.org/2000/svg">
                                        <path
                                            fill="none"
                                            d="M0 0h256v256H0z"></path><path
                                                stroke={localStorage.getItem('theme') === 'dark' ? '#c6ff00' : '#292929'} strokeLinecap="round"
                                                strokeLinejoin="round" strokeWidth="16"
                                                d="M200 56 56 200"
                                                fill={localStorage.getItem('theme') === 'dark' ? '#c6ff00' : '#292929'}
                                                className="fill-000000 stroke-000000"></path><circle cx="76" cy="76"
                                                    fill="none" r="28"
                                                    stroke={localStorage.getItem('theme') === 'dark' ? '#c6ff00' : '#292929'} strokeMiterlimit="10"
                                                    strokeWidth="16" className="stroke-000000"></circle>
                                        <circle cx="180" cy="180" fill="none" r="28"
                                            stroke={localStorage.getItem('theme') === 'dark' ? '#c6ff00' : '#292929'}
                                            strokeMiterlimit="10" strokeWidth="16" className="stroke-000000"></circle></svg>

                                    : <svg
                                        onClick={() => setIsPercent(true)}
                                        className='w-5 h-5 block mr-1 cursor-pointer'
                                        viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                        <path d="M8 21h2v-3h6v-2h-6v-2h4.5c2.757 0 5-2.243 5-5s-2.243-5-5-5H9a1 1 0 0 0-1 1v7H5v2h3v2H5v2h3v3zm2-15h4.5c1.654 0 3 1.346 3 3s-1.346 3-3 3H10V6z"
                                            fill={localStorage.getItem('theme') === 'dark' ? '#c6ff00' : '#292929'}
                                            className="fill-000000"></path></svg>
                                    : ''
                                }
                            </div>
                            <ul className='flex flex-col mb-1 flex-1'>
                                {monthExpense?.categories
                                    ? full
                                        ? monthExpense.categories?.length
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
                                            onClick={navigateLink}
                                            id={i}
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
                        {
                            monthExpense?.categories?.length ? !full &&
                                < div className='text-right py-1 '>
                                    <ShowMoreButton
                                        to={title === 'Расход' ? links.expenses : links.income}
                                        title="Показать больше"
                                    />
                                </div>
                                : ''
                        }
                    </div >
            }
        </>
    )
}
