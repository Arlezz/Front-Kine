import { embeddedURLThumbnail } from '../../utils/embedVideo';


import styles from './Thumbnails.module.scss';

export function Thumbnails({ video, handleThumbnailClick, index, grid}){
    return(
        <div key={index}>
            <div
            className={ `${styles.thumbnail} ${grid==="true"? styles.miniatureGrid : ""}` }
            key={index}
            onClick={() => handleThumbnailClick(video)}
            >
                <img
                width="560"
                height="315"
                src={embeddedURLThumbnail(video.url)}
                alt="YouTube video thumbnail"
                />
                <h3 className={styles.miniatureTitle}>{video.title}</h3>
            </div>
        </div>
    );
}