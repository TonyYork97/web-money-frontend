import React from 'react'

export const ButtonError = ({ update, title = 'Попрбуйте обновить' }) => {
  return (
    <div className='flex flex-col items-center gap-3'>
      <button
        className=' rounded-xl text-center border border-darkRed px-2 py-1  font-bold  hover:bg-secondBackground  dark:hover:bg-bggTop transition-colors'
        onClick={update}
      >
        {title}
      </button>
    </div>
  )
}
