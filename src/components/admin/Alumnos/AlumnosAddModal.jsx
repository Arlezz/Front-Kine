import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

import styles from './AlumnosAddModal.module.scss';
import AuthService from '../../../services/Auth.service';

export function AlumnosAddModal({ show, handleShow, onAddAlumno }) {

  const [sessionError, setSessionError] = useState(false);
  const [textSesionError, setTextSesionError] = useState("");
  const [disabled, setDisabled] = useState(false);

  const initialValues = {
    name: '',
    email: '',
  };

  const handleSave = (values) => {
    setDisabled(true);
    AuthService.register(values.email,values.name,'estudiante')
    .then((response) => {
      onAddAlumno();
      handleShow();
    })
    .catch((error) => {
      setTextSesionError(error.response.data.error);
      setSessionError(true);
    }).finally(() => {
      setDisabled(false);
    });
  };

  const handleCancel = () => {
    setSessionError(false);
    setTextSesionError("");
    handleShow();
  }

  return (
    <Modal show={show} onHide={handleCancel} >
      <div className={styles.modalContainer}>
        <div className={styles.closeButtonContainer}>
              <div className={styles.closeButton} onClick={handleShow}>
                <FontAwesomeIcon icon={faXmark} />
              </div>
        </div>
        <h2 className={styles.modalEditTitle}>Agregar Alumno</h2>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
              if (!values.name) {
                errors.name = 'Requerido';
              } else if (values.name.length > 50) {
                errors.name = 'El nombre no puede tener mas de 50 caracteres';
              }

              if (!values.email) {
                errors.email = 'Requerido';
              } else if (values.email.length > 50) {
                errors.email = 'El correo no puede tener mas de 50 caracteres';
              } else if (!/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(values.email)) {
                errors.email = 'El correo no es válido';
              }

              
            return errors;
          }}
          onSubmit={(values) => {
            handleSave(values);
          }}
        >
          {({
            isSubmitting
          }) => (
            <Form className={styles.inputsFields}>
              <div>
                <span className={styles.formLabel}>Nombre</span>
                <Field
                  className={styles.formInput}
                  type="text"
                  name="name"
                  placeholder="Nombre del alumno"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="name"
                  component="div"
                />
              </div>
              <div>
                <span className={styles.formLabel}>Email</span>
                <Field
                  className={styles.formInput}
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="email"
                  component="div"
                />
              </div>
              {sessionError && (
                <div className={styles.errorSession}>
                  {textSesionError}
                </div>
              )}
              <Button
                type="submit"
                className={styles.editUserButton}
                variant="primary"
                disabled={disabled}
              >
                <span>Guardar</span>
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
