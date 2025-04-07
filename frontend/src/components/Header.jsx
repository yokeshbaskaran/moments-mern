import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const Header = () => {
  const { userData, handleLogout } = useAppContext();
  // console.log("userdata", userData);

  return (
    <>
      <Navbar fixed="top" variant="dark" bg="dark" expand="md">
        <Container fluid>
          <Navbar.Brand className="d-flex gap-1">
            <img src="camera.png" alt="app-logo" width={32} height={32} />

            <Link to="/" style={{ textDecoration: "none", color: "white" }}>
              <h2 className="fs-3 ">Moments</h2>
            </Link>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/">
                Home
              </Nav.Link>
              {userData?.username ? (
                <>
                  <Nav.Link>
                    <div className="text-capitalize">
                      Hi,
                      <span className="pe-1">{userData.username}</span>
                      {userData.lastname}
                    </div>
                  </Nav.Link>
                </>
              ) : (
                <Nav.Link as={Link} to="/auth">
                  <span>Login / Signup</span>
                </Nav.Link>
              )}

              {userData?.username && (
                <Nav.Link onClick={handleLogout}>Logout</Nav.Link>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
