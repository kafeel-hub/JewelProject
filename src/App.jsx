import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Layout from "./components/Layout/Layout";
import Home from "./pages/Home";
import ThemeProvider from "./contexts/ThemeProvider";

function App() {
  return (
    <ThemeProvider>
      <Router>
        {/* <Layout> */}
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="/appointments" element={<Appointments />} />
            <Route path="/patient-records" element={<PatientRecords />} /> */}
        </Routes>
        {/* </Layout> */}
      </Router>
    </ThemeProvider>
  );
}

export default App;
