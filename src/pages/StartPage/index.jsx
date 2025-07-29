import React from 'react';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { Container } from '../../components/Container';
import { MainLoading } from '../../components/MainLoading';
import { links } from '../../routes/links';
import { userIsAuth } from '../../store/slices/authSlice';
import Label from '../../assets/images/label.png';
import LabelLight from '../../assets/images/label-light.png';

export const StartPage = () => {
  const isAuth = useSelector(userIsAuth);
  const isLoading = useSelector((state) => state.auth.isLoading);
  const navigate = useNavigate();
  useEffect(() => {
    if (isAuth && localStorage.getItem('token')) {
      navigate('/app/home', { replace: true });
    }
  });

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <MainLoading size={100} />
      </div>
    );
  }
  return (
    <Container>
      <div className=''>
        <div className='w-full sm:max-w-3xl mx-auto py-20 mb-4'>
          <div>
            {localStorage.getItem('theme') === 'dark' ? (
              <img src={Label} alt='logo' />
            ) : (
              <img src={LabelLight} alt='logo' />
            )}
          </div>
          {/* <div className='relative h-[500px]'>
                        <div className='flex gap-3'>
                            <div className='text-[124px] font-bold text-mainGreen'>WEB</div>
                            <div className='text-[34px] font-bold leading-8'>- уникальный сервис для винансового учета</div>
                        </div>
                        <div className='absolute text-[124px] font-bold right-9 top-[106px] text-mainGreen'>MONEY</div>
                    </div> */}
        </div>
        <div className='max-w-md mx-auto flex-col sm:flex-row flex justify-between gap-5 font-bold text-center items-center'>
          <Link
            to={links.login}
            className='w-full py-3 sm:py-2 px-3 border border-mainGreen rounded-3xl hover:bg-secondBackground dark:hover:bg-bggTop transition-colors'
          >
            Войти
          </Link>
          <Link
            to={links.signup}
            className='w-full py-3 sm:py-2 px-3 bg-mainGreen rounded-3xl text-totalBlack hover:bg-secondGreen transition-colors'
          >
            Зарегистрироваться
          </Link>
        </div>
      </div>
    </Container>
  );
};
