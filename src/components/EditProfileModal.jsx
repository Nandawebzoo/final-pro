import axios from "axios";
import React from "react";
import { Button, Container, Form, InputGroup, Modal } from "react-bootstrap";
import { useFormik } from "formik";
import { SessionContext } from "../App";
import { useContext } from "react";
import { travelService } from "../services/travelService";

function EditProfileModal({ show, onHide }) {
  const session = useContext(SessionContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    onSubmit: async (values) => {
      try {
        // original imageUrl
        let imageUrl = session.userDetails.profilePictureUrl;

        if (values.image) {
          // There is a new image, need to upload it to get the new url
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
          <Form.Label htmlFor="editName">Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </InputGroup>
          <Form.Label htmlFor="editPicture">Picture</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              id="image"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
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
