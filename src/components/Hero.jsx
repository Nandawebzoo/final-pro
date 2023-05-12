import React from "react";
import { useState, useEffect } from "react";
import { Button, Container, Form, InputGroup } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Hero() {
  const [categories, setCategories] = useState([]); // There is useState to store categories array
  const [category, setCategory] = useState(""); // There is useState to store categories array
  const navigate = useNavigate();

  useEffect(() => {
    // Use useEffect to get data from the API
    const fetchCategories = async () => {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories`,
        {
          headers: {
            apiKey: import.meta.env.VITE_API_KEY,
          },
        }
      );

      setCategories(response.data.data); // set the data and store it in the state
    };

    fetchCategories(); // Execute or run the function
  }, []);

  function redirect() {
    navigate("/activities?category=" + category);
  }

  return (
    <div className="hero">
      <Container>
        <div className="hero-text">
          <h1>Explore</h1>
          <h3>Your favorite destination</h3>
          <h5>
            Find great places to stay, eat, shop, or visit from local experts
          </h5>
        </div>
        <InputGroup>
          <Form.Select onChange={(e) => setCategory(e.target.value)}>
            <option>Select Category</option>
            {categories.map((category) => (
              <option value={category.id} key={category.id}>
                {category.name}
              </option>
            ))}
          </Form.Select>
          <Button variant="danger" onClick={redirect}>
            Search
          </Button>
        </InputGroup>
      </Container>
    </div>
  );
}

export default Hero;
