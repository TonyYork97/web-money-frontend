import React, { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import { Container } from '../../components/Container'
import ArrowLeft from '../../assets/images/arrow-left.png'
import Close from '../../assets/images/close.png'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchChangeLastName, fetchChangeName, fetchLogOut, userIsAuth } from '../../store/slices/authSlice'
import { MainLoading } from '../../components/MainLoading'
import { links } from '../../links'


export const Profile = ({ children }) => {

  const dispatch = useDispatch()

  const { isLoading } = useSelector(state => state.auth)
  const isAuth = useSelector(userIsAuth);

  const navigate = useNavigate();

  const [activeClose, setActiveClose] = useState(false);
  const [activeArrow, setActiveArrow] = useState(true);

  const openMenu = () => {
    setActiveArrow(false);
    setActiveClose(true);
  }

  const closeMenu = () => {
    setActiveArrow(true);
    setActiveClose(false);
  }


  const logOutClick = () => {
    dispatch(fetchLogOut())
    navigate('/', { replace: true })
  }


  useEffect(() => {
    if (!localStorage.getItem('token') && !isAuth) {
      navigate('/', { replace: true })
    }


  }, [isAuth])





  if (isLoading && !isAuth) {
    return <div className='w-full h-screen flex justify-center items-center'><MainLoading /></div>
  }

  return (
    <Container>
      <div className='max-w-[1280px]  bg-secondBackground fixed w-full top-[52px] h-[calc(100%-52px)] left-2/4 -translate-x-2/4 rounded-lg'>
        <div className='px-3 py-2 mb-3 flex justify-between items-center'>
          <div className='flex gap-2 items-center'>
            {activeArrow && <div className='w-7 md:hidden' onClick={openMenu}><img src={ArrowLeft} alt="open menu" className='w-full' /></div>}
            <h3 className='text-lg font-bold '>Мой профиль</h3>
          </div>
          {activeClose && <div className='w-7 md:hidden' onClick={closeMenu}><img src={Close} alt="close" className='w-full' /></div>}
        </div>
        <div className='relative flex  gap-4 overflow-hidden h-[calc(100%-60px)]'>
          <div className={`${activeClose ? 'w-full' : 'w-0'} transition-all absolute h-full bg-blackMenu md:static border-r border-whiteOpacity flex flex-col  mx-1 md:max-w-[260px] md:w-full z-[600] overflow-y-auto`}>

            <Link to={links.profile} className='px-3 py-2 rounded-full font-bold mb-2 bg-whiteOpacity hover:bg-whiteOpacity'>Аккаунт</Link>
            <Link to="account" className='px-3 py-2 rounded-full font-bold mb-2 hover:bg-whiteOpacity'>Тема</Link>
            <button
              onClick={logOutClick}
              className='px-3 py-2 text-left rounded-full font-bold mb-2 text-red-600 hover:bg-whiteOpacity'
            >Выйти из профиля</button>


          </div>
          {children}
        </div>

      </div >
    </Container >
  )
}
