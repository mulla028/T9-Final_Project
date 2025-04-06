import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useAuth } from '@/context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { useEffect, useState } from 'react';
import { fetchProfile } from '@/services';

const Header = () => {
    const { authState } = useAuth();
    const { token } = authState;
    const [lastName, setLastName] = useState('');

    useEffect(() => {
        if (token) {
            fetchProfile()
                .then((user) => {
                    const fullName = user?.name || user?.username || '';
                    const last = fullName?.split(' ').slice(-1)[0];
                    setLastName(last);
                })
                .catch((err) => console.error("Failed to fetch profile:", err));
        }
    }, [token]);

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container fluid="md">
                <Navbar.Brand href="/">Driftway</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto flex">
                        <Nav.Link href="/#why-slow-travel" className="no-bold-link">How It Works</Nav.Link>
                        <Nav.Link href="/#hero" className="no-bold-link">Discover</Nav.Link>
                        <Nav.Link href="/#eco-partners" className="no-bold-link">EcoPartnerships</Nav.Link>
                        <Nav.Link href="/#blog-section" className="no-bold-link">Blog</Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        {token ? (
                            <>
                                <ProfileDropdown />
                            </>
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
