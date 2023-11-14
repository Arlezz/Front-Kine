import { useState } from "react";

import { SendMail } from "../components/SendMail";
import { ChangePassword } from "../components/ChangePassword";

export function ForgotPassword({handleForgotPass}) {

    const [mailSend, setMailSend] = useState(false);
    const [mail, setMail] = useState("")

    const handleSendMail = () => {
        setMailSend(!mailSend);
    }

  return (
    <>
        {mailSend?  <ChangePassword mail={mail} handleSendMail={handleSendMail}/>: <SendMail setMail={setMail} handleSendMail={handleSendMail} handleForgotPass={handleForgotPass}/>}
    </>
  );
}
