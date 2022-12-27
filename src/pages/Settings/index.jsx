import React, { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Container } from '../../components/Container'
import { links } from '../../links'
import ArrowLeft from '../../assets/images/arrow-left.png'
import Close from '../../assets/images/close.svg'
import { fetchLogOut, userIsAuth } from '../../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'


export const Settings = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const isAuth = useSelector(userIsAuth);


  const closeMenu = () => {
    setActiveMenu(false)
  }
  const openMenu = () => {
    setActiveMenu(true)
  }

  const logOutClick = () => {
    dispatch(fetchLogOut())
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (!localStorage.getItem('token') && !isAuth) {
      navigate('/', { replace: true })
    }
  }, [isAuth]);



  return (
    <Container>
      <div className='relative flex max-w-[1024px] mx-auto bg-blackMenu rounded-lg h-[calc(100vh-56px)] p-3'>
        <div className={`${activeMenu ? 'translate-x-0' : '-translate-x-[110%]'} md:translate-x-0 md:min-w-[260px]  top-0 left-0 right-0 bottom-0 rounded-lg  absolute z-[998] bg-blackMenu md:static transition-all md:col-span-1 overflow-y-auto border-r border-background md:h-[calc(100vh-68px)] pr-3`}>
          <div className='flex justify-between p-3 md:p-0 items-center mb-3'>
            <h3 className='font-bold text-lg '>Настройки</h3>
            <img onClick={closeMenu} className='w-7 h-7 md:hidden' src={Close} alt="close" />
          </div>
          <div className='flex flex-col'>
            <Link to={links.profile} className='px-3 py-2 rounded-full font-bold mb-2 bg-whiteOpacity hover:bg-whiteOpacity'>Аккаунт</Link>
            <Link to="account" className='px-3 py-2 rounded-full font-bold mb-2 hover:bg-whiteOpacity'>Тема</Link>

            <button
              onClick={logOutClick}
              className='px-3 py-2 text-left rounded-full font-bold mb-2 text-red-600 hover:bg-whiteOpacity'
            >Выйти из профиля</button>
          </div>
        </div>
        <div className='overflow-y-auto relative w-full h-[calc(100vh-68px)] px-0 md:px-3 md:col-span-3'>
          <div className='absolute'>

            <img onClick={openMenu} src={ArrowLeft} alt="" className='w-8 h-8 cursor-pointer ' />
          </div>
          {children}
        </div>
      </div>
    </Container>
  )
}
