import { Container, Row, Col, Card, Button, Dropdown } from 'react-bootstrap';

const SearchResults = () => {
    const results = [
        { image: '/images/hotel1.jpg', name: 'Green Haven Hotel', type: 'Hotel', price: '$150/night', rating: '4.5/5' },
        { image: '/images/restaurant1.jpg', name: 'Eco Delights', type: 'Restaurant', price: '$30/person', rating: '4.7/5' },
        { image: '/images/attraction1.jpg', name: 'Nature Trails Park', type: 'Attraction', price: 'Free Entry', rating: '4.9/5' }
    ];

    return (
        <Container className="search-results" style={{ marginTop: '40px' }}>
            <Row className="mb-4">
                <Col md={8}>
                    <h3>Search Results</h3>
                </Col>
                <Col md={4} className="text-right">
                    {/* Sort Options */}
                    <Dropdown>
                        <Dropdown.Toggle variant="outline-secondary">
                            Sort By
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                            <Dropdown.Item>Price</Dropdown.Item>
                            <Dropdown.Item>Rating</Dropdown.Item>
                            <Dropdown.Item>Distance</Dropdown.Item>
                        </Dropdown.Menu>
                    </Dropdown>
                </Col>
            </Row>

            {/* Results Grid */}
            <Row>
                {results.map((result, index) => (
                    <Col md={4} key={index} className="mb-4">
                        <Card>
                            <Card.Img variant="top" src={result.image} />
                            <Card.Body>
                                <Card.Title>{result.name}</Card.Title>
                                <Card.Text>
                                    Type: {result.type} <br />
                                    Price: {result.price} <br />
                                    Rating: {result.rating}
                                </Card.Text>
                                <Button variant="primary">Book Now</Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SearchResults;
