import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

const Header = () => {
  return (
    <>
      <Navbar variant="dark" bg="dark" expand="md">
        <Container fluid>
          <Navbar.Brand className="d-flex align-content-end gap-1">
            <img src="camera.png" alt="app-logo" width={32} height={32} />
            <h2 className="fs-3">Moments</h2>
          </Navbar.Brand>

          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="ms-auto">
              <Nav.Link>Home</Nav.Link>
              <Nav.Link>Login / Signup</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default Header;
