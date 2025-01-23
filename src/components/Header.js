import { Navbar, Nav, Button, Container } from 'react-bootstrap';

const Header = () => {
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
                        <Button variant="success" href="/signup" className="my-button">
                            Sign in
                        </Button>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
