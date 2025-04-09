import { useState, useEffect } from 'react';
import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { FaBell } from 'react-icons/fa';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import ProfileDropdown from './ProfileDropdown';
import { fetchProfile, fetchUnreadCount } from '@/services';

const Header = () => {
    const router = useRouter();
    const { pathname } = router;

    const { authState } = useAuth();
    const { token } = authState;
    const [lastName, setLastName] = useState('');
    const [unreadCount, setUnreadCount] = useState(0);

    useEffect(() => {
        if (token) {
          
            // Fetch profile info
            fetchProfile()
                .then((user) => {
                    const fullName = user?.name || user?.username || '';
                    const last = fullName?.split(' ').slice(-1)[0];
                    setLastName(last);
                })
                .catch((err) => console.error("Failed to fetch profile:", err));

            // Fetch unread notifications
            fetchUnreadCount()
                .then((count) => setUnreadCount(count))
                .catch((error) => console.error('Error fetching unread count:', error));
        }
    }, [token]);

    const handleClick = () => {
        window.location.href = '/notifications';
    };


    return (
        <Navbar bg="light" expand="lg" fixed="top">
                    {pathname === '/' && (
                        <Nav className="m-auto flex">
                            <Nav.Link href="/#why-slow-travel" className="no-bold-link">
                                How It Works
                            </Nav.Link>
                            <Nav.Link href="/#hero" className="no-bold-link">
                                Discover
                            </Nav.Link>
                            <Nav.Link href="/#eco-partners" className="no-bold-link">
                                EcoPartnerships
                            </Nav.Link>
                            <Nav.Link href="/#blog-section" className="no-bold-link">
                                Blog
                            </Nav.Link>
                        </Nav>
                    )}
                    <Nav className="d-flex align-items-center gap-4 ms-auto">
                        {token ? !pathname.startsWith('/user') && (
                            <>
                                <div className="icon-button position-relative" onClick={handleClick}>
                                    {unreadCount > 0 && (
                                        <span className="notification-badge">
                                            {unreadCount}
                                        </span>
                                    )}
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
