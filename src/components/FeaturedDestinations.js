import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';

const FeaturedDestinations = () => {
    const destinationsData = [
        { image: 'https://images.unsplash.com/photo-1527430203327-e97f64c96a2c', title: 'Bali, Indonesia', description: 'Connect with local artisans and stay at eco-friendly homestays.', link: 'https://www.baliecostay.com/' },
        { image: 'https://images.unsplash.com/photo-1723309032716-834b0b9fd7d8', title: 'Kyoto, Japan', description: 'Immerse yourself in serene temples and enjoy traditional tea ceremonies.', link: 'https://www.byfood.com/kyoto-tea-ceremony' },
        { image: 'https://images.unsplash.com/photo-1698904738835-51c949c1cbaa', title: 'Tuscany, Italy', description: 'Explore scenic vineyards and sustainable farmhouses.', link: 'https://www.esperienza.org/lp-hiking-tours' },
        { image: 'https://images.unsplash.com/photo-1668544732944-ac3f384f8e5f', title: 'Costa Rica', description: 'Stay at eco-lodges and explore the rich biodiversity of rainforests.', link: 'https://ecolodgesanywhere.com/eco-lodges-costa-rica/' },
        { image: 'https://images.unsplash.com/photo-1612611155301-ac3e1734c91c', title: 'Patagonia, Argentina', description: 'Embark on a journey through the untouched wilderness.', link: 'https://www.unwildplanet.com/blog/first-timer%27s-guide-to-patagonia' },
        { image: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be', title: 'Santorini, Greece', description: 'Enjoy stunning sunsets and traditional white-washed architecture.', link: 'https://www.greeka.com/cyclades/santorini/' },
        { image: 'https://images.unsplash.com/photo-1578575437130-527eed3abbec', title: 'Machu Picchu, Peru', description: 'Explore the ancient Incan ruins in the heart of the Andes.', link: 'https://www.peru-explorer.com/explore-machu-picchu-peru-guided-tours-adventures.htm' },
        { image: 'https://lh5.googleusercontent.com/p/AF1QipM6pcivlAHnZRGDQv5iHW8DMb83h5atzRDeEUA3=w540-h312-n-k-no', title: 'Queenstown, New Zealand', description: 'Experience adventure sports and breathtaking mountain landscapes.', link: 'https://www.queenstownnz.co.nz/' }
    ];

    const itemsPerPage = 4;
    const totalDestinations = destinationsData.length;

    // 复制前后数据，确保无限滚动
    const extendedData = [
        ...destinationsData.slice(-itemsPerPage),
        ...destinationsData,
        ...destinationsData.slice(0, itemsPerPage)
    ];

    const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef(null);

    // 右滑动
    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + itemsPerPage);
    };

    // 左滑动
    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - itemsPerPage);
    };

    // 监听 currentIndex，确保无缝滚动
    useEffect(() => {
        let timeout;
        if (currentIndex >= totalDestinations + itemsPerPage) {
            timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(itemsPerPage);
            }, 500);
        } else if (currentIndex <= 0) {
            timeout = setTimeout(() => {
                setIsTransitioning(false);
                setCurrentIndex(totalDestinations);
            }, 500);
        } else {
            timeout = setTimeout(() => setIsTransitioning(false), 500);
        }

        return () => clearTimeout(timeout);
    }, [currentIndex]);

    return (
        <div className="featured-destinations" style={{ padding: '60px 0', position: 'relative', overflow: 'hidden' }}>
            <Container>
                <h2 className="text-center mb-4">Featured Destinations for Slow Travel</h2>
                <Row className="destination-carousel align-items-center">
      
                    {/* 左箭头 */}
                    <Button 
                        variant="outline-secondary" 
                        className="carousel-control prev"
                        onClick={handlePrev}
                        style={{ position: 'absolute', left: 0, zIndex: 10, background: 'white', borderRadius: '50%', padding: '10px' }}
                    >
                        <FaArrowLeft />
                    </Button>

                    {/* 轮播容器 */}
                    <div className="carousel-wrapper" style={{ overflow: 'hidden', width: '100%' }}>
                        <Row 
                            ref={carouselRef}
                            className="carousel-row"
                            style={{
                                display: 'flex',
                                justifyContent: 'flex-start',
                                transition: isTransitioning ? 'transform 0.5s ease-in-out' : 'none',
                                transform: `translateX(-${(100 / itemsPerPage) * (currentIndex - itemsPerPage)}%)`
                            }}>
                            {extendedData.map((destination, i) => (
                                <Col key={i} style={{ flex: `0 0 ${100 / itemsPerPage}%`, maxWidth: `${100 / itemsPerPage}%` }}>
                                    <Card className="destination-card">
                                        <Card.Img variant="top" src={destination.image} style={{ borderRadius: '12px', objectFit: 'cover' }} />
                                        <Card.Body>
                                            <Card.Title>{destination.title}</Card.Title>
                                            <Card.Text>{destination.description}</Card.Text>
                                            <Button className='explore-button' onClick={() => window.open(destination.link, '_blank')} style={{ background: 'green', border: 'none', borderRadius: '20px', padding: '8px 16px' }}>Explore</Button>
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    {/* 右箭头 */}
                    <Button 
                        variant="outline-secondary" 
                        className="carousel-control next"
                        onClick={handleNext}
                        style={{ position: 'absolute', right: 0, zIndex: 10, background: 'white', borderRadius: '50%', padding: '10px' }}
                    >
                        <FaArrowRight />
                    </Button>
                </Row>
            </Container>
        </div>
    );
};

export default FeaturedDestinations;
