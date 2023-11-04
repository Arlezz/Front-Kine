import AuthService from "../services/Auth.service";
import { Formik, Form, Field, ErrorMessage } from "formik";

export function Login({ handleLogin, setCurrentUser}) {
  
    const handleSession = (values) => {
        AuthService.login(values.username, values.password).then(
            () => {
                handleLogin();
                setCurrentUser(AuthService.getCurrentUser());
            }
        );
    }

  
    return (
    <div>
        <h2>LOGIN</h2>
        <p>Para poder acceder a la página, debes iniciar sesión</p>
        <Formik
            initialValues={{ 
                username: "", 
                password: "" 
            }}
            validate={(values) => {
                const errors = {};

                if (!values.username) {
                    errors.username = "Ingrese un usuario";
                } else if (values.username.length > 50) {
                    errors.username = "El usuario no puede tener mas de 50 caracteres";
                } else if (!/^[a-zA-Z0-9\s]+$/.test(values.username)) {
                    errors.username = "El usuario solo puede contener letras y numeros";
                }
                
                
                if (!values.password) {
                    errors.password = "Ingrese una contraseña";
                } else if (values.password.length > 500) {
                    errors.password = "La contraseña no puede tener mas de 500 caracteres";
                } 

                return errors;
            }}
            onSubmit={(values) => {
                handleSession(values);
            }}
        >
            <Form>
                <Field type="text" placeholder="Usuario" />
                <ErrorMessage name="username" component="div" />
                <Field  type="password" placeholder="Contraseña" />
                <ErrorMessage name="password" component="div" />
                <button type="submit">Iniciar sesión</button>
            </Form>
        </Formik>
    </div>
  );
}
