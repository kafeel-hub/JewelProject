import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import _ from "lodash";
import PrivateLayout from "../components/Drawer/PrivateLayout";
const PrivateRoute = ({ title,element }) => {
  const token = useSelector((state) => _.get(state.auth, "token", ""));


  return token ? <PrivateLayout title={title}>{element}</PrivateLayout> : <Navigate to="/" />;
};

export default PrivateRoute;
