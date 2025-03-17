import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";
import Image from "react-bootstrap/Image";
import { useState } from "react";
import axios from "axios";
import { API_URL, useAppContext } from "../context/AppContext";

const AddItem = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [image, setImage] = useState(null);

  const { dataChanged, setDataChanged } = useAppContext();
  // console.log("user-data", userData);

  const handleUpload = async (e) => {
    e.preventDefault();

    if (title === "" || description === "" || tags === "") {
      return null;
    }

    try {
      // const formData = new FormData();
      // formData.append("title", title);
      // formData.append("description", description);
      // formData.append("tags", tags);
      // formData.append("image", image);
      // formData.append("user", userData._id);
      // //console.log("id", userData._id);

      const formData = {
        title,
        description,
        tags,
        image,
      };

      const response = await axios.post(API_URL + "/posts", formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response) {
        console.log("formData", formData);

        setTitle("");
        setDescription("");
        setTags("");
        setImage(null);
        setDataChanged(!dataChanged);
      } else {
        console.log("failed");
      }
    } catch (error) {
      console.log("Errored! " + error.message);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleClear = () => {
    setTitle("");
    setDescription("");
    setTags("");
    setImage(null);
  };

  return (
    <>
      <div
        style={{
          background: "linear-gradient(to right, #4facfe, #b600fe)",
          padding: "2rem 1rem",
          textAlign: "left",
          color: "white",
        }}
      >
        <form className="mx-4 px-5 py-3 border rounded text-black bg-white">
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

          {image && (
            <Image
              fluid
              src={image}
              alt="preview"
              width={350}
              height={150}
              className="py-3"
            />
          )}

          <input
            type="file"
            name="img-upload"
            accept="image/*"
            onChange={handleFileChange}
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
