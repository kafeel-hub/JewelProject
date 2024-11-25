import React from "react";
import DemoComponent from "../components/DemoComponent";
// import { Container } from "react-bootstrap";
import Container from "@mui/material/Container";
const Home = () => {
  return (
    <div>
      <DemoComponent />
      <Container>
        <h1>Welcome Jewel Shop</h1>
      </Container>
    </div>
  );
};

export default Home;
