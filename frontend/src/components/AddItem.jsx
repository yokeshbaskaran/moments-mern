import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useState } from "react";
import axios from "axios";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [fileImg, setFileImg] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("description", description);
      formData.append("tags", tags);
      formData.append("image", fileImg);

      const response = await axios.post(
        "http://localhost:3005/api/posts",
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response) {
        console.log("response", response);

        setTitle("");
        setDescription("");
        setTags("");
        setFileImg(null);
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("Errored" + error.message);
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setFileImg(null);
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right,#4facfe,#b600fe)",
          padding: "3rem 1rem",
          textAlign: "left",
          color: "white",
        }}
      >
        <form className="mx-4 px-5 py-4 border rounded text-black bg-white">
          <h2>Share the Moments</h2>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Title</InputGroup.Text>
            <Form.Control
              placeholder="enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">description</InputGroup.Text>
            <Form.Control
              placeholder="enter description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Tags</InputGroup.Text>
            <Form.Control
              placeholder="enter hash-tags"
              value={tags}
              onChange={(e) => setTags(e.target.value)}
            />
          </InputGroup>

          <input
            type="file"
            name="img-upload"
            accept="image/*"
            onChange={(e) => setFileImg(e.target.files[0])}
            required
          />

          <Stack direction="horizontal" gap={2} className="my-4">
            <Button onClick={handleUpload} variant="primary">
              Upload
            </Button>

            <Button variant="secondary" onClick={handleClear}>
              Clear all
            </Button>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default AddItem;
