import React from "react";
import Modal from "react-bootstrap/Modal";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

import styles from "./CapsulasAddModal.module.scss"; // Asegúrate de importar el archivo SCSS correcto
import GeneralService from "../../../../services/General.service";
import AuthService from "../../../../services/Auth.service";

export function CapsulasAddModal({ show, handleShow, onAddCapsula }) {
  const initialValues = {
    url: "",
  };

  const handleSave = (values) => {
    const user = AuthService.getCurrentUser();
    GeneralService.uploadCapsules(user.email, values.url)
      .then((response) => {
        onAddCapsula();
        handleShow();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <Modal show={show} onHide={handleShow}>
      <div className={styles.nuevaCapsulaModal}>
        {/* Botón de cerrar en la esquina superior derecha */}
        <div className={styles.closeButtonContainer}>
          <div className={styles.closeButton} onClick={handleShow}>
            <FontAwesomeIcon icon={faXmark} />
          </div>
        </div>
        <h2 className={styles.modalEditTitle}>Agregar Cápsula</h2>
        <Formik
          initialValues={initialValues}
          validate={(values) => {
            const errors = {};
            if (!values.url) {
              errors.url = "Ingrese una url";
            } else if (values.url.length > 600) {
              errors.url =
                "La respuesta no puede tener más de 500 caracteres";
            } else if (
              !/^(https:\/\/www\.youtube\.com\/watch\?v=).+$/.test(
                values.url
              )
            ) {
              errors.url = "La url no es válida";
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
                <span className={styles.formLabel}>
                  URL del Video Capsula (YouTube)
                </span>
                <Field
                  className={styles.formInput}
                  id="url"
                  type="text"
                  name="url"
                  placeholder="URL del video capsula"
                />
                <ErrorMessage
                  className={styles.errorText}
                  name="url"
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
