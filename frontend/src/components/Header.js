import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Header() {
  return (
    <header>
      <Navbar
        collapseOnSelect
        expand="lg"
        //className="bg-body-tertiary"
        bg="dark"
        variant="dark"
      >
        <Container>
          <Navbar.Brand href="">BSCPLC</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#aboutus">About Us</Nav.Link>
              <Nav.Link href="#features">Features</Nav.Link>
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
                <NavDropdown.Divider />
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
