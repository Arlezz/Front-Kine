import { useState } from "react";

import styles from "./Administrador.module.scss";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AlumnosAdm } from "../components/admin/Alumnos/AlumnosAdm";
import { ProfesoresAdm } from "../components/admin/Profesores/ProfesoresAdm";
import { MultimediaAdm } from "../components/admin/Multimedia/MultimediaAdm";
import { Historial } from "../components/admin/Historial/HistorialAdm";


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
        transition={false}
      >
        <Tab eventKey="profile" title="Administrar Usuarios">
          <div>
            <AlumnosAdm/>
          </div>
        </Tab>
        <Tab eventKey="identity" title="Administrar Profesores">
          <div>
            <ProfesoresAdm/>
          </div>
        </Tab>
        <Tab eventKey="security" title="Administrar Multimedia">
          <div>
            <MultimediaAdm/>
          </div>
        </Tab>
        <Tab eventKey="stream" title="Historial de modificaciones">
          <div>
            <Historial/>
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
