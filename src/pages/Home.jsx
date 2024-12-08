import React,{useState} from "react";
import DemoComponent from "../components/DemoComponent";
// import { Container } from "react-bootstrap";
import Container from "@mui/material/Container";
import CustomizedSwitches from "../components/toggleButton";
import DynamicTable from "../components/DynamicTable";
import { useTheme } from '@mui/material/styles';
import {Paper} from "@mui/material";

const Home = () => {
  const theme = useTheme();
  const [rows, setRows] = useState([]);

  return (
    <>
      {/* <CustomizedSwitches /> */}
      {/* <DemoComponent /> */}

      <div className="main-section">
          <div class="MuiGrid-root MuiGrid-item css-14d127i">
            <h2 class="MuiTypography-root MuiTypography-h2 css-eb60i0">Gold Retail Sales Invoice</h2>
            </div>
          <Paper
        className="custom-card_001"
        bgcolor={theme.palette.background.default}
        sx={{
          // padding: theme.spacing(2),
          maxWidth: '100%',
          width: '100%',
          textAlign: 'center',
        }}
      >
        <DynamicTable rows={rows} setRows={setRows} />
    </Paper>
          </div>
    </>
  );
};

export default Home;
