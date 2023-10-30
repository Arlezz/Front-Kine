
import { ForoResponseBox } from "./ForoResponseBox"
import styles from './ForoBody.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faComments
} from "@fortawesome/free-solid-svg-icons";


export function ForoBody(){
    return (
    <>
        <div id="foroBody" className={styles.bodyContainer}>
            <div className={styles.mainContent}>
                <div>
                    <h3>Martin Pizarro</h3>
                    <h6>Publicado el 29/10/2023 </h6>
                    <p>En la sección de tutoriales puedes encontrar un video explicativo de como hacer un ejercicio</p>
                </div>
                <div className={styles.secondaryContent}>
                    <FontAwesomeIcon icon={faComments} />
                    <span>4</span>
                </div>
            </div>
            <ForoResponseBox isQuestion='false'/>
            
        </div>
        <hr className={styles.separator}/>
    </> 
    )
}