import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Button } from 'react-bootstrap';

import styles from './AlumnosEditModal.module.scss';

export function AlumnosEditModal({ show, handleShow, userData, onUpdateUser }) {
  const [editedUserData, setEditedUserData] = useState(null);

  const handleSave = () => {
    onUpdateUser(editedUserData);
    handleShow();
  };

  useEffect(() => {
    setEditedUserData(userData); // Actualiza editedUserData cuando userData cambie
  }, [userData]);

  
  //console.log(userData);

  return (
    <Modal show={show} onHide={handleShow}>
      <div className={styles.modalContainer}>
        <Formik
          initialValues={
            {
                name: userData.name,
                email: userData.email,
                role: userData.role,
                rut: userData.rut,
            }
          }
          validate={(values) => {
            const errors = {};

            // Implementa las validaciones necesarias para name, email, role y rut aquí

            return errors;
          }}
          onSubmit={(values) => {
            setEditedUserData(values);
          }}
        >
          {({ isSubmitting }) => (
            <Form className={styles.inputsFields}>
              <div>
                <span className={styles.formLabel}>Nombre</span>
                <Field
                  className={styles.formInput}
                  type="text"
                  name="name"
                  placeholder="Nombre del usuario"
                />
                <ErrorMessage className={styles.errorText} name="name" component="div" />
              </div>
              <div>
                <span className={styles.formLabel}>Email</span>
                <Field
                  className={styles.formInput}
                  type="email"
                  name="email"
                  placeholder="Correo electrónico"
                />
                <ErrorMessage className={styles.errorText} name="email" component="div" />
              </div>
              <div>
                <span className={styles.formLabel}>Rol</span>
                <Field
                  className={styles.formInput}
                  type="text"
                  name="role"
                  placeholder="Rol del usuario"
                />
                <ErrorMessage className={styles.errorText} name="role" component="div" />
              </div>
              <div>
                <span className={styles.formLabel}>RUT</span>
                <Field
                  className={styles.formInput}
                  type="text"
                  name="rut"
                  placeholder="RUT del usuario"
                />
                <ErrorMessage className={styles.errorText} name="rut" component="div" />
              </div>

              <Button variant="primary" onClick={handleSave} disabled={isSubmitting}>
                Guardar
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </Modal>
  );
}
