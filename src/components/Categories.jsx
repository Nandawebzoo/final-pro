import React from "react";
import { Card, Container } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import "./category.css";

function Categories() {
  const [categories, setCategories] = useState([]); // There is useState to store categories array

  useEffect(() => {
    // Use useEffect to get data from the API
    const fetchCategories = async () => {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setCategories(response.data.data); // set the data and store it in the state
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
