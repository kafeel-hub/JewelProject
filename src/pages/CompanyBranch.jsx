import React, { useState, useEffect } from "react";
import * as _ from "lodash";
import CustomDropdown from "../components/Customcomponents/CustomDropdown";
import { Box, Button, Typography } from "@mui/material";
import { connect } from "react-redux";
import CustomButton from "../components/Customcomponents/CustomButton";
const CompanyBranch = ({
  userInfo,
  getCompanylist,
  companylist,
  companyBranchlist,
  getCompanybranchlist,
  getCompanyDetails,
}) => {
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);
  const [branchselect, setBranchSelected] = useState(false);

  let company = [];
  let branch = [];
  let location = [];
  if (
    companylist != undefined &&
    companylist.length > 0
    // (companyBranchlist = !undefined && companyBranchlist.length > 0)
  ) {
    company = JSON.parse(companylist);
    // branch = JSON.parse(companyBranchlist);
  }
  if (
    // (companylist != undefined && companylist.length > 0) ||
    companyBranchlist !== undefined &&
    companyBranchlist.length > 0
  ) {
    // company = JSON.parse(companylist);
    branch = JSON.parse(companyBranchlist);
  }
  // if (
  //   (Array.isArray(companylist) && companylist.length > 0) ||
  //   (Array.isArray(companyBranchlist) && companyBranchlist.length > 0)
  // ) {
  //   try {
  //     // Parse and combine company list if needed
  //     const parsedCompanyList = Array.isArray(companylist)
  //       ? JSON.parse(companylist)
  //       : [];

  //     company = [...companyList, ...parsedCompanyList];
  //   } catch (error) {
  //     console.error("Error parsing company list:", error);
  //   }
  // }
  // if (
  //   (Array.isArray(companylist) && companylist.length > 0) ||
  //   (Array.isArray(companyBranchlist) && companyBranchlist.length > 0)
  // ) {
  //   company = [...companylist, ...(JSON.parse(companylist) || [])];
  //   branch = [...companyBranchlist, ...(JSON.parse(companyBranchlist) || [])];
  // }
  //   console.log(parsedObject, "userinfo.parse");
  useEffect(() => {
    if (branchselect) {
      getCompanybranchlist({
        userId: userInfo,
        companyId: selectedCompany?.fldID,
      });
    }
  }, [branchselect]);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Selected Company:", selectedCompany);
    console.log("Selected Branch:", selectedBranch);
    getCompanyDetails({
      userId: userInfo,
      companyId: selectedCompany?.fldID,
      locationId: selectedBranch?.fldID,
    });
  };
  console.log(userInfo, companylist, selectedCompany, "userinfo");
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
          Select Company and Branch
        </Typography>
        <form onSubmit={handleSubmit}>
          <CustomDropdown
            id="company-dropdown"
            label="Select Company"
            placeholder="Choose a company"
            options={
              company && Array.isArray(company)
                ? company.map((option, index) => ({
                    value: option.fldID,
                    label: `${option.fldDisplay}`,
                    ...option,
                  }))
                : []
            }
            value={selectedCompany}
            callFilterAction={async (search) => {
              if (userInfo) {
                await getCompanylist({
                  userId: userInfo,
                });
              }
            }}
            onChange={(e, newValue) => {
              setSelectedCompany(newValue), setBranchSelected(true);
            }}
          />

          <CustomDropdown
            id="branch-dropdown"
            label="Select Branch"
            placeholder="Choose a branch"
            value={selectedBranch}
            options={
              branch && Array.isArray(branch)
                ? branch.map((option, index) => ({
                    value: option.fldID,
                    label: `${option.fldDisplay}`,
                    ...option,
                  }))
                : []
            }
            callFilterAction={async (search) => {
              if (selectedCompany?.fldID) {
                await getCompanybranchlist({
                  userId: userInfo,
                  companyId: selectedCompany?.fldID,
                });
              }
            }}
            onChange={(e, newValue) => {
              setSelectedBranch(newValue), console.log(newValue, "value");
            }}
            sx={{ marginTop: 3 }}
          />
          <CustomButton
            type="submit"
            label="Proceed"
            // enable={createBadgesLoading}
            // disable={}
            fullWidth
            sx={{
              mt: "8px",
            }}
          />
        </form>
      </Box>
    </Box>
  );
};
const mapStateToProps = ({ auth = {} }) => {
  const companylist = _.get(auth, "companyList", []);
  const companyBranchlist = _.get(auth, "companyBranchList", []);

  const userInfo = _.get(auth, "user", {});

  return { companylist, userInfo, companyBranchlist };
};

const mapDispatchToProps = (dispatch) => ({
  getCompanylist: (data) => {
    dispatch({ type: "getCompanylistcalled", payload: data });
  },
  getCompanybranchlist: (data) => {
    dispatch({ type: "getCompanyBranchlistcalled", payload: data });
  },
  getCompanyDetails: (data) => {
    dispatch({ type: "getCompanyDetailscalled", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(CompanyBranch);
