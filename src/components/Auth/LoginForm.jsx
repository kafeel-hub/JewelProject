import React, { useState } from "react";
import { Box, Button, Typography,Paper } from "@mui/material";
import { connect, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { CustomInput} from "../Customcomponents/CustomInputs";
import { useTheme } from '@mui/material/styles';
import CustomButton from "../Customcomponents/CustomButton";


const LoginForm = ({ logIn, userInfo,loginLoading }) => {
  const navigate = useNavigate();
  const user = useSelector((state) => state.auth);
  const theme = useTheme();

  const [formData, setFormData] = useState({
    code: "",
    name: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    setFormErrors({ ...formErrors, [name]: "" });
  };

  const validateForm = () => {
    const errors = {};
    if (!formData.code) errors.code = "Code is required.";
    if (!formData.name) errors.name = "Name is required.";
    if (!formData.password) errors.password = "Password is required.";
    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errors = validateForm();
    if (Object.keys(errors).length > 0) {
      setFormErrors(errors);
      return;
    }

    logIn({
      UserName: formData.name,
      UserPassword: formData.password,
      ClientCode: formData.code,
      navigate,
    });
  };

  return (
        <Paper
        className="custom-card_001"
        bgcolor={theme.palette.background.default}
        sx={{
          padding: theme.spacing(4),
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ marginBottom: 3, textAlign: "center", color: "#212b36" }}
        >
          Login
        </Typography>

        <form className="custom-form" onSubmit={handleSubmit}>
          <CustomInput
            label="Code"
            name="code"
            value={formData.code}
            onChange={handleChange}
            error={formErrors.code}
          />

          <CustomInput
            label="Name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            error={formErrors.name}
          />

          <CustomInput
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            error={formErrors.password}
          />
          <CustomButton text="Log in" theme={theme} fullWidth sx={{ mt: 2 }} variantType="dark" type="submit" disabled={loginLoading} loading={loginLoading}/>
        </form>
      </Paper>
  );
};

const mapStateToProps = ({ auth = {} }) => ({
  userInfo: auth.user || {},
  loginLoading:auth.signInLoading || false,
});

const mapDispatchToProps = (dispatch) => ({
  logIn: (data) => {
    dispatch({ type: "signInCalled", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm);
