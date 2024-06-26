import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import styles from "./ProfileSetting.module.scss";
import AuthService from "../../services/Auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { Spinner } from "../Spinner";
import UserService from "../../services/User.service";

export function ProfileSetting({setForoVisible}) {
  const [user, setUser] = useState({});
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);


  useEffect(() => {
    setForoVisible(false);
    const currentUser = AuthService.getCurrentUser();
    if (currentUser) {
      setUser(currentUser);
      setIsLoggedIn(true);
      setIsLoading(false);
    } else {
      setIsLoading(false);
    }
  }, []);

  const handlePasswordButtonClick = () => {
    setShowPasswordForm(true);
  };

  const handleChangePassword = (values) => {
    if (values.newPassword === values.repeatPassword) {

        UserService.updateUserPassword(user.email, values.oldPassword, values.newPassword)
        .then((res) => {
            setShowPasswordForm(false);
        })
        .catch((err) => {
            console.log(err);
        });
    } 
  };

  if (isLoading) {
    return (
      <div className={styles.loading}>
        <Spinner />
      </div>
    );
  }

  return (
    <>
      {isLoggedIn ? (
        <div className={styles.profileContainer}>
          <h1>Perfil del Usuario</h1>

          {showPasswordForm ? (
            // Formulario de Cambio de Contraseña
            <div className={styles.passwordForm}>
              <Formik
                initialValues={{
                  oldPassword: "",
                  newPassword: "",
                  repeatPassword: "",
                }}
                validate={(values) => {
                  const errors = {};

                  if (!values.oldPassword) {
                    errors.oldPassword = "Ingrese su contraseña antigua";
                  } else if (values.oldPassword.length > 50) {
                    errors.oldPassword =
                      "La contraseña no puede tener mas de 50 caracteres";
                  } else if (!/^[a-zA-Z0-9_.+-]+$/.test(values.oldPassword)) {
                    errors.oldPassword = "La contraseña no es valida";
                  }

                  if (!values.newPassword) {
                    errors.newPassword = "Ingrese una contraseña";
                  } else if (values.newPassword.length < 6) {
                    errors.newPassword =  "La contraseña debe tener al menos 6 caracteres";
                  } else if (values.newPassword.length > 50) {
                    errors.newPassword =
                      "La contraseña no puede tener mas de 50 caracteres";
                  } else if (!/^[a-zA-Z0-9_.+-]+$/.test(values.newPassword)) {
                    errors.newPassword = "La contraseña no es valida";
                  }

                  if (!values.repeatPassword) {
                    errors.repeatPassword = "Ingrese una contraseña";
                  } else if (values.repeatPassword.length < 6) {
                    errors.repeatPassword = "La contraseña debe tener al menos 6 caracteres";
                  } else if (values.repeatPassword.length > 50) {
                    errors.repeatPassword =
                      "La contraseña no puede tener mas de 50 caracteres";
                  } else if (
                    !/^[a-zA-Z0-9_.+-]+$/.test(values.repeatPassword)
                  ) {
                    errors.repeatPassword = "La contraseña no es valida";
                  } else if (values.newPassword !== values.repeatPassword) {
                    errors.repeatPassword = "Las contraseñas no coinciden";
                  }

                  return errors;
                }}
                onSubmit={(values) => {
                  handleChangePassword(values);
                }}
              >
                <Form className={styles.changePasswordForm}>
                  <div className={styles.changePasswordInputContainer}>
                    <span className={styles.formLabel}>Contraseña Antigua</span>
                    <Field
                      className={styles.changePasswordInput}
                      type="password"
                      placeholder="********"
                      name="oldPassword"
                      id="oldPassword"
                    />
                    <ErrorMessage
                      name="oldPassword"
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

                  <div className={styles.buttonSection}>
                    <button
                      type="submit"
                      className={styles.cancelButton}
                      onClick={() => setShowPasswordForm(false)}
                    >
                      Cancelar
                    </button>
                    <button>Guardar Contraseña</button>
                  </div>
                </Form>
              </Formik>
            </div>
          ) : (
            // Vista de Perfil
            <div className={styles.profileContent}>
              <div className={styles.profileInfo}>
                <div className={styles.profileInfoItem}>
                  <label className={styles.profileInfoLabel}>Nombre</label>
                  <input
                    className={styles.profileInfoText}
                    placeholder="Nombre"
                    value={user.name}
                    disabled
                  />
                </div>
                <div className={styles.profileInfoItem}>
                  <label className={styles.profileInfoLabel}>Email</label>
                  <input
                    className={styles.profileInfoText}
                    placeholder="Email"
                    value={user.email}
                    disabled
                  />
                </div>
                <div className={styles.profileInfoItem}>
                  <label className={styles.profileInfoLabel}>Rol</label>
                  <input
                    className={styles.profileInfoText}
                    placeholder="Rol"
                    value={user.role}
                    disabled
                  />
                </div>
              </div>
              <div className={styles.profileResetPassword}>
                <button
                  className={styles.resetPasswordButton}
                  onClick={handlePasswordButtonClick}
                >
                  Cambiar Contraseña
                </button>
              </div>
            </div>
          )}
        </div>
      ) : (
        <Navigate to="/" replace />
      )}
    </>
  );
}
