import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";
import { Box, Button, Typography,Paper } from "@mui/material";
import DashboardLayout from "../components/Drawer/Drawer";
import InputFieldUpdated from "../components/Customcomponents/CustomInputfield";
// import CommonTable from "../components/CommonTable/CommonTable";
import { useTheme } from '@mui/material/styles';
import Loader from "../components/Loader/Loader";
const Dashboard = () => {
  const theme = useTheme();

  return (
    <Paper
    className="custom-card_001"
    bgcolor={theme.palette.background.default}
    sx={{
      padding: theme.spacing(4),
      maxWidth: '100%',
      width: '100%',
      textAlign: 'center',
    }}
  >
    {/* <Loader /> */}
    <Typography
          variant="h5"
          component="h1"
          // sx={{ marginBottom: 3, textAlign: "center", color: "#212b36" }}
        >
          Dashboard
        </Typography>
    </Paper>
  );
};

export default Dashboard;
