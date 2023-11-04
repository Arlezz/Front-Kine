import React from "react";
import styles from './Juegos.module.scss';
import { useState } from "react";
import { GameCard } from "../components/games/GameCard";

import { arraygamesObject } from "../utils/data";


import InfiniteScroll from 'react-infinite-scroll-component';

export function Juegos(){

    const [gamesToDisplay, setgamesToDisplay] = useState(arraygamesObject.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);

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
                                <GameCard key={index} game={game}/> 
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}