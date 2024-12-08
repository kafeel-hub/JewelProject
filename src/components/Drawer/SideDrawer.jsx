import React, { useContext, useState } from "react";
import {
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  IconButton,
  Box,
  Divider,
  Button,
  Collapse,
  Tooltip,
} from "@mui/material";
import {
  Home,
  Dashboard,
  Business,
  ExpandLess,
  ExpandMore,
  Menu,
  Brightness4,
  Brightness7,
  Logout,
  LocationOn,
  Info,
  Store,
} from "@mui/icons-material";
import { ThemeContext } from "../../contexts/ThemeProvider";
import { useNavigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import Loader from "../Loader/Loader";
import { useTheme } from '@mui/material/styles';
import GridGoldenratioIcon from '@mui/icons-material/GridGoldenratio';
const drawerWidth = 240;
const collapsedWidth = 60;

const SideDrawer = (props) => {
  const theme = useTheme();

  const { isCollapsed, setIsCollapsed, logOut } = props;
  const { mode, toggleTheme } = useContext(ThemeContext);
  const [loading, setLoading] = useState(false);
  const [openSubMenu, setOpenSubMenu] = useState({
    company: false, 
  });

  const navigate = useNavigate();
  const location = useLocation(); 

  const toggleDrawer = () => setIsCollapsed(!isCollapsed);

  const menuItems = [
    { text: "Home", icon: <Home />, path: "/home" },
    { text: "Dashboard", icon: <Dashboard />, path: "/dashboard" },
    { text: "Gold", icon: <GridGoldenratioIcon />, path: "/gold" },

    {
      text: "Company",
      icon: <Business />,
      children: [
        { text: "Company Branch", icon: <Store />, path: "/company-branch" },
        { text: "Company Location", icon: <LocationOn />, path: "/company-location" },
        { text: "Company Details", icon: <Info />, path: "/company-details" },
      ],
    },
  ];

  const handleLogout = () => {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      logOut({ navigate });
    }, 2000);
  };

  const handleToggleSubMenu = (menu) => {
    setOpenSubMenu({
      ...openSubMenu,
      [menu]: !openSubMenu[menu],
    });
  };

  const isActive = (path) => location.pathname === path; 

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: isCollapsed ? collapsedWidth : drawerWidth,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: isCollapsed ? collapsedWidth : drawerWidth,
          boxSizing: "border-box",
          overflowX: "hidden",
          transition: "width 0.3s",
        },
      }}
    >
      {loading && <Loader />}

      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: isCollapsed ? "center" : "space-between",
          p: 1,
        }}
      >
        {!isCollapsed && <Box sx={{ pl: 2 }}>BESTO JEWEL</Box>}
        <IconButton onClick={toggleDrawer}>
          <Menu />
        </IconButton>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) =>
          item.children ? (
            <React.Fragment key={item.text}>
              {/* Parent Item */}
              <ListItem
                button
                onClick={() => handleToggleSubMenu(item.text)}
                sx={{
                  display: "flex",
                  justifyContent: isCollapsed ? "center" : "flex-start",
                  backgroundColor: isActive(item.path) ? theme.palette.background.selected : "primary",
                  color: isActive(item.path) ? theme.palette.text.selected : "inherit",
                  '&:hover': {
                    backgroundColor: theme.palette.background.hover,
                    // color: "white",
                  },
                }}
              >
                <ListItemIcon sx={{ justifyContent: "center", color: isActive(item.path) ? theme.palette.text.selected : "inherit" }}>
                  {item.icon}
                </ListItemIcon>
                {!isCollapsed && (
                  <>
                    <ListItemText primary={item.text} />
                    <IconButton
                      sx={{ minWidth: 30 }}
                      size="small"
                      onClick={() => handleToggleSubMenu(item.text)}
                    >
                      {openSubMenu[item.text] ? <ExpandLess /> : <ExpandMore />}
                    </IconButton>
                  </>
                )}
              </ListItem>
              {/* Nested Items */}
              <Collapse
                in={openSubMenu[item.text] || isCollapsed}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding>
                  {item.children.map((child) => (
                    <ListItem
                      button
                      key={child.text}
                      onClick={() => navigate(child.path)}
                      sx={{
                        pl: isCollapsed ? 0 : 4,
                        justifyContent: isCollapsed ? "center" : "flex-start",
                        backgroundColor: isActive(child.path) ? theme.palette.background.selected : "transparent",
                        color: isActive(child.path) ? theme.palette.text.selected : "inherit",
                        '&:hover': {
                          backgroundColor: theme.palette.text.hover,
                          // color: "white",
                        },
                      }}
                    >
                      <Tooltip title={child.text} placement="right" disableHoverListener={!isCollapsed}>
                        <ListItemIcon sx={{ justifyContent: "center", color: isActive(child.path) ? theme.palette.text.selected : "inherit" }}>
                          {child.icon}
                        </ListItemIcon>
                      </Tooltip>
                      {!isCollapsed && (
                        <ListItemText
                          primary={child.text}
                          sx={{ fontSize: "0.9rem" }}
                        />
                      )}
                    </ListItem>
                  ))}
                </List>
              </Collapse>
            </React.Fragment>
          ) : (
            <ListItem
              button
              key={item.text}
              onClick={() => navigate(item.path)}
              sx={{
                display: "flex",
                justifyContent: isCollapsed ? "center" : "flex-start",
                backgroundColor: isActive(item.path) ? theme.palette.background.selected : "transparent",
                color: isActive(item.path) ? theme.palette.text.selected : "inherit",
                // '&:hover': {
                //   backgroundColor: "primary.main",
                //   color: "white",
                // },
              }}
            >
              <ListItemIcon sx={{ justifyContent: "center", color: isActive(item.path) ? theme.palette.text.selected : "inherit" }}>
                {item.icon}
              </ListItemIcon>
              {!isCollapsed && <ListItemText primary={item.text} />}
            </ListItem>
          )
        )}
      </List>
      <Box
        sx={{
          mt: "auto",
          mb: 1,
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          justifyContent: isCollapsed ? "center" : "flex-start",
          px: 2,
        }}
      >
        <IconButton onClick={toggleTheme}>
          {mode === "dark" ? <Brightness7 /> : <Brightness4 />}
        </IconButton>
        {!isCollapsed && (
          <Button
            color="action"
            onClick={handleLogout}
            sx={{
              "&.MuiButtonBase-root:hover": {
                bgcolor: "transparent",
                color: "blue",
              },
            }}
            endIcon={<Logout />}
          >
            <div>Logout</div>
          </Button>
        )}
      </Box>
    </Drawer>
  );
};

const mapStateToProps = ({ auth = {} }) => ({});

const mapDispatchToProps = (dispatch) => ({
  logOut: (data) => {
    dispatch({ type: "logoutCalled", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(SideDrawer);
