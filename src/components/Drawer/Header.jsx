// components/Header.js
import React, { useEffect, useState } from "react";
import { AppBar, Toolbar, Typography,Box } from "@mui/material";
import { useTheme } from '@mui/material/styles';
import Grid from '@mui/material/Grid2';
import { KeyValueDisplay } from "../Customcomponents/Common";
import { useSelector } from "react-redux";
import _ from "lodash";


const Header = ({ title, drawerWidth }) => {
  const companyDetails = useSelector((state) => _.get(state.auth, "CompanyDetails", []));
  const userName = useSelector((state) => _.get(state.auth, "userName", ""));

  const[dashboardData, setDashboardData] = useState({})

  useEffect(()=>{
    if(companyDetails && companyDetails.length > 0){
        setDashboardData(companyDetails[0])
    }
  },[dashboardData])

//   console.log(dashboardData);
  
  const theme = useTheme();
    
  return (
    <Box
      position="fixed"
      elevation={1}
      bgcolor={theme.palette.background.paper}

      sx={{
        // zIndex: (theme) => theme.zIndex.drawer + 1,
        ml: `${drawerWidth}px`,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: "margin 0.3s, width 0.3s",

      }}
    >
      <div className="fixed-header-section">
      <Box sx={{ width: '100%' }}>
      <Grid container rowSpacing={0} columnSpacing={{ xs: 1, sm: 2, md: 2 }} >
        <Grid size={{ xs: 22, sm: 6, md: 4 , lg:3}} >
        <KeyValueDisplay
        title="Company Name"
        value={dashboardData&& dashboardData.CompanyName}
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}

        
      />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 , lg:3}} >
        
        
        <KeyValueDisplay
        title="Branch"
        value={dashboardData&& dashboardData.LocName}
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}

      />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 , lg:3}} >
        
        
           <KeyValueDisplay
        title="Financial Year"
        value={dashboardData&& dashboardData.FinancialYear}
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}

      />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 , lg:3}} >
        
        
           <KeyValueDisplay
        title="Username"
        value={userName}
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}

      />
        </Grid>
        <Grid size={{ xs: 12, sm: 6, md: 4 , lg:3}} >
        
        
           <KeyValueDisplay
        title="18 karat"
        value="18 karat"
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}

      />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 , lg:3}} >
        
        
           <KeyValueDisplay
        title="21 karat"
        value="Admin"
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}
      />
        </Grid>

        <Grid size={{ xs: 12, sm: 6, md: 4 , lg:3}} >
        
        
           <KeyValueDisplay
        title="22 karat"
        value="Admin"
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}

      />
        </Grid>
        <Grid size={{ xs: 12, sm: 2, md: 4 , lg:3}} >
        
        
           <KeyValueDisplay
        title="24 karat"
        value="Admin"
        keyColor="text.primary"
        valueColor={theme.palette.text.tertiary}
      />
        </Grid>
      </Grid>
    </Box>
      </div>
    </Box>
  );
};

export default Header;
