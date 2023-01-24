import React from 'react'
import { ButtonError } from '../ButtonError'
import { MainLoading } from '../MainLoading'

export const TotalCash = ({ data, isLoading, error, reload }) => {
  return (
    <div className='w-full md:min-w-[152px] lg:w-auto px-2 sm:px-3 py-2 rounded-xl bg-blackMenu dark:bg-bggTop dark:border-bggBottom border-textPrime border'>
      <div className='text-right'>
        <p className='text-sm mb-1 text-textOpacity dark:text-darkBlack'>Всего средств</p>
        {error
          ? <div className='flex justify-end'>
            <ButtonError title="Обновить" update={reload} />
          </div>
          : isLoading
            ? <MainLoading size={23} />
            : data.includes('-')
              ? <p className='font-bold text-lg text-darkRed dark:text-darkRed whitespace-nowrap'>{data} &#8381;</p>
              : <p className='font-bold text-lg text-mainGreen dark:text-darkBlack whitespace-nowrap'>{data} &#8381;</p>
        }
      </div>
    </div>
  )
}
