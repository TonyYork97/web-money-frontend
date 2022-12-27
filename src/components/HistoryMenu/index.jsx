import React, { useState } from 'react'
import Dots from '../../assets/images/dots.svg'
import Trash from '../../assets/images/trash.svg'
import Edit from '../../assets/images/edit.svg'
import { links } from '../../links'
import { Link, useNavigate } from 'react-router-dom'
import axios from '../../axios'


export const HistoryMenu = ({ id, type }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleClick = () => {
    setActiveMenu(true)
    setIsOpen(true)
    if (activeMenu) {
      setActiveMenu(false)
    }

  }

  const deleteOperation = async () => {
    try {
      await axios.delete(`/app/operation/${id}`);
      setActiveMenu(false)
      window.location.reload()
    } catch (err) {
      console.warn(err);
    }
  }

  return (
    <div onMouseLeave={() => setActiveMenu(false)} className='w-6  relative select-none'>
      <img onClick={handleClick} src={Dots} alt="menu" className='w-full select-none cursor-pointer' />
      {activeMenu &&
        <div className='absolute bg-black -translate-x-[70%] px-4 py-3 rounded-lg z-[981]'>
          <Link
            to={type === 'expense' ? `/app/${id}/edit-expense` : `/app/${id}/edit-revenue`}
            onClick={() => setActiveMenu(null)}
            className='flex justify-between gap-1 mb-3 cursor-pointer'>
            <div className='w-4'><img src={Edit} alt="edit" className='w-full' /></div>
            <p>Изменить</p>
          </Link>
          <div

            onClick={deleteOperation}
            className='flex justify-between gap-1 cursor-pointer'>
            <div className='w-5'><img src={Trash} alt="delete" className='w-full' /></div>
            <p className='text-red-700'>Удалить</p>
          </div>
        </div>
      }
    </div>
  )
}
