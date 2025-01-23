import { Container, Row, Col, Card } from 'react-bootstrap';

const EcoPartners = () => {
    const partners = [
        { name: 'Eco Travel', logo: '/images/partner1.png' },
        { name: 'Green Stays', logo: '/images/partner2.png' },
        { name: 'Sustainable Journeys', logo: '/images/partner3.png' },
        { name: 'Nature Adventures', logo: '/images/partner4.png' }
    ];

    return (
        <div className="eco-partners" style={{ padding: '60px 0', backgroundColor: '#f1f1f1' }}>
            <Container>
                <h2 className="text-center mb-4">Our Eco-Conscious Partners</h2>
                <Row>
                    {partners.map((partner, index) => (
                        <Col md={3} key={index} className="text-center mb-4">
                            <Card className="border-0">
                                <Card.Img variant="top" src={partner.logo} alt={partner.name} style={{ height: '100px', objectFit: 'contain' }} />
                                <Card.Body>
                                    <Card.Title>{partner.name}</Card.Title>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default EcoPartners;
