import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Container } from '../../components/Container'
import { links } from '../../links'
import ArrowLeft from '../../assets/images/arrow.svg'
import ArrowLeftLight from '../../assets/images/arrow-light.svg'
import Close from '../../assets/images/close.svg'
import CloseLight from '../../assets/images/close-light.svg'
import { fetchLogOut, userIsAuth } from '../../store/slices/authSlice'
import { useDispatch, useSelector } from 'react-redux'
import { useResize } from '../../hooks/Rezise'


const profileLinks = [
  {
    title: "Аккаунт",
    link: links.profile
  },
  {
    title: "Тема",
    link: links.profileTheme
  }
]

export const Settings = ({ children }) => {
  const [activeMenu, setActiveMenu] = useState(false);
  const [activeLink, setActiveLink] = useState(0);
  const styleLink = localStorage.getItem('theme') === 'dark' ? 'bg-whiteOpacity' : 'dark:bg-bggBottom'
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { width } = useResize()

  const isAuth = useSelector(userIsAuth);

  let slashes = window.location.pathname.split('').filter(el => el === '/')

  const closeMenu = () => {
    setActiveMenu(false)
  }
  const openMenu = () => {
    setTimeout(() => {
      document.body.scrollIntoView({
        behavior: 'smooth',
        block: 'start'
      })
    }, 1)

    if (slashes.length === 3) {
      setActiveMenu(true)
    } else {
      navigate(-1)
    }
  }

  const logOutClick = () => {
    dispatch(fetchLogOut())
    navigate('/', { replace: true })
  }

  useEffect(() => {
    if (!localStorage.getItem('token') && !isAuth) {
      navigate('/', { replace: true })
    }
  }, [isAuth, navigate]);



  return (
    <Container>
      <div className='relative flex max-w-[1024px] mx-auto bg-blackMenu dark:bg-bggTop rounded-lg p-3'>
        <div className={`${activeMenu ? 'translate-x-0' : '-translate-x-[110%]'} md:translate-x-0 md:min-w-[260px] absolute top-0 left-0 right-0 bottom-0 rounded-lg   z-[997] md:z-[1] bg-blackMenu dark:bg-bggTop md:static transition-all md:col-span-1 overflow-y-auto border-r border-background dark:border-bggBottom md:h-[calc(100vh-132px)] pr-3`}>
          <div className='flex justify-between p-3 md:p-0 items-center mb-3'>
            <h3 className='font-bold text-lg '>Настройки</h3>
            {localStorage.getItem('theme') === 'dark'
              ? <img onClick={closeMenu} className='w-7 h-7 md:hidden' src={Close} alt="close" />
              : <img onClick={closeMenu} className='w-7 h-7 md:hidden' src={CloseLight} alt="close" />
            }
          </div>
          <div className='flex flex-col'>
            {profileLinks.map((el, i) => <Link
              key={el.title}
              onClick={() => {
                setActiveLink(i)
                setActiveMenu(false)
              }}
              to={el.link}
              className={`${activeLink === i ? styleLink : ''} px-3 py-2 rounded-full font-bold mb-2 hover:bg-whiteOpacity dark:hover:bg-bggBottom transition-colors`}
            >{el.title}</Link>
            )}
            {/* <Link to={links.profile} className='px-3 py-2 rounded-full font-bold mb-2  hover:bg-whiteOpacity'>Аккаунт</Link>
            <Link to={links.profileTheme} className='px-3 py-2 rounded-full font-bold mb-2 hover:bg-whiteOpacity'>Тема</Link> */}

            <button
              onClick={logOutClick}
              className='px-3 py-2 text-left rounded-full font-bold mb-2 text-red-600 hover:bg-whiteOpacity'
            >Выйти из профиля</button>
          </div>
        </div>
        <div className=' relative w-full min-h-[calc(100vh-132px)] px-0 md:px-3 md:col-span-3'>
          <div className='mb-1'>
            {slashes.length > 3 || width < 768
              ? localStorage.getItem('theme') === 'dark'
                ? <img onClick={openMenu} src={ArrowLeft} alt="" className='w-8 h-8 cursor-pointer ' />
                : <img onClick={openMenu} src={ArrowLeftLight} alt="" className='w-8 h-8 cursor-pointer ' />
              : ''
            }
          </div>
          {children}
        </div>
      </div>
    </Container>
  )
}
