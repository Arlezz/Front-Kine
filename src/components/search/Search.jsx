// Search.jsx

import styles from './Search.module.scss';
import { SearchBar } from './SearchBar';
import { SearchResultList } from './SearchResultList';
import { SearchModal } from './SearchModal';
import { useState, useRef, useEffect } from "react";


export function Search() {
  const [results, setResults] = useState([]);
  const [showModalResults, setShowModalResults] = useState(false);
  const [onBlur, setOnBlur] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setOnBlur(true);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [containerRef, setOnBlur]);

  const handleShowModalResults = () => setShowModalResults(!showModalResults);

  return (
    <div className={styles.searchComponentContainer} ref={containerRef}>
      <SearchBar onBlur={onBlur} setOnBlur={setOnBlur} handleShowModalResults={handleShowModalResults} setResults={setResults}/>
      <SearchResultList onBlur={onBlur} results={results}/>
      <SearchModal showModalResults={showModalResults} handleShowModalResults={handleShowModalResults}/>
    </div>
  );
}
