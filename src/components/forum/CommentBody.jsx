import { useState } from "react";

import styles from "./CommentBody.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faUser,
    faUserGear,
    faUserTie,
  } from "@fortawesome/free-solid-svg-icons";

import {
    faHeart,
    faPaperPlane,
} from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import GeneralService from "../../services/General.service";
import { convertURLsToLinks } from '../../utils/parser';


export function CommentBody({ response, currentUser, setHasResponsed, setResponsed}) {

    const [like, setLike] = useState(false);
    const [commentLikes, setCommentLikes] = useState(response.likes);
    //const [commentComments, setPostComments] = useState(response.comments);


    useEffect(() => {
      //console.log("RESPONSE ",response);
      //console.log("CURRENT USER ",currentUser);
        GeneralService.hasLikedComments(response._id,currentUser.email)
        .then((data) => {
          //console.log("HAS LIKED ",data.hasLiked);
            setLike(data.hasLiked);
        })
        .catch((error) => {
            console.log(error.response.data.message);
        });
    },[]);


    const handleLike = () => {
      setLike(!like);
      GeneralService.likeComments(response._id,currentUser.email)
      .then((data) => {
        setCommentLikes(prevLikes => prevLikes + 1);
      })
      .catch((error) => {
        console.log(error.response.data.message);
        GeneralService.dislikeComments(response._id,currentUser.email);
        setCommentLikes(prevLikes => prevLikes - 1);
      }); 
    }


  return (
    <div className={styles.response}>
      <div className={styles.responseHeader}>
        <div className={styles.infoResponse}>
          <h5>{response.user ? response.user.name : ""}</h5>
          <div className={styles.icon}>
            {response.user && (
              <div className={styles.iconContainer}>
                {response.user.role === "admin" && (
                  <FontAwesomeIcon
                    style={{
                      color: "#f4177d",
                      width: "1.6rem",
                      height: "1.6rem",
                    }}
                    className={styles.adminIcon}
                    icon={faUserGear}
                  />
                )}
                {response.user.role === "estudiante" && (
                  <FontAwesomeIcon
                    style={{
                      color: "#1f86c9",
                      width: "1.2rem",
                      height: "1.2rem",
                    }}
                    className={styles.estudianteIcon}
                    icon={faUser}
                  />
                )}
                {response.user.role === "profesor" && (
                  <FontAwesomeIcon
                    style={{
                      color: "#ecb500",
                      width: "1.4rem",
                      height: "1.4rem",
                    }}
                    className={styles.professorIcon}
                    icon={faUserTie}
                  />
                )}
              </div>
            )}
          </div>
          <span> ·</span>
          <h6>Publicado el {response.date} </h6>
        </div>
        <span>{convertURLsToLinks(response.content)}</span>
      </div>

      <div className={styles.reactionContent}>
        {response.user.email !== currentUser.email && (
          <>
            <div
              className={styles.commentIcon}
              onClick={() => {
                //console.log("Respondiendo a ", response.user.name);
                setHasResponsed(true);
                setResponsed(response);
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <div className={`${styles.heartIcon} ${like ? styles.heartCliked : ''}`} onClick={handleLike}>
              <FontAwesomeIcon
                className={styles.heartIcon}
                icon={faHeart}
              />
              <span>{commentLikes}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
