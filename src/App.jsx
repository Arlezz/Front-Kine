import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { Login } from "./pages/Login";

import AuthService from "./services/Auth.service";
import { Credentials } from "./pages/Credentials";
import { Administrador } from "./pages/Administrador";
import { NavBar } from "./components/landing/NavBar";
import styles from "./App.module.scss";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("LOGGED IN");
    console.log("CURRENT USER : ", AuthService.getCurrentUser());
  };

  {
    /* <Login  handleLogin={handleLogin}/> */
  }
  return (
    <Router>
      <div >
        {isLoggedIn && <NavBar/>}
        {/* Renderiza NavBar solo si el usuario está autenticado */}
        
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <LandingPage />
                ) : (
                  <Credentials handleLogin={handleLogin} />
                )
              }
            />
            <Route path="/admin" element={<Administrador />} />
          </Routes>
     
      </div>
    </Router>
  );
}
