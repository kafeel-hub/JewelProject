// components/PrivateLayout.js
import React, { useState } from "react";
import { Box, CssBaseline, Toolbar } from "@mui/material";
import Header from "./Header";
import SideDrawer from "./SideDrawer";
import Loader from "../Loader/Loader";

const drawerWidth = 240;
const collapsedWidth = 60;

const PrivateLayout = ({ title, children }) => {
  const [isDrawerCollapsed, setIsDrawerCollapsed] = useState(false);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <SideDrawer
        isCollapsed={isDrawerCollapsed}
        setIsCollapsed={setIsDrawerCollapsed}
      />
           <Header
        title={title}
        drawerWidth={isDrawerCollapsed ? collapsedWidth : drawerWidth}
      />
      <Box
        component="main"
        className="main-body-contaainer"
        sx={{
          flexGrow: 1,
          padding:"24px 12px",
          width: `calc(100% - ${
            isDrawerCollapsed ? collapsedWidth : drawerWidth
          }px)`,
          mt: 17, 
          transition: "margin 0.3s, width 0.3s",
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default PrivateLayout;
