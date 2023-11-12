
import GeneralService from '../../services/General.service';
import styles from './Search.module.scss';

import { FaSearch } from 'react-icons/fa';

export function Search() {

    const searchItem = () => {

        const value = document.getElementById('search').value;

        GeneralService.searchContent(value)
        .then((res) => {
            console.log(res);

            const data = res;

            if(data.capsules.length > 0){
                console.log('Capsulas encontradas');
                console.log(data.capsules);
            } else if (data.games.length > 0){
                console.log('Juegos encontrados');
                console.log(data.games);
            } else if (data.tutorials.length > 0){
                console.log('Tutoriales encontrados');
                console.log(data.tutorials);
                scrollToSection(data.tutorials[0]._id)
            } else {
                console.log('No se encontraron resultados');
            }

        })
        .catch((err) => {
            console.log(err);
        })
    }

    const scrollToSection = (sectionId) => {
        const section = document.getElementById(sectionId);
        if (section) {
          section.scrollIntoView({ behavior: "smooth" });
        }
    };

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
                    onClick={searchItem}
                    >
                    <FaSearch className={styles.icon} />
                </button>
            </div>
        </>
    )
}