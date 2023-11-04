import { useState } from 'react';
import styles from './ForoBody.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import { ForoResponseModal } from "../forum/ForoResponseModal";



export function ForoBody( {post, index} ){
    
    const [show, setShow] = useState(false);

    const handleShow = () => {
        setShow(!show);
    }

    
    return (
    <div key={index}>
        <div id="foroBody"  className={styles.bodyContainer}>
            <div className={styles.mainContent} onClick={()=> {
                handleShow();
            }}>
                    <h4>{post.title}</h4>
                    <div className={styles.infoPost}>
                        <h5>{post.name}</h5>
                        <FontAwesomeIcon icon={faUser} />
                        <span> ·</span>
                        <h6>Publicado el {post.date} </h6>
                    </div>
                    <p>{post.content}</p>
                    <div className={styles.reactionContent} >
                            <div className={styles.commentIcon} onClick={handleShow}>
                                <FontAwesomeIcon icon={faComment} />
                                <span>{post.comments}</span>
                            </div>
                        <div className={styles.heartIcon}>
                            <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} />
                            <span>{post.likes}</span>
                        </div>
                    </div>
            </div>
        </div>
        <hr className={styles.separator}/>
        <ForoResponseModal show={show} handleShow={handleShow} post={post}/>
    </div> 
    )
}