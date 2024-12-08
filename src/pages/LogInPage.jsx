import React from "react";
import LoginForm from "../components/Auth/LoginForm";
import { Box } from "@mui/material";
const LoginPage = () => {

  
  return (
    <div className="overflow-hidden w-full py-auto h-screen apply-gradient flex flex-col justify-center">
          <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        backgroundColor: "#f4f6f8",
        padding: 3,
      }}
    >
      <LoginForm />

    </Box>
    </div>
  );
};

export default LoginPage;
