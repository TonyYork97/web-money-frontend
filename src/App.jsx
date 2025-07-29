import { useCallback, useEffect } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';
import { Header } from './components/Header';
import { HomePage } from './pages/HomePage';
import { LoginPage } from './pages/LoginPage';
import { SignupPage } from './pages/SignupPage';
import { StartPage } from './pages/StartPage';
import { links } from './routes/links';
import { HistoryPage } from './pages/HistoryPage';
import { useSelector, useDispatch } from 'react-redux';
import { fetchCheckAuth, userIsAuth } from './store/slices/authSlice';
import { AddOperation } from './components/AddOperation';
import { MainLoading } from './components/MainLoading';
import { Account } from './components/Account';
import { EmailEdit } from './components/EmailEdit/EmailEdit';
import { Settings } from './pages/Settings';
import { PasswordEdit } from './components/PasswordEdit';
import { ContactsPage } from './pages/ContactsPage';
import { Footer } from './components/Footer';
import moment from 'moment';
import 'moment/locale/ru';
import { ThemePage } from './pages/ThemePage';
import { useState } from 'react';
import { CategoriesPage } from './pages/CategoriesPage';
// import { ReactGAImplementation } from 'react-ga4';
// import './analitycs/google-analitycs';
import ReactGA from 'react-ga4';
const ga = ReactGA.default || ReactGA;
ga.initialize('G-YT9H495F1T');

moment().locale('ru');

function App() {
  const [theme, setTheme] = useState(true);
  const [blur, setBlur] = useState(false);
  const isAuth = useSelector(userIsAuth);
  const { isLoading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const location = useLocation();
  useEffect(() => {
    if (ga.send) {
      ga.send({
        hitType: 'pageview',
        page: location.pathname + location.search,
        title: document.title,
      });
    } else {
      console.warn('ReactGA.send не найден, объект:', ga);
    }
  }, [location]);
  const checkAuth = useCallback(async () => {
    if (localStorage.getItem('token')) {
      await dispatch(fetchCheckAuth());
    }
  }, [dispatch]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  useEffect(() => {
    if (!localStorage.getItem('theme')) {
      localStorage.setItem('theme', 'dark');
      setTheme(true);
    }
    if (localStorage.getItem('theme') === 'light') {
      setTheme(false);
    }

    if (localStorage.getItem('blur')) {
      setBlur(true);
    }
  }, [theme, blur]);

  if (isLoading) {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <MainLoading />
      </div>
    );
  }

  return (
    <div className={`${theme ? '' : 'dark'} h-full`}>
      {blur ? (
        <>
          <div className='fixed w-60 h-60 bg-mainGreen rounded-full filter blur-[172px] opacity-80 top-24 -left-24'></div>
          <div className='fixed w-72 h-72 bg-mainGreen rounded-full filter blur-[172px] opacity-80 top-96 -right-28'></div>
        </>
      ) : (
        ''
      )}

      <div className='dark:bg-backgroundLight text-textPrime dark:text-darkBlack bg-background min-w-[260px] min-h-full flex flex-col '>
        {isAuth && <Header />}
        <div className='flex-auto  mb-3'>
          <Routes>
            <Route path={links.home} element={<HomePage />} />
            <Route path={links.addExpense} element={<AddOperation />} />
            <Route path='/app/:id/edit-expense' element={<AddOperation />} />
            <Route path={links.addRevenue} element={<AddOperation />} />
            <Route path='/app/:id/edit-revenue' element={<AddOperation />} />
            <Route
              path={links.profile}
              element={
                <Settings>
                  <Account />
                </Settings>
              }
            />
            <Route
              path={links.profileTheme}
              element={
                <Settings>
                  <ThemePage
                    setTheme={setTheme}
                    theme={theme}
                    blur={blur}
                    setBlur={setBlur}
                  />
                </Settings>
              }
            />
            <Route
              path={links.email}
              element={
                <Settings>
                  <EmailEdit />
                </Settings>
              }
            />
            <Route
              path={links.password}
              element={
                <Settings>
                  <PasswordEdit />
                </Settings>
              }
            />
            <Route path={links.main} element={<StartPage />} />
            <Route path={links.login} element={<LoginPage />} />
            <Route path={links.signup} element={<SignupPage />} />
            <Route path={links.history} element={<HistoryPage />} />
            <Route
              path={links.expenses}
              element={<CategoriesPage type='expense' />}
            />
            <Route
              path={links.income}
              element={<CategoriesPage type='revenue' />}
            />
            <Route path={links.contacts} element={<ContactsPage />} />
            <Route path='*' element={<StartPage />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </div>
  );
}

export default App;
