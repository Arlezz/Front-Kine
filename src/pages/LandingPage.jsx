import styles from "./LandingPage.module.scss";
import { useState } from "react";

import { NavBar } from "../components/landing/NavBar";
import { Foro } from "../components/landing/Foro";
import { Tutoriales } from "./Tutoriales";
import { Capsulas } from "./Capsulas";
import { Juegos } from "./Juegos";

import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import AuthService from "../services/Auth.service";

export function LandingPage({toggleSearchVisibility, setToggleSearchVisibility, foroVisible, toggleForoVisibility }) {
  useEffect(() => {
    console.log("asdasd");
    if(!toggleSearchVisibility){
      setToggleSearchVisibility(true);
    }
  
  }, []);

  return (
    <div className={styles.container}>
      <section className={styles.contentContainer}>
        <div className={styles.content}>
          <Tutoriales />
          <Capsulas />
          <Juegos />
        </div>
      </section>
      <div className={`${styles.foroSection} ${foroVisible ? styles.foroVisible : ""}`}>
        <Foro toggleForoVisibility={toggleForoVisibility} className={styles.foro} />
      </div>
    </div>
  );
}
