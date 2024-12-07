import React, { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeProvider";
import { Box, Button, Typography } from "@mui/material";
import DashboardLayout from "../components/Drawer/Drawer";
import InputFieldUpdated from "../components/Customcomponents/CustomInputfield";
// import CommonTable from "../components/CommonTable/CommonTable";
const Dashboard = () => {
  const { theme, toggleTheme } = useContext(ThemeContext);

  // Example form data
  const formData = {
    userName: "JohnDoe",
    currency: "USD",
    date: "2024-12-04",
  };

  // Define an array of input configurations
  const inputFields = [
    {
      id: "userName",
      label: "Username",
      value: formData.userName,
      type: "text",
      placeholder: "Enter username",
    },
    {
      id: "currency",
      label: "Currency",
      value: formData.currency,
      type: "text",
      placeholder: "Enter currency",
    },
    {
      id: "date",
      label: "Date",
      value: formData.date,
      type: "date",
    },
  ];

  return (
    <Box
      sx={{
        backgroundColor: theme === "light" ? "#f5f5f5" : "black",
        color: theme === "light" ? "#000" : "rgba(255, 255, 255, 0.87)",
        minHeight: "100vh",
      }}
    >
      {/* Dashboard Layout */}
      <DashboardLayout />

      {/* Header Section */}
      {/* <Box
        sx={{
          padding: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: theme === "light" ? "#fff" : "#1E1E1E",
          color: theme === "light" ? "#000" : "rgba(255, 255, 255, 0.87)",
          boxShadow:
            theme === "light"
              ? "0px 2px 4px rgba(0, 0, 0, 0.1)"
              : "0px 2px 4px rgba(0, 0, 0, 0.5)",
        }}
      >
        <Typography variant="h5">Dashboard Page</Typography>
        <Button
          variant="contained"
          onClick={toggleTheme}
          sx={{
            backgroundColor: theme === "light" ? "#673ab7" : "#ff5722",
            color: "#fff",
            "&:hover": {
              backgroundColor: theme === "light" ? "#512da8" : "#e64a19",
            },
          }}
        >
          Toggle to {theme === "light" ? "Dark" : "Light"} Theme
        </Button>
      </Box> */}

      {/* Content Section */}
      <Box
        sx={{
          padding: 3,
          display: "flex",
          flexDirection: "column",
          gap: 2,
          backgroundColor: theme === "light" ? "#fff" : "#1E1E1E",
          borderRadius: 2,
          margin: 3,
          marginLeft: `260px`, // Adjust according to the width of the navbar slider
          transition: "margin-left 0.3s ease", // Smooth adjustment if the navbar is collapsible
        }}
      >
        {inputFields.map(
          (field) =>
            field.value && ( // Render field only if value exists
              <InputFieldUpdated
                key={field.id}
                id={field.id}
                label={field.label}
                value={field.value}
                type={field.type}
                placeholder={field.placeholder}
                onChange={(e) =>
                  console.log(`${field.label} changed:`, e.target.value)
                } // Replace with your handler
              />
            )
        )}

        <CommonTable />
      </Box>
    </Box>
  );
};

export default Dashboard;
