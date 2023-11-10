import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


import styles from './MultimediaAdm.module.scss';
import { TutorialesAdm } from "./Tutoriales/TutorialesAdm";


export function MultimediaAdm() {
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
              <TutorialesAdm/>
            </div>
          </Tab>
          <Tab eventKey="capsulas" title="Administrar Capsulas">
            <div>
              capsulas
            </div>
          </Tab>
          <Tab eventKey="juegos" title="Administrar juegos">
            <div>
              juegos
            </div>
          </Tab>
        </Tabs>
      </div>
    );
}


