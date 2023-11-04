import styles from './ForoResponseButton.module.scss';
import { useState , useEffect} from 'react'; 

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
    faInbox
} from "@fortawesome/free-solid-svg-icons";


export function ForoResponseButton({handleShow, isSubmitting, submit, text}) {

  const [textButton, setTextButton] = useState("Postear");
  
  useEffect(() => {
    if (text === "Responder") {
      setTextButton(text);
    }
  }, [text]);
  
  return(
      <button type={submit} className={styles.postButton} disabled={isSubmitting} onClick={handleShow}>{textButton}<FontAwesomeIcon  icon={faInbox} /></button>
  );
}