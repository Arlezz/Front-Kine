import { useState, useEffect } from "react";

import styles from "./Administrador.module.scss";


import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AlumnosAdm } from "../components/admin/Alumnos/AlumnosAdm";
import { ProfesoresAdm } from "../components/admin/Profesores/ProfesoresAdm";
import { MultimediaAdm } from "../components/admin/Multimedia/MultimediaAdm";
import { Historial } from "../components/admin/Historial/HistorialAdm";


export function Administrador({setForoVisible}) {
    const [key, setKey] = useState("alumnos");

    const [updateTutorial, setUpdateTutorial] = useState(false);
    const [updateJuego, setUpdateJuego] = useState(false);
    const [updateCapsula, setUpdateCapsula] = useState(false);


    const onUpdateTutorial = () => {
        setUpdateTutorial(!updateTutorial);
    }

    const onUpdateJuego = () => {
        setUpdateJuego(!updateJuego);
    }

    const onUpdateCapsula = () => {
        setUpdateCapsula(!updateCapsula);
    }

    useEffect(() => {

        setForoVisible(false)
    
    }, [])

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
        <Tab eventKey="alumnos" title="Administrar Alumnos">
          <div>
            <AlumnosAdm/>
          </div>
        </Tab>
        <Tab eventKey="profesores" title="Administrar Profesores">
          <div>
            <ProfesoresAdm/>
          </div>
        </Tab>
        <Tab eventKey="foro" title="Administrar Foro">
          <div>
            POST
          </div>
        </Tab>
        <Tab eventKey="multimedia" title="Administrar Multimedia">
          <div>
            <MultimediaAdm 
            updateTutorial={updateTutorial} 
            onUpdateTutorial={onUpdateTutorial}
            updateJuego={updateJuego}
            onUpdateJuego={onUpdateJuego}
            updateCapsula={updateCapsula}
            onUpdateCapsula={onUpdateCapsula}
            />
          </div>
        </Tab>
        <Tab eventKey="historial" title="Historial de modificaciones">
          <div>
            <Historial 
            updateTutorial={updateTutorial}
            updateJuego={updateJuego}
            updateCapsula={updateCapsula}
            />
          </div>
        </Tab>
      </Tabs>
    </div>
  );
}
