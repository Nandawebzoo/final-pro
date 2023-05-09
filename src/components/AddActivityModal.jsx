import React from "react";
import { Modal, Form, InputGroup, Button } from "react-bootstrap";
import { useFormik } from "formik";
import { useContext, useEffect, useState } from "react";
import { SessionContext } from "../App";
import { travelService } from "../services/travelService";

function AddActivityModal({ show, onHide, activity }) {
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
      name: "",
      image: "",
      category: "",
    },
    onSubmit: async (values) => {
      try {
        // original imageUrl
        let imageUrls = activity.imageUrls;

        if (values.image) {
          // There is a new image, need to upload it to get the new url
          imageUrls = await travelService.uploadImage(
            values.image,
            session.token
          );
        }

        const newActivity = {
          id: activity.id,
          name: values.name,
          imageUrls: imageUrls,
        };

        await travelService.updateActivity(newActivity, session.token);

        onHide(newActivity);
      } catch (error) {
        console.error(error);
      }
    },
  });

  useEffect(() => {
    if (activity) {
      formik.setValues({
        name: activity.title,
        imageUrls: activity.imageUrls,
        description: activity.description,
        price: activity.price,
        discount: activity.price_discount,
        rating: activity.rating,
        review: activity.total_reviews,
        facilities: activity.facilities,
        address: activity.address,
        province: activity.province,
        city: activity.city,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activity]);

  return (
    <Modal show={show} onHide={() => onHide()}>
      <Modal.Header closeButton>
        <Modal.Title>Add Activity</Modal.Title>
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
          <Form.Label htmlFor="imageUrls">Image</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="file"
              id="image"
              onChange={(event) => {
                formik.setFieldValue("image", event.currentTarget.files[0]);
              }}
            />
          </InputGroup>
          <Form.Label htmlFor="category">Category</Form.Label>

          <InputGroup>
            <Form.Select
              onChange={formik.handleChange}
              value={formik.values.category}
            >
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
              type="text"
              id="description"
              onChange={formik.handleChange}
              value={formik.values.description}
            />
          </InputGroup>
          <Form.Label htmlFor="price">Price</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="price"
              onChange={formik.handleChange}
              value={formik.values.price}
            />
          </InputGroup>

          <Form.Label htmlFor="discount">Discount</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="discount"
              onChange={formik.handleChange}
              value={formik.values.price_discount}
            />
          </InputGroup>

          <Form.Label htmlFor="rating">Rating</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="rating"
              onChange={formik.handleChange}
              value={formik.values.rating}
            />
          </InputGroup>
          <Form.Label htmlFor="reviews">Total Reviews</Form.Label>
          <InputGroup className="mb-3">
            <Form.Control
              type="text"
              id="reviews"
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
