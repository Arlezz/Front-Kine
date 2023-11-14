import React from "react";
import { useState } from "react";
import styles from './Capsulas.module.scss';
import { MainVideoCard } from "../components/media/MainVideoCard";
import { Thumbnails } from "../components/media/Thumbnails";

import InfiniteScroll from 'react-infinite-scroll-component';
import GeneralService from "../services/General.service";
import { useEffect } from "react";
import { Spinner } from "../components/Spinner";

export function Capsulas() {


    const [capsules, setCapsules] = useState([]); // [{}
    const [selectedVideo, setSelectedVideo] = useState(capsules[0]);
    const [videosToDisplay, setVideosToDisplay] = useState(capsules.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    const [descriptionHeight, setDescriptionHeight] = useState(null);

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
        setDescriptionExpanded(false); // Resetear a estado no expandido al cambiar el video
        setDescriptionHeight(null);
    };

    useEffect(() => {
        GeneralService.getCapsules()
        .then((data) => {            
            setCapsules(data);
            setSelectedVideo(data[0]);
            setVideosToDisplay(data.slice(0, 10));
            if (data.length < 10) {
                setHasMore(false);
            }
        })
    }, []);

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
        const newVideosToDisplay = capsules.slice(visibleVideos, visibleVideos + 2);
        
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
                <div id="videoRight" className={styles.capsulaVideosRight}>
                    <InfiniteScroll
                        dataLength={videosToDisplay.length}
                        next={fetchMoreData}
                        hasMore={hasMore}
                        height={descriptionHeight || 700} // Usa descriptionHeight si está definido, de lo contrario, usa 700 como altura predeterminada
                        loader={<Spinner/>}
                        endMessage={<div className={styles.noMoreTextContainer}>
                                        <p style={{ textAlign: 'center' }}>
                                            <b>No hay Capsulas para mostrar</b>
                                        </p>
                                    </div>}
                    >
                        <div className={styles.thumbnailGrid}>
                            {videosToDisplay.map((video, index) => (
                                <Thumbnails id={video._id}  key={index} video={video} handleThumbnailClick={handleThumbnailClick} index={index} grid="true"/>
                            ))}
                        </div>
                    </InfiniteScroll>
                </div>
            </div>
        </div>
    );
}
