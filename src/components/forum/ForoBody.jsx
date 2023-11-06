import { useState } from 'react';
import styles from './ForoBody.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser, faUserTie, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { ForoResponseModal } from "../forum/ForoResponseModal";
import { convertURLsToLinks } from '../../utils/parser';

export function ForoBody({ post, index, currentUser}) {
  const [show, setShow] = useState(false);

  const handleShow = () => {
    setShow(!show);
  }

  
  

  return (
    <div key={index}>
      <div id="foroBody" className={styles.bodyContainer}>
        <div className={styles.mainContent} onClick={() => {
          console.log(post);
          //handleShow();
        }}>
          <h4>{post.title}</h4>
          <div className={styles.infoPost}>
            <h5>
              {post.user? post.user.name : null}
            </h5>
            {post.user && (
              <div className={styles.icon}>
                {post.user.role === 'admin' && (
                  <FontAwesomeIcon style={{color:'#f4177d', width: '1.6rem', height: '1.6rem'}} className={styles.adminIcon} icon={faUserGear} />
                )}
                {post.user.role === 'estudiante' && (
                  <FontAwesomeIcon style={{color:'#1f86c9', width: '1.2rem', height: '1.2rem'}} className={styles.estudianteIcon} icon={faUser} />
                )}
                {post.user.role === 'profesor' && (
                  <FontAwesomeIcon style={{color:'#ecb500', width: '1.4rem', height: '1.4rem'}} className={styles.professorIcon} icon={faUserTie} />
                )}
              </div>
            )}
            <span> ·</span>
            <h6>Publicado el {post.date} </h6>
          </div>
          <p>{convertURLsToLinks(post.content)}</p> 
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
      <hr className={styles.separator} />
      <ForoResponseModal show={show} handleShow={handleShow} post={post} />
    </div>
  )
}
