import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";


//pages
import Home from "./Pages/Home";
import SignUp from "./Pages/SignUp";
import Login from "./Pages/Login";
import About from "./Pages/About";
import Profile from "./Pages/Profile";
import ProtectedRoutes from "./Components/ProtectedRoutes";
import Ticket from "./Pages/Ticket";
import CreateTicket from "./Pages/CreateTicket";
import Layout from "./Components/Layout";
function App() {
  return (
    <>
      <BrowserRouter>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/ticket"
              element={
                <ProtectedRoutes>
                  <Ticket />
                </ProtectedRoutes>
              }
            />
            <Route path="/createticket" element={<CreateTicket />} />
            <Route
              path="/about"
              element={
                <ProtectedRoutes>
                  <About />
                </ProtectedRoutes>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoutes>
                  <Profile />
                </ProtectedRoutes>
              }
            />
            <Route path="/*" element={<Home />} />
          </Routes>
        </Layout>
      </BrowserRouter>
    </>
  );
}

export default App;
