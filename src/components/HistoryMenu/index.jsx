import React, { useState } from 'react'
import Dots from '../../assets/images/dots.svg'
import DotsLight from '../../assets/images/dots-light.svg'
import Trash from '../../assets/images/trash.svg'
import Edit from '../../assets/images/edit.svg'
import EditLight from '../../assets/images/edit-light.svg'
import { Link } from 'react-router-dom'
import axios from '../../axios'
import { useDispatch, useSelector } from 'react-redux'
import { setUpdateFlag } from '../../store/slices/filterSlice'
import { PopupWindow } from '../PopupWindow'
import {
  setDeleteError,
  setDeleteSuccess,
} from '../../store/slices/operationsSlice'

export const HistoryMenu = ({ id, type, reload }) => {
  const dispatch = useDispatch()
  const [activeMenu, setActiveMenu] = useState(false)

  const handleClick = () => {
    setActiveMenu(true)
    if (activeMenu) {
      setActiveMenu(false)
    }
  }

  const deleteOperation = async () => {
    dispatch(setUpdateFlag(false))
    await axios
      .delete(`/app/operation/${id}`)
      .then(({ data }) => {
        if (!data?.message) {
          dispatch(setDeleteSuccess(true))
          reload(true)
        } else {
          dispatch(setDeleteError('Не удалось удалить операцию'))
        }
      })
      .catch((err) => {
        console.warn(err)
        dispatch(setDeleteError('Не удалось удалить операцию'))
      })
      .finally(() => {
        setActiveMenu(false)
        dispatch(setUpdateFlag(true))
      })
  }

  return (
    <>
      <div
        onMouseLeave={() => setActiveMenu(false)}
        className='w-6  relative select-none'
      >
        {localStorage.getItem('theme') === 'dark' ? (
          <img
            onClick={handleClick}
            src={Dots}
            alt='menu'
            className='w-full select-none cursor-pointer'
          />
        ) : (
          <img
            onClick={handleClick}
            src={DotsLight}
            alt='menu'
            className='w-full select-none cursor-pointer'
          />
        )}
        {activeMenu && (
          <div className='absolute bg-black dark:bg-bggTop dark:border dark:border-bggBottom -translate-x-[70%] px-2 py-2 rounded-lg z-[981]'>
            <Link
              to={
                type === 'expense'
                  ? `/app/${id}/edit-expense`
                  : `/app/${id}/edit-revenue`
              }
              onClick={() => setActiveMenu(null)}
              className='flex justify-between items-center gap-1 mb-1 cursor-pointer rounded-lg hover:bg-background py-2 px-3 dark:hover:bg-bggBottom transition-colors'
            >
              <div className='w-4'>
                {localStorage.getItem('theme') === 'dark' ? (
                  <img src={Edit} alt='edit' className='w-full' />
                ) : (
                  <img src={EditLight} alt='edit' className='w-full' />
                )}
              </div>
              <p>Изменить</p>
            </Link>
            <div
              onClick={deleteOperation}
              className='flex justify-between items-center gap-1 cursor-pointer rounded-lg hover:bg-background py-2 px-3 dark:hover:bg-bggBottom transition-colors'
            >
              <div className='w-5'>
                <img src={Trash} alt='delete' className='w-full' />
              </div>
              <p className='text-red-700'>Удалить</p>
            </div>
          </div>
        )}
      </div>
    </>
  )
}
