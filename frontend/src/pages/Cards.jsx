import { Container, Row } from "react-bootstrap";

import SingleCard from "./SingleCard";

const Cards = () => {
  return (
    <Container fluid className="mt-5">
      <h3 className="text-center mb-4">Memories Captured in camera</h3>

      <Row className="justify-content-center">
        <SingleCard />
      </Row>
    </Container>
  );
};

export default Cards;
