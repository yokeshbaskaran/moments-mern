import { Card, Col } from "react-bootstrap";
import { getTimeAgo } from "../utlis/helpers";
import { API_URL, useAppContext } from "../context/AppContext";
import { GoTrash } from "react-icons/go";
import { LuDot } from "react-icons/lu";
import axios from "axios";

const SingleCard = ({ post }) => {
  const { _id, user, title, description, tags, image, createdAt } = post;

  const { userData, dataChanged, setDataChanged } = useAppContext();
  // console.log("user", user);
  // console.log("userData", userData);

  const isMyProfile = userData?._id === user?.userid;
  // console.log("isMyProfile", isMyProfile);

  const handleDelete = async (id) => {
    const postId = id;
    try {
      if (confirm("Are you want to delete post")) {
        const res = await axios.delete(API_URL + `/posts/${postId}`);

        const data = await res.data;
        setDataChanged(!dataChanged);
        return data;
      }
    } catch (error) {
      console.log("Error in delete:", error.message);
    }
  };

  return (
    <>
      <Col sm={6} md={4} lg={3} className="mx-md-2 my-2 mb-lg-3">
        <Card>
          <div className="d-flex justify-content-between align-items-center mx-2 my-2">
            <div className="d-flex align-items-center">
              <img
                src="avatar.png"
                alt="User"
                width="30"
                height="30"
                className="rounded-circle me-2"
              />
              @{user?.username}
              <LuDot />
              <span>{getTimeAgo(createdAt)}</span>
            </div>

            {userData?.email && (
              <button
                onClick={() => handleDelete(_id)}
                className={`bg-light border-0 rounded-5 ${
                  isMyProfile ? `d-inline` : `d-none`
                }`}
              >
                <GoTrash size={20} color="red" />
              </button>
            )}
          </div>

          {image && (
            <Card.Img
              variant="top"
              src={image}
              alt="moment-image"
              width={250}
              height={250}
              style={{ objectFit: "contain" }}
            />
          )}

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
