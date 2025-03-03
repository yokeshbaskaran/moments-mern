import { Card, Col } from "react-bootstrap";

const SingleCard = () => {
  return (
    <>
      <Col md={4} className="mb-4">
        <Card>
          <Card.Body>
            <div className="d-flex justify-content-between align-items-center mb-2">
              <div>
                <img
                  src="avatar.png"
                  alt="User"
                  width="30"
                  height="30"
                  className="rounded-circle me-2"
                />
                @shubham_jangle
              </div>

              <span>2 yr ago</span>
            </div>

            <Card.Img src="dhoni.jpg" alt="Leaves" />

            <Card.Text>#leaves #nature #amazing</Card.Text>
            <Card.Title>Leaves</Card.Title>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default SingleCard;
