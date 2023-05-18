import React from "react";
import { Card, Container, Button } from "react-bootstrap";
import { useEffect, useState } from "react";
import axios from "axios";
import AliceCarousel from "react-alice-carousel";
import "react-alice-carousel/lib/alice-carousel.css";
import "./promos.css";
import { useNavigate, useSearchParams } from "react-router-dom";

const responsive = {
  0: { items: 1 },
  568: { items: 2 },
  1024: { items: 4 },
};

function Promos() {
  const [promos, setPromos] = useState([]);
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
    const fetchPromos = async () => {
      const promoId = searchParams.get("promo");

      if (promoId !== null) {
        try {
          const response = await axios.get(
            `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${promoId}`,
            {
              headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              },
            }
          );

          setPromos([response.data.data]);
        } catch (error) {
          console.error("Error fetching promo:", error);
        }
      } else {
        try {
          const response = await axios.get(
            "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
            {
              headers: {
                apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
              },
            }
          );

          setPromos(response.data.data);
        } catch (error) {
          console.error("Error fetching promos:", error);
        }
      }
    };

    fetchPromos();
  }, [searchParams]);

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
