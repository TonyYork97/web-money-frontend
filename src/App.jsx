import { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { StartPage } from "./pages/StartPage";
import { links } from './links'
import { HistoryPage } from "./pages/HistoryPage";
import { ExpensesPage } from "./pages/ExpensesPage";
import { useSelector, useDispatch } from 'react-redux'
import { fetchCheckAuth, userIsAuth } from "./store/slices/authSlice";
import { AddOperation } from "./components/AddOperation";
import { MainLoading } from "./components/MainLoading";
import { RevenuePage } from "./pages/RevenuePage";
import { Account } from "./components/Account";
import { EmailEdit } from "./components/EmailEdit/EmailEdit";
import { Settings } from "./pages/Settings";
import { PasswordEdit } from "./components/PasswordEdit";
import { ContactsPage } from "./pages/ContactsPage";
import { Footer } from "./components/Footer";
import moment from "moment";










import 'moment/locale/ru'
moment().locale('ru');
function App() {

  const isAuth = useSelector(userIsAuth)
  const { isLoading } = useSelector(state => state.auth)
  const dispatch = useDispatch();

  const checkAuth = async () => {
    if (localStorage.getItem('token')) {
      await dispatch(fetchCheckAuth());
    }
  }


  useEffect(() => {
    checkAuth();
  }, []);


  if (isLoading) {
    return <div className='w-full h-screen flex justify-center items-center'><MainLoading /></div>
  }
  return (
    <div className="min-w-[260px] h-screen flex flex-col justify-between ">
      {isAuth && <Header />}
      <div className="mb-3 flex-1">
        <Routes>
          <Route path={links.home} element={<HomePage />} />
          <Route path={links.addExpense} element={<AddOperation />} />
          <Route path="/app/:id/edit-expense" element={<AddOperation />} />
          <Route path={links.addRevenue} element={<AddOperation />} />
          <Route path="/app/:id/edit-revenue" element={<AddOperation />} />
          {/* <Route path={links.profile} element={<Profile ><Account /></Profile>} /> */}
          <Route path={links.profile} element={<Settings><Account /> </Settings>} />
          <Route path={links.email} element={<Settings ><EmailEdit /></Settings>} />
          <Route path={links.password} element={<Settings ><PasswordEdit /></Settings>} />
          <Route path={links.main} element={<StartPage />} />
          <Route path={links.login} element={<LoginPage />} />
          <Route path={links.signup} element={<SignupPage />} />
          <Route path={links.history} element={<HistoryPage />} />
          <Route path={links.expenses} element={<ExpensesPage />} />
          <Route path={links.income} element={<RevenuePage />} />
          <Route path={links.contacts} element={<ContactsPage />} />
          <Route path='*' element={<StartPage />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
}

export default App;
