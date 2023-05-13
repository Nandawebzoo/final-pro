import React, { useState } from "react";
import { Button, Form, InputGroup, Container } from "react-bootstrap";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup
    .string()
    .required("Required")
    .min(8, "Your password is too short."),
  passwordRepeat: yup
    .string()
    .required("Required")
    .min(8)
    .oneOf([yup.ref("password")], "Your passwords do not match."),
  phoneNumber: yup
    .string()
    .optional()
    .min(9, "Must have at least 9 characters"),
});

function RegisterPage() {
  const [registerStatus, setRegisterStatus] = useState();

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      phoneNumber: "",
    },
    validationSchema: registerSchema,
    onSubmit: async (values) => {
      try {
        await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register`,
          {
            name: values.name,
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            phoneNumber: values.phoneNumber,
            role: "user",
          },
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
            },
          }
        );

        setRegisterStatus({
          success: true,
          message: "Success! You can login now.",
        });
      } catch (error) {
        console.error(error);
        setRegisterStatus({
          success: false,
          message: error.response.data.message,
        });
      }
    },
  });

  return (
    <>
      <Container>
        <Form className="register-form">
          <Form.Label htmlFor="name">Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="name"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              isInvalid={formik.touched.name && !!formik.errors.name}
            />
            {formik.touched.name && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.name}
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <Form.Label htmlFor="email">Email</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="email"
              id="email"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
              isInvalid={formik.touched.email && !!formik.errors.email}
            />
            {formik.touched.email && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.email}
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <Form.Label htmlFor="password">Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              id="password"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
              isInvalid={formik.touched.password && !!formik.errors.password}
            />
            {formik.touched.password && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.password}
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <Form.Label htmlFor="passwordRepeat">Repeat Password </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              required
              type="password"
              id="passwordRepeat"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.passwordRepeat}
              isInvalid={
                formik.touched.passwordRepeat && !!formik.errors.passwordRepeat
              }
            />
            {formik.touched.passwordRepeat && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.passwordRepeat}
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="phoneNumber"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phoneNumber}
              isInvalid={
                formik.touched.phoneNumber && !!formik.errors.phoneNumber
              }
            />
            {formik.touched.phoneNumber && (
              <Form.Control.Feedback type="invalid" tooltip>
                {formik.errors.phoneNumber}
              </Form.Control.Feedback>
            )}
          </InputGroup>
          <Button variant="primary" onClick={() => formik.submitForm()}>
            Register
          </Button>
          {registerStatus && (
            <div
              className={`mt-2 ${registerStatus.success ? "success" : "error"}`}
            >
              {registerStatus.message}
            </div>
          )}
        </Form>
      </Container>
    </>
  );
}

export default RegisterPage;
