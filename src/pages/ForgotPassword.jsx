import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";

import styles from "./ForgotPassword.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { SendMail } from "../components/SendMail";
import { ChangePassword } from "../components/ChangePassword";

export function ForgotPassword({handleForgotPass}) {

    const [mailSend, setMailSend] = useState(false);

    const handleSendMail = () => {
        setMailSend(!mailSend);
    }

  return (
    <>
        {mailSend?  <ChangePassword handleSendMail={handleSendMail}/>: <SendMail handleSendMail={handleSendMail} handleForgotPass={handleForgotPass}/>}
    </>
  );
}
