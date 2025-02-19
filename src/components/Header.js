import { Navbar, Nav, Button, Container } from 'react-bootstrap';
<<<<<<< HEAD
import { useAuth } from '@/context/AuthContext';
import ProfileDropdown from './ProfileDropdown';

const Header = () => {
    const { authState } = useAuth();
    const { token } = authState;

    return (
        <Navbar bg="light" expand="lg" fixed="top"> {/* Keeps the header fixed */}
            <Container fluid="md">
=======

const Header = () => {
    return (
        <Navbar bg="light" expand="lg">
            <Container fluid="md" >
>>>>>>> 6a51d3c (structure changed)
                <Navbar.Brand href="/">Driftway</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto flex">
<<<<<<< HEAD
                        <Nav.Link href="#why-slow-travel" className="no-bold-link">How It Works</Nav.Link>
                        <Nav.Link href="#hero" className="no-bold-link">Discover</Nav.Link>
                        <Nav.Link href="#eco-partners" className="no-bold-link">EcoPartnerships</Nav.Link>
                        <Nav.Link href="#blog-section" className="no-bold-link">Blog</Nav.Link>
                    </Nav>
                    <Nav>
                        {token ? (
                            <ProfileDropdown />
                        ) : (
                            <>
                                <Button variant="success" href="/signup?role=user" className="my-button">
                                    Sign in
                                </Button>
                                <Button variant="success" href="/signup?role=admin" className="my-button">
                                    Admin
                                </Button>
                            </>
                        )}
=======
                        <Nav.Link href="#how-it-works">How It Works</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#eco-partners">Eco Partnerships</Nav.Link>
                        <Nav.Link href="/blog">Blog</Nav.Link>
                    </Nav>
                    <Nav>
                        <Button variant="success" href="/signup" className="my-button">Sign in</Button>
>>>>>>> 6a51d3c (structure changed)
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;
