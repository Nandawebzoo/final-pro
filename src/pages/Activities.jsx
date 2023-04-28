import React from "react";
import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";
import { Card, Button, Container } from "react-bootstrap";
import "./activities.css";

function Activities() {
  const [activities, setActivities] = useState([]); // There is useState to store categories array
  const [searchParams, setSearchParams] = useSearchParams();

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
    };

    fetchActivities(); // Execute or run the function
  }, [searchParams]);

  return (
    <>
      <div className="activity">
        <Container>
          <div className="activity-text">
            <h1>Activities</h1>
          </div>
          {activities?.map((activity) => (
            <Card key={activity.id} className="item-activity">
              <Card.Img variant="top" src={activity.imageUrls[0]} />
              <Card.Body>
                <Card.Title>{activity.title}</Card.Title>
                <Card.Text>{activity.description}</Card.Text>
                <Button variant="primary">Go somewhere</Button>
              </Card.Body>
            </Card>
          ))}
        </Container>
      </div>
    </>
  );
}

export default Activities;
