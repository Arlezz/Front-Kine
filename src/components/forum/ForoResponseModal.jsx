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

import { faUser } from "@fortawesome/free-solid-svg-icons";

import GeneralService from "../../services/General.service";
import { Empty } from "../Empty";

export function ForoResponseModal({ show, handleShow, post }) {
  //const responsesPost = post.responses;
  const [responses, setResponses] = useState([]);
  const [ResponseToDisplay, setResponseToDisplay] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoading, setIsLoading] = useState(true);
  const [hasResponsed, setHasResponsed] = useState(false);
  const [responsed, setResponsed] = useState({});
  const noResponses = ResponseToDisplay.length === 0 && !isLoading;

  useEffect(() => {
    if (show) {
      // Define una función para realizar la carga de datos
      const fetchData = async () => {
        setIsLoading(true);
        try {
          const response = await GeneralService.getPostsComments(post._id);
          setResponses(response);
          setResponseToDisplay(response.slice(0, 4));
        } catch (error) {
          console.log(error);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [show, post._id]);

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

  /*const handleResponse = (values) => {

        handleShow();
    
    }*/

  const handleClose = () => {
    setHasMore(true);
    handleShow();
  };

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <h2 className={styles.tiitle}>{post.title}</h2>
            <div className={styles.infoPost}>
              <h5>{post.name}</h5>
              <FontAwesomeIcon icon={faUser} />
              <span> ·</span>
              <h6>Publicado el {post.date} </h6>
            </div>
            <p>{post.content}</p>
          </div>
          <hr className={styles.separator} />
          {/*<hr className={styles.separator}/> */}
          <div className={styles.modalResponses}>
            <h3>Respuestas</h3>
            {noResponses ? (
              <Empty /> // Render the "empty" component when there are no responses
            ) : (
              <div className={styles.scrollContainer}>
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
                      <div className={styles.response}>
                        <div className={styles.responseHeader}>
                          <div className={styles.infoResponse}>
                            <h5>{response.name}</h5>
                            <FontAwesomeIcon icon={faUser} />
                            <span> ·</span>
                            <h6>Publicado el {response.date} </h6>
                          </div>
                          <span>{response.content}</span>
                        </div>

                        <div className={styles.reactionContent}>
                          <div
                            className={styles.commentIcon}
                            onClick={() => {
                              console.log("Respondiendo a ", response.name);
                              setHasResponsed(true);
                              setResponsed(response);
                            }}
                          >
                            <FontAwesomeIcon icon={faPaperPlane} />
                          </div>
                          <div className={styles.heartIcon}>
                            <FontAwesomeIcon
                              className={styles.heartIcon}
                              icon={faHeart}
                            />
                            <span>{response.likes}</span>
                          </div>
                        </div>
                      </div>
                      <hr className={styles.separator} />
                    </div>
                  ))}
                </InfiniteScroll>
              </div>
            )}
          </div>

          <Formik
            initialValues={{
              title: "",
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
            onSubmit={(values) => {
              //handleResponse(values);
            }}
          >
            {({ isSubmitting }) => (
              <Form className={styles.inputsFields}>
                <div className={styles.formContent}>
                  <span className={styles.formLabel}>Publica tu respuesta</span>
                  {hasResponsed ? (
                    <div className={styles.tagContainer}>
                      <div className={styles.responsedTo}>
                        <span>Respondiendo a {responsed.name}</span>
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

                <ForoResponseButton
                  submit={"submit"}
                  isSubmitting={isSubmitting}
                  text={"Responder"}
                />
              </Form>
            )}
          </Formik>
        </div>
      </Modal>
    </>
  );
}
