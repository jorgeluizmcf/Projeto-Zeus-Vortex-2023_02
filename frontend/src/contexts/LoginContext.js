// src/contexts/LoginContext.js
import React, { createContext, useState, useContext } from "react";

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const [toggleForgotPassword, setToggleForgotPassword] = useState(false);
  const [toggleCreateAccount, setToggleCreateAccount] = useState(false);

  return (
    <LoginContext.Provider value={{
      toggleForgotPassword,
      setToggleForgotPassword,
      toggleCreateAccount,
      setToggleCreateAccount
    }}>
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => useContext(LoginContext);
