import React from "react";
import { Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import "./category.css";
import { travelService } from "../services/travelService";

function Categories() {
  const [categories, setCategories] = useState([]); // There is useState to store categories array

  useEffect(() => {
    // Use useEffect to get data from the API
    const fetchCategories = async () => {
      const categories = await travelService.getCategories();

      setCategories(categories); // set the data and store it in the state
    };

    fetchCategories(); // Execute or run the function
  }, []);

  return (
    <>
      <Container className="category-container">
        <h2>Travel Categories</h2>
        <div className="category-list">
          {categories.map((item) => (
            <Card key={item.id} className="category-card">
              <Card.Img variant="top" src={item.imageUrl} />
              <Card.Body className="category-body">
                <Card.Title>{item.name}</Card.Title>
              </Card.Body>
            </Card>
          ))}
        </div>
      </Container>
    </>
  );
}

export default Categories;
