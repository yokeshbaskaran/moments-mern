import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import { useEffect, useState } from "react";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [tags, setTags] = useState("");
  const [fileImg, setFileImg] = useState("");

  const handleUpload = (e) => {
    e.preventDefault();

    const data = {
      title,
      message,
      tags,
      fileImg,
    };
    console.log(data);
    setTitle("");
    setMessage("");
    setTags("");
    setFileImg("");
  };

  const handleClear = () => {
    setTitle("");
    setMessage("");
    setTags("");
    setFileImg("");
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
            <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
            <Form.Control
              placeholder="enter message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
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
            value={fileImg}
            onChange={(e) => setFileImg(e.target.value)}
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
