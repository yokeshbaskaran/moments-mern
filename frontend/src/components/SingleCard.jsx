import { Container, Card, Row, Col } from "react-bootstrap";

const SingleCard = () => {
  return (
    <div>
      {/* Memories Section */}
      <Container fluid className="mt-5">
        <h3 className="text-center mb-4">Memories floating the Internet</h3>
        <Row className="justify-content-center">
          {/* Memory Card 1 */}
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
                  <span>2 years ago</span>
                </div>
                <Card.Img src="/images/leaves.jpg" alt="Leaves" />
                <Card.Text>#leaves #nature #amazing</Card.Text>
                <Card.Title>Leaves</Card.Title>
              </Card.Body>
            </Card>
          </Col>

          {/* Memory Card 2 */}
          <Col md={4} className="mb-4">
            <Card>
              <Card.Body>
                <div className="d-flex justify-content-between align-items-center mb-2">
                  <div>
                    <img
                      src="/user-avatar.png"
                      alt="User"
                      width="30"
                      height="30"
                      className="rounded-circle me-2"
                    />
                    @shubham_jangle
                  </div>
                  <span>2 years ago</span>
                </div>
                <Card.Img src="/images/sheep.jpg" alt="Sheep" />
                <Card.Text>#sheep #nature #farm</Card.Text>
                <Card.Title>Sheep</Card.Title>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default SingleCard;
