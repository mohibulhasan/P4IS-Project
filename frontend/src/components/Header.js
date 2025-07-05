import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
//import { LinkContainer } from "react-router-bootstrap";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <Nav.Link as={Link} to="/">
            <Navbar.Brand>BSCPLC</Navbar.Brand>
          </Nav.Link>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link as={Link} to="/employees">
                Employees
              </Nav.Link>
              <Nav.Link as={Link} to="/customers">
                Customers
              </Nav.Link>
              <NavDropdown title="Services" id="collapsible-nav-dropdown">
                <NavDropdown.Item as={Link} to="/services/ip-transit">
                  IP Transit
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} to="/services/iplc">
                  IP Bandwidth
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Colocation Service
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link href="#contactus">Contact Support</Nav.Link>
              <Nav.Link eventKey={2} href="#login">
                User Login
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
}

export default Header;
