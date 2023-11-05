import React, { useEffect, useState } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import styles from './Foro.module.scss';
import { ForoBody } from '../forum/ForoBody';
import InfiniteScroll from 'react-infinite-scroll-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown } from '@fortawesome/free-solid-svg-icons';

import { ForoResponseButton } from '../forum/ForoResponseButton';
import { ForoPostModal } from '../forum/ForoPostModal';

import GeneralService from '../../services/General.service';
import { Spinner } from '../Spinner';
import AuthService from '../../services/Auth.service';


export function Foro() {

    const [currentUser, setCurrentUser] = useState({});

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);


    

    const [posts, setPosts] = useState([]); //[{title: "hola", comment: "hola", author: "hola", date: "hola", likes: 0, responses: []}
    const [PostsToDisplay, setPostsToDisplay] = useState(posts.slice(0, 1));
    const [hasMore, setHasMore] = useState(true);
    const [checkboxStates, setCheckboxStates] = useState([false, false, false]);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);


    const handleShow = () => {
        setShow(!show);
    }

    const fetchData = async () => {
        setIsLoading(true);
        try {
            const response = await GeneralService.getPosts();
            setPosts(response);
            setPostsToDisplay(response.slice(0, 10));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchData(); // Realiza la carga de datos al principio

        const timer = setInterval(() => {
            fetchData(); // Realiza la carga de datos cada cierto tiempo (por ejemplo, cada 5 minutos)
        }, 60000); // 60000 milisegundos = 1 minutos

        return () => {
            clearInterval(timer);
        };
    }, []);
    

    /*if (!isLoading) {
        console.log("posts ",posts);
        console.log("postsToDisplay ",PostsToDisplay);
    }*/
    

    const fetchMoreData = () => {
        
        const visiblePosts = PostsToDisplay.length;
        console.log("visiblePost ",visiblePosts);        
        const newPostsToDisplay = posts.slice(visiblePosts, visiblePosts + 1);

        if (newPostsToDisplay.length === 0) {
            setHasMore(false);
        } else {
            setPostsToDisplay(PostsToDisplay.concat(newPostsToDisplay));
        }
    };


    const handleCheckboxClick = (index) => {
        const updatedStates = [...checkboxStates];
        updatedStates[index] = !updatedStates[index];
        setCheckboxStates(updatedStates);
    };

    return (
        <aside className={styles.sideForo}>
            <div className={styles.sideForoHeader}>
                <div className={styles.foroHeader}>
                    <h2 className={styles.tiitle}>Foro</h2>
                    <Dropdown autoClose="outside" align="end">
                        <Dropdown.Toggle as={Button} variant="info" id="dropdown-menu-align-start" className={styles.customDropdown}>
                            Filtrar Por
                            <span className={styles.dropdownButton}>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>
                            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleCheckboxClick(0)}>
                                <input type="checkbox" id="filtro1" checked={checkboxStates[0]} readOnly />
                                <label htmlFor="filtro1" className={styles.customLabel}>Sin Responder</label>
                            </Dropdown.Item>
                            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleCheckboxClick(1)}>
                                <input type="checkbox" id="filtro2" checked={checkboxStates[1]} readOnly />
                                <label htmlFor="filtro2" className={styles.customLabel}>Mas Likes</label>
                            </Dropdown.Item>
                            <Dropdown.Item className={styles.dropdownItem} onClick={() => handleCheckboxClick(2)}>
                                <input type="checkbox" id="filtro3" checked={checkboxStates[2]} readOnly />
                                <label htmlFor="filtro3" className={styles.customLabel}>Menos Likes</label>
                            </Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>

                </div>
                <h3 className={styles.sideSubtitle}>Escribe cualquier duda o consulta que tengas</h3>
            </div>

            <div className={styles.sideForoBox}>
                <InfiniteScroll
                    dataLength={PostsToDisplay.length}
                    next={fetchMoreData}
                    hasMore={hasMore}
                    height={"calc(100vh - 25rem)"}
                    loader={<Spinner />}
                >
                    {PostsToDisplay.map((post, index) => (
                        <ForoBody key={index} post={post} index={index}/>
                    ))}
                </InfiniteScroll>
            </div>
            <ForoResponseButton handleShow={handleShow} />
            <ForoPostModal show={show} handleShow={handleShow} currentUser={currentUser} setForoToDisplay={setPostsToDisplay}/>

        </aside>
    );
}
