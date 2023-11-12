import { useEffect } from "react";
import { SearchResult } from "./SearchResult";
import styles from "./SearchResultList.module.scss";

export function SearchResultList({onBlur, results, showModalResults, handleShowModalResults}) {
    
    

  return (
    <div className={styles.searchResultList} style={{display: onBlur===true? "none": "block"}}>
      {results.map((result, index) => (
        <SearchResult result={result} key={index} showModalResults={showModalResults} handleShowModalResults={handleShowModalResults}/>
      ))}
    </div>
  );
}
