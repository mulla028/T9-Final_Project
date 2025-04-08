import { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { useAuth } from '@/context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { fetchUnreadCount } from '@/services'

const Header = () => {
    const { authState } = useAuth();
    const { token } = authState;
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        // Fetch the unread count when the component mounts
        fetchUnreadCount().then((count) => {
            setUnreadCount(count);
        }).catch((error) => {
            console.error('Error fetching unread count:', error);
        });
    }, []);


    const handleClick = () => {
        window.location.href = '/notifications'; // Redirect to notifications page
    }


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
                    <Nav className='d-flex align-items-center gap-4'>
                        {token ? (
                            <>
                                <div className='icon-button position-relative' onClick={handleClick}>
                                    {unreadCount > 0 && <span className="notification-badge">{unreadCount}</span>}
                                    <FaBell size={24} />
                                </div>
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