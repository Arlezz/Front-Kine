import React from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

import styles from './ProfesoresAddModal.module.scss'; // Asegúrate de tener el nombre correcto del archivo de estilos
import AuthService from '../../../services/Auth.service';

export function ProfesoresAddModal({ show, handleShow, onAddProfesor }) {
  const initialValues = {
    name: '',
    email: '',
  };

  const handleSave = (values) => {
    AuthService.register(values.email, values.name, 'profesor')
      .then((response) => {
        console.log(response);
        onAddProfesor();
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={handleShow}>
      <div className={styles.modalContainer}>
        {/* Botón de cerrar en la esquina superior derecha */}
        <div className={styles.closeButtonContainer}>
          <div className={styles.closeButton} onClick={handleShow}>
            <FontAwesomeIcon icon={faTimes} />
          </div>
        </div>
        <h2 className={styles.modalEditTitle}>Agregar Profesor</h2>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            // Puedes agregar validaciones aquí si es necesario
            return errors;
          }}
          onSubmit={(values) => {
            handleSave(values);
          }}
        >
          {() => (
            <Form className={styles.inputsFields}>
              <div>
                <span className={styles.formLabel}>Nombre</span>
                <Field
                  className={styles.formInput}
                  type="text"
                  name="name"
                  placeholder="Nombre del profesor"
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
              <Button
                type="submit"
                className={styles.editUserButton}
                variant="primary"
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
