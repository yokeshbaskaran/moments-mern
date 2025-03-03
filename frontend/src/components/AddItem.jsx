import InputGroup from "react-bootstrap/InputGroup";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Stack from "react-bootstrap/Stack";

const AddItem = () => {
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
            <Form.Control placeholder="enter title" aria-label="title" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Message</InputGroup.Text>
            <Form.Control placeholder="enter message" aria-label="message" />
          </InputGroup>

          <InputGroup className="mb-3">
            <InputGroup.Text id="basic-addon1">Tags</InputGroup.Text>
            <Form.Control placeholder="enter hash-tags" aria-label="tags" />
          </InputGroup>

          <input type="file" name="img-upload" id="" />

          <Stack direction="horizontal" gap={2} className="my-4">
            <Button variant="primary">Share</Button>
            <Button variant="secondary">Clear all</Button>
          </Stack>
        </form>
      </div>
    </>
  );
};

export default AddItem;
