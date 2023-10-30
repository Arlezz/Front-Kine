
import styles from './Foro.module.scss';

import { ForoBody } from '../forum/ForoBody';
import { ForoResponseBox } from '../forum/ForoResponseBox';

export function Foro() {
    return (
        <aside className={styles.sideForo}>
            <div className={styles.sideForoHeader}>
                <h2 className={styles.tiitle}>Foro</h2>
                <h3 className={styles.sideSubtitle}>Escribe cualquier duda o consulta que tengas</h3>
            </div>
            <div className={styles.sideForoBox}>
                <ForoBody/>
                <ForoBody/>
                <ForoBody/>
                <ForoBody/>
                <ForoBody/>
                <ForoBody/>
                <ForoBody/>
                
            </div>
            <ForoResponseBox/>
        </aside>
    );
}