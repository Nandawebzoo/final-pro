import React from "react";
import { useState, useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Container, Form } from "react-bootstrap";
import "./activities.css";

function Activities() {
  const [activities, setActivities] = useState([]); // There is useState to store categories array
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategory, setSelectedCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // Use useEffect to get data from the API
    const fetchActivities = async () => {
      const category = searchParams.get("category");

      if (category !== null) {
        // if category is not null
        const response = await axios.get(
          `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${category}`,
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        setActivities(response.data.data); // set the data and store it in the state
      }

      setSelectedCategory(category || "");
    };

    fetchActivities(); // Execute or run the function
  }, [searchParams]);

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

      setCategories(response.data.data);
    };

    fetchCategories();
  }, []);

  function redirect() {
    navigate("/activities?category=" + selectedCategory);
  }

  return (
    <>
      <div className="activity">
        <Container>
          <div className="activity-text">
            <h1>Activities</h1>
          </div>
          <div className="activity-content">
            <div className="activity-find">
              <Card.Title>Find Activity</Card.Title>
              <Form.Select
                onChange={(e) => setSelectedCategory(e.target.value)}
                value={selectedCategory}
              >
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
            </div>
            <div className="activity-items">
              {activities?.map((activity) => (
                <Card key={activity.id} style={{ width: "18rem" }}>
                  <Card.Img
                    className="activity-img"
                    variant="top"
                    src={activity.imageUrls[0]}
                  />
                  <Card.Body>
                    <Card.Title>{activity.title}</Card.Title>
                    <Card.Text className="activity-description">
                      {activity.description}
                    </Card.Text>

                    <Button
                      variant="primary"
                      onClick={() => navigate("/activities/" + activity.id)}
                    >
                      Show Details
                    </Button>
                  </Card.Body>
                </Card>
              ))}
            </div>
          </div>
        </Container>
      </div>
    </>
  );
}

export default Activities;
