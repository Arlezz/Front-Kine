
import styles from './Search.module.scss';

import { FaSearch } from 'react-icons/fa';

export function Search() {
    return (
        <>
            <div className={styles.searchContainer}>
                <input 
                    id='search'
                    className={styles.searchInput} 
                    type="text"
                    
                    placeholder="Busca algo..."
                    autoFocus
                    aria-label='Buscar' 
                />
                <button 
                    className={styles.searchButton}
                    >
                    <FaSearch className={styles.icon} />
                </button>
            </div>
        </>
    )
}