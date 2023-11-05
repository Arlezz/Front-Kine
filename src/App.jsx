  import React, { useEffect, useState } from "react";
  import {
    BrowserRouter as Router,
    Routes,
    Route,
    Navigate,
  } from "react-router-dom";

  import { LandingPage } from "./pages/LandingPage";
  import { Spinner } from './components/Spinner';

  import AuthService from "./services/Auth.service";
  import { Credentials } from "./pages/Credentials";
  import { Administrador } from "./pages/Administrador";
  import { NavBar } from "./components/landing/NavBar";
  import styles from "./App.module.scss";

  export function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
      const user = AuthService.getCurrentUser();
      if (user) {
        setIsLoggedIn(true);
        setIsLoading(false);
      }
    }
    ,[]);

    const handleLogin = () => {
      setIsLoggedIn(true);
      console.log("LOGGED IN");
      console.log("CURRENT USER : ", AuthService.getCurrentUser());
    };

    if(isLoading){
      return <div className={styles.loading}>
        <Spinner/>
      </div>
    }
    
    return (
      <Router>
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
      </Router>
    );

    
  }
