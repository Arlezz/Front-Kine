import styles from './ForoResponseBox.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faPaperPlane
} from "@fortawesome/free-solid-svg-icons";


export function ForoResponseBox(props) {

    const isQuestion = props.isQuestion;
    console.log(isQuestion);

  return(
    <>  
        <div className={styles.inputContainer}>
            {(isQuestion === 'false')? 
            <input className={styles.inputText} type="text"  placeholder="Ayuda a alguien"/>  
            : 
            <input className={styles.inputText} type="text"  placeholder="Escribe alguna pregunta"/>}
            <FontAwesomeIcon className={styles.icon} icon={faPaperPlane} />
        </div>

        
        
    </>
  );
}