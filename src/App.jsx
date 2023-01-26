import { React } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Register from './components/Register'
import Login from './components/Login'
import TelkomLogin from './components/TelkomLogin'
import Home from './components/Home'
import Profile from './components/Profile'
import Header from './components/Header'
import NotFound from './components/NotFound'


function App() {
  return (
    <Routes>
        <Route index element={<Home />} />
        <Route path="/register" element={<Register />}/>
        <Route path="/login" element={<Login />}/>
        <Route path="/login/telkom" element={<TelkomLogin />}/>
        <Route path="/profile" element={<Profile />}/>
        <Route path="*" element={<NotFound />}/>
    </Routes>
    )
}

export default App;
