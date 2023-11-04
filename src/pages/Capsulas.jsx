import React from "react";
import { useState } from "react";
import styles from './Capsulas.module.scss';
import { arrayVideosObject } from "../utils/data";
import { MainVideoCard } from "../components/media/MainVideoCard";
import { Thumbnails } from "../components/media/Thumbnails";

import InfiniteScroll from 'react-infinite-scroll-component';


export function Capsulas() {


    const [selectedVideo, setSelectedVideo] = useState(arrayVideosObject[0]);
    const [videosToDisplay, setVideosToDisplay] = useState(arrayVideosObject.slice(0, 20));
    const [hasMore, setHasMore] = useState(true);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    const [descriptionHeight, setDescriptionHeight] = useState(null);


    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
        setDescriptionExpanded(false); // Resetear a estado no expandido al cambiar el video
        setDescriptionHeight(null);
    };

    const toggleDescription = () => {
        setDescriptionExpanded(!isDescriptionExpanded);
    
        if (!isDescriptionExpanded) {
            setTimeout(() => {
                const descriptionElement = document.querySelector(`.${styles.capsulaVideoMain}`);    
                if (descriptionElement) {
                    const totalHeight = descriptionElement.scrollHeight;
                    setDescriptionHeight(totalHeight);
                }
            }, 10); // Ajusta el tiempo de espera según tus necesidades.
        } else {
            setDescriptionHeight(null);
        }
    };
       

    const fetchMoreData = () => {
        const visibleVideos = videosToDisplay.length;
        const newVideosToDisplay = arrayVideosObject.slice(visibleVideos, visibleVideos + 2);

        if (newVideosToDisplay.length === 0) {
            setHasMore(false);
        } else {
            setVideosToDisplay(videosToDisplay.concat(newVideosToDisplay));
        }
    };

    return (
        <div id="capsulas" className={styles.capsulaContainer}>
            <div className={styles.tittle}>
                <h2>Capsulas</h2>
            </div>
            <div className={styles.capsulaBody}>
                <div className={styles.capsulaVideoMain}>
                    <MainVideoCard video={selectedVideo} isDescriptionExpanded={isDescriptionExpanded} toggleDescription={toggleDescription}/>

                </div>
                <div className={styles.capsulaVideosRight}>
                    <InfiniteScroll
                        dataLength={videosToDisplay.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        height={descriptionHeight || 700} // Usa descriptionHeight si está definido, de lo contrario, usa 700 como altura predeterminada
                        loader={<h4>Loading...</h4>}
                    >
                        <div className={styles.thumbnailGrid}>
                            {videosToDisplay.map((video, index) => (
                                <Thumbnails key={index} video={video} handleThumbnailClick={handleThumbnailClick} index={index} grid="true"/>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}
