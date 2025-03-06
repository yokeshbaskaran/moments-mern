import { useState } from "react";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { InputGroup, Row, Stack } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import axios from "axios";
import AlertBox from "../utlis/AlertBox";
import { API_URL, useAppContext } from "../context/AppContext";
import { useNavigate } from "react-router-dom";

const AuthPage = () => {
  const [auth, setAuth] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [popup, setPopup] = useState({ show: false, message: "" });
  // const [errorPopup, setErrorPopup] = useState({ show: false, message: "" });
  const navigate = useNavigate();

  const { setUserData, getUserDetails } = useAppContext();

  const handleLogin = async () => {
    try {
      const data = {
        email,
        password,
      };

      const response = await axios.post(API_URL + "/login", data, {
        withCredentials: true,
      });

      if (response.status === 200) {
        setPopup({ show: true, message: "User logined" });

        const data = response.data.user;
        // console.log("res data:", data);
        setUserData(data);

        getUserDetails(); //user-data
        setTimeout(() => {
          setEmail("");
          setPassword("");

          navigate("/");
        }, 1000);
      }
    } catch (error) {
      // setErrorPopup({ show: true, message: error.message });
      // console.log(error.message);
      console.log("Login error:" + error);
    }
  };

  const handleRegister = async () => {
    try {
      if (
        firstname === "" ||
        lastname === "" ||
        email === "" ||
        password === ""
      ) {
        return null;
      }

      if (password == confirmPassword) {
        const data = {
          firstname,
          lastname,
          email,
          password,
        };

        const response = await axios.post(API_URL + "/register", data);

        if (response.status === 201) {
          setPopup({ show: true, message: "User register success" });

          setTimeout(() => {
            setFirstname("");
            setLastname("");
            setEmail("");
            setPassword("");
            setConfirmPassword("");

            setAuth(!auth);
            setPopup({ show: false });
            navigate("/auth");
          }, 1500);
        }
      } else {
        alert("Password does not match!");
      }
    } catch (error) {
      // setErrorPopup({ show: true, message: "User not registered" });
      // console.log(error.message);
      console.log("Login error:" + error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    auth ? handleLogin() : handleRegister();
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
      {popup.show && <AlertBox color="green" text={popup.message} />}

      <div className="p-5">
        <Card>
          <Card.Header>
            <h2>{auth ? "Login here" : "Register here "}</h2>
          </Card.Header>

          <Card.Body>
            <Form onSubmit={handleSubmit}>
              {!auth && (
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
              )}

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

              {!auth && (
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
              )}

              <Stack direction="horizontal" gap={3}>
                <Button variant="primary" type="submit">
                  {auth ? "Login" : "Register"}
                </Button>

                <Button variant="secondary" onClick={() => setAuth(!auth)}>
                  {auth ? "Create Account?" : "Login here?"}
                </Button>
              </Stack>
            </Form>
          </Card.Body>
        </Card>
      </div>
    </div>
  );
};

export default AuthPage;
