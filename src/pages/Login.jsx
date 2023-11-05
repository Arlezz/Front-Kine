import AuthService from "../services/Auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Login.module.scss";

export function Login({ handleLogin, handleForgotPass }) {
  const handleSession = (values) => {
    AuthService.login(values.email, values.password)
      .then(() => {
        handleLogin();
      })
      .catch((error) => {
        console.log("Datos incorrectos");
      });
  };

  return (
    <div className={styles.loginContent}>
      <h1 className={styles.pageTitle}>Kine Hub</h1>

      <Formik
        initialValues={{
          email: "",
          password: "",
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

          if (!values.password) {
            errors.password = "Ingrese una contraseña";
          } else if (values.password.length > 500) {
            errors.password =
              "La contraseña no puede tener mas de 500 caracteres";
          }

          return errors;
        }}
        onSubmit={(values) => {
          handleSession(values);
        }}
      >
        <Form className={styles.loginForm}>
          <div className={styles.loginInputContainer}>
            <span className={styles.formLabel}>Usuario</span>
            <Field
              className={styles.loginInput}
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

          <div className={styles.loginInputContainer}>
            <span className={styles.formLabel}>Contraseña</span>
            <Field
              className={styles.loginInput}
              type="password"
              placeholder="Contraseña"
              name="password"
              id="password"
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorText}
            />
          </div>

          <div className={styles.forgotContainer}>
            <a className={styles.forgotPassword} onClick={handleForgotPass}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button className={styles.loginButton} type="submit">
            Iniciar sesión
          </button>
        </Form>
      </Formik>
    </div>
  );
}