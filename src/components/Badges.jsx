import { Container } from "react-bootstrap";
import Card from "react-bootstrap/Card";
import "./badges.css";

function Badges() {
  const items = [
    {
      id: 1,
      title: "Best Price Guarantee",
      text: "Some quick example text to build on the card title and make up the bulk of the cards content.",
      icon: "bi-currency-dollar",
    },
    {
      id: 2,
      title: "Travellers Love Us",
      text: "Some quick example text to build on the card title and make up the bulk of the cards content.",
      icon: "bi-suit-heart",
    },
    {
      id: 3,
      title: "Best Travel Agent",
      text: "Some quick example text to build on the card title and make up the bulk of the cards content.",
      icon: "bi-hand-thumbs-up",
    },
    {
      id: 4,
      title: "Our Dedicated Support",
      text: "Some quick example text to build on the card title and make up the bulk of the cards content.",
      icon: "bi-telephone-forward",
    },
  ];

  return (
    <Container className="container-badge">
      {items?.map((item) => (
        <Card key={item.id} className="card-badge">
          <Card.Body className="badge-body">
            <i className={`bi ${item.icon} badge-icon`}></i>
            <Card.Title>{item.title}</Card.Title>
            <Card.Text>{item.text}</Card.Text>
          </Card.Body>
        </Card>
      ))}
    </Container>
  );
}

export default Badges;
