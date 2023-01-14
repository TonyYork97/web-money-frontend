import React from 'react'
import { MainLoading } from '../MainLoading'

export const TodayExpense = ({ data, isLoading, error, reload }) => {
  return (
    <div className='w-full md:min-w-[152px] lg:w-auto px-2 sm:px-3 py-2 rounded-xl bg-blackMenu  dark:bg-bggTop  dark:border-bggBottom border-textPrime border'>
      <div className='  text-right ml-auto'>
        <p className='text-sm mb-1 text-textOpacity dark:text-darkBlack'>Потрачено сегодня</p>
        {error
          ? <button onClick={reload}>Обновить</button>
          : isLoading
            ? <MainLoading size={23} />
            : <p className='font-bold text-lg whitespace-nowrap dark:text-darkBlack' >{data} &#8381;</p>
        }
      </div>
    </div>
  )
}
