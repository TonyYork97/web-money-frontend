import React from 'react'
import { useEffect } from 'react'

export const ThemePage = ({ theme, setTheme }) => {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme(true)
    } else {
      setTheme(false)
    }
  }, [setTheme])

  const handleChange = () => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme(false)
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(true)
      localStorage.setItem('theme', 'dark')
    }
  }
  return (
    <div>
      <h2 className='mb-8 font-bold text-lg '>Тема</h2>
      <div className='flex items-center gap-3'>
        <div className=''>
          <input type="checkbox" hidden onChange={handleChange} checked={localStorage.getItem('theme') === 'dark' ? true : false} id="highload1" name="highload1" />
          <label htmlFor="highload1" data-onlabel="on" data-offlabel="off"
            className={`${theme ? 'after:left-[23px] bg-mainGreen' : 'after:left-[1px] bg-bggBottom'} border border-darkBlack inline-block  relative w-[48px] h-[24px] rounded-[30px] cursor-pointer after:rounded-[50%] after:absolute after:top-[0px]  after:w-[22px] after:h-[22px] after:bg-white after:transition-all transition-all`}></label>
        </div>
        <p className=''>{theme ? 'Темная тема' : 'Светлая тема'}</p>
      </div>
    </div>
  )
}
