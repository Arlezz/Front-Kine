import styles from './GameCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGamepad
} from "@fortawesome/free-solid-svg-icons";

export function GameCard( {game} ){


    return(
        <a href={game.url} target="_blank" rel="noopener noreferrer" className={styles.gameCardContainer}>  
            <FontAwesomeIcon icon={faGamepad} className={styles.gameIcon}/>
            <div className={styles.gameNameContainer}>
                <span className={styles.gameCardName}>{game.title}</span>
            </div>
            <div className={styles.gameCardDescription}>
                {game.description}
            </div>
        </a>
    )
}
