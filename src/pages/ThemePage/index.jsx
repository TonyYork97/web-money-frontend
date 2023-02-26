import React from 'react'
import { useEffect } from 'react'

export const ThemePage = ({ theme, setTheme, blur, setBlur }) => {
  useEffect(() => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme(true)
    } else {
      setTheme(false)
    }
  }, [setTheme])

  const handleChangeTheme = () => {
    if (localStorage.getItem('theme') === 'dark') {
      setTheme(false)
      localStorage.setItem('theme', 'light')
    } else {
      setTheme(true)
      localStorage.setItem('theme', 'dark')
    }
  }

  const handleChangeBlur = () => {
    if (localStorage.getItem('blur')) {
      setBlur(false)
      localStorage.removeItem('blur')
    } else {
      setBlur(true)
      localStorage.setItem('blur', 'true')
    }
  }
  return (
    <div>
      {/* change theme */}
      <h2 className='mb-8 font-bold text-lg '>Тема</h2>
      <div className='flex items-center gap-3 mb-3'>
        <div className=''>
          <input
            type='checkbox'
            hidden
            onChange={handleChangeTheme}
            checked={localStorage.getItem('theme') === 'dark' ? true : false}
            id='highload1'
            name='highload1'
          />
          <label
            htmlFor='highload1'
            data-onlabel='on'
            data-offlabel='off'
            className={`${
              theme
                ? 'after:left-[23px] bg-mainGreen'
                : 'after:left-[1px] bg-bggBottom'
            } border border-darkBlack inline-block  relative w-[48px] h-[24px] rounded-[30px] cursor-pointer after:rounded-[50%] after:absolute after:top-[0px]  after:w-[22px] after:h-[22px] after:bg-white after:transition-all transition-all`}
          ></label>
        </div>
        <p className=''>{theme ? 'Темная тема' : 'Светлая тема'}</p>
      </div>
      {/* change blur */}
      <div className='flex items-center gap-3'>
        <div className=''>
          <input
            type='checkbox'
            hidden
            onChange={handleChangeBlur}
            checked={localStorage.getItem('blur') ? true : false}
            id='highload2'
            name='highload1'
          />
          <label
            htmlFor='highload2'
            data-onlabel='on'
            data-offlabel='off'
            className={`${
              blur
                ? 'after:left-[23px] bg-mainGreen'
                : 'after:left-[1px] bg-bggBottom'
            } border border-darkBlack inline-block  relative w-[48px] h-[24px] rounded-[30px] cursor-pointer after:rounded-[50%] after:absolute after:top-[0px]  after:w-[22px] after:h-[22px] after:bg-white after:transition-all transition-all`}
          ></label>
        </div>
        <p className=''>{blur ? 'Блики включены' : 'Блики выключены'}</p>
      </div>
    </div>
  )
}
