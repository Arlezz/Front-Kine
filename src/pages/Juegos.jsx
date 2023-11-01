import React from "react";
import styles from './Juegos.module.scss';
import { useState } from "react";
import { GameCard } from "../components/games/GameCard";

import InfiniteScroll from 'react-infinite-scroll-component';

export function Juegos(){


    const arraygamesObject = [
        {
            "title": "Título del juego 1",
            "url": "https://www.youtube.com/watch?v=MDErQ1KTzaI",
            "description": "Descripción del Juego 1",
            "type": "capsulas" 
        },
        {
            "title": "Título del juego 2",
            "url": "https://www.youtube.com/watch?v=0rsGP2I2sA4",
            "description": "Descripción del Juego 2"
        },
        {
            "title": "Título del juego 3",
            "url": "https://www.youtube.com/watch?v=0oZ86uJ6A44",
            "description": "Descripción del Juego 3"
        },
        {
            "title": "Título del juego 4",
            "url": "https://www.youtube.com/watch?v=LMLyjVdY4uE",
            "description": "Descripción del Juego 4"        
        },
        {
            "title": "Título del juego 5",
            "url": "https://www.youtube.com/watch?v=CdzFay1YgZY",
            "description": "Descripción del Juego 5"
        },
        {
            "title": "Título del juego 6",
            "url": "https://www.youtube.com/watch?v=byKC5FIqkV4",
            "description": "Descripción del Juego 6"
        },
        {
            "title": "Título del juego 7",
            "url": "https://www.youtube.com/watch?v=dyp7YysvggA",
            "description": "Descripción del Juego 7"
        },
        {
            "title": "Título del juego 8",
            "url": "https://www.youtube.com/watch?v=1bqT5jC02IE",
            "description": "Descripción del Juego 8"
        },
        {
            "title": "Título del juego 9",
            "url": "https://www.youtube.com/watch?v=zrpbRoAnVjc",
            "description": "Descripción del Juego 9"
        },
        {
            "title": "Título del juego 10",
            "url": "https://www.youtube.com/watch?v=Kd_YulTXx-Q",
            "description": "Descripción del Juego 10"
        },
        {
            "title": "Título del juego 11",
            "url": "https://www.youtube.com/watch?v=Fv-AUG8-qRE",
            "description": "Descripción del Juego 11"
        },
        {
            "title": "Título del juego 12",
            "url": "https://www.youtube.com/watch?v=a9AN0raH_qc",
            "description": "Descripción del Juego 12"
        },
        {
            "title": "Título del juego 1",
            "url": "https://www.youtube.com/watch?v=MDErQ1KTzaI",
            "description": "Descripción del Juego 1"    
        },
        {
            "title": "Título del juego 2",
            "url": "https://www.youtube.com/watch?v=0rsGP2I2sA4",
            "description": "Descripción del Juego 2"
        },
        {
            "title": "Título del juego 3",
            "url": "https://www.youtube.com/watch?v=0oZ86uJ6A44",
            "description": "Descripción del Juego 3"
        },
        {
            "title": "Título del juego 4",
            "url": "https://www.youtube.com/watch?v=LMLyjVdY4uE",
            "description": "Descripción del Juego 4"
        },
        {
            "title": "Título del juego 5",
            "url": "https://www.youtube.com/watch?v=CdzFay1YgZY",
            "description": "Descripción del Juego 5"
        },
        {
            "title": "Título del juego 6",
            "url": "https://www.youtube.com/watch?v=byKC5FIqkV4",
            "description": "Descripción del Juego 6"
        },
        {
            "title": "Título del juego 7",
            "url": "https://www.youtube.com/watch?v=dyp7YysvggA",
            "description": "Descripción del Juego 7"
        },
        {
            "title": "Título del juego 8",
            "url": "https://www.youtube.com/watch?v=1bqT5jC02IE",
            "description": "Descripción del Juego 8"
        },
        {
            "title": "Título del juego 9",
            "url": "https://www.youtube.com/watch?v=zrpbRoAnVjc",
            "description": "Descripción del Juego 9"
        },
        {
            "title": "Título del juego 10",
            "url": "https://www.youtube.com/watch?v=Kd_YulTXx-Q",
            "description": "Descripción del Juego 10"
        },
        {
            "title": "Título del juego 11",
            "url": "https://www.youtube.com/watch?v=Fv-AUG8-qRE",
            "description": "Descripción del Juego 11"
        },
        {
            "title": "Título del juego 12",
            "url": "https://www.youtube.com/watch?v=a9AN0raH_qc",
            "description": "Descripción del Juego 12"
        },
        {
            "title": "Título del juego 1",
            "url": "https://www.youtube.com/watch?v=MDErQ1KTzaI",
            "description": "Descripción del Juego 1"    
        },
        {
            "title": "Título del juego 2",
            "url": "https://www.youtube.com/watch?v=0rsGP2I2sA4",
            "description": "Descripción del Juego 2"
        },
        {
            "title": "Título del juego 3",
            "url": "https://www.youtube.com/watch?v=0oZ86uJ6A44",
            "description": "Descripción del Juego 3"
        },
        {
            "title": "Título del juego 4",
            "url": "https://www.youtube.com/watch?v=LMLyjVdY4uE",
            "description": "Descripción del Juego 4Descripción del Juego 4"
        },
        {
            "title": "Título del juego 5",
            "url": "https://www.youtube.com/watch?v=CdzFay1YgZY",
            "description": "Descripción del Juego 5"
        },
        {
            "title": "Título del juego 6",
            "url": "https://www.youtube.com/watch?v=byKC5FIqkV4",
            "description": "Descripción del Juego 6"
        },
        {
            "title": "Título del juego 7",
            "url": "https://www.youtube.com/watch?v=dyp7YysvggA",
            "description": "Descripción del Juego 7",
            "isType":"tutoriales"
        },
        {
            "title": "Título del juego 8",
            "url": "https://www.youtube.com/watch?v=1bqT5jC02IE",
            "description": "Descripción del Juego 8"
        },
        {
            "title": "Título del juego 9",
            "url": "https://www.youtube.com/watch?v=zrpbRoAnVjc",
            "description": "Descripción del Juego 9"
        },
        {
            "title": "Título del juego 10",
            "url": "https://www.youtube.com/watch?v=Kd_YulTXx-Q",
            "description": "Descripción del Juego 10"
        },
        {
            "title": "Título del juego 11",
            "url": "https://www.youtube.com/watch?v=Fv-AUG8-qRE",
            "description": "Descripción del Juego 11"
        },
        {
            "title": "Título del juego 12",
            "url": "https://www.youtube.com/watch?v=a9AN0raH_qc",
            "description": "Descripción del Juego 12"
        }
    ];


    const [gamesToDisplay, setgamesToDisplay] = useState(arraygamesObject.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);
    const [isDescriptionExpanded, setDescriptionExpanded] = useState(false);
    const [descriptionHeight, setDescriptionHeight] = useState(null);

    const fetchMoreData = () => {
        const visiblegames = gamesToDisplay.length;
        const newgamesToDisplay = arraygamesObject.slice(visiblegames, visiblegames + 1);

        if (newgamesToDisplay.length === 0) {
        setHasMore(false);
        } else {
        setgamesToDisplay(gamesToDisplay.concat(newgamesToDisplay));
        }
    };

    return (
        <div id="juegos" className={styles.juegosContainer}>

            <div className={styles.tittle}>
                <h2>Juegos</h2>
            </div>

            <div className={styles.juegosBody}>
                <InfiniteScroll
                    dataLength={gamesToDisplay.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    height={400} // Usa descriptionHeight si está definido, de lo contrario, usa 700 como altura predeterminada
                    loader={<h4>Loading...</h4>}
                >
                    <div className={styles.juegosCardGrid}>
                        {gamesToDisplay.map((game, index) => (
                                <GameCard game={game}/> 
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}