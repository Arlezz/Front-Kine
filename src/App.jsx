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

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setIsLoggedIn(true);
      setIsLoading(false);
      if (user.role.includes("admin")) {
        setIsAdmin(true);
      }
    } else {
      setIsLoading(false);
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
    console.log("LOGGED IN");
    console.log("CURRENT USER : ", AuthService.getCurrentUser());
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
      {isLoggedIn && <NavBar />}
      {/* Renderiza NavBar solo si el usuario está autenticado */}
      <div className={isLoggedIn ? styles.appContainer : null}>
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
          <Route
            path="/admin"
            element={
              isLoggedIn && isAdmin ? (
                <Administrador />
              ) : (
                <Navigate to="/" replace />
              )
            }
          />

          <Route path="/profile" element={<ProfileSetting />} />
        </Routes>
      </div>
    </Router>
  );
}
