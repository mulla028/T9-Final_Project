// import { Button, Container } from 'react-bootstrap';

// const Hero = () => {
//     return (
//         <div className="hero-section" style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1610048737031-d6b134e828e2?q=80&w=1528&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)', backgroundSize: 'cover', padding: '100px 0', height: '100vh' }}>
//             <Container>
//                 <h1>Discover the Art of Slow Travel</h1>
//                 <p>Plan longer eco-conscious trips that immerse you in culture, reduce your footprint, and support local communities.</p>
//                 <Button variant="primary" size="lg" href="#start-planning" className=" my-button">Start Planning Your Trip</Button>
//                 <Button variant="outline-light" size="lg" href="#explore-mission" className=" my-button ml-3">Explore Our Mission</Button>
//             </Container>
//         </div>
//     );
// };

import { Container, Form, Button } from 'react-bootstrap';

const Hero = () => {
    return (
        <div id = "hero"
            className="hero-section"
            style={{
                backgroundImage: 'url(https://images.unsplash.com/photo-1721456793774-03b354e24171?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                position: 'relative',
            }}
        >
            <div className="overlay"></div>
            <Container className="hero-content">
                <h1 className="hero-title">Discover the Art of Slow Travel</h1>
                <p className="hero-subtitle">
                    Plan longer, eco-conscious trips that immerse you in culture, reduce your footprint, and support local communities.
                </p>

                {/* Search Bar */}
                <Form className="d-flex justify-content-center mt-4">
                    <Form.Control type="text" placeholder="Search for Destinations" className="mr-3 w-50 search-input" />
                    <Button variant="success" className="search-button" style={{ marginLeft: '10px' }}>
                        Search
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Hero;
