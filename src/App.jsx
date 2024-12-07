import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ThemeProvider from "./contexts/ThemeProvider";
import LoginPage from "./pages/LogInPage";
import CompanyBranch from "./pages/CompanyBranch";
import Dashboard from "./pages/Dashboard";
// import { Dashboard } from "@mui/icons-material";
function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<LoginPage />} />
          <Route path="/company-branch" element={<CompanyBranch />} />
          <Route path="/dashboard" element={<Dashboard />} />

          <Route path="/home" element={<Home />} />
        </Routes>
        {/* </Layout> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
