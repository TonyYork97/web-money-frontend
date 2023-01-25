import React from 'react'
import moment from 'moment'
import { HistoryMenu } from '../HistoryMenu'

export const HistoryCategoryItem = ({ id, title, amount, date, type, category, paymentMethod, paymentMethodImage, idx, reload }) => {

    return (
        <div className='flex gap-2 justify-between bg-background dark:bg-bggTop dark:shadow-blockLight px-2 py-1 rounded-lg border-b boreder-textPrime mb-3'>
            <div className=''>
                <h3 className='break-all'>{title}</h3>
                <p className='text-[11px]  text-textOpacity dark:text-textOpacitySecond break-words'>{moment(date).format('DD.MM.YYYY')}</p>
            </div>
            <div className='flex  gap-3 md:gap-4 items-center'>
                <div className='flex flex-col items-end sm:flex-row-reverse sm:gap-3 sm:items-center sm:justify-between'>
                    {type === 'revenue'
                        ? <p className='text-mainGreen dark:text-green-700 whitespace-nowrap mb-[1px]'>+{amount} &#8381;</p>
                        : <p className='whitespace-nowrap mb-[1px]'>{amount} &#8381;</p>
                    }
                    {paymentMethod && <div className=''>
                        {paymentMethodImage
                            ? <img className='w-6 sm:w-7 text-textOpacity' src={`https://web-money-backend.onrender.com${paymentMethodImage}`} alt={paymentMethod} title={paymentMethod} />
                            : <p className='text-[11px]'>{paymentMethod}</p>
                        }
                    </div>}
                </div>
                <HistoryMenu id={id} type={type} reload={reload} />
            </div>
        </div>
    )
}
