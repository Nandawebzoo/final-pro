import { useFormik } from "formik";
import { useContext, useEffect } from "react";
import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";

function EditPromoModal({ show, onHide, promo }) {
  const session = useContext(SessionContext);
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      description: "",
      promo_code: "",
      promo_discount_price: "",
      minimum_claim_price: "",
    },
    onSubmit: async (values) => {
      try {
        let imageUrl = promo.imageUrl;

        if (values.image) {
          imageUrl = await travelService.uploadImage(
            values.image,
            session.token
          );
        }

        const newPromo = {
          title: values.title,
          description: values.description,
          terms_condition: values.terms_condition,
          promo_code: values.promo_code,
          promo_discount_price: values.promo_discount_price,
          minimum_claim_price: values.minimum_claim_price,
        };

        if (imageUrl) {
          newPromo.imageUrl = imageUrl;
        }

        await travelService.updatePromo(newPromo, session.token);

        onHide(newPromo);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (promo) {
      formik.setValues({ title: promo.title, imageUrl: promo.imageUrl });
    }
  }, [promo]);

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
          <Form.Label htmlFor="promo">Promo Code</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type=""
              id="promo"
              onChange={formik.handleChange}
              value={formik.values.promo}
            />
          </InputGroup>

          <Form.Label htmlFor="price_discount">Price Discount</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="price_discount"
              onChange={formik.handleChange}
              value={formik.values.price_discount}
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

export default EditPromoModal;
