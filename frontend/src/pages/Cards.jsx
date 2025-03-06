import { Container, Row } from "react-bootstrap";
import SingleCard from "../components/SingleCard";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";

const Cards = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const response = await axios.get("http://localhost:3005/api/posts");

    if (response) {
      const { data } = response;
      // console.log(data);
      setPosts(data);
    } else {
      console.log("Cannot fetch posts");
    }
  };

  return (
    <Container fluid className="mt-5">
      <h3 className="text-center mb-4">Memories Captured in camera</h3>

      <Row className="justify-content-center">
        {posts.map((post) => (
          <SingleCard key={post._id} post={post} />
        ))}
      </Row>
    </Container>
  );
};

export default Cards;
