import { Card, Col, ListGroup } from "react-bootstrap";

const SingleCard = ({ post }) => {
  // console.log("Post", post);

  const { _id, title, description, tags, image, createdAt, updatedAt } = post;
  console.log("tags", createdAt, updatedAt);

  return (
    <>
      <Col md={4} className="mb-4">
        <Card>
          <div className="d-flex justify-content-between align-items-center m-2 ">
            <div>
              <img
                src="avatar.png"
                alt="User"
                width="30"
                height="30"
                className="rounded-circle me-2"
              />
              @user_name
            </div>

            <span>2 yr ago</span>
          </div>

          <Card.Img variant="top" src={image.imageUrl} alt="moment-image" />

          <Card.Body>
            <div className="my-2">
              <span className="fst-italic fw-light">{tags}</span>
            </div>

            <Card.Title>
              <h4>{title}</h4>
            </Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default SingleCard;
