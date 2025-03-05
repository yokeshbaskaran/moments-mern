import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { InputGroup, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";

const AuthPage = () => {
  const [auth, setAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const API_URL = import.meta.env.VITE_SERVER_URL;
  // console.log(API_URL);

  const handleLogin = async () => {
    const data = {
      email,
      password,
    };
    // console.log("data", data);

    const response = await axios.post(API_URL + "/login", data);

    if (response) {
      setEmail("");
      setPassword("");

      console.log("User is logined");
    } else {
      console.log("User not logined");
    }
  };

  const handleRegister = async () => {
    if (password == confirmPassword) {
      const data = {
        firstname,
        lastname,
        email,
        password,
      };

      const response = await axios.post(API_URL + "/register", data);

      if (response) {
        setFirstname("");
        setLastname("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        console.log("User is registered");
      } else {
        console.log("User not registered");
      }
    } else {
      alert("Password does not match!");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (auth) {
      handleLogin();
    } else {
      handleRegister();
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
            {/* LOGIN */}

            <Card.Header>
              <h2>Login here</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputGroup.Text>
                      <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "hide" : "show"}
                      </span>
                    </InputGroup.Text>
                  </InputGroup>
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
            {/* Register */}

            <Card.Header>
              <h2>Register here</h2>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>First Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={firstname}
                      onChange={(e) => setFirstname(e.target.value)}
                    />
                  </Form.Group>

                  <Form.Group className="mb-3 col-md-6">
                    <Form.Label>Last Name</Form.Label>
                    <Form.Control
                      type="text"
                      value={lastname}
                      onChange={(e) => setLastname(e.target.value)}
                    />
                  </Form.Group>
                </Row>

                <Form.Group className="mb-3">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Form.Group>

                <Form.Group>
                  <Form.Label>Password</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control
                      type={showPassword ? "text" : "password"}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />

                    <InputGroup.Text>
                      <span onClick={() => setShowPassword(!showPassword)}>
                        {showPassword ? "hide" : "show"}
                      </span>
                    </InputGroup.Text>
                  </InputGroup>
                </Form.Group>

                <Form.Group className="mb-3">
                  <Form.Label>Confirm Password</Form.Label>

                  <InputGroup className="mb-3">
                    <Form.Control
                      type={showConfirmPassword ? "text" : "password"}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />

                    <InputGroup.Text>
                      <span
                        onClick={() =>
                          setShowConfirmPassword(!showConfirmPassword)
                        }
                      >
                        {showConfirmPassword ? "hide" : "show"}
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
