import { Container, Row, Col, Card } from 'react-bootstrap';

const EcoPartners = () => {
    const partners = [
        {
            name: 'Eco Travel',
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRpZCIuoeIXD-mG2D9yX7aTA-wAjYGNtCFLwQ&s',
            link: 'https://www.torontoecoadventures.com/',
        },
        {
            name: 'Green Stays',
            image: 'https://r2.erweima.ai/imgcompressed/compressed_ff88bc962401f3522e8916725a089544.webp',
            link: 'https://greenstays.eu/',
        },
        {
            name: 'Sustainable Journeys',
            image: 'https://images.squarespace-cdn.com/content/v1/6605083334a64b233b206e5a/f8ffd603-82a5-4c37-b8a9-60b9ce497e3c/SJ_Logo-04.png?format=1500w',
            link: 'https://sustainablejourney.org/',
        },
        {
            name: 'Nature Adventures',
            image: 'https://i.fbcd.co/products/original/adventure-logo-converted-01-30c76dae7525864f72b8b6f935c9b86bfbb5c36ac6cd7329ca2828edcbafc9dd.jpg',
            link: 'https://sceniccaves.com/',
        },
    ];

    return (
        <div
            id="eco-partners" // Section ID for navigation
            className="eco-partners"
            style={{ padding: '100px 0', backgroundColor: '#f1f1f1' }} // Add padding to avoid header overlap
        >
            <Container>
                <h2 className="text-center mb-5" style={{ fontSize: '2.5rem' }}>Our Eco-Conscious Partners</h2>
                <Row>
                    {partners.map((partner, index) => (
                        <Col md={3} key={index} className="text-center mb-4">
                            <Card className="border-0" style={{ borderRadius: '15px', overflow: 'hidden' }}>
                                <a
                                    href={partner.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ textDecoration: 'none', color: 'inherit' }}
                                >
                                    <div
                                        style={{
                                            width: '100%',
                                            height: '180px',
                                            display: 'flex',
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                            backgroundColor: '#f8f8f8',
                                        }}
                                    >
                                        <img
                                            src={partner.image}
                                            alt={partner.name}
                                            style={{
                                                maxWidth: '100%',
                                                maxHeight: '100%',
                                                objectFit: 'contain',
                                                borderRadius: '10px',
                                            }}
                                        />
                                    </div>
                                    <Card.Body>
                                        <Card.Title style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>
                                            {partner.name}
                                        </Card.Title>
                                    </Card.Body>
                                </a>
                            </Card>
                        </Col>
                    ))}
                </Row>
            </Container>
        </div>
    );
};

export default EcoPartners;