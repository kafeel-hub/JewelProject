import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import ThemeProvider from "./contexts/ThemeProvider";
import LoginPage from "./pages/LogInPage";
import CompanyBranch from "./pages/CompanyBranch";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./rotues/PrivateRoute";
function App() {
  return (
      <ThemeProvider>
        <Router>
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LoginPage />} />
            <Route
              path="/company-branch"
              element={<CompanyBranch />}
            />

            {/* All Private Routes */}
            <Route
              path="/dashboard"
              element={<PrivateRoute element={<Dashboard />} title="Dashboard" />}
            />
            <Route
              path="/home"
              element={<PrivateRoute element={<Home />} />}
            />
          </Routes>
        </Router>
      </ThemeProvider>
  );
}

export default App;


