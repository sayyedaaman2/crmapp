
import React from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom'
//components
import Navbar from "./Components/Navbar";

//pages
import Home from './Pages/Home';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import About from './Pages/About';
import ProtectedRoutes from "./Components/ProtectedRoutes";

function App() {



  return (
    <>
      <BrowserRouter>
        <Navbar/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path='/signup' element={<SignUp />} />
          <Route path='/login' element={<Login />} />
          <Route path='/about' element={
          
          <ProtectedRoutes>
            <About/>
          </ProtectedRoutes>
          
          
          }/>
          <Route path='/*' element={<Home/>} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
