import { Container, Row, Col, Card, Button } from 'react-bootstrap';

const SearchResults = ({ searchResults }) => {
    if (!searchResults || searchResults.length === 0) return null; // Don't show if no results

    return (
        <Container className="search-results mt-5">
            <h2 className="search-results-title">Search Results</h2>
            <Row>
                {searchResults.map((result, index) => (
                    <Col md={4} key={index}>
                        <Card className='destination-card' style={{ marginBottom: '20px' }}>
                            <Card.Img variant="top" src={result.image || '/images/default-hotel.jpg'} />
                            <Card.Body>
                                <Card.Title>{result.name}</Card.Title>
                                <Card.Text>{result.description || 'No description available.'}</Card.Text>
                                <Button variant="outline-success" className='my-button' href={`/booking-details/${result.place_id}`}>
                                    View Details
                                </Button>
                            </Card.Body>
                        </Card>
                    </Col>
                ))}
            </Row>
        </Container>
    );
};

export default SearchResults;
