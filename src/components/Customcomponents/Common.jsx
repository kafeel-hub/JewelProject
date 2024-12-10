import React from "react";
import { Typography, Box } from "@mui/material";

const KeyValueDisplay = ({
  title,
  value,
  keyColor = "text.primary",
  valueColor = "warning.main",
}) => {
  return (
    <Box display="flex" alignItems="center" sx={{ padding: "8px" }}>
      <Typography
        // variant="h6"
        component="span"
        sx={{ color: keyColor, fontWeight: "bold", mr: 1, fontSize: "1rem" }}
      >
        {title}:
      </Typography>
      <Typography
        // variant="h6"
        component="span"
        sx={{ color: valueColor, fontWeight: "bold", fontSize: "1rem" }}
      >
        {value}
      </Typography>
    </Box>
  );
};

export { KeyValueDisplay };
