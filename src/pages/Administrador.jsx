import React, { useState, useEffect } from "react";
import styles from "./Administrador.module.scss";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import { AlumnosAdm } from "../components/admin/Alumnos/AlumnosAdm";
import { ProfesoresAdm } from "../components/admin/Profesores/ProfesoresAdm";
import { MultimediaAdm } from "../components/admin/Multimedia/MultimediaAdm";
import { Historial } from "../components/admin/Historial/HistorialAdm";
import { ForoAdm } from "../components/admin/Foro/ForoAdm";
import AuthService from "../services/Auth.service";

export function Administrador({ setForoVisible, setToggleSearchVisibility }) {
  const [key, setKey] = useState("alumnos");
  const [updateTutorial, setUpdateTutorial] = useState(false);
  const [updateJuego, setUpdateJuego] = useState(false);
  const [updateCapsula, setUpdateCapsula] = useState(false);
  const [updatePost, setUpdatePost] = useState(false);
  const [updateCommetario, setUpdateComentario] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  useEffect(() => {
    
  }, []);

  const onUpdateTutorial = () => {
    setUpdateTutorial(!updateTutorial);
  };

  const onUpdateJuego = () => {
    setUpdateJuego(!updateJuego);
  };

  const onUpdateCapsula = () => {
    setUpdateCapsula(!updateCapsula);
  };

  const onUpdatePost = () => {
    setUpdatePost(!updatePost);
  };

  const onUpdateComentario = () => {
    setUpdateComentario(!updateCommetario);
  };

  useEffect(() => {
    const user = AuthService.getCurrentUser();
    if (user) {
      setCurrentUser(user);
      if (user.role.includes("profesor")) {
        setKey("foro")
      }
    }
    setToggleSearchVisibility(false);
    setForoVisible(false);
  }, []);


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
        {currentUser && currentUser.role && currentUser.role.includes("admin") && (
          <Tab eventKey="alumnos" title="Administrar Alumnos">
            <AlumnosAdm />
          </Tab>
        )}
        {currentUser && currentUser.role && currentUser.role.includes("admin") && (
          <Tab eventKey="profesores" title="Administrar Profesores">
            <ProfesoresAdm />
          </Tab>
        )}
        {currentUser && currentUser.role && (currentUser.role.includes("profesor") || currentUser.role.includes("admin")) && (
          <Tab eventKey="foro" title="Administrar Foro">
            <ForoAdm
              updatePost={updatePost}
              onUpdatePost={onUpdatePost}
              updateCommetario={updateCommetario}
              onUpdateComentario={onUpdateComentario}
            />
          </Tab>
        )}
        {currentUser && currentUser.role && (currentUser.role.includes("profesor") || currentUser.role.includes("admin")) && (
          <Tab eventKey="multimedia" title="Administrar Multimedia">
            <MultimediaAdm
              currentUser={currentUser}
              updateTutorial={updateTutorial}
              onUpdateTutorial={onUpdateTutorial}
              updateJuego={updateJuego}
              onUpdateJuego={onUpdateJuego}
              updateCapsula={updateCapsula}
              onUpdateCapsula={onUpdateCapsula}
            />
          </Tab>
        )}
        {currentUser && currentUser.role &&  currentUser.role.includes("admin") && (
          <Tab eventKey="historial" title="Historial de modificaciones">
            <Historial
              updateTutorial={updateTutorial}
              updateJuego={updateJuego}
              updateCapsula={updateCapsula}
              updatePost={updatePost}
              updateCommetario={updateCommetario}
            />
          </Tab>
        )}
      </Tabs>
    </div>
  );
}
