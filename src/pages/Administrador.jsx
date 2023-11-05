import { useState } from "react";

import styles from "./Administrador.module.scss";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


export function Administrador() {
    const [key, setKey] = useState("profile");


  return (
    <div className={styles.administradorContent}>
      <h2 className={styles.tittle}>Configuraciones avanzadas</h2>
      <Tabs
        id="controlled-tab-example"
        activeKey={key}
        onSelect={(k) => setKey(k)}
        className=""
      >
        <Tab eventKey="profile" title="Administrar Usuarios">
          <div>
            asdasd
          </div>
        </Tab>
        <Tab eventKey="identity" title="Administrar Profesores">
          <div>
            asdqwe
          </div>
          <div>
            tretre
          </div>
        </Tab>
        <Tab eventKey="security" title="Administrar Multimedia">
          <div>
            uytyty
          </div>
        </Tab>
        <Tab eventKey="stream" title="Historial de modificaciones">
          <div>
            tyutyu
          </div>
          <div>
            ityuy
          </div>
        </Tab>
      </Tabs>
      {/*
      
      
      <h1 className={styles.pageTitle}>Administrador</h1>
      <div className={styles.administradorContainer}>
        <div className={styles.administradorLeft}>
          <h2 className={styles.administradorLeftTitle}>Usuarios</h2>
          <div className={styles.administradorLeftContainer}>
            <div className={styles.administradorLeftCard}>
              <h3 className={styles.administradorLeftCardTitle}>Usuarios</h3>
              <span className={styles.administradorLeftCardText}>
                Administre los usuarios de la plataforma
              </span>
              <button className={styles.administradorLeftCardButton}>
                Administrar
              </button>
            </div>
            <div className={styles.administradorLeftCard}>
              <h3 className={styles.administradorLeftCardTitle}>
                Administradores
              </h3>
              <span className={styles.administradorLeftCardText}>
                Administre los administradores de la plataforma
              </span>
              <button className={styles.administradorLeftCardButton}>
                Administrar
              </button>
            </div>
          </div>
        </div>
        <div className={styles.administradorRight}>
          <h2 className={styles.administradorRightTitle}>Contenido</h2>
          <div className={styles.administradorRightContainer}>
            <div className={styles.administradorRightCard}>
              <h3 className={styles.administradorRightCardTitle}>Tutoriales</h3>
              <span className={styles.administradorRightCardText}>
                Administre los tutoriales de la plataforma
              </span>
              <button className={styles.administradorRightCardButton}>
                Administrar
              </button>
            </div>
            <div className={styles.administradorRightCard}>
              <h3 className={styles.administradorRightCardTitle}>Capsulas</h3>
              <span className={styles.administradorRightCardText}>
                Administre las capsulas de la plataforma
              </span>
              <button className={styles.administradorRightCardButton}>
                Administrar
              </button>
            </div>
            <div className={styles.administradorRightCard}>
              <h3 className={styles.administradorRightCardTitle}>Juegos</h3>
              <span className={styles.administradorRightCardText}>
                Administre los juegos de la plataforma
              </span>
              <button className={styles.administradorRightCardButton}>
                Administrar
              </button>
            </div>
          </div>
        </div>
      </div>
      */}
    </div>
  );
}
