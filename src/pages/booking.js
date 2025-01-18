import Header from '@/components/Header';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaBed, FaSearch, FaMapMarkerAlt, FaLeaf } from 'react-icons/fa'; // Icons for the page

const BookingSearch = () => {
  return (
    <>
      <Header />
      {/* Banner Section */}
      <div className="banner-section">
        <img src="https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Travel Destination" className="banner-image" />
        <div className="banner-overlay">
          <h2 className="text-white">Find Your Perfect Place</h2>
        </div>
      </div>

      {/* Search Section */}
      <Container className="booking-search mt-5">
        <Row className="justify-content-center mb-4">
          <Col md={10}>
            {/* Search Bar */}
            <Form className="search-form d-flex justify-content-between align-items-center">
              <Form.Control type="text" placeholder="Search for places, hotels, or restaurants" className="mr-2" />
              <Form.Control type="date" placeholder="Check-in Date" className="mr-2 w-50" />
              <Form.Control type="date" placeholder="Check-out Date" className="mr-2 w-50" />
              <Form.Control as="select" className="mr-2 w-50">
                <option>Hotels</option>
                <option>Restaurants</option>
                <option>Attractions</option>
              </Form.Control>
              <Button variant="success" className="search-btn">
                <div className="d-flex justify-content-center">Search <FaSearch /></div>
              </Button>
            </Form>
          </Col>
        </Row>

        {/* Filters Section */}
        <Row className="filters-section justify-content-center mt-4">
          <Col md={8}>
            <h5 className="text-center">Filters</h5>
            <Form className="d-flex justify-content-between align-items-center">
              <div className="filter-item">
                <Form.Label className="mr-2">Price Range</Form.Label>
                <Form.Control type="range" className="mr-4 custom-range" />
              </div>
              <div className="filter-item">
                <Form.Label className="mr-2">Minimum Rating</Form.Label>
                <Form.Control as="select" className="mr-4">
                  <option key="3stars">3 Stars & Up</option>
                  <option key="4stars">4 Stars & Up</option>
                  <option key="5stars">5 Stars Only</option>
                </Form.Control>
              </div>
              <Form.Check label="Eco-Friendly" className="filter-item" />
            </Form>
          </Col>
        </Row>

        {/* Featured Places Section */}
        <Row className="mt-5">
          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://robbreport.com/wp-content/uploads/2023/04/03.-BHR-Bali_The-Bar.jpg" />
              <Card.Body>
                <Card.Title>Luxury Beach Resort</Card.Title>
                <Card.Text>
                  A beautiful beachfront resort offering world-class amenities. Perfect for relaxation.
                </Card.Text>
                <Button variant="outline-success">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://onekindesign.com/wp-content/uploads/2016/03/Mountain-Retreat-Montana-KA-Architecture-01-1-Kindesign.jpg" />
              <Card.Body>
                <Card.Title>Mountain Retreat</Card.Title>
                <Card.Text>
                  Experience a tranquil escape with breathtaking views and serene surroundings.
                </Card.Text>
                <Button variant="outline-success">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>

          <Col md={4} className="mb-4">
            <Card>
              <Card.Img variant="top" src="https://outdoorswire.usatoday.com/wp-content/uploads/sites/114/2022/12/ecolodge_Playa-Viva-e1674079193732.jpg?w=1000&h=600&crop=1" />
              <Card.Body>
                <Card.Title>Eco-Friendly Lodge</Card.Title>
                <Card.Text>
                  Enjoy a sustainable stay with eco-friendly practices in the heart of nature.
                </Card.Text>
                <Button variant="outline-success">Book Now</Button>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default BookingSearch;
