import React, { useState } from "react";
import "./LoginForm.css";
import * as _ from "lodash";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Box, Button, TextField, Typography } from "@mui/material";
import CompanyBranch from "../../pages/CompanyBranch";
const LoginForm = ({ logIn, userInfo }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    code: "",
    name: "",
    password: "",
  });
  const user = useSelector((state) => state.auth);

  console.log("Current user data:", user);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  console.log(userInfo, "name");
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.code || !formData.name || !formData.password) {
      setError("All fields are required.");
    } else {
      setError("");
      logIn({
        UserName: formData.name,
        UserPassword: formData.password,
        ClientCode: formData.code,
        navigate,
      });
    }
  };

  return (
    <>
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
        <Box
          sx={{
            width: 400,
            backgroundColor: "#ffffff",
            padding: 4,
            borderRadius: 2,
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography
            variant="h5"
            component="h1"
            sx={{ marginBottom: 3, textAlign: "center", color: "#212b36" }}
          >
            Login
          </Typography>

          {error && (
            <Typography
              variant="body2"
              color="error"
              sx={{ marginBottom: 2, textAlign: "center" }}
            >
              {error}
            </Typography>
          )}

          <form onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Code"
              name="code"
              variant="outlined"
              margin="normal"
              value={formData.code}
              onChange={handleChange}
              required
              InputProps={{
                style: { backgroundColor: "#f9fafb", borderRadius: "8px" },
              }}
            />
            <TextField
              fullWidth
              label="Name"
              name="name"
              variant="outlined"
              margin="normal"
              value={formData.name}
              onChange={handleChange}
              required
              InputProps={{
                style: { backgroundColor: "#f9fafb", borderRadius: "8px" },
              }}
            />
            <TextField
              fullWidth
              label="Password"
              name="password"
              type="password"
              variant="outlined"
              margin="normal"
              value={formData.password}
              onChange={handleChange}
              required
              InputProps={{
                style: { backgroundColor: "#f9fafb", borderRadius: "8px" },
              }}
            />

            <Button
              type="submit"
              variant="contained"
              fullWidth
              sx={{
                marginTop: 2,
                backgroundColor: "#2065d1",
                color: "#ffffff",
                "&:hover": {
                  backgroundColor: "#1854a8",
                },
              }}
            >
              Login
            </Button>
          </form>
        </Box>
      </Box>
    </>
  );
};

const mapStateToProps = ({ auth = {} }) => {
  const userInfo = _.get(auth, "user", {});
  return { userInfo };
};

const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => {
    dispatch({ type: "signInCalled", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
