import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


import styles from './MultimediaAdm.module.scss';
import { TutorialesAdm } from "./Tutoriales/TutorialesAdm";
import { CapsulasAdm } from "./Capsulas/CapsulasAdm";
import { JuegosAdm } from "./Juegos/JuegosAdm";


export function MultimediaAdm({currentUser, updateTutorial, onUpdateTutorial, updateJuego, onUpdateJuego, updateCapsula, onUpdateCapsula}) {
    const [key, setKey] = useState("tutoriales");

    return (
      <div className={styles.multimediaContent}>
        <h2 className={styles.tittle}>Multimedia</h2>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className=""
          transition={false}
        >
          <Tab eventKey="tutoriales" title="Administrar Tutoriales">
            <div>
              <TutorialesAdm currentUser={currentUser} updateTutorial={updateTutorial} onUpdateTutorial={onUpdateTutorial}/>
            </div>
          </Tab>
          <Tab eventKey="capsulas" title="Administrar Capsulas">
            <div>
              <CapsulasAdm currentUser={currentUser} updateCapsula={updateCapsula} onUpdateCapsula={onUpdateCapsula}/>
            </div>
          </Tab>
          <Tab eventKey="juegos" title="Administrar juegos">
            <div>
              <JuegosAdm currentUser={currentUser} updateJuego={updateJuego} onUpdateJuego={onUpdateJuego}/>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
}


