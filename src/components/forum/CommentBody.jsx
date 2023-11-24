import { useState } from "react";

import styles from "./CommentBody.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faUserGear,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import { faHeart, faPaperPlane } from "@fortawesome/free-regular-svg-icons";
import { useEffect } from "react";
import GeneralService from "../../services/General.service";
import { convertURLsToLinks } from "../../utils/parser";
import useDebounce from "../../components/useDebounce";

export function CommentBody({
  response,
  currentUser,
  setHasResponsed,
  setResponsed,
  postId,
}) {
  const [like, setLike] = useState(false);
  const [commentLikes, setCommentLikes] = useState(response.likes);

  
  useEffect(() => {
    
    GeneralService.hasLikedComments(response._id, currentUser.email)
      .then((data) => {
        setCommentLikes(response.likes);
        setLike(data.hasLiked);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  }, []);

  const handleLike = () => {
    if (!like) {
      likeComent();
    } else {
      dislikeComent();
    }
  };

  const debouncedClick = useDebounce(() => {
    handleLike();
  }, 10);

  const likeComent = () => {
    GeneralService.likeComments(response._id, postId, currentUser.email)
      .then((data) => {
        setCommentLikes((prevLikes) => prevLikes + 1);
        setLike(true);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const dislikeComent = () => {
    GeneralService.dislikeComments(response._id, currentUser.email)
      .then((data) => {
        setCommentLikes((prevLikes) => prevLikes - 1);
        setLike(false);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  return (
    <div className={styles.response}>
      <div className={styles.responseHeader}>
        <div className={styles.infoResponse}>
          <h5>{response.user ? response.user.name : "Undefined"}</h5>
          <div className={styles.icon}>
            {response.user && (
              <div className={styles.iconContainer}>
                {response.user.role === "admin" && (
                  <FontAwesomeIcon
                    style={{
             
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
            
                      width: "1.4rem",
                      height: "1.4rem",
                    }}
                    className={styles.professorIcon}
                    icon={faUserTie}
                  />
                )}
                

              </div>
            )}
            {!response.user && (
              <div className={styles.iconContainer}>
                <FontAwesomeIcon
                  style={{
                    width: "1.4rem",
                    height: "1.4rem",
                  }}
                  className={styles.professorIcon}
                  icon={faUser}
                />
              </div>
            )}
          </div>
          <span> ·</span>
          <h6>Publicado el {response ? response.date : "Undefined"} </h6>
        </div>
        <span>
          {response.response.length > 0 ? (
            <a>{"@" + response.response[0].name} </a>
          ) : (
            ""
          )}
          {convertURLsToLinks(response.content)}
        </span>
      </div>

      <div className={styles.reactionContent}>
        {response.user?.email && response.user.email !== currentUser.email && (
          <>
            <div
              className={styles.commentIcon}
              onClick={() => {
                setHasResponsed(true);
                setResponsed(response);
              }}
            >
              <FontAwesomeIcon icon={faPaperPlane} />
            </div>
            <div
              className={`${styles.heartIcon} ${
                like ? styles.heartCliked : ""
              }`}
              onClick={debouncedClick}
            >
              <FontAwesomeIcon className={styles.heartIcon} icon={faHeart} />
              <span>{commentLikes}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
