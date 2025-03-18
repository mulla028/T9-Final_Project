import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { useState } from 'react';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FeaturedDestinations = () => {
    const destinationsData = [
        {
            image: 'https://images.unsplash.com/photo-1527430203327-e97f64c96a2c',
            title: 'Bali, Indonesia',
            description: 'Connect with local artisans and stay at eco-friendly homestays.',
            link: 'https://www.baliecostay.com/'
        },
        {
            image: 'https://images.unsplash.com/photo-1723309032716-834b0b9fd7d8',
            title: 'Kyoto, Japan',
            description: 'Immerse yourself in serene temples and enjoy traditional tea ceremonies.',
            link: 'https://www.byfood.com/kyoto-tea-ceremony'
        },
        {
            image: 'https://images.unsplash.com/photo-1698904738835-51c949c1cbaa',
            title: 'Tuscany, Italy',
            description: 'Explore scenic vineyards and sustainable farmhouses.',
            link: 'https://www.esperienza.org/lp-hiking-tours?gad_source=1&gclid=Cj0KCQjws-S-BhD2ARIsALssG0ZwxNzjzPlP7MWFAqZopt83veHhf0FXHC7ioariWyvztJObB6EccJwaAsK4EALw_wcB'
        },
        {
            image: 'https://images.unsplash.com/photo-1668544732944-ac3f384f8e5f',
            title: 'Costa Rica',
            description: 'Stay at eco-lodges and explore the rich biodiversity of rainforests.',
            link: 'https://ecolodgesanywhere.com/eco-lodges-costa-rica/'
        },
        {
            image: 'https://images.unsplash.com/photo-1612611155301-ac3e1734c91c',
            title: 'Patagonia, Argentina',
            description: 'Embark on a journey through the untouched wilderness.',
            link: 'https://www.unwildplanet.com/blog/first-timer%27s-guide-to-patagonia'
        }
    ];

    const [destinations, setDestinations] = useState(destinationsData);
    
    // Moves the first card to the end (Right Click)
    const handleNext = () => {
        setDestinations((prevDestinations) => {
            const updatedDestinations = [...prevDestinations];
            const firstItem = updatedDestinations.shift(); // Remove first item
            updatedDestinations.push(firstItem); // Add it to the end
            return updatedDestinations;
        });
    };

    // Moves the last card to the front (Left Click)
    const handlePrev = () => {
        setDestinations((prevDestinations) => {
            const updatedDestinations = [...prevDestinations];
            const lastItem = updatedDestinations.pop(); // Remove last item
            updatedDestinations.unshift(lastItem); // Add it to the front
            return updatedDestinations;
        });
    };

    return (
        <div className="featured-destinations" style={{ padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
            <Container>
                <h2 className="text-center mb-4">Featured Destinations for Slow Travel</h2>
                <Row className="destination-carousel align-items-center">
                    
                    {/* Left Arrow (Always Visible) */}
                    <Button variant="outline-secondary" className="carousel-control prev" onClick={handlePrev}>
                        <FaArrowLeft />
                    </Button>

                    {/* Destination Cards */}
                    <div className="carousel-wrapper" style={{ overflow: 'hidden', width: '100%' }}>
                        <Row
                            className="carousel-row"
                            style={{
                                display: 'flex',
                                transition: 'transform 0.5s ease-in-out',
                                transform: `translateX(-0%)`,
                                width: '100%'
                            }}>
                            {destinations.slice(0, 4).map((destination, i) => (
                                <Col md={3} key={i} className="mb-4">
                                    <Card className="destination-card">
                                        <Card.Img variant="top" src={destination.image} />
                                        <Card.Body>
                                            <Card.Title>{destination.title}</Card.Title>
                                            <Card.Text>{destination.description}</Card.Text>
                                            
                                            {/* ✅ Open in new tab only if link is valid */}
                                            {destination.link && destination.link !== "#" ? (
                                                <Button 
                                                    className='explore-button' 
                                                    onClick={() => window.open(destination.link, '_blank')}
                                                >
                                                    Explore
                                                </Button>
                                            ) : (
                                                <Button className='explore-button' disabled>Explore</Button>
                                            )}
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* Right Arrow (Always Visible) */}
                    <Button variant="outline-secondary" className="carousel-control next" onClick={handleNext}>
                        <FaArrowRight />
                    </Button>
                </Row>
            </Container>
        </div>
    );
};

export default FeaturedDestinations;
