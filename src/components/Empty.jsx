import styles from './Empty.module.scss';

export function Empty({height, text}) {
    return (
        <div className={styles.empty} style={{height:height}}>
            {text}
        </div>
    )
}