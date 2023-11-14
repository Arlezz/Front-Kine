import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "./SendMail.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../services/Auth.service";

export function SendMail({ handleForgotPass, handleSendMail, setMail }) {
  const sendMailToVerify = (values) => {
    AuthService.recoverPassword(values.email).then((response) => {
      setMail(values.email);
      handleSendMail();
    });
  };

  return (
    <div className={styles.sendMailContent}>
      <div className={styles.backButtonContainer}>
        <button
          className={styles.sendMailBackButton}
          onClick={() => {
            handleForgotPass();
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styles.sendMailBackIcon}
          />
        </button>
      </div>
      <h1 className={styles.pageTitle}>Recuperar Contraseña</h1>
      <span className={styles.sendMailText}>
        Ingrese su correo institucional para recuperar su contraseña
      </span>
      <Formik
        initialValues={{
          email: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.email) {
            errors.email = "Ingrese un correo";
          } else if (values.email.length > 50) {
            errors.email = "El correo no puede tener mas de 50 caracteres";
          } else if (
            !/^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(
              values.email
            )
          ) {
            errors.email = "El correo no es valido";
          }

          return errors;
        }}
        onSubmit={(values) => {
          sendMailToVerify(values);
        }}
      >
        {({
          isSubmitting,
        }) => (
          <Form className={styles.sendMailForm}>
            <div className={styles.sendMailInputContainer}>
              <span className={styles.formLabel}>Usuario</span>
              <Field
                className={styles.sendMailInput}
                type="text"
                placeholder="Correo Insttitucional"
                name="email"
                id="email"
              />
              <ErrorMessage
                name="email"
                component="div"
                className={styles.errorText}
              />
            </div>

            <button type="submit" disabled={isSubmitting} className={styles.sendMailButton}>
              Enviar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
