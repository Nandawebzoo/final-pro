import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";

function EditModal({ show, onHide, category }) {
  const session = useContext(SessionContext);
  const formik = useFormik({
    initialValues: {
      name: "",
      image: "",
    },
    onSubmit: async (values) => {
      try {
        // original imageUrl
        let imageUrl = category.imageUrl;

        if (values.image) {
          // There is a new image, need to upload it to get the new url
          imageUrl = await travelService.uploadImage(
            values.image,
            session.token
          );
        }

        const newCategory = {
          id: category.id,
          name: values.name,
          imageUrl: imageUrl,
        };

        await travelService.updateCategory(newCategory, session.token);

        onHide(newCategory);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (category) {
      formik.setValues({ name: category.name, imageUrl: category.imageUrl });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [category]);

  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Category</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Label htmlFor="name">Name</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="name"
              onChange={formik.handleChange}
              value={formik.values.name}
            />
          </InputGroup>
          <Form.Label htmlFor="imageUrl">Image</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              id="image"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
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

export default EditModal;
