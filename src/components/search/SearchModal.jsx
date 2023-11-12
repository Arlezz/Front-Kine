import { SearchBar } from "./SearchBar";
import Modal from "react-bootstrap/Modal";
import { useState } from "react";
import { SearchResultList } from "./SearchResultList";
import { useEffect } from "react";
import styles from "./SearchModal.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

export function SearchModal({ showModalResults, handleShowModalResults }) {
  const [results, setResults] = useState([]);

    useEffect(() => {
        setResults([]);
    }
    , [showModalResults]);

  return (
  
      <Modal show={showModalResults} fullscreen onHide={handleShowModalResults}>
        <div className={styles.searchModalContainer}>
          <div className={styles.searchModalHeader}>
            <button className={styles.backButton} onClick={handleShowModalResults}><FontAwesomeIcon icon={faArrowLeft} /></button>
            <SearchBar setResults={setResults} width={'calc(100vw - 10rem)'} autoFocus={true}/>
          </div>
          <SearchResultList setResults={setResults} results={results} showModalResults={showModalResults} handleShowModalResults={handleShowModalResults}/>
        </div>
      </Modal>
    
  );
}
