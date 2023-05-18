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
  const [promos, setPromos] = useState([]);

  useEffect(() => {
    const fetchPromos = async () => {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos`,
        {
          headers: {
            apiKey: import.meta.env.VITE_API_KEY,
          },
        }
      );

      setPromos(response.data.data);
    };

    fetchPromos();
  }, []);

  const items = promos.map((item) => (
    <Card key={item.id} className="item-promo">
      <Card.Img className="promo-poster" variant="top" src={item.imageUrl} />
      <Card.Body>
        <Card.Title>{item.title}</Card.Title>
        <Card.Text className="promo-description">{item.description}</Card.Text>
        <h5 className="code-promo">Code: {item.promo_code}</h5>
        <Button
          variant="primary"
          onClick={() => navigate("/promos/" + promos.id)}
        >
          Get Promo
        </Button>
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
        autoPlay
        autoPlayInterval="2000"
        disableButtonsControls
        infinite
      />
    </Container>
  );
}

export default Promos;
