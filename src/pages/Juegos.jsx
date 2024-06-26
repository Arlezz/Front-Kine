import React, { useEffect } from "react";
import styles from './Juegos.module.scss';
import { useState } from "react";
import { GameCard } from "../components/games/GameCard";

import InfiniteScroll from 'react-infinite-scroll-component';
import GeneralService from "../services/General.service";

export function Juegos(){

    const [games, setGames] = useState([]); 
    const [gamesToDisplay, setgamesToDisplay] = useState(games.slice(0, 10));
    const [hasMore, setHasMore] = useState(true);

    useEffect(() => {
        GeneralService.getGames().
        then((data) => {
            setGames(data);
            setgamesToDisplay(data.slice(0, 10));
            if (data.length < 10) {
                setHasMore(false);
            }
        })
    }, []);

    const fetchMoreData = () => {
        const visiblegames = gamesToDisplay.length;
        const newgamesToDisplay = games.slice(visiblegames, visiblegames + 4);

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

            <div id="juegosBody" className={styles.juegosBody}>
                <InfiniteScroll
                    dataLength={gamesToDisplay.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    height={500}
                    loader={<h4>Loading...</h4>}
                    endMessage={
                        <div className={styles.noMoreTextContainer}>
                            <p style={{ textAlign: 'center' }}>
                                <b>No hay Juegos para mostrar</b>
                            </p>
                        </div>
                    }
                >
                    <div className={styles.juegosCardGrid}>
                        {gamesToDisplay.map((game, index) => (
                                <GameCard id={game._id} key={index} game={game}/> 
                        ))}
                    </div>
                </InfiniteScroll>
            </div>
        </div>
    )
}