import { Route, Routes } from "react-router-dom";
import { Header } from "./components/Header";
import { HomePage } from "./pages/HomePage";
import { LoginPage } from "./pages/LoginPage";
import { SignupPage } from "./pages/SignupPage";
import { StartPage } from "./pages/StartPage";

const auth = true
function App() {
  return (
    <div className="">
      {auth && <Header />}
      <Routes>
        <Route path="/home" element={<HomePage />} />
        <Route path="/start" element={<StartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
      </Routes>

    </div>
  );
}

export default App;
