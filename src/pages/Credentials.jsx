import { useState } from "react";
import { Login } from "./Login";

import styles from "./Credentials.module.scss"
import { ForgotPassword } from "./ForgotPassword";

export function Credentials({handleLogin}) {

    const [forgotPass, setForgotPass] = useState(false);

    const handleForgotPass = () => {
        setForgotPass(!forgotPass);
    }

    return (
        <div className={styles.credentials}>
            {
                forgotPass?  <ForgotPassword handleForgotPass={handleForgotPass}/> : <Login  handleLogin={handleLogin} handleForgotPass={handleForgotPass}/> 
            }
        </div>
    );
}