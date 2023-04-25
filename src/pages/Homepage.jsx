import React from "react";
import "./homepage.css";
import { Button, Form, InputGroup } from "react-bootstrap";

function Homepage() {
  return (
    <>
      <div className="hero">
        <div className="form-control">
          <div>
            <InputGroup>
              <Form.Control
                placeholder="Recipient's username"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
            </InputGroup>
          </div>
          <div>
            <Form.Select aria-label="Default select example">
              <option>Open this select menu</option>
              <option value="1">One</option>
              <option value="2">Two</option>
              <option value="3">Three</option>
            </Form.Select>
          </div>
          <div>
            <Button
              variant="outline-secondary"
              id="button-addon2"
              className="btn-search"
            >
              Button
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Homepage;
