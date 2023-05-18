import axios from "axios";
import React from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { SessionContext } from "../App";
import { useContext } from "react";
import { travelService } from "../services/travelService";
import * as yup from "yup";

const registerSchema = yup.object().shape({
  name: yup
    .string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  email: yup.string().email("Invalid email").required("Required"),
  password: yup.string().min(8, "Your password is too short."),
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

function EditProfileModal({ show, onHide }) {
  const session = useContext(SessionContext);
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
        let imageUrl = session.userDetails.profilePictureUrl;

        if (values.image) {
          imageUrl = await travelService.uploadImage(
            values.image,
            session.token
          );
        }

        await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-profile`,
          {
            name: values.name,
            profilePictureUrl: imageUrl,
            email: values.email,
            password: values.password,
            passwordRepeat: values.passwordRepeat,
            phoneNumber: values.phoneNumber,
          },
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
              Authorization: `Bearer ${session.token}`,
            },
          }
        );
        window.location.href = "/profile";
      } catch (error) {}
    },
  });

  return (
    <>
      <Modal show={show} onHide={() => onHide()}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Label htmlFor="name">Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </InputGroup>
          <Form.Label htmlFor="image">Picture</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              id="image"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
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
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={() => formik.submitForm()}>
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default EditProfileModal;
