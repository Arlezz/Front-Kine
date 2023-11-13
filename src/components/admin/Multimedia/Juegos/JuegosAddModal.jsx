// JuegosAddModal.jsx

import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./JuegosAddModal.module.scss";
import GeneralService from "../../../../services/General.service";
import AuthService from "../../../../services/Auth.service";

export function JuegosAddModal({ show, handleShow, onAddJuego }) {
  const initialValues = {
    url: "",
  };

  const handleSave = (values) => {
    const user = AuthService.getCurrentUser();
    GeneralService.uploadGames(user.email, values.url, values.titulo, values.descripcion)
      .then((response) => {
        console.log(response);
        onAddJuego();
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={handleShow}>
      <div className={styles.nuevoJuegoModal}>
        <div className={styles.closeButtonContainer}>
          <div className={styles.closeButton} onClick={handleShow}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <h2 className={styles.modalEditTitle}>Agregar Juego</h2>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            
            const errors = {};
            if (!values.url) {
              errors.url = "Ingrese una URL";
            } else if (values.url.length > 600) {
              errors.url = "La URL no puede tener más de 500 caracteres";
            } else if (!/^(https?|ftp):\/\/[^\s/$.?#].[^\s]*$/.test(values.url)) {
              errors.url = "La URL no es válida";
            }
          

            if (!values.titulo) {
              errors.titulo = "Ingrese un título";
            } else if (values.titulo.length > 100) {
              errors.titulo = "El título no puede tener más de 100 caracteres";
          
            } else if (!/^[a-zA-Z0-9\sáéíóúÁÉÍÓÚüÜñÑ!@#$%^&*()_+{}|:"<>?`[\]\-\\;',./]+$/.test(values.titulo)) {
              errors.titulo = "El título solo puede contener letras, números y algunos caracteres especiales";
            }
            

            if (!values.descripcion) {
              errors.descripcion = "Ingrese una descripción";
            } else if (values.descripcion.length > 500) {
              errors.descripcion = "La descripción no puede tener más de 500 caracteres";
            } else if (!/^[a-zA-Z0-9\s]+$/.test(values.descripcion)) {
              errors.descripcion = "La descripción solo puede contener letras y números";
            } 

            return errors;
          }}
          onSubmit={(values) => {
            handleSave(values);
          }}
        >
          {() => (
            <Form className={styles.inputsFields}>
              <div>
                <span className={styles.formLabel}>Título del Juego</span>
                <Field
                  className={styles.formInput}
                  id="titulo"
                  type="text"
                  name="titulo"
                  placeholder="Título del juego"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="titulo"
                  component="div"
                />
              </div>
              <div>
                <span className={styles.formLabel}>URL del Video del Juego (YouTube)</span>
                <Field
                  className={styles.formInput}
                  id="url"
                  type="text"
                  name="url"
                  placeholder="URL del video del juego"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="url"
                  component="div"
                />
              </div>
              <div>
                <span className={styles.formLabel}>Descripción del Juego</span>
                <Field
                  className={`${styles.formInput} ${styles.textArea}`}
                  id="descripcion"
                  as="textarea"
                  name="descripcion"
                  placeholder="Descripción del juego"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="descripcion"
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
