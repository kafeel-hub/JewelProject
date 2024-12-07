import React from "react";
import LoginForm from "../components/signIn/LoginForm";

const LoginPage = () => {
  return (
    <div className="overflow-hidden w-full py-auto h-screen apply-gradient flex flex-col justify-center">
      <LoginForm />
    </div>
  );
};

export default LoginPage;
