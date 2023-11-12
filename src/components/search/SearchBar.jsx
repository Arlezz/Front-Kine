import GeneralService from "../../services/General.service";
import styles from "./SearchBar.module.scss";
import { useState } from "react";
import { FaSearch } from "react-icons/fa";

export function SearchBar({setOnBlur, onBlur, setResults, handleShowModalResults, width,autoFocus}) {
  const [input, setInput] = useState("");
  const [timeoutId, setTimeoutId] = useState(null);

  const searchItem = (value) => {
    GeneralService.searchContent(value)
      .then((res) => {
        const data = res;
        if (data.capsules.length > 0) {
          setResults(data.capsules);
        } else if (data.games.length > 0) {
          setResults(data.games);
        } else if (data.tutorials.length > 0) {
          setResults(data.tutorials);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    // Cancelar la llamada anterior
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    if (value === "") {
      setResults([]);
      return;
    }

    // Establecer un nuevo timeout para la llamada a la API
    const newTimeoutId = setTimeout(() => {
      searchItem(value);
    }, 1000); // Puedes ajustar el tiempo según tus necesidades

    setTimeoutId(newTimeoutId);
  };

  const handleButtonClick = () => {
    // Cuando se hace clic en el botón de búsqueda, realizar la búsqueda inmediatamente
    searchItem(input);
  };

  const handleBlur = () => {
    setOnBlur(!onBlur);
  };

  return (
    <>
      <div className={styles.searchContainer}>
        <div className={styles.searchMaxRes}>
          <input
            id="search"
            className={styles.searchInput}
            type="text"
            value={input}
            placeholder="Busca algo..."
            onFocus={() => setOnBlur(false)}
            onChange={(e) => handleChange(e.target.value)}
            aria-label="Buscar"
          />
          <button className={styles.searchButton} onClick={handleButtonClick}>
            <FaSearch className={styles.icon} />
          </button>
        </div>
        <div className={styles.searchMinRes}>
          <input
            id="search"
            className={styles.searchInput}
            type="text"
            value={input}
            placeholder="Busca algo..."
            aria-label="Buscar"
            style={{width: width}}  
            autoFocus={autoFocus}
            onChange={(e) => handleChange(e.target.value)}
            onClick={handleShowModalResults}s
          />
          <button className={styles.searchButton} onClick={handleShowModalResults}>
            <FaSearch className={styles.icon} />
          </button>
        </div>
      </div>
    </>
  );
}
