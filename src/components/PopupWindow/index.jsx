import React from 'react'
import { useEffect } from 'react'
import Close from '../../assets/images/close.svg'

export const PopupWindow = ({ text, onClose, error = false }) => {
    useEffect(() => {
        setTimeout(() => {
            onClose()
        }, 3000)
    }, [])

    return (
        <div className={`${error ? 'bg-red-800' : 'bg-green-800'} max-w-md w-full rounded-md fixed top-14 left-1/2 -translate-x-1/2 z-[982] flex justify-between text-textPrime cursor-pointer p-2 md:p-4 items-center text-center`}>
            <div>{text}</div>
            <img src={Close} onClick={onClose} alt="close" className=" w-6 h-6" />
        </div>
    )
}
