import React from 'react'
import Close from '../../assets/images/close.svg'

export const PopupWindow = ({ text, setPopup }) => {
    const closePopup = () => {
        setPopup(false)
    }

    return (
        <div className='max-w-md w-full rounded-md fixed top-14 left-1/2 -translate-x-1/2 z-[982] bg-green-800 text-textPrime cursor-pointer py-4 px-5 items-center text-center'>
            <div>{text}</div>
            <img src={Close} onClick={closePopup} className="absolute right-4 top-1/2 -translate-y-1/2 w-6 h-6" />
        </div>
    )
}
