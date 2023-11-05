

import styles from "./Administrador.module.scss";

export function Administrador() {
    return (
        <div className={styles.administradorContent}>
        <h1 className={styles.pageTitle}>Administrador</h1>
        <div className={styles.administradorContainer}>
            <div className={styles.administradorLeft}>
            <h2 className={styles.administradorLeftTitle}>Usuarios</h2>
            <div className={styles.administradorLeftContainer}>
                <div className={styles.administradorLeftCard}>
                <h3 className={styles.administradorLeftCardTitle}>Usuarios</h3>
                <span className={styles.administradorLeftCardText}>
                    Administre los usuarios de la plataforma
                </span>
                <button className={styles.administradorLeftCardButton}>
                    Administrar
                </button>
                </div>
                <div className={styles.administradorLeftCard}>
                <h3 className={styles.administradorLeftCardTitle}>
                    Administradores
                </h3>
                <span className={styles.administradorLeftCardText}>
                    Administre los administradores de la plataforma
                </span>
                <button className={styles.administradorLeftCardButton}>
                    Administrar
                </button>
                </div>
            </div>
            </div>
            <div className={styles.administradorRight}>
            <h2 className={styles.administradorRightTitle}>Contenido</h2>
            <div className={styles.administradorRightContainer}>
                <div className={styles.administradorRightCard}>
                <h3 className={styles.administradorRightCardTitle}>Tutoriales</h3>
                <span className={styles.administradorRightCardText}>
                    Administre los tutoriales de la plataforma
                </span>
                <button className={styles.administradorRightCardButton}>
                    Administrar
                </button>
                </div>
                <div className={styles.administradorRightCard}>
                <h3 className={styles.administradorRightCardTitle}>Capsulas</h3>
                <span className={styles.administradorRightCardText}>
                    Administre las capsulas de la plataforma
                </span>
                <button className={styles.administradorRightCardButton}>
                    Administrar
                </button>
                </div>
                <div className={styles.administradorRightCard}>
                <h3 className={styles.administradorRightCardTitle
                }>Juegos</h3>
                <span className={styles.administradorRightCardText}>
                    Administre los juegos de la plataforma
                </span>
                <button className={styles.administradorRightCardButton}>
                    Administrar
                </button>
                </div>
            </div>
            </div>
        </div>
        </div>
    );
}