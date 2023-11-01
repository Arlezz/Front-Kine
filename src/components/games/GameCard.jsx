import styles from './GameCard.module.scss';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faGamepad
} from "@fortawesome/free-solid-svg-icons";

export function GameCard( {game} ){
    return(
        <div className={styles.gameCardContainer}>
            <FontAwesomeIcon icon={faGamepad} className={styles.gameIcon}/>
            <h3 className={styles.gameCardName}>{game.title}</h3>
            <div className={styles.gameCardDescription}>
                {game.description}
            </div>
        </div>
    )
}
