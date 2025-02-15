import { Navbar, Nav, Button, Container } from 'react-bootstrap';
import { useRouter } from 'next/router';

const Header = () => {
    const router = useRouter();

    const handleGoToSection = (sectionId) => {
        if (router.pathname === '/') {
            const targetSection = document.getElementById(sectionId);
            if (targetSection) {
                targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }
        } else {
            router.push('/').then(() => {
                setTimeout(() => {
                    const targetSection = document.getElementById(sectionId);
                    if (targetSection) {
                        targetSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
                    }
                }, 500); 
            });
        }
    };

    return (
        <Navbar bg="light" expand="lg" fixed="top">
            <Container fluid="md">
                <Navbar.Brand href="/">Driftway</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="m-auto flex">
                        <Nav.Link onClick={() => handleGoToSection('why-slow-travel')} className="no-bold-link">
                            How It Works
                        </Nav.Link>
                        <Nav.Link onClick={() => handleGoToSection('hero')} className="no-bold-link">
                            Discover
                        </Nav.Link>
                        <Nav.Link onClick={() => handleGoToSection('eco-partners')} className="no-bold-link">
                            EcoPartnerships
                        </Nav.Link>
                        <Nav.Link onClick={() => handleGoToSection('blog-section')} className="no-bold-link">
                            Blog
                        </Nav.Link>
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
