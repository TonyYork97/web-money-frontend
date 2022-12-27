import React, { useState } from 'react'

import moment from 'moment'
import { useNavigate } from 'react-router-dom'
import { HistoryMenu } from '../HistoryMenu'

export const HistoryItem = ({ id, title, amount, date, type, category, func, paymentMethod, paymentMethodImage, idx }) => {
    const navigate = useNavigate();
    const closeMenu = (e) => {
        e.stopPrapagation();
    }




    return (

        <div className='flex gap-2 justify-between bg-background px-2 py-1 rounded-lg border-b boreder-textPrime mb-3'>
            <div className=''>
                <h3 className='break-all'>{title}</h3>
                <p className='text-[11px]  text-textOpacity break-words'>{category}</p>
            </div>
            <div className='flex  gap-3 md:gap-4 items-center'>

                <div className='flex flex-col items-end sm:flex-row-reverse sm:gap-3 sm:items-center sm:justify-between'>
                    {type === 'revenue'
                        ? <p className='text-mainGreen whitespace-nowrap mb-[1px]'>+{amount}</p>
                        : <p className='whitespace-nowrap mb-[1px]'>{amount} &#8381;</p>
                    }
                    {paymentMethod && <div className=''>
                        {paymentMethodImage
                            ? <img className='w-6 sm:w-7 text-textOpacity' src={`http://localhost:8000${paymentMethodImage}`} alt={paymentMethod} title={paymentMethod} />
                            : <p className='text-[11px]'>{paymentMethod}</p>
                        }
                    </div>}
                </div>
                <HistoryMenu id={id} type={type} />
            </div>
        </div>

    )
}
