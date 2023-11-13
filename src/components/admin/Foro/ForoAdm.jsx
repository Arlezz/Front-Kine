import { useState } from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";


import styles from './ForoAdm.module.scss';
import { PostAdm } from "./Post/PostAdm";
import { ComentariosAdm } from "./Comentarios/ComentariosAdm";


export function ForoAdm({
  updatePost,
  onUpdatePost,
  updateCommetario,
  onUpdateComentario

}) {
    const [key, setKey] = useState("tutoriales");

    return (
      <div className={styles.foroContent}>
        <h2 className={styles.tittle}>Foro</h2>
        <Tabs
          id="controlled-tab-example"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className=""
          transition={false}
        >
          <Tab eventKey="tutoriales" title="Administrar Publicaciónes">
            <div>
                <PostAdm updatePost={updatePost} onUpdatePost={onUpdatePost}/>
            </div>
          </Tab>
          <Tab eventKey="capsulas" title="Administrar Comentarios">
            <div>
                <ComentariosAdm updateCommetario={updateCommetario} onUpdateComentario={onUpdateComentario}/>
            </div>
          </Tab>
        </Tabs>
      </div>
    );
}


