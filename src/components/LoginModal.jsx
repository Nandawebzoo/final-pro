import React from "react";
import { useFormik } from "formik";
import { Modal, Button, Form, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginModal({ show, onHide }) {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    onSubmit: async (values) => {
      try {
        const response = await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login`,
          {
            email: values.email,
            password: values.password,
          },
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
            },
          }
        );

        localStorage.setItem("token", response.data.token);
        window.location.href = window.location.origin;
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <>
      <Modal show={show} onHide={() => onHide()} className="movie-modal">
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Label htmlFor="email">Email</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="email"
                id="email"
                onChange={formik.handleChange}
                value={formik.values.email}
              />
            </InputGroup>
            <Form.Label htmlFor="password">Password</Form.Label>
            <InputGroup className="mb-3">
              <Form.Control
                type="password"
                id="password"
                onChange={formik.handleChange}
                value={formik.values.password}
              />
            </InputGroup>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="warning"
            onClick={() => {
              onHide();
              navigate("/register");
            }}
          >
            Register
          </Button>
          <Button variant="primary" onClick={() => formik.submitForm()}>
            Log In
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default LoginModal;
