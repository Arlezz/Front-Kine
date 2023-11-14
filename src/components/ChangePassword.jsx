import { Formik, Form, Field, ErrorMessage } from "formik";

import styles from "../components/ChangePassword.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import AuthService from "../services/Auth.service";

export function ChangePassword({ handleSendMail, mail }) {
  const handleChangePassword = (values) => {
    if (values.newPassword === values.repeatPassword) {
      AuthService.changePasswordWithCode(
        mail,
        values.codigo,
        values.newPassword
      )
        .then((response) => {
          window.location.href = "/";
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("Las contraseñas no coinciden");
    }
  };

  return (
    <div className={styles.changePasswordContent}>
      <div className={styles.backButtonContainer}>
        <button
          className={styles.changePasswordBackButton}
          onClick={() => {
            handleSendMail();
          }}
        >
          <FontAwesomeIcon
            icon={faArrowLeft}
            className={styles.changePasswordBackIcon}
          />
        </button>
      </div>
      <h1 className={styles.pageTitle}>Cambiar contraseña</h1>
      <span className={styles.changePasswordText}>
        Ingrese el codigo enviado a su correo institucional
      </span>
      <Formik
        initialValues={{
          codigo: "",
          newPassword: "",
          repeatPassword: "",
        }}
        validate={(values) => {
          const errors = {};

          if (!values.codigo) {
            errors.codigo = "Ingrese un codigo";
          } else if (values.codigo.length > 4) {
            errors.codigo = "El codigo no puede tener mas de 4 caracteres";
          } else if (!/^[0-9]+$/.test(values.codigo)) {
            errors.codigo = "El codigo no es valido";
          }

          if (!values.newPassword) {
            errors.newPassword = "Ingrese una contraseña";
          } else if (values.newPassword.length > 50) {
            errors.newPassword =
              "La contraseña no puede tener mas de 50 caracteres";
          } else if (!/^[a-zA-Z0-9_.+-]+$/.test(values.newPassword)) {
            errors.newPassword = "La contraseña no es valida";
          }

          if (!values.repeatPassword) {
            errors.repeatPassword = "Ingrese una contraseña";
          } else if (values.repeatPassword.length > 50) {
            errors.repeatPassword =
              "La contraseña no puede tener mas de 50 caracteres";
          } else if (!/^[a-zA-Z0-9_.+-]+$/.test(values.repeatPassword)) {
            errors.repeatPassword = "La contraseña no es valida";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleChangePassword(values);
        }}
      >
        {({
          isSubmitting,
        }) => (
          <Form className={styles.changePasswordForm}>
            <div className={styles.changePasswordInputContainer}>
              <span className={styles.formLabel}>Codigo Secreto</span>
              <Field
                className={styles.changePasswordInput}
                type="text"
                placeholder="1234"
                name="codigo"
                id="codigo"
                maxLength="4"
              />
              <ErrorMessage
                name="codigo"
                component="div"
                className={styles.errorText}
              />
            </div>
            <div className={styles.changePasswordInputContainer}>
              <span className={styles.formLabel}>Constraseña Nueva</span>
              <Field
                className={styles.changePasswordInput}
                type="password"
                placeholder="********"
                name="newPassword"
                id="repeatPassword"
              />
              <ErrorMessage
                name="newPassword"
                component="div"
                className={styles.errorText}
              />
            </div>
            <div className={styles.changePasswordInputContainer}>
              <span className={styles.formLabel}>Repetir Contraseña</span>
              <Field
                className={styles.changePasswordInput}
                type="password"
                placeholder="********"
                name="repeatPassword"
                id="repeatPassword"
              />
              <ErrorMessage
                name="repeatPassword"
                component="div"
                className={styles.errorText}
              />
            </div>

            <button disabled={isSubmitting} className={styles.changePasswordButton} type="submit">
              Cambiar
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
}
