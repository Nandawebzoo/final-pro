import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";
import axios from "axios";

function EdiUserModal({ show, onHide, user }) {
  const session = useContext(SessionContext);

  useEffect(() => {
    if (session) {
      fetchUsers(session.token);
    }
  }, [session]);

  const fetchUsers = async (token) => {
    const users = await travelService.getUsers(token);
    console.log(users);
    setUsers(users);
  };

  const formik = useFormik({
    initialValues: {
      name: "",
      image: null,
      email: "",
      role: "",
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

        const user = users.find((user) => user.email === values.email);
        const token = session.token;

        await axios.post(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user/${user.id}`,
          {
            role: values.role,
          },
          {
            headers: {
              apiKey: import.meta.env.VITE_API_KEY,
              Authorization: `Bearer ${token}`,
            },
          }
        );

        onHide(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Promo</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label htmlFor="title">Title</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="title"
              onChange={formik.handleChange}
              value={formik.values.title}
            />
          </InputGroup>
          <Form.Label htmlFor="image">Image</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              id="image"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
          </InputGroup>

          <Form.Label htmlFor="description">Description</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              type="text"
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </InputGroup>

          <Form.Label htmlFor="terms_condition">Terms Condition</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              as="textarea"
              type="text"
              id="terms_condition"
              onChange={formik.handleChange}
              value={formik.values.terms_condition}
            />
          </InputGroup>
          <Form.Label htmlFor="promo_code">Promo Code</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type=""
              id="promo_code"
              onChange={formik.handleChange}
              value={formik.values.promo_code}
            />
          </InputGroup>

          <Form.Label htmlFor="promo_discount_price">Price Discount</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="promo_discount_price"
              onChange={formik.handleChange}
              value={formik.values.promo_discount_price}
            />
          </InputGroup>

          <Form.Label htmlFor="minimum_claim_price">
            Minimum Claim Price
          </Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="minimum_claim_price"
              onChange={formik.handleChange}
              value={formik.values.minimum_claim_price}
            />
          </InputGroup>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={() => onHide()}>
          Close
        </Button>
        <Button variant="primary" onClick={() => formik.submitForm()}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EdiUserModal;
