import styles from "./LandingPage.module.scss";

import { Foro } from "../components/landing/Foro";
import { Tutoriales } from "./Tutoriales";
import { Capsulas } from "./Capsulas";
import { Juegos } from "./Juegos";


import { useEffect } from "react";

export function LandingPage({toggleSearchVisibility, setToggleSearchVisibility, foroVisible, toggleForoVisibility }) {
  useEffect(() => {
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
