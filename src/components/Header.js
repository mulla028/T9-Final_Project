<<<<<<< Updated upstream
// src/component/Header.js
import { Navbar, Nav, Button, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar bg="light" expand="lg" fixed="top">
      {" "}
      {/* Keeps the header fixed */}
      <Container fluid="md">
        <Navbar.Brand href="/">Driftway</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto flex">
            <Nav.Link href="#why-slow-travel" className="no-bold-link">
              How It Works
            </Nav.Link>
            <Nav.Link href="#hero" className="no-bold-link">
              Discover
            </Nav.Link>
            <Nav.Link href="#eco-partners" className="no-bold-link">
              EcoPartnerships
            </Nav.Link>
            <Nav.Link href="#blog-section" className="no-bold-link">
              Blog
            </Nav.Link>
          </Nav>
          <Nav>
            <Button
              variant="success"
              href="/signup?role=user"
              className="my-button"
            >
              Sign in
            </Button>
            <Button
              variant="success"
              href="/signup?role=admin"
              className="my-button"
            >
              Admin
            </Button>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
=======
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
    const { authState } = useAuth();
    const { token } = authState;

    return (
        <Navbar bg="light" expand="lg" fixed="top"> {/* Keeps the header fixed */}
            <Container fluid="md">
                <Navbar.Brand href="/">Driftway</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto flex">
                        <Nav.Link href="#why-slow-travel" className="no-bold-link">How It Works</Nav.Link>
                        <Nav.Link href="#hero" className="no-bold-link">Discover</Nav.Link>
                        <Nav.Link href="#eco-partners" className="no-bold-link">EcoPartnerships</Nav.Link>
                        <Nav.Link href="#blog-section" className="no-bold-link">Blog</Nav.Link>
                    </Nav>
                    <Nav>
                        {token ? (
                            <ProfileDropdown />
                        ) : (
                            <Button variant="dark" href="/signup" className="my-button">
                                Sign in
                            </Button>
                        )}
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
>>>>>>> Stashed changes
};

export default Header;
