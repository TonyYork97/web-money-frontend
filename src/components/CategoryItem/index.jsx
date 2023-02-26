import React from 'react'

export const CategoryItem = ({
  onClick = () => null,
  title,
  amount,
  colorHex,
  id,
  activeCategory,
  percentAmount,
  isPercent,
}) => {
  return (
    <li
      onClick={() => onClick(title, id)}
      className={`${
        activeCategory === title
          ? 'md:bg-background md:dark:bg-whiteOpacity dark:bg-bggTop'
          : 'dark:bg-bggTop'
      } flex items-start justify-between gap-2  border-b border-black dark:border-none dark:shadow-blockLight   px-2 py-2 rounded-md mb-2 cursor-pointer hover:bg-background dark:hover:bg-bggBottom transition-colors`}
    >
      <div className='flex items-center gap-2 break-words'>
        <div
          className='w-3 h-3 rounded-lg'
          style={{ background: colorHex }}
        ></div>
        <p className=''>{title}</p>
      </div>
      <div className='whitespace-nowrap'>
        {isPercent ? <p>{percentAmount} &#37;</p> : <p>{amount} &#8381;</p>}
      </div>
    </li>
  )
}
