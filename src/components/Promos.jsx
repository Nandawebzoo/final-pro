import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./promos.css";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

function Promos() {
  const [promos, setPromos] = useState([]); // There is useState to store promos array

  useEffect(() => {
    // Use useEffect to get data from the API
    const fetchPromos = async () => {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );

      setPromos(response.data.data); // set the data and store it in the state
    };

    fetchPromos(); // Execute or run the function
  }, []); // Empty array of dependencies means the function will run on the initial render / on component load

  const items = promos.map((item) => (
    <Card key={item.id} className="item-promo">
      <Card.Img variant="top" src={item.imageUrl} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  ));

  return (
    <Container>
      <h2>Travel Promo</h2>
      <AliceCarousel
        mouseTracking
        items={items}
        responsive={responsive}
        controlsStrategy="responsive"
        autoPlayInterval="2000"
        autoPlay
        disableButtonsControls
        infinite
      />
    </Container>
  );
}

export default Promos;
