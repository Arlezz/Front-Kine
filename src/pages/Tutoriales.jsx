import React, { useEffect } from "react";
import { useState } from "react";
import styles from './Tutoriales.module.scss';
import { MainVideoCard } from "../components/media/MainVideoCard";
import { Spinner } from "../components/Spinner";


import InfiniteScroll from 'react-infinite-scroll-component';
import { Thumbnails } from "../components/media/Thumbnails";
import GeneralService from "../services/General.service";
import AuthService from "../services/Auth.service";


export function Tutoriales() {



    const [tutorials, setTutorials] = useState([]); // [{}
    const [selectedVideo, setSelectedVideo] = useState(tutorials[0]);
    const [videosToDisplay, setVideosToDisplay] = useState(tutorials.slice(0, 20));
    const [hasMore, setHasMore] = useState(true);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    const [descriptionHeight, setDescriptionHeight] = useState(null);

    const handleThumbnailClick = (video) => {
            setSelectedVideo(video);
            setDescriptionExpanded(false);
            setDescriptionHeight(null);
    };

    useEffect(() => {

        const user = AuthService.getCurrentUser();

        GeneralService.getTutorials()
            .then((data) => {
                setTutorials(data);
                setSelectedVideo(data[0]);
                setVideosToDisplay(data.slice(0, 10));
                if (data.length < 10) {
                    setHasMore(false);
                }
            })
            .catch((error) => {
                console.error(error);
            })
    }, []);
    
    const fetchMoreData = () => {
        const visibleVideos = videosToDisplay.length;
        const newVideosToDisplay = tutorials.slice(visibleVideos, visibleVideos + 1);

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
                <div id="videoLeft" className={styles.tutorialVideosLeft}>
                <InfiniteScroll
                    id="scrollTutorial"
                    dataLength={videosToDisplay.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    height={descriptionHeight || 700 } 
                    loader={<Spinner/>}
                    endMessage={
                        <div className={styles.noMoreTextContainer}>
                            <p style={{ textAlign: 'center' }}>
                                <b>No hay tutoriales para mostrar</b>
                            </p>
                        </div>
                        
                    }
                >
                    <div className={styles.scrollHorizontal}>
                        {videosToDisplay.map((video, index) => (
                            <div id={video._id}  className={styles.thumbailContainer} key={index}>
                                <Thumbnails video={video} handleThumbnailClick={handleThumbnailClick} index={index}/>
                                <hr />
                            </div>
                        ))}
                    </div>
                    
                </InfiniteScroll>
                </div>
                <div className={styles.tutorialVideoMain}>
                    <MainVideoCard video={selectedVideo} isDescriptionExpanded={isDescriptionExpanded} toggleDescription={toggleDescription}/>
                </div>
            </div>
        </div>
    );
}
