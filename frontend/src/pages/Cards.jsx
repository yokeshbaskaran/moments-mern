import { Container, Row } from "react-bootstrap";
import SingleCard from "../components/SingleCard";
import { useEffect } from "react";
import { useAppContext } from "../context/AppContext";

const Cards = () => {
  const { posts, fetchPosts } = useAppContext();

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <Container fluid className="mt-4">
      <h2 className="text-center mb-4">Moments Captured in camera</h2>

      <Row className="justify-content-center">
        {posts?.length > 0 ? (
          posts?.map((post) => <SingleCard key={post._id} post={post} />)
        ) : (
          <div className="w-100 my-2 d-flex flex-column justify-content-center align-items-center gap-2">
            <img src="photos.png" alt="home-logo" width={350} height={350} />
            <h3 className="text-center fst-italic fw-normal">
              Add Some moments of your life here
            </h3>
          </div>
        )}
      </Row>
    </Container>
  );
};

export default Cards;
