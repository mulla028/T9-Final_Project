import { useState } from 'react';
import Header from '@/components/Header';
import { Container, Row, Col, Form, Button, Card, Accordion, Carousel } from 'react-bootstrap';
import { FaMapMarkerAlt, FaCalendarAlt, FaBed } from 'react-icons/fa';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const featuredPlaces = [
  {
    title: "Luxury Beach Resort",
    description: "A beautiful beachfront resort offering world-class amenities. Perfect for relaxation.",
    image: "https://robbreport.com/wp-content/uploads/2023/04/03.-BHR-Bali_The-Bar.jpg"
  },
  {
    title: "Mountain Retreat",
    description: "Experience a tranquil escape with breathtaking views and serene surroundings.",
    image: "https://onekindesign.com/wp-content/uploads/2016/03/Mountain-Retreat-Montana-KA-Architecture-01-1-Kindesign.jpg"
  },
  {
    title: "Eco-Friendly Lodge",
    description: "Enjoy a sustainable stay with eco-friendly practices in the heart of nature.",
    image: "https://outdoorswire.usatoday.com/wp-content/uploads/sites/114/2022/12/ecolodge_Playa-Viva-e1674079193732.jpg?w=1000&h=600&crop=1"
  }
]; // Add featured places here

const BookingSearch = () => {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;

  return (
    <>
      <Header />
      {/* Banner Section */}
      <div className="banner-section">
        <img src="https://images.unsplash.com/photo-1496950866446-3253e1470e8e?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Travel Destination" className="banner-image" />

        {/* Search Form */}
        <Container className="search-container">
          <Form className="search-form">
            <Row className="search-row">
              {/* Destination Field */}
              <Col md={4} className="search-col">
                <Form.Group className="search-group">
                  <FaMapMarkerAlt className="search-icon" />
                  <Form.Control type="text" placeholder="Where to?" />
                </Form.Group>
              </Col>

              {/* Category Select */}
              <Col md={3} className="search-col">
                <Form.Group className="search-group">
                  <FaBed className="search-icon" />
                  <Form.Select>
                    <option>Hotels</option>
                    <option>Restaurants</option>
                    <option>Attractions</option>
                  </Form.Select>
                </Form.Group>
              </Col>

              {/* Date Picker Field */}
              <Col md={4} className="search-col">
                <Form.Group className="search-group">
                  <FaCalendarAlt className="search-icon" />
                  <DatePicker
                    selected={startDate}
                    onChange={(update) => setDateRange(update)}
                    startDate={startDate}
                    endDate={endDate}
                    selectsRange
                    minDate={new Date()}
                    dateFormat="MMM d"
                    placeholderText="Dates"
                    className="date-picker"
                  />
                </Form.Group>
              </Col>

              {/* Search Button */}
              <Col md={1} className="search-col">
                <Button className="search-button">Search</Button>
              </Col>
            </Row>
          </Form>
        </Container>
        <div className="banner-overlay"></div>
      </div>

      <Container className="booking-search mt-5">
        {/* Filters Section */}
        <Accordion className="filter-accordion">
          <Accordion.Item eventKey="0">
            <Accordion.Header>Filters</Accordion.Header>
            <Accordion.Body>
              <Row>
                <Col md={6}>
                  <Form.Label>Price Range</Form.Label>
                  <Form.Range />
                </Col>
                <Col md={6}>
                  <Form.Label>Minimum Rating</Form.Label>
                  <Form.Select>
                    <option>3 Stars & Up</option>
                    <option>4 Stars & Up</option>
                    <option>5 Stars Only</option>
                  </Form.Select>
                </Col>
              </Row>
              <Row className="mt-3">
                <Col>
                  <Form.Check type="switch" label="Eco-Friendly Only" />
                </Col>
              </Row>
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {/* Featured Places Section */}
        <Carousel className="featured-places mt-5">
          {featuredPlaces.map((place, index) => (
            <Carousel.Item key={index}>
              <img
                className='d-block w-100'
                src={place.image}
                alt={place.title}
              />
              <Carousel.Caption>
                <h3>{place.title}</h3>
                <p>{place.description}</p>
                <Button variant="success">Book Now</Button>
              </Carousel.Caption>
            </Carousel.Item>
          ))}
        </Carousel>

        {/* Featured Journeys Section */}
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
