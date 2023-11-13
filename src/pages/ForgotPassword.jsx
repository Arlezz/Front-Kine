import { useState } from "react";

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
