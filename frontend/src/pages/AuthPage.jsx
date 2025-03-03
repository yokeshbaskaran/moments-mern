import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { InputGroup, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";

const AuthPage = () => {
  const [auth, setAuth] = useState(false);
  const [password, setPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState(false);

  const [formData, setFormData] = useState([
    {
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      confirmpassword: "",
    },
  ]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (auth) {
      console.log("registered", formData);
    } else {
      console.log("logined", formData);
    }
  };

  return (
    <div
      style={{
        background: "linear-gradient(to right,#4facfe,#b600fe)",
        marginTop: "60px",
        padding: "3rem 1rem",
        minHeight: "79vh",
      }}
    >
      <div className="p-5">
        {auth ? (
          <Card>
            <Card.Header>
              <h2 className="foot-text">Login here</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="firstname"
                    value={formData.firstname}
                    onChange={handleChange}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control type="password" />
                </Form.Group>

                <Stack direction="horizontal" gap={3}>
                  <Button variant="primary" type="submit">
                    Login
                  </Button>

                  <Button variant="secondary" onClick={() => setAuth(false)}>
                    Create Account?
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        ) : (
          <Card>
            <Card.Header>
              <h2 className="foot-text">Register here</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>

                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control type="email" />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control type="email" />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control type={password ? "text" : "password"} />

                    <InputGroup.Text>
                      <span onClick={() => setPassword(!password)}>
                        {password ? "hide" : "show"}
                      </span>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control
                      type={confirmPassword ? "text" : "password"}
                    />

                    <InputGroup.Text>
                      <span onClick={() => setConfirmPassword(!password)}>
                        {confirmPassword ? "hide" : "show"}
                      </span>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Stack direction="horizontal" gap={3}>
                  <Button variant="primary" type="submit">
                    Register
                  </Button>

                  <Button variant="secondary" onClick={() => setAuth(true)}>
                    Login here?
                  </Button>
                </Stack>
              </Form>
            </Card.Body>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthPage;
