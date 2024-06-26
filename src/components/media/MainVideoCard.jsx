import { embeddedURL} from "../../utils/embedVideo";
import { convertURLsToLinks } from "../../utils/parser";

import styles from './MainVideoCard.module.scss';


export function MainVideoCard( { video, isDescriptionExpanded, toggleDescription } ){

    return(
        <>
            {video && (
                <div className={styles.mainVideoContariner}>
                    <iframe
                        loading="lazy"
                        width="560"
                        height="315"
                        src={`${embeddedURL(video.url)}&autoplay=0;`}
                        title="YouTube video player"
                        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                    ></iframe>
                </div>
                
            )}
            {video && (
                <div>
                    <h3 className={styles.videoTitle}>
                        {video.title}
                    </h3>
                    <div className={styles.videoDescription}>
                        {isDescriptionExpanded ? convertURLsToLinks(video.description) : convertURLsToLinks(video.description.slice(0, 200))}
                        {video.description.length > 50 && !isDescriptionExpanded && (
                            <span onClick={toggleDescription} className={styles.readMore}>
                                ...Mostrar más
                            </span>
                        )}
                        {video.description.length > 50 && isDescriptionExpanded && (
                            <span onClick={toggleDescription} className={styles.readLess}>
                                Mostrar menos
                            </span>
                        )}
                    </div>
                </div>
            )}
        </>
    )
}