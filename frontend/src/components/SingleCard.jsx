import { Card, Col } from "react-bootstrap";
import { getTimeAgo } from "../utlis/helpers";

const SingleCard = ({ post }) => {
  const { user, title, description, tags, image, createdAt } = post;

  return (
    <>
      <Col sm={6} md={4} lg={3} className="mx-md-2 my-2 mb-lg-3">
        <Card>
          <div className="d-flex justify-content-between align-items-center m-2">
            <div>
              <img
                src="avatar.png"
                alt="User"
                width="30"
                height="30"
                className="rounded-circle me-2"
              />
              @{user?.firstname}
            </div>

            <span>{getTimeAgo(createdAt)}</span>
          </div>

          <Card.Img variant="top" src={image?.imageUrl} alt="moment-image" />

          <Card.Body>
            <div className="my-2">
              <span className="fst-italic fw-light">{tags}</span>
            </div>

            <Card.Title>
              <h4 className="color-text">{title}</h4>
            </Card.Title>
            <Card.Text>{description}</Card.Text>
          </Card.Body>
        </Card>
      </Col>
    </>
  );
};

export default SingleCard;
