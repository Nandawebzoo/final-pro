import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";

function AddActivityModal({ show, onHide }) {
  const [categories, setCategories] = useState([]); // There is useState to store categories array

  useEffect(() => {
    // Use useEffect to get data from the API
    const fetchCategories = async () => {
      const categories = await travelService.getCategories();

      setCategories(categories); // set the data and store it in the state
    };

    fetchCategories(); // Execute or run the function
  }, []);

  const session = useContext(SessionContext);
  const formik = useFormik({
    initialValues: {
      title: "",
      image: "",
      categoryId: "",
      description: "",
      price: "",
      discount: "",
      rating: "",
      review: "",
      facilities: "",
      address: "",
      province: "",
      city: "",
    },
    onSubmit: async (values) => {
      try {
        // original imageUrl
        let imageUrl = undefined;

        if (values.image) {
          // There is a new image, need to upload it to get the new url
          imageUrl = await travelService.uploadImage(
            values.image,
            session.token
          );
        }

        const newActivity = {
          title: values.title,
          categoryId: values.categoryId,
          description: values.description,
          price: values.price,
          price_discount: values.price_discount,
          rating: values.rating,
          total_reviews: values.total_reviews,
          facilities: values.facilities,
          address: values.address,
          province: values.province,
          city: values.city,
        };

        if (imageUrl) {
          newActivity.imageUrls = [imageUrl];
        }

        await travelService.createActivity(newActivity, session.token);

        onHide(true);
      } catch (error) {
        console.error(error);
      }
    },
  });

  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Activity</Modal.Title>
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
          <Form.Label htmlFor="imageUrls">Image</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              id="imageUrls"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
          </InputGroup>
          <Form.Label htmlFor="categoryId">Category</Form.Label>

          <InputGroup>
            <Form.Select
              onChange={formik.handleChange}
              value={formik.values.categoryId}
              name="categoryId"
            >
              <option value="">Choose a category</option>

              {categories.map((category) => (
                <option value={category.id} key={category.id}>
                  {category.name}
                </option>
              ))}
            </Form.Select>
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
          <Form.Label htmlFor="price">Price</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </InputGroup>

          <Form.Label htmlFor="price_discount">Discount</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="price_discount"
              onChange={formik.handleChange}
              value={formik.values.price_discount}
            />
          </InputGroup>

          <Form.Label htmlFor="rating">Rating</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="rating"
              onChange={formik.handleChange}
              value={formik.values.rating}
            />
          </InputGroup>
          <Form.Label htmlFor="total_reviews">Total Reviews</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="number"
              id="total_reviews"
              onChange={formik.handleChange}
              value={formik.values.total_reviews}
            />
          </InputGroup>
          <Form.Label htmlFor="facilities">Facilities</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="facilities"
              onChange={formik.handleChange}
              value={formik.values.facilities}
            />
          </InputGroup>

          <Form.Label htmlFor="address">Address</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="address"
              onChange={formik.handleChange}
              value={formik.values.address}
            />
          </InputGroup>
          <Form.Label htmlFor="province">Province</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="province"
              onChange={formik.handleChange}
              value={formik.values.province}
            />
          </InputGroup>
          <Form.Label htmlFor="city">City</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="city"
              onChange={formik.handleChange}
              value={formik.values.city}
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

export default AddActivityModal;
