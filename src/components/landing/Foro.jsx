import React, { useEffect, useState, useRef } from 'react';
import { Dropdown, Button } from 'react-bootstrap';
import styles from './Foro.module.scss';
import { ForoBody } from '../forum/ForoBody';
import InfiniteScroll from 'react-infinite-scroll-component';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleDown, faCalendar, faThumbsUp, faComment } from '@fortawesome/free-solid-svg-icons';

import { ForoResponseButton } from '../forum/ForoResponseButton';
import { ForoPostModal } from '../forum/ForoPostModal';

import GeneralService from '../../services/General.service';
import { Spinner } from '../Spinner';
import AuthService from '../../services/Auth.service';
import { Empty } from '../Empty';


export function Foro() {
    const [currentUser, setCurrentUser] = useState({});
    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
        }
    }, []);

    const [posts, setPosts] = useState([]);
    const [hasMore, setHasMore] = useState(true);
    const [show, setShow] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [selectedFilter, setSelectedFilter] = useState('date');
    const [selectedOrder, setSelectedOrder] = useState('desc');
    const [activeIndex, setActiveIndex] = useState(null);
    const [newPost, setNewPost] = useState(null);	
    const [noResponses, setNoResponses] = useState(false); // Si no hay respuestas, se muestra un mensaje

    const items = ["Reciente", "Antiguo", "Más Likes", "Menos Likes", "Más Comentarios", "Menos Comentarios"];
    const icons = [faCalendar, faCalendar, faThumbsUp, faThumbsUp, faComment, faComment];
    const filters = ["date", "date", "likes", "likes", "comments", "comments"];
    const orders = ["desc", "asc", "desc", "asc", "desc", "asc"];

    const ref = useRef([]);

    const handleShow = () => {
        setShow(!show);
    };

    const fetchData = (type, order, page) => {
        setIsLoading(true);
        GeneralService.getPosts(type, order, page, 6)
            .then((data) => {
                if (data.posts.length === 0) {
                    setNoResponses(true);
                }else{
                    setNoResponses(false);
                }

                setPosts(prevPosts => prevPosts.concat(data.posts));
                setHasMore(data.currentPage < data.totalPages);
                setIsLoading(false);
            })
            .catch((error) => {
                console.error(error);
                setIsLoading(false);
            });
    };

    const loadInitialData = () => {
        fetchData(selectedFilter, selectedOrder, page);
    };

    useEffect(() => {
        loadInitialData();        
    }, [page, selectedFilter, selectedOrder]);


    useEffect(() => {
        if (newPost){
            if (newPost && page !== 1) {
                
                setPosts([]);
                setPage(1);
            }else {
                setPosts([]);
                loadInitialData();
            }
        }
    }, [newPost]);

    const handleFilterChange = (filter, order) => {
        console.log("filter ",filter);
        if (filter === selectedFilter && order === selectedOrder) {
            if(selectedFilter !== "date" || selectedOrder !== "desc"){
                setSelectedFilter("date");
                setSelectedOrder("desc");
                setPosts([]);
                return;        
            }else{
                return;
            }
        }
        setSelectedFilter(filter);
        setSelectedOrder(order);
        setPosts([]);
        setPage(1);
    };

    const handleActive = (idx) => {
        if (idx === activeIndex) {
          setActiveIndex(null); // Si ya está activo, desactívalo
        } else {
          setActiveIndex(idx); // Si no está activo, actívalo
        }
      };
    return (
        <aside className={styles.sideForo}>
            <div className={styles.sideForoHeader}>
                <div className={styles.foroHeader}>
                    <h2 className={styles.tiitle}>Foro</h2>
                    <Dropdown 
                    autoClose="outside" 
                    align="end"
                    >
                        <Dropdown.Toggle as={Button} variant="info" id="dropdown-menu-align-start" className={styles.customDropdown} >
                            Filtrar Por
                            <span className={styles.dropdownButton}>
                                <FontAwesomeIcon icon={faAngleDown} />
                            </span>
                        </Dropdown.Toggle>
                        <Dropdown.Menu className={styles.dropdownMenu}>

                            {items.map((item, index) => (
                                <Dropdown.Item
                                    key={index}
                                    ref={(el) => (ref.current[index] = el)}
                                    className={`${styles.dropdownItem} ${index === activeIndex ? 'active' : ''}`}
                                    onClick={() => {
                                        handleActive(index);
                                        handleFilterChange(filters[index], orders[index])}}
                                >
                                    <FontAwesomeIcon icon={icons[index]} className={styles.icon} />
                                    <label htmlFor={`filtro${index}`} className={styles.customLabel}>{item}</label>
                                </Dropdown.Item>
                            ))}
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <h3 className={styles.sideSubtitle}>Escribe cualquier duda o consulta que tengas</h3>
            </div>
            <div className={styles.sideForoBox}>
            {noResponses ? (
              <Empty /> // Render the "empty" component when there are no responses
            ) : (
                <InfiniteScroll
                    dataLength={posts.length}
                    next={() => setPage((prevPage) => prevPage + 1)}
                    hasMore={hasMore}
                    height="calc(100vh - 25rem)"
                    loader={<Spinner />}
                    endMessage={
                        <p className={styles.textHelper}>- Ya haz visto todo -</p>
                    }
                >
                    {posts.map((post, index) => (
                        <ForoBody key={index} post={post} index={index} currentUser={currentUser} />
                    ))}
                </InfiniteScroll>
            )}
            </div>
            <ForoResponseButton handleShow={handleShow} />
            <ForoPostModal setNewPost={setNewPost} show={show} handleShow={handleShow} fetchData={fetchData} currentUser={currentUser} />
        </aside>
    );
}
