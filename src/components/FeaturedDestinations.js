import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FeaturedDestinations = () => {
    const destinations = [
        {
            image: 'https://images.unsplash.com/photo-1527430203327-e97f64c96a2c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Bali, Indonesia',
            description: 'Connect with local artisans and stay at eco-friendly homestays.',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1723309032716-834b0b9fd7d8?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Kyoto, Japan',
            description: 'Immerse yourself in serene temples and enjoy traditional tea ceremonies.',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1698904738835-51c949c1cbaa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Tuscany, Italy',
            description: 'Explore scenic vineyards and sustainable farmhouses.',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1668544732944-ac3f384f8e5f?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Costa Rica',
            description: 'Stay at eco-lodges and explore the rich biodiversity of rainforests.',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1612611155301-ac3e1734c91c?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Patagonia, Argentina',
            description: 'Embark on a journey through the untouched wilderness.',
            link: '#'
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3bec758 (adding booking feature files)
        },
        {
            image: 'https://images.unsplash.com/photo-1698904738835-51c949c1cbaa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Tuscany, Italy',
            description: 'Explore scenic vineyards and sustainable farmhouses.',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1698904738835-51c949c1cbaa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Tuscany, Italy',
            description: 'Explore scenic vineyards and sustainable farmhouses.',
            link: '#'
        },
        {
            image: 'https://images.unsplash.com/photo-1698904738835-51c949c1cbaa?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
            title: 'Tuscany, Italy',
            description: 'Explore scenic vineyards and sustainable farmhouses.',
            link: '#'
        },
<<<<<<< HEAD
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < destinations.length - 4) setCurrentIndex(currentIndex + 4);
    };

    const handlePrev = () => {
        if (currentIndex > 0) setCurrentIndex(currentIndex - 4);
=======
        }
=======
>>>>>>> 3bec758 (adding booking feature files)
    ];

    const [currentIndex, setCurrentIndex] = useState(0);

    const handleNext = () => {
        if (currentIndex < destinations.length - 4) setCurrentIndex(currentIndex + 4);
    };

    const handlePrev = () => {
<<<<<<< HEAD
        if (currentIndex > 0) setCurrentIndex(currentIndex - 1);
>>>>>>> 6a51d3c (structure changed)
=======
        if (currentIndex > 0) setCurrentIndex(currentIndex - 4);
>>>>>>> 3bec758 (adding booking feature files)
    };

    return (
        <div className="featured-destinations" style={{ padding: '60px 0', position: 'relative' }}>
            <Container>
                <h2 className="text-center mb-4">Featured Destinations for Slow Travel</h2>
<<<<<<< HEAD
<<<<<<< HEAD
                <Row className="destination-carousel">

=======
                <div className="destination-carousel">
>>>>>>> 6a51d3c (structure changed)
=======
                <Row className="destination-carousel">

>>>>>>> 3bec758 (adding booking feature files)
                    {/* Left Arrow: Show only if not at the first card */}
                    {currentIndex > 0 && (
                        <Button variant="outline-secondary" className="carousel-control prev" onClick={handlePrev}>
                            <FaArrowLeft />
                        </Button>
                    )}

                    {/* Destination Cards */}
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 3bec758 (adding booking feature files)
                    <div className="carousel-wrapper">
                        <Row
                            className="carousel-row"
                            style={{
                                transform: `translateX(-${(currentIndex / 4) * 100}%)`,
                            }}>
                            {destinations.map((destination, index) => (
                                <Col md={3} key={index} className="mb-4">
                                    <Card className="destination-card">
                                        <Card.Img variant="top" src={destination.image} />
                                        <Card.Body>
                                            <Card.Title>{destination.title}</Card.Title>
                                            <Card.Text>{destination.description}</Card.Text>
                                            <Button className='explore-button' href={destination.link}>Explore</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>
<<<<<<< HEAD
=======
                    <Row
                        className="carousel-row"
                        style={{
                            transform: `translateX(-${currentIndex * 30}%)`,
                            transition: 'transform 0.2s ease-in-out',
                        }}>
                        {visibleDestinations.map((destination, index) => (
                            <Col md={3} key={index} className="mb-4">
                                <Card className="destination-card">
                                    <Card.Img variant="top" src={destination.image} />
                                    <Card.Body>
                                        <Card.Title>{destination.title}</Card.Title>
                                        <Card.Text>{destination.description}</Card.Text>
                                        <Button variant="primary" href={destination.link}>Explore</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
>>>>>>> 6a51d3c (structure changed)
=======
>>>>>>> 3bec758 (adding booking feature files)

                    {/* Right Arrow: Show only if not at the last card */}
                    {currentIndex < destinations.length - 4 && (
                        <Button variant="outline-secondary" className="carousel-control next" onClick={handleNext}>
                            <FaArrowRight />
                        </Button>
                    )}
<<<<<<< HEAD
<<<<<<< HEAD
                </Row>
=======
                </div>
>>>>>>> 6a51d3c (structure changed)
=======
                </Row>
>>>>>>> 3bec758 (adding booking feature files)
            </Container>
        </div>
    );
};

<<<<<<< HEAD
<<<<<<< HEAD
export default FeaturedDestinations;
=======
export default FeaturedDestinations;
>>>>>>> 6a51d3c (structure changed)
=======
export default FeaturedDestinations;
>>>>>>> d6d7489 (Home page implemented (#27))
