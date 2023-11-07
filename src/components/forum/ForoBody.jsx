import { useEffect, useState } from 'react';
import styles from './ForoBody.module.scss';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faComment, faHeart } from "@fortawesome/free-regular-svg-icons";
import { faUser, faUserTie, faUserGear } from "@fortawesome/free-solid-svg-icons";
import { ForoResponseModal } from "../forum/ForoResponseModal";
import { convertURLsToLinks } from '../../utils/parser';
import GeneralService from '../../services/General.service';

export function ForoBody({ post, index, currentUser}) {
  const [show, setShow] = useState(false);
  const [like, setLike] = useState(false);
  const [postLikes, setPostLikes] = useState(post.likes);
  const [postComments, setPostComments] = useState(post.comments);

  const handleShow = () => {
    setShow(!show);
  }

  useEffect(() => {
    GeneralService.hasLikedPost(post._id,currentUser.email)
    .then((data) => {
      setLike(data.hasLiked);
    })
    .catch((error) => {
      console.log(error.response.data.message);
    });
  },[]);

  const handleLike = () => {
    setLike(!like);
    GeneralService.likePosts(post._id,currentUser.email)
    .then((data) => {
      setPostLikes(prevLikes => prevLikes + 1);
    })
    .catch((error) => {
      console.log(error.response.data.message);
      GeneralService.dislikePosts(post._id,currentUser.email);
      setPostLikes(prevLikes => prevLikes - 1);
    }); 
  }

  return (
    <div key={index}>
      <div id="foroBody" className={styles.bodyContainer}>
        <div className={styles.mainContent} onClick={() => {
          //console.log(post);
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
              <span>{postComments}</span>
            </div>
            <div className={`${styles.heartIcon} ${like ? styles.heartCliked : ''}`} onClick={handleLike}>
              <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} />
              <span>{postLikes}</span>
            </div>
          </div>
        </div>
      </div>
      <hr className={styles.separator} />
      <ForoResponseModal setPostComments={setPostComments} currentUser={currentUser} show={show} handleShow={handleShow} post={post} />
    </div>
  )
}
