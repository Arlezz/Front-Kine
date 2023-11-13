import React, { useEffect, useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import { LandingPage } from "./pages/LandingPage";
import { Spinner } from "./components/Spinner";

import AuthService from "./services/Auth.service";
import { Credentials } from "./pages/Credentials";
import { Administrador } from "./pages/Administrador";
import { NavBar } from "./components/landing/NavBar";
import styles from "./App.module.scss";
import { ProfileSetting } from "./components/profile/ProfileSetting";

export function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isProfesor, setIsProfesor] = useState(false);
  const [foroVisible, setForoVisible] = useState(false);
  const [toggleSearchVisibility , setToggleSearchVisibility] = useState(true);

  const toggleForoVisibility = () => {
    setForoVisible(!foroVisible);
  };



  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setIsLoading(false);
      if (user.role.includes("admin")) {
        setIsAdmin(true);
      } else if( user.role.includes("profesor")){
        setIsProfesor(true);
      }
    } else {
      setIsLoading(false);
    }
  }, [isLoggedIn]);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  return (
    <Router>
      {isLoggedIn && <NavBar toggleSearchVisibility={toggleSearchVisibility} toggleForoVisibility={toggleForoVisibility} foroVisible={foroVisible}/>}
      <div className={isLoggedIn ? styles.appContainer : null}>
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <LandingPage toggleSearchVisibility={toggleSearchVisibility} setToggleSearchVisibility={setToggleSearchVisibility} setForoVisible={setForoVisible} foroVisible={foroVisible} toggleForoVisibility={toggleForoVisibility}/>
              ) : (
                <Credentials handleLogin={handleLogin} />
              )
            }
          />
          <Route
            path="/admin"
            element={
              isLoggedIn && (isAdmin || isProfesor) ? (
                <Administrador setToggleSearchVisibility={setToggleSearchVisibility} setForoVisible={setForoVisible} />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />s
          <Route path="/profile" element={<ProfileSetting setForoVisible={setForoVisible}/>} />
        </Routes>
      </div>
    </Router>
  );
}
