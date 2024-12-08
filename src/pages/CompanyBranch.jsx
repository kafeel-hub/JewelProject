import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import CustomDropdown from "../components/Customcomponents/CustomDropdown";
import { Box, Button, Typography,Paper } from "@mui/material";
import { connect } from "react-redux";
import CustomButton from "../components/Customcomponents/CustomButton";
import { useTheme } from '@mui/material/styles';
import { CustomSelect } from "../components/Customcomponents/CustomInputs";
import { useNavigate } from "react-router-dom";

const CompanyBranch = ({
  userInfo,
  companylist,
  companyBranchlist,
  getCompanybranchlist,
  getCompanyDetails,
  loginLoading,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [companies, setCompanies] = useState([]);
  const [company, setCompany] = useState({ fldID: "", fldDisplay: "" });
  const [companyLocation, setCompanyLocation] = useState({
    fldID: "",
    fldDisplay: "Select a branch",
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (companylist && companylist.length > 0) {
      const newCompanies = companylist.map((item) => ({
        value: item.fldID,
        label: item.fldDisplay,
      }));
      setCompanies(newCompanies);
    } else {
      navigate("/");
    }
  }, [companylist, navigate]);

  const handleCompanyChange = (e) => {
    const companyId = e.target.value;
    setCompany({ fldID: companyId, fldDisplay: companyId });
    setCompanyLocation({ fldID: "", fldDisplay: "Select a branch" });
    getCompanybranchlist({ userId: userInfo, companyId });
    setErrors((prev) => ({ ...prev, company: "" }));
  };

  const handleLocationChange = (e) => {
    const locationId = e.target.value;
    setCompanyLocation({ fldID: locationId, fldDisplay: locationId });
    setErrors((prev) => ({ ...prev, branch: "" }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const validationErrors = {};
    if (!company.fldID) validationErrors.company = "Company is required.";
    if (!companyLocation.fldID)
      validationErrors.branch = "Branch is required.";

    if (Object.keys(validationErrors).length) {
      setErrors(validationErrors);
    } else {
      getCompanyDetails({
        userId: userInfo,
        companyId: company.fldID,
        locationId: companyLocation.fldID,
        navigate,
      });
    }
  };

  return (
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
      <Paper
        sx={{
          padding: theme.spacing(4),
          maxWidth: 400,
          width: "100%",
          textAlign: "center",
          bgcolor: theme.palette.background.default,
        }}
      >
        <Typography
          variant="h5"
          component="h1"
          sx={{ marginBottom: 3, textAlign: "center", color: "#212b36" }}
        >
          Select Company and Branch
        </Typography>

        <form className="custom-form" onSubmit={handleSubmit}>
          <CustomSelect
            label="Company"
            value={company.fldID}
            onChange={handleCompanyChange}
            options={companies}
            error={errors.company}
            helperText ={errors.company}
          />

          <CustomSelect
            label="Branch"
            value={companyLocation.fldID}
            onChange={handleLocationChange}
            options={
              companyBranchlist?.map((item) => ({
                value: item.fldID,
                label: item.fldDisplay,
              })) || []
            }
            error={errors.branch}
            helperText ={errors.branch}
          />

          <CustomButton
            text="Proceed"
            theme={theme}
            fullWidth
            sx={{ mt: 2 }}
            variantType="dark"
            type="submit"
            disabled={loginLoading} loading={loginLoading}
          />
        </form>
      </Paper>
    </Box>
  );
};

const mapStateToProps = ({ auth = {} }) => ({
  companylist: _.get(auth, "companyList", []),
  companyBranchlist: _.get(auth, "companyBranchList", []),
  userInfo: _.get(auth, "user", {}),
  loginLoading:auth.signInLoading || false,

});

const mapDispatchToProps = (dispatch) => ({
  getCompanybranchlist: (data) =>
    dispatch({ type: "getCompanyBranchlistcalled", payload: data }),
  getCompanyDetails: (data) =>
    dispatch({ type: "getCompanyDetailscalled", payload: data }),
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBranch);
