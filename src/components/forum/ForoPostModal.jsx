
import Modal from 'react-bootstrap/Modal';

import styles from './ForoPostModal.module.scss';

import { Formik, Form, Field, ErrorMessage } from "formik";
import { ForoResponseButton } from '../forum/ForoResponseButton';
import { foroPost } from "../../utils/data"; 

let i = 0;


export function ForoPostModal({show, handleShow, setForoToDisplay}){

    const handlePost = (values) => {
        const newPost = {
            email:"autor1@gmail.com",
            author: "Autor "+(i+1),
            date: new Date().toLocaleDateString(),
            title: values.title,
            comment: values.content,
            likes: 0,
            responses: []
        }

        foroPost.unshift(newPost);

        setForoToDisplay(foroPost.slice(0, 10));
        handleShow();
        i++;
    }

return (
    <>
      <Modal show={show}  onHide={handleShow} >
        <div className={styles.modalContainer}>
            <Formik
            initialValues={{ 
                title: "", 
                content: "" 
            }}
            validate={(values) => {
                const errors = {};

                if (!values.title) {
                    errors.title = "Ingrese un titulo";
                } else if (values.title.length > 50) {
                    errors.title = "El titulo no puede tener mas de 50 caracteres";
                } else if (!/^[a-zA-Z0-9\s]+$/.test(values.title)) {
                    errors.title = "El titulo solo puede contener letras y numeros";
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
                    {/*<FormObserver />*/}
   
                    <div>
                        <span className={styles.formLabel}> Titulo del Post </span>
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