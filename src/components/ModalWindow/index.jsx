import React from 'react'
import Close from '../../assets/images/close.svg'
import CloseLight from '../../assets/images/close-light.svg'

export const ModalWindow = ({ onClose, children }) => {
  return (
    <div onClick={onClose} className='fixed z-[990] bg-[rgba(0,0,0,0.8)] left-0 top-0 right-0 h-[100vh] w-full  overflow-auto  '>

      <div onClick={(e) => e.stopPropagation()} className='absolute max-w-[480px] w-full  top-1/2 -translate-y-1/2 left-1/2 -translate-x-1/2 bg-blackMenu dark:bg-bggTop dark:border dark:border-bggBottom py-3 px-3 rounded-lg'>
        <div className='mb-3'>
          <div onClick={onClose} className='absolute pointer right-2 top-2'>
            {localStorage.getItem('theme') === 'dark'
              ? <img src={Close} alt="close" className=" w-6 h-6" />
              : <img src={CloseLight} alt="close" className="w-6 h-6" />

            }
          </div>
        </div>
        {children}
      </div>
    </div>
  )
}
