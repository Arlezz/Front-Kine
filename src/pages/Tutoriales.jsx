import React from "react";
import { useState } from "react";
import styles from './Tutoriales.module.scss';
import { arrayVideosObject } from "../utils/data";
import { MainVideoCard } from "../components/media/MainVideoCard";


import InfiniteScroll from 'react-infinite-scroll-component';
import { Thumbnails } from "../components/media/Thumbnails";


export function Tutoriales() {


    const [selectedVideo, setSelectedVideo] = useState(arrayVideosObject[0]);
    const [videosToDisplay, setVideosToDisplay] = useState(arrayVideosObject.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    const [descriptionHeight, setDescriptionHeight] = useState(null);

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
        setDescriptionExpanded(false);
        setDescriptionHeight(null);
    };

    const fetchMoreData = () => {
        const visibleVideos = videosToDisplay.length;
        const newVideosToDisplay = arrayVideosObject.slice(visibleVideos, visibleVideos + 1);

        if (newVideosToDisplay.length === 0) {
        setHasMore(false);
        } else {
        setVideosToDisplay(videosToDisplay.concat(newVideosToDisplay));
        }
    };

    const toggleDescription = () => {
        setDescriptionExpanded(!isDescriptionExpanded);
    
        if (!isDescriptionExpanded) {
            setTimeout(() => {
                const descriptionElement = document.querySelector(`.${styles.tutorialVideoMain}`);    
                if (descriptionElement) {
                    const totalHeight = descriptionElement.scrollHeight;
                    setDescriptionHeight(totalHeight);
                }
            }, 10); // Ajusta el tiempo de espera según tus necesidades.
        } else {
            setDescriptionHeight(null);
        }
    };

    return (
        <div id="tutoriales" className={styles.tutorialContainer}>
            <div className={styles.tittle}>
                <h2>Tutoriales</h2>
            </div>
            <div className={styles.tutorialBody}>
                <div className={styles.tutorialVideosLeft}>
                <InfiniteScroll
                    dataLength={videosToDisplay.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    height={descriptionHeight || 700} // Usa descriptionHeight si está definido, de lo contrario, usa 700 como altura predeterminada
                    loader={<h4>Loading...</h4>}
                >
                    {videosToDisplay.map((video, index) => (
                        <div key={index}>
                            <Thumbnails  video={video} handleThumbnailClick={handleThumbnailClick} index={index}/>
                            <hr />
                        </div>
                    ))}
                </InfiniteScroll>
                </div>
                <div className={styles.tutorialVideoMain}>
                    <MainVideoCard video={selectedVideo} isDescriptionExpanded={isDescriptionExpanded} toggleDescription={toggleDescription}/>
                </div>
            </div>
        </div>
    );
}
