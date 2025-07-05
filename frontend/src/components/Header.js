import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { LinkContainer } from "react-router-bootstrap";

function Header() {
  return (
    <header>
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>BSCPLC</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <LinkContainer to="/employees">
                <Nav.Link>Employees</Nav.Link>
              </LinkContainer>
              <LinkContainer to="/customers">
                <Nav.Link>Customers</Nav.Link>
              </LinkContainer>
              <NavDropdown title="Services" id="collapsible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">
                  IP Transit
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
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
