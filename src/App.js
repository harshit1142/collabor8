

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";
import Main from "./Pages/main/Main";
import Alert from "./Components/Alert";
import { USER_LOGIN_SUCCESS } from "./types/userConstants";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import ChatScreen from "./Pages/Channel/ChatScreen";



function App() {
  const dispatch=useDispatch();

  useEffect(() => {
    if (localStorage.getItem('userData')) {
      dispatch({
        type: USER_LOGIN_SUCCESS,
        payload: JSON.parse(localStorage.getItem("userData")),
      });
    }
  }, [])

  return (
    <Router>

      <>

        <Alert />

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="/main" element={<Main />} />
          <Route path="/channel/chat" element={<ChatScreen />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;
