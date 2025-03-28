import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { useRouter } from 'next/router';

const Header = () => {
    const { authState } = useAuth();
    const { token } = authState;
    const router = useRouter();
    const isHomePage = router.pathname === '/';

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container fluid="md">
                <Navbar.Brand href="/">Driftway</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto flex">
                        {isHomePage ? (
                            // Navigation for homepage
                            <>
                                <Nav.Link href="#why-slow-travel" className="no-bold-link">How It Works</Nav.Link>
                                <Nav.Link href="#hero" className="no-bold-link">Discover</Nav.Link>
                                <Nav.Link href="#eco-partners" className="no-bold-link">EcoPartnerships</Nav.Link>
                                <Nav.Link href="#blog-section" className="no-bold-link">Blog</Nav.Link>
                            </>
                        ) : (
                            // Navigation for other pages
                            <>
                                <Nav.Link href="/" className="no-bold-link">Home</Nav.Link>
                                <Nav.Link href="/itinerary" className="no-bold-link">Itinerary Overview</Nav.Link>
                            </>
                        )}
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
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default Header;