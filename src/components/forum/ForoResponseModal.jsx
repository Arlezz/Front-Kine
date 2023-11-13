import { useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";

import styles from "./ForoResponseModal.module.scss";
import InfiniteScroll from "react-infinite-scroll-component";

import { Formik, Form, Field, ErrorMessage } from "formik";
import { ForoResponseButton } from "./ForoResponseButton";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHeart,
  faPaperPlane,
  faCircleXmark,
} from "@fortawesome/free-regular-svg-icons";

import {
  faUser,
  faXmark,
  faUserGear,
  faUserTie,
} from "@fortawesome/free-solid-svg-icons";

import GeneralService from "../../services/General.service";
import { Empty } from "../Empty";
import { convertURLsToLinks } from "../../utils/parser";
import { CommentBody } from "./CommentBody";


export function ForoResponseModal({
  show,
  handleShow,
  post,
  currentUser,
  setPostComments,
}) {
  //const responsesPost = post.responses;
  const [responses, setResponses] = useState([]);
  const [ResponseToDisplay, setResponseToDisplay] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResponsed, setHasResponsed] = useState(false);
  const [responsed, setResponsed] = useState({});
  const noResponses = ResponseToDisplay.length === 0 && !isLoading;
  const [changes, setChanges] = useState(false);
  const [like, setLike] = useState(false);


  useEffect(() => {
    if (show) {
      // Define una función para realizar la carga de datos
      fetchData();
    }
  }, [show, post._id, changes]);

  const fetchMoreData = () => {
    const visibleResponse = ResponseToDisplay.length;
    const newResponseToDisplay = responses.slice(
      visibleResponse,
      visibleResponse + 1
    );

    if (newResponseToDisplay.length === 0) {
      setHasMore(false);
    } else {
      setResponseToDisplay(ResponseToDisplay.concat(newResponseToDisplay));
    }
  };

  const fetchData = () => {
    setIsLoading(true);
    setResponseToDisplay([]);
    GeneralService.getPostsComments(post._id)
      .then((response) => {
        setResponses(response);
        setResponseToDisplay(response.slice(0, 4))
      }
      )
      .catch((error) => {
        console.log(error.response.data.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleResponse = (values, resetForm) => {
    console.log(values);

    if(!hasResponsed){
      GeneralService.uploadComment(post._id, currentUser.email, values.response)
      .then((data) => {
        setChanges(!changes);
        setHasResponsed(false);
        setHasMore(true);
        setResponseToDisplay([]);
        setResponsed({});
        setPostComments((prevComments) => prevComments + 1);
        resetForm();
        console.log("RESPUESTA ENVIADA al post ", post._id);
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
      return;
    }
    GeneralService.responseComment(post._id, currentUser.email, values.response, responsed._id)
    .then((data) => {
      setChanges(!changes);
      setHasResponsed(false);
      setHasMore(true);
      setResponseToDisplay([]);
      setResponsed({});
      //setPostComments((prevComments) => prevComments + 1);
      resetForm();
      console.log("RESPUESTA ENVIADA al comentario ", responsed._id);
    }
    );
  };

  const handleClose = () => {
    setHasMore(true);
    handleShow();
    setHasResponsed(false);
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <div className={styles.closeButtonContainer}>
              <div className={styles.closeButton} onClick={handleClose}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>

            <h2 className={styles.tiitle}>{post.title}</h2>
            <div className={styles.infoPost}>
              <h5>{post.user ? post.user.name : null}</h5>
              <FontAwesomeIcon icon={faUser} />
              <span> ·</span>
              <h6>Publicado el {post.date} </h6>
            </div>
            <p>{convertURLsToLinks(post.content)}</p>
          </div>
          <hr className={styles.separator} />
          {/*<hr className={styles.separator}/> */}
          <div className={styles.modalResponses}>
            <h3>Respuestas</h3>
            {noResponses ? (
              <div id="emptyCont" className={styles.EmptyContainer}>
                <Empty />
              </div>
            ) : (
              <div id="responsePost" className={styles.scrollContainer}>
                <InfiniteScroll
                  dataLength={ResponseToDisplay.length}
                  next={fetchMoreData}
                  hasMore={hasMore}
                  height={"calc(100vh - 65rem)"}
                  loader={<h4 className={styles.textHelper}>Cargando...</h4>}
                  endMessage={
                    <p className={styles.textHelper}>- Ya haz visto todo -</p>
                  }
                >
                  {ResponseToDisplay.map((response, index) => (
                    <div key={index}>
                      <CommentBody post={post._id} response={response} currentUser={currentUser} setHasResponsed={setHasResponsed} setResponsed={setResponsed}/>
                      <hr className={styles.separator} />
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </div>

          <Formik
            initialValues={{
              response: "",
            }}
            validate={(values) => {
              const errors = {};

              if (!values.response) {
                errors.response = "Ingrese una respuesta";
              } else if (values.response.length > 500) {
                errors.response =
                  "La respuesta no puede tener mas de 500 caracteres";
              }

              return errors;
            }}
            onSubmit={(values, { resetForm }) => {
              handleResponse(values, resetForm);
            }}
          >
            {({ resetForm }) => (
              <Form className={styles.inputsFields}>
                <div className={styles.formContent}>
                  <span className={styles.formLabel}>Publica tu respuesta</span>
                  {hasResponsed ? (
                    <div className={styles.tagContainer}>
                      <div className={styles.responsedTo}>
                        <span>Respondiendo a {responsed.user.name}</span>
                        <FontAwesomeIcon
                          icon={faCircleXmark}
                          onClick={() => {
                            setHasResponsed(false);
                            setResponsed({});
                          }}
                        />
                      </div>
                    </div>
                  ) : null}
                  <Field
                    className={`${styles.formInput} ${styles.textArea}`}
                    id="response"
                    type="text"
                    name="response"
                    as="textarea"
                    placeholder="..."
                  />
                  <ErrorMessage
                    className={styles.errorText}
                    name="response"
                    component="div"
                  />
                </div>

                <ForoResponseButton submit={"submit"} text={"Responder"} />
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
