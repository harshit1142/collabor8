

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './Pages/Home/Home';
import Login from "./Pages/Auth/Login";
import Signup from "./Pages/Auth/Signup";


function App() {
  return (
    <Router>

      <>

        {/* <Alert /> */}

        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/auth/login" element={<Login />} />
          <Route path="/auth/signup" element={<Signup />} />
          <Route path="*" element={<Home />} />
        </Routes>
        {/* <Footer /> */}
      </>
    </Router>
  );
}

export default App;
