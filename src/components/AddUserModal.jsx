import React, { useContext, useEffect, useState } from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";
import axios from "axios";

function AddUserModal({ show, onHide }) {
  const [users, setUsers] = useState([]);
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
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Add User</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form onSubmit={formik.handleSubmit}>
          <Form.Label htmlFor="name">Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="name"
              name="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </InputGroup>

          <Form.Label htmlFor="image">Image</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              id="image"
              name="image"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
          </InputGroup>

          <Form.Label htmlFor="email">Email</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="email"
              name="email"
              onChange={formik.handleChange}
              value={formik.values.email}
            />
          </InputGroup>

          <Form.Label htmlFor="role">Role</Form.Label>
          <InputGroup className="mb-3">
            <Form.Select
              id="role"
              name="role"
              onChange={formik.handleChange}
              value={formik.values.role}
            >
              <option value="">Choose a role</option>
              <option value="admin">Admin</option>
              <option value="user">User</option>
            </Form.Select>
          </InputGroup>

          <Form.Label htmlFor="phoneNumber">Phone Number</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              onChange={formik.handleChange}
              value={formik.values.phoneNumber}
            />
          </InputGroup>

          <Form.Label htmlFor="password">Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              id="password"
              name="password"
              onChange={formik.handleChange}
              value={formik.values.password}
            />
          </InputGroup>

          <Form.Label htmlFor="passwordRepeat">Confirm Password</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="password"
              id="passwordRepeat"
              name="passwordRepeat"
              onChange={formik.handleChange}
              value={formik.values.passwordRepeat}
            />
          </InputGroup>

          <Modal.Footer>
            <Button variant="secondary" onClick={onHide}>
              Close
            </Button>
            <Button variant="primary" type="submit">
              Save
            </Button>
          </Modal.Footer>
        </Form>
      </Modal.Body>
    </Modal>
  );
}

export default AddUserModal;
