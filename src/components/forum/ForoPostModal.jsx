
import Modal from 'react-bootstrap/Modal';

import styles from './ForoPostModal.module.scss';

import { Formik, Form, Field, ErrorMessage } from "formik";
import { ForoResponseButton } from '../forum/ForoResponseButton';
import GeneralService from '../../services/General.service';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";


export function ForoPostModal({show, handleShow, currentUser, setPage,setNewPost}){

    const handlePost = (values) => {
        if(currentUser){
            GeneralService.uploadPost(currentUser.email, values.title, values.content)
            .then((response) => {
                //fetchData("date","desc",1);
                setNewPost(response);
                handleShow();
            })
        } 
    }

return (
    <>
      <Modal show={show}  onHide={handleShow} >
        <div className={styles.modalContainer}>
        <div className={styles.closeButtonContainer}>
              <div className={styles.closeButton} onClick={handleShow}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
            </div>
            <Formik
            initialValues={{ 
                title: "", 
                content: "" 
            }}
            validate={(values) => {
                const errors = {};

                if (!values.title) {
                    errors.title = "Ingrese un título";
                } else if (values.title.length > 50) {
                    errors.title = "El titulo no puede tener mas de 50 caracteres";
                }
                
                
                if (!values.content) {
                    errors.content = "Ingrese una pregunta";
                } else if (values.content.length > 500) {
                    errors.content = "La pregunta no puede tener mas de 500 caracteres";
                } 

                return errors;
            }}
            onSubmit={(values) => {
                handlePost(values);
            }}
            >
            {({
                isSubmitting,
            }) => (
                <Form className={styles.inputsFields}>
   
                    <div>
                        <span className={styles.formLabel}> Título del Post </span>
                        <Field 
                            className={styles.formInput} 
                            id="title"
                            type="text" 
                            name="title"
                            placeholder="Ej: ¿Como se hace un post?"
                        />
                        <ErrorMessage className={styles.errorText} name="title" component="div"/>
                    </div>
                    <div >
                        <span className={styles.formLabel}>Pregunta la duda que tengas</span>
                        <Field 
                            className={`${styles.formInput} ${styles.textArea}`} 
                            id="content"
                            type="text" 
                            name="content" 
                            as="textarea"
                            placeholder="Especifica tu duda aqui"
                        />
                        <ErrorMessage className={styles.errorText} name="content" component="div" />
                    </div>

                    <ForoResponseButton submit={"submit"} isSubmitting={isSubmitting} />
                </Form>
            )}
            </Formik>
        </div>
      </Modal>
    </>
  );
}