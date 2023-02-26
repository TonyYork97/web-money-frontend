import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import CheckMark from '../../assets/images/checkmark.svg'
import ErrorMark from '../../assets/images/checkerror.svg'
import Close from '../../assets/images/close.svg'

export const PopupWindow = ({
  text,
  onClose,
  timeout = 3500,
  error = false,
}) => {
  const [cn, setCn] = useState('translate-y-[-172%]')

  useEffect(() => {
    const cnChange = setTimeout(() => {
      setCn('translate-y-[0%]')
    }, 100)
    const close = setTimeout(() => {
      onClose()
    }, timeout)
    return () => {
      setCn('translate-y-[-172%]')
      clearTimeout(cnChange)
      clearTimeout(close)
    }
  }, [])

  useEffect(() => {
    setTimeout(() => {
      setCn('translate-y-[-172%]')
    }, timeout - 150)
  }, [])

  return (
    <div
      className={`${cn} ${
        error ? 'bg-background' : 'bg-background '
      } border border-textPrime max-w-md w-full rounded-xl fixed top-8 left-1/2 -translate-x-1/2 z-[982] flex justify-between text-textPrime p-3 md:p-4 items-center text-center transition-all`}
    >
      <div className='flex items-center gap-1'>
        {error ? (
          <img
            src={ErrorMark}
            alt='error'
            className='w-6 h-6 animate-warning'
          />
        ) : (
          <img src={CheckMark} alt='okay' className='w-6 h-6 animate-jumping' />
        )}
        <div>{text}</div>
      </div>
      <img
        src={Close}
        onClick={onClose}
        alt='close'
        className=' w-6 h-6 cursor-pointer'
      />
    </div>
  )
}
