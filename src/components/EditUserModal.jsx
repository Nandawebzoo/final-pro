import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";
import axios from "axios";
import { Formik } from "formik";

function EditUserModal({ show, onHide }) {
  const session = useContext(SessionContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
      passwordRepeat: "",
      phoneNumber: "",
    },
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
        window.location.href = "/admin";
      } catch (error) {}
    },
  });

  return (
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
  );
}

export default EditUserModal;
