import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import styles from "./ProfesoresEditModal.module.scss"; // Asegúrate de tener el nombre correcto del archivo de estilos
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import UserService from "../../../services/User.service";

export function ProfesoresEditModal({ show, handleShow, userData, onUpdateUser }) {

  const handleSave = (values) => {
    UserService.updateUserName(userData.email, values.name)
      .then((response) => {
        onUpdateUser();
        handleShow();
      })
      .catch((error) => {
        console.log(error.response.data.message);
      });
  };

  const initialValues = {
    name: userData && userData.name ? userData.name : "",
    email: userData && userData.email ? userData.email : "",
    role: userData && userData.role ? userData.role : "",
  };

  return (
    <Modal show={show} onHide={handleShow}>
      <div className={styles.modalContainer}>
      <div className={styles.closeButtonContainer}>
          <div className={styles.closeButton} onClick={handleShow}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <h2 className={styles.modalEditTitle}>Editar Profesor</h2>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
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
                  disabled
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="email"
                  component="div"
                />
              </div>
              <div>
                <span className={styles.formLabel}>Rol</span>
                <Field
                  className={styles.formInput}
                  type="text"
                  name="role"
                  placeholder="Rol del profesor"
                  disabled
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="role"
                  component="div"
                />
              </div>
              <Button
                type="submit"
                className={styles.editUserButton}
                variant="primary"
                onClick={handleSave}
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
