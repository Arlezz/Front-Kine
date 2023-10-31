import React from "react";
import { useState } from "react";
import styles from './Tutoriales.module.scss';
import { embeddedURL, embeddedURLThumbnail} from "../utils/embedVideo";

import InfiniteScroll from 'react-infinite-scroll-component';


export function Tutoriales() {

    const arrayVideosObject = [
        {
            "title": "Título del Video 1",
            "url": "https://www.youtube.com/watch?v=MDErQ1KTzaI",
            "description": "Descripción del Video 1"    
        },
        {
            "title": "Título del Video 2",
            "url": "https://www.youtube.com/watch?v=0rsGP2I2sA4",
            "description": "Descripción del Video 2"
        },
        {
            "title": "Título del Video 3",
            "url": "https://www.youtube.com/watch?v=0oZ86uJ6A44",
            "description": "Descripción del Video 3"
        },
        {
            "title": "Título del Video 4",
            "url": "https://www.youtube.com/watch?v=LMLyjVdY4uE",
            "description": "Descripción del Video 4"
        },
        {
            "title": "Título del Video 5",
            "url": "https://www.youtube.com/watch?v=CdzFay1YgZY",
            "description": "Descripción del Video 5"
        },
        {
            "title": "Título del Video 6",
            "url": "https://www.youtube.com/watch?v=byKC5FIqkV4",
            "description": "Descripción del Video 6"
        },
        {
            "title": "Título del Video 7",
            "url": "https://www.youtube.com/watch?v=dyp7YysvggA",
            "description": "Descripción del Video 7"
        },
        {
            "title": "Título del Video 8",
            "url": "https://www.youtube.com/watch?v=1bqT5jC02IE",
            "description": "Descripción del Video 8"
        },
        {
            "title": "Título del Video 9",
            "url": "https://www.youtube.com/watch?v=zrpbRoAnVjc",
            "description": "Descripción del Video 9"
        },
        {
            "title": "Título del Video 10",
            "url": "https://www.youtube.com/watch?v=Kd_YulTXx-Q",
            "description": "Descripción del Video 10"
        },
        {
            "title": "Título del Video 11",
            "url": "https://www.youtube.com/watch?v=Fv-AUG8-qRE",
            "description": "Descripción del Video 11"
        },
        {
            "title": "Título del Video 12",
            "url": "https://www.youtube.com/watch?v=a9AN0raH_qc",
            "description": "Descripción del Video 12"
        },
        {
            "title": "Título del Video 1",
            "url": "https://www.youtube.com/watch?v=MDErQ1KTzaI",
            "description": "Descripción del Video 1"    
        },
        {
            "title": "Título del Video 2",
            "url": "https://www.youtube.com/watch?v=0rsGP2I2sA4",
            "description": "Descripción del Video 2"
        },
        {
            "title": "Título del Video 3",
            "url": "https://www.youtube.com/watch?v=0oZ86uJ6A44",
            "description": "Descripción del Video 3"
        },
        {
            "title": "Título del Video 4",
            "url": "https://www.youtube.com/watch?v=LMLyjVdY4uE",
            "description": "Descripción del Video 4"
        },
        {
            "title": "Título del Video 5",
            "url": "https://www.youtube.com/watch?v=CdzFay1YgZY",
            "description": "Descripción del Video 5"
        },
        {
            "title": "Título del Video 6",
            "url": "https://www.youtube.com/watch?v=byKC5FIqkV4",
            "description": "Descripción del Video 6"
        },
        {
            "title": "Título del Video 7",
            "url": "https://www.youtube.com/watch?v=dyp7YysvggA",
            "description": "Descripción del Video 7"
        },
        {
            "title": "Título del Video 8",
            "url": "https://www.youtube.com/watch?v=1bqT5jC02IE",
            "description": "Descripción del Video 8"
        },
        {
            "title": "Título del Video 9",
            "url": "https://www.youtube.com/watch?v=zrpbRoAnVjc",
            "description": "Descripción del Video 9"
        },
        {
            "title": "Título del Video 10",
            "url": "https://www.youtube.com/watch?v=Kd_YulTXx-Q",
            "description": "Descripción del Video 10"
        },
        {
            "title": "Título del Video 11",
            "url": "https://www.youtube.com/watch?v=Fv-AUG8-qRE",
            "description": "Descripción del Video 11"
        },
        {
            "title": "Título del Video 12",
            "url": "https://www.youtube.com/watch?v=a9AN0raH_qc",
            "description": "Descripción del Video 12"
        },
        {
            "title": "Título del Video 1",
            "url": "https://www.youtube.com/watch?v=MDErQ1KTzaI",
            "description": "Descripción del Video 1"    
        },
        {
            "title": "Título del Video 2",
            "url": "https://www.youtube.com/watch?v=0rsGP2I2sA4",
            "description": "Descripción del Video 2"
        },
        {
            "title": "Título del Video 3",
            "url": "https://www.youtube.com/watch?v=0oZ86uJ6A44",
            "description": "Descripción del Video 3"
        },
        {
            "title": "Título del Video 4",
            "url": "https://www.youtube.com/watch?v=LMLyjVdY4uE",
            "description": "Descripción del Video 4"
        },
        {
            "title": "Título del Video 5",
            "url": "https://www.youtube.com/watch?v=CdzFay1YgZY",
            "description": "Descripción del Video 5"
        },
        {
            "title": "Título del Video 6",
            "url": "https://www.youtube.com/watch?v=byKC5FIqkV4",
            "description": "Descripción del Video 6"
        },
        {
            "title": "Título del Video 7",
            "url": "https://www.youtube.com/watch?v=dyp7YysvggA",
            "description": "Descripción del Video 7"
        },
        {
            "title": "Título del Video 8",
            "url": "https://www.youtube.com/watch?v=1bqT5jC02IE",
            "description": "Descripción del Video 8"
        },
        {
            "title": "Título del Video 9",
            "url": "https://www.youtube.com/watch?v=zrpbRoAnVjc",
            "description": "Descripción del Video 9"
        },
        {
            "title": "Título del Video 10",
            "url": "https://www.youtube.com/watch?v=Kd_YulTXx-Q",
            "description": "Descripción del Video 10"
        },
        {
            "title": "Título del Video 11",
            "url": "https://www.youtube.com/watch?v=Fv-AUG8-qRE",
            "description": "Descripción del Video 11"
        },
        {
            "title": "Título del Video 12",
            "url": "https://www.youtube.com/watch?v=a9AN0raH_qc",
            "description": "Descripción del Video 12"
        }
    ];

    const [selectedVideo, setSelectedVideo] = useState(arrayVideosObject[0]);
    const [videosToDisplay, setVideosToDisplay] = useState(arrayVideosObject.slice(0, 4));
    const [hasMore, setHasMore] = useState(true);

    const handleThumbnailClick = (video) => {
        setSelectedVideo(video);
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
                    height={700}
                    loader={<h4>Loading...</h4>}
                >
                    {videosToDisplay.map((video, index) => (
                        <>
                            <div
                            className={styles.thumbnail}
                            key={index}
                            onClick={() => handleThumbnailClick(video)}
                            >
                                <img
                                width="560"
                                height="315"
                                src={embeddedURLThumbnail(video.url)}
                                alt="YouTube video thumbnail"
                                />
                                <div>{video.title}</div>
                            </div>
                            <hr />
                        </>
                    
                    ))}
                </InfiniteScroll>
                </div>
                <div className={styles.tutorialVideoMain}>
                    {selectedVideo && (
                        <iframe
                        loading="lazy"
                        width="560"
                        height="315"
                        src={`${embeddedURL(selectedVideo.url)}&autoplay=1;`}
                        title="YouTube video player"
                        allow="fullscreen; accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture;"
                        ></iframe>
                    )}
                    {selectedVideo && <div className={styles.videoTitle}>{selectedVideo.title}</div>}
                </div>
            </div>
        </div>
    );
}
