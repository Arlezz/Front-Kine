import AuthService from "../services/Auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import styles from "./Login.module.scss";
import { useState } from "react";
import { Spinner } from "../components/Spinner"


export function Login({ handleLogin, handleForgotPass }) {

  const [sessionError, setSessionError] = useState(false);
  const [textSesionError, setTextSesionError] = useState("");
  const [loading, setLoading] = useState(false);


  const handleSession = (values) => {
    setLoading(true);
    AuthService.login(values.email, values.password)
      .then(() => {
        handleLogin();
      })
      .catch((error) => {
        setLoading(false);
        setSessionError(true);
        setTextSesionError(error.response.data.message);
      });
  };
  


  return (
    <div className={styles.loginContent}>
      <div className={styles.titeContainer}>
        <h1 className={styles.pageTitle}>Kineverso</h1>
        <span className={styles.pageSlogan}>Red de aprendizaje digital Kinesiología ULS</span>
      </div>
      
      {
        loading && (
          <div className={styles.isLoading}>
            <Spinner/>
          </div>
        )
      }

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
            setSessionError(false);
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
        {({ handleSubmit }) => (
        <Form className={styles.loginForm}>
          <div className={styles.loginInputContainer}>
            <span className={styles.formLabel}>Correo</span>
            <Field
              className={styles.loginInput}
              type="text"
              placeholder="Correo Institucional"
              name="email"
              id="email"
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
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
              onKeyPress={(e) => {
                if (e.key === "Enter") {
                  handleSubmit();
                }
              }}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={styles.errorText}
            />
          </div>

          {sessionError && (
            <div className={styles.errorSession}>
              {textSesionError}
            </div>
          )}

          <div className={styles.forgotContainer}>
            <a className={styles.forgotPassword} onClick={handleForgotPass}>
              ¿Olvidaste tu contraseña?
            </a>
          </div>

          <button className={styles.loginButton} type="submit">
            Iniciar sesión
          </button>
        </Form>
        )}
      </Formik>
    </div>
  );
}
