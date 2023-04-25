import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";

function Badges() {
  return (
    <Card style={{ width: "18rem" }}>
      <Card.Img variant="top" src="/public/img/paris.jfif" />
      <Card.Body>
        <Card.Title>Card Title</Card.Title>
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the cards content.
        </Card.Text>
        <Button variant="primary">Go somewhere</Button>
      </Card.Body>
    </Card>
  );
}

export default Badges;
