import { useState, useEffect, useRef } from 'react';
import { Container, Row, Col, Card, Button } from 'react-bootstrap';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';
import { isAuthenticated } from '@/services';
import { useRouter } from 'next/router';
import Link from 'next/link';

const LocalExperiences = () => {
    const router = useRouter();

    const handleButtonClick = () => {
        const authState = isAuthenticated();
        const destination = authState ? "/local-experiences" : "/signup"; // ✅ No result needed
        router.push(destination);
    };

    const destinationsData = [
        { image: 'https://d1s09xku4jkn9v.cloudfront.net/uploads/2017/09/4c.jpg', title: 'Tokyo, Japan', description: 'Join a sushi-making class with local chefs and explore hidden izakayas.', link: 'https://www.tokyosushiclass.com/' },
        { image: 'https://souvenirsideas.com/wp-content/uploads/2024/08/image-297.png?w=1200', title: 'Marrakech, Morocco', description: 'Wander through the vibrant souks and learn traditional Moroccan pottery.', link: 'https://www.moroccanceramicart.com/' },
        { image: 'https://media-cdn.tripadvisor.com/media/attractions-splice-spp-674x446/12/04/d1/7a.jpg', title: 'Barcelona, Spain', description: 'Experience a flamenco dance workshop and discover Gaudi’s masterpieces.', link: 'https://www.barcelonaflamenco.com/' },
        { image: 'https://media.tacdn.com/media/attractions-splice-spp-674x446/11/ec/46/87.jpg', title: 'Hanoi, Vietnam', description: 'Take a street food tour and learn to cook authentic Vietnamese pho.', link: 'https://www.hanoifoodtours.com/' },
        { image: 'https://images.squarespace-cdn.com/content/v1/58d29e6ccd0f6829bdf2f58f/1629314059653-ZVNFP616P6Q0VNFJ8DC6/Weaving+1.jpg', title: 'Cusco, Peru', description: 'Visit indigenous villages and participate in traditional weaving workshops.', link: 'https://www.peruweavingexperience.com/' },
        { image: 'https://cdn.shopify.com/s/files/1/0539/8010/2827/files/IMG_6696_eaa4d746-9e34-408c-a00a-303b85353234.jpg?v=1630699889', title: 'Tuscany, Italy', description: 'Stay at a family-run vineyard and experience hands-on winemaking.', link: 'https://www.tuscanywineexperience.com/' },
        { image: 'https://mediaim.expedia.com/localexpert/213802/a0d3bbb8-9e22-4fe4-aadd-71fbb1220bac.jpg?impolicy=resizecrop&rw=1005&rh=565', title: 'Kerala, India', description: 'Live with local fishermen and explore the serene backwaters in a houseboat.', link: 'https://www.keralahouseboatexperience.com/' },
        { image: 'https://www.stcatharines.ca/en/news/resources/Images/CultureNews.jpg', title: 'Cape Town, South Africa', description: 'Join a township art tour and learn about local street art and culture.', link: 'https://www.capetownstreetart.com/' }
    ];

    const itemsPerPage = 4;
    const totalDestinations = destinationsData.length;

    const extendedData = [
        ...destinationsData.slice(-itemsPerPage),
        ...destinationsData,
        ...destinationsData.slice(0, itemsPerPage)
    ];

    const [currentIndex, setCurrentIndex] = useState(itemsPerPage);
    const [isTransitioning, setIsTransitioning] = useState(false);
    const carouselRef = useRef(null);

    const handleNext = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev + itemsPerPage);
    };

    const handlePrev = () => {
        if (isTransitioning) return;
        setIsTransitioning(true);
        setCurrentIndex((prev) => prev - itemsPerPage);
    };

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
                <h2 className="text-center mb-4">Local Experience for Slow Travel</h2>
                <Row className="destination-carousel align-items-center">

                    <Button
                        variant="outline-secondary"
                        className="carousel-control prev"
                        onClick={handlePrev}
                        style={{ position: 'absolute', left: 0, zIndex: 10, background: 'white', borderRadius: '50%', padding: '10px' }}
                    >
                        <FaArrowLeft />
                    </Button>

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
                                        </Card.Body>
                                    </Card>
                                </Col>
                            ))}
                        </Row>
                    </div>

                    <Button
                        variant="outline-secondary"
                        className="carousel-control next"
                        onClick={handleNext}
                        style={{ position: 'absolute', right: 0, zIndex: 10, background: 'white', borderRadius: '50%', padding: '10px' }}
                    >
                        <FaArrowRight />
                    </Button>

                    <Button className='explore-button' onClick={handleButtonClick} style={{ background: 'green', border: 'none', borderRadius: '40px', padding: '8px 16px', width: '40%', height: '60px', textAlign: 'center' }}>
                        Start Your Local Experiences
                    </Button>
                </Row>
            </Container>
        </div>
    );
};

export default LocalExperiences;