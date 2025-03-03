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
      <section className="my-5 p-5">
        <AddImage />
      </section>
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

import axios from "axios";

export const AddImage = () => {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState("");
  const [images, setImages] = useState([]);

  // Handle image selection
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // Preview selected image
      console.log("file", file);
    }
  };

  // Upload image to the server
  const handleUpload = async () => {
    if (!image) return alert("Please select an image!");

    const formData = new FormData();
    formData.append("image", image);

    try {
      await axios.post("http://localhost:3005/upload", formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Image uploaded successfully!");
      fetchImages(); // Refresh images
      setImage(null);
      setPreview("");
    } catch (error) {
      console.error("Upload failed:", error);
      alert("Image upload failed!");
    }
  };

  // Fetch images from backend
  const fetchImages = async () => {
    try {
      const { data } = await axios.get("http://localhost:3005/images");
      console.log("images collects", data);

      setImages(data);
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  // Fetch images on component mount
  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <div>
      <h2>Image Upload</h2>

      {/* Upload Section */}
      <input type="file" accept="image/*" onChange={handleFileChange} />

      {preview && (
        <div>
          <img src={preview} alt="Preview" width={200} />
          <button onClick={handleUpload}>Upload</button>
        </div>
      )}

      <hr />

      {/* Display Uploaded Images */}
      <h3>Uploaded Images:</h3>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "10px" }}>
        {images.map((img) => (
          <img key={img._id} src={img.imageUrl} alt="Uploaded" width={150} />
        ))}
      </div>
    </div>
  );
};
