import { Container, Row, Col, Card, Button, Form, Dropdown } from 'react-bootstrap';
import { FaStar, FaLeaf } from 'react-icons/fa';  // Eco-friendly icons

const LocalExperiences = () => {
    const experiences = [
        { image: 'https://algarvenaturetours.com/wp-content/uploads/2024/08/ceramica-vieira-traditional-pottery-and-ceramic-shop-in-lagoa-sao-miguel-island-azores-portugal-800x600.jpg', title: 'Traditional Pottery Workshop', category: 'Workshop', price: '$50', ecoTagline: 'Handmade & Eco-Friendly', rating: 4 },
        { image: 'https://cdn.getyourguide.com/img/tour/e576f5e9db241113d6aefda5ab7f2b697010cc3c7345370bcb3221d153ccd884.jpg/156.webp', title: 'Organic Farm Tour & Tasting', category: 'Tour', price: '$30', ecoTagline: 'Organic & Sustainable', rating: 5 },
        { image: 'https://indulge-food.ch/wp-content/uploads/2024/11/c7c7d3e9b9a1486a954754fcfa9bb148-980x653.jpg', title: 'Eco-Friendly Cooking Class', category: 'Workshop', price: '$40', ecoTagline: 'Locally Sourced Ingredients', rating: 3 }
    ];

    return (
        <Container className="local-experiences mt-5">
            {/* Header Section */}
            <Row className="mb-5">
                <Col>
                    <h1 className="text-center">Discover Local Experiences</h1>
                </Col>
            </Row>

            {/* Filter & Sort Options */}
            <Row className="mb-5">
                <Col md={6}>
                    <Form className="d-flex">
                        <Form.Control as="select" className="custom-select" style={{ marginRight: '20px' }}>
                            <option>All Categories</option>
                            <option>Workshops</option>
                            <option>Tours</option>
                            <option>Restaurants</option>
                        </Form.Control>
                        <Form.Control as="select" className="custom-select">
                            <option>Sort by Price</option>
                            <option>Sort by Popularity</option>
                            <option>Sort by Location</option>
                        </Form.Control>
                    </Form>
                </Col>

                {/* Rating Filter */}
                <Col md={3}>
                    <Form.Control as="select" className="custom-select">
                        <option>Rating: 3 stars & up</option>
                        <option>Rating: 4 stars & up</option>
                        <option>Rating: 5 stars only</option>
                    </Form.Control>
                </Col>

                {/* Eco-Friendly Toggle */}
                <Col md={3} className="text-right">
                    <Form.Check type="switch" label="Eco-Friendly" />
                </Col>
            </Row>

            {/* Experiences Grid */}
            <Row>
                {experiences.map((experience, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card className="experience-card shadow-lg">
                            <Card.Img variant="top" src={experience.image} className="experience-image" />
                            <Card.Body>
                                <Card.Title className="experience-title">{experience.title}</Card.Title>
                                <Card.Text className="experience-text">
                                    <strong>Category:</strong> {experience.category} <br />
                                    <strong>Price:</strong> {experience.price} <br />
                                    <strong>{experience.ecoTagline}</strong>
                                </Card.Text>
                                <div className="rating">
                                    {[...Array(experience.rating)].map((_, i) => (
                                        <FaStar key={i} color="#ffcc00" />
                                    ))}
                                    {[...Array(5 - experience.rating)].map((_, i) => (
                                        <FaStar key={i} color="#d3d3d3" />
                                    ))}
                                </div>
                                <Button variant="success" href="#/experience-details" className="rounded-pill">
                                    Book Experience
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default LocalExperiences;
