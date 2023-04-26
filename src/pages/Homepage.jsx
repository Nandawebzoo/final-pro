import React from "react";
import "./homepage.css";
import {
  Button,
  Container,
  Form,
  FormControl,
  InputGroup,
} from "react-bootstrap";
import Badges from "../components/Badges";
import Promos from "../components/Promos";

function Homepage() {
  return (
    <>
      <div className="hero">
        <Container>
          <div className="hero-text">
            <h1>Explore</h1>
            <h3>Your favorite destination</h3>
            <h5>
              Find great places to stay, eat, shop, or visit from local experts
            </h5>
          </div>
          <InputGroup>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
            <Button variant="danger">Button</Button>
          </InputGroup>
        </Container>
      </div>
      <Badges />
      <Promos />
    </>
  );
}

export default Homepage;
