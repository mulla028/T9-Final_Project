import { useState } from 'react';
import { useRouter } from 'next/router';
import Header from '@/components/Header';
import { Container, Row, Col, Form, Button, Card } from 'react-bootstrap';
import { FaMapMarkerAlt, FaList, FaUsers, FaArrowRight, FaArrowLeft } from 'react-icons/fa';
import usePlacesAutocomplete from 'use-places-autocomplete';
import { fetchPlaces } from '@/services/index';

const curatedJourneys = [
    { title: "Bali Slow Travel Experience", description: "Explore Bali’s culture with local artisans and eco-friendly stays.", image: "/images/bali.jpg" },
    { title: "Tuscany Countryside Retreat", description: "Stay in a vineyard, learn sustainable farming, and embrace the slow life.", image: "/images/tuscany.jpg" },
    { title: "Bali Slow Travel Experience", description: "Explore Bali’s culture with local artisans and eco-friendly stays.", image: "/images/bali.jpg" },
    { title: "Tuscany Countryside Retreat", description: "Stay in a vineyard, learn sustainable farming, and embrace the slow life.", image: "/images/tuscany.jpg" },
    { title: "Bali Slow Travel Experience", description: "Explore Bali’s culture with local artisans and eco-friendly stays.", image: "/images/bali.jpg" },
    { title: "Tuscany Countryside Retreat", description: "Stay in a vineyard, learn sustainable farming, and embrace the slow life.", image: "/images/tuscany.jpg" }
];

const topSlowCities = [
    { name: "Kyoto, Japan", image: "/images/kyoto.jpg" },
    { name: "Barcelona, Spain", image: "/images/barcelona.jpg" },
    { name: "Kyoto, Japan", image: "/images/kyoto.jpg" },
    { name: "Barcelona, Spain", image: "/images/barcelona.jpg" },
    { name: "Bali, Indonesia", image: "/images/kyoto.jpg" },
    { name: "Athens, Greece", image: "/images/barcelona.jpg" },
    { name: "Kyoto, Japan", image: "/images/kyoto.jpg" },
    { name: "Barcelona, Spain", image: "/images/barcelona.jpg" },
    { name: "Kyoto, Japan", image: "/images/kyoto.jpg" },
    { name: "Barcelona, Spain", image: "/images/barcelona.jpg" }
];

const topSustainableStays = [
    { name: "Eco Haven Resort", location: "Bali, Indonesia", image: "/images/eco-haven.jpg" },
    { name: "Green Retreat Lodge", location: "Tuscany, Italy", image: "/images/green-retreat.jpg" },
    { name: "Eco Haven Resort", location: "Bali, Indonesia", image: "/images/eco-haven.jpg" },
    { name: "Green Retreat Lodge", location: "Tuscany, Italy", image: "/images/green-retreat.jpg" },
    { name: "Eco Haven Resort", location: "Bali, Indonesia", image: "/images/eco-haven.jpg" },
    { name: "Green Retreat Lodge", location: "Tuscany, Italy", image: "/images/green-retreat.jpg" },
    { name: "Eco Haven Resort", location: "Bali, Indonesia", image: "/images/eco-haven.jpg" },
];

const thingsToDo = [
    { title: "Cooking with Locals", location: "Bali, Indonesia", image: "/images/cooking.jpg" },
    { title: "Organic Farm Tour", location: "Tuscany, Italy", image: "/images/farm.jpg" },
    { title: "Cooking with Locals", location: "Bali, Indonesia", image: "/images/cooking.jpg" },
    { title: "Organic Farm Tour", location: "Tuscany, Italy", image: "/images/farm.jpg" },
    { title: "Cooking with Locals", location: "Bali, Indonesia", image: "/images/cooking.jpg" },
    { title: "Organic Farm Tour", location: "Tuscany, Italy", image: "/images/farm.jpg" },
    { title: "Cooking with Locals", location: "Bali, Indonesia", image: "/images/cooking.jpg" },
    { title: "Organic Farm Tour", location: "Tuscany, Italy", image: "/images/farm.jpg" },
    { title: "Cooking with Locals", location: "Bali, Indonesia", image: "/images/cooking.jpg" },
    { title: "Organic Farm Tour", location: "Tuscany, Italy", image: "/images/farm.jpg" }
];


const BookingPage = () => {
    const { ready, value, setValue, suggestions, clearSuggestions } = usePlacesAutocomplete();
    const [searchResults, setSearchResults] = useState([]);
    const [travelStyle, setTravelStyle] = useState('Cultural Immersion');
    const [groupSize, setGroupSize] = useState(1);
    const [currentIndexThingsToDo, setCurrentIndexThingsToDo] = useState(0);
    const [currentIndexCities, setCurrentIndexCities] = useState(0);

    const router = useRouter();

    const handleNext = (array, setCurrentIndex, currentIndex) => {
        const itemsPerPage = 4;
        const totalItems = array.length;

        if (currentIndex + itemsPerPage < totalItems) {
            setCurrentIndex(prev => prev + itemsPerPage);
        } else {
            // Ensure the last set shows the correct items without gaps
            const newIndex = totalItems - (totalItems % itemsPerPage === 0 ? itemsPerPage : totalItems % itemsPerPage);
            setCurrentIndex(newIndex);
        }
    };

    const handlePrev = (setCurrentIndex, currentIndex) => {
        if (currentIndex > 0) {
            setCurrentIndex(prev => Math.max(prev - 4, 0));
        }
    };

    const handleFetchPlaces = async () => {
        if (!value) return;
        try {
            const data = await fetchPlaces(value, travelStyle);
            setSearchResults(data);
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    }

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
                            <Col md={4} className='search-col'>
                                <Form.Group className="search-group">
                                    <FaMapMarkerAlt className="search-icon" />
                                    <Form.Control type="text" placeholder="Where to?" value={value} onChange={(e) => setValue(e.target.value)} />
                                    {suggestions.length > 0 && (
                                        <ul className="autocomplete-dropdown">
                                            {suggestions.map((suggestion) => (
                                                <li key={suggestion.place_id} onClick={() => { setValue(suggestion.description); clearSuggestions(); }}>
                                                    {suggestion.description}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </Form.Group>
                            </Col>

                            {/* Category Select */}
                            <Col md={4} className="search-col">
                                <Form.Group className="search-group">
                                    <FaList className="search-icon" />
                                    <Form.Select value={travelStyle} onChange={(e) => setTravelStyle(e.target.value)}>
                                        <option>Cultural Immersion</option>
                                        <option>Eco-Stays</option>
                                        <option>Outdoor Adventures</option>
                                        <option>Eco-Tourism</option>
                                        <option>Farm-to-Table Dining</option>
                                        <option>Wildlife Conservation</option>
                                    </Form.Select>

                                </Form.Group>
                            </Col>

                            <Col md={3} className="search-col">
                                <Form.Group className="search-group">
                                    <FaUsers className="search-icon" />
                                    <Form.Control type="number" min="1" value={groupSize} onChange={(e) => setGroupSize(e.target.value)} />
                                </Form.Group>
                            </Col>

                            {/* Search Button */}
                            <Col md={1} className="search-col">
                                <Button className="search-button" onClick={handleFetchPlaces}>Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
                <div className="banner-overlay"></div>
            </div>

            <Container className="booking-search mt-5">
                {/* Search Results Section */}
                {
                    searchResults.length > 0 && (
                        <Container className="search-results mt-5">
                            <h2>Search Results</h2>
                            <Row>
                                {searchResults.map((result, index) => (
                                    <Col md={4} key={index}>
                                        <Card className='destination-card'>
                                            <Card.Img variant="top" src={result.image || '/images/default-hotel.jpg'} />
                                            <Card.Body>
                                                <Card.Title>{result.name}</Card.Title>
                                                <Card.Text>{result.description || 'No description available.'}</Card.Text>
                                                <Button variant="outline-success" className='my-button' href={`/booking-details/${result.place_id}`}>View Details</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </Container>
                    )
                }

                {/* Curated Slow Travel Journeys */}
                <Container className="mt-5">
                    <h2>Curated Slow Travel Journeys</h2>
                    <Row>
                        {curatedJourneys.map((journey, index) => (
                            <Col md={6} key={index}>
                                <Card className='destination-card'>
                                    <Card.Img variant="top" src={journey.image} />
                                    <Card.Body>
                                        <Card.Title>{journey.title}</Card.Title>
                                        <Card.Text>{journey.description}</Card.Text>
                                        <Button variant="outline-primary" className='my-button'>Read More</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

                {/* Top Sustainable Stays */}
                <Container className="mt-5">
                    <h2>Top Sustainable Stays</h2>
                    <Row>
                        {topSustainableStays.map((stay, index) => (
                            <Col md={4} key={index}>
                                <Card className='destination-card'>
                                    <Card.Img variant="top" src={stay.image} />
                                    <Card.Body>
                                        <Card.Title>{stay.name}</Card.Title>
                                        <Card.Text>{stay.location}</Card.Text>
                                        <Button variant="outline-primary" className='my-button'>Book Now</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        ))}
                    </Row>
                </Container>

                {/* Top Things to Do */}
                <Container className="mt-5">
                    <h2 className='text-center mb-4'>Top Things to Do</h2>
                    <Row className="destination-carousel">

                        {/* Left Arrow: Show only if not at the first card */}
                        {currentIndexThingsToDo > 0 && (
                            <Button variant="outline-secondary" className="carousel-control prev"
                                onClick={() => handlePrev(setCurrentIndexThingsToDo, currentIndexThingsToDo)}>
                                <FaArrowLeft />
                            </Button>
                        )}

                        {/* Experience Cards */}
                        <div className="carousel-wrapper">
                            <Row
                                className="carousel-row"
                                style={{
                                    transform: `translateX(-${(currentIndexThingsToDo / 4) * 100}%)`
                                }}
                            >
                                {thingsToDo.map((activity, index) => (
                                    <Col md={3} key={index}>
                                        <Card className='destination-card'>
                                            <Card.Img variant="top" src={activity.image} />
                                            <Card.Body>
                                                <Card.Title>{activity.title}</Card.Title>
                                                <Card.Text>{activity.location}</Card.Text>
                                                <Button variant="outline-primary" className='my-button'>Explore</Button>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        {/* Right Arrow: Show only if not at the last card */}
                        {currentIndexThingsToDo + 4 < thingsToDo.length && (
                            <Button variant="outline-secondary" className="carousel-control next"
                                onClick={() => handleNext(thingsToDo, setCurrentIndexThingsToDo, currentIndexThingsToDo)}>
                                <FaArrowRight />
                            </Button>
                        )}
                    </Row>
                </Container>

                {/* Slow Travel Cities Section */}
                <Container className="mt-5">
                    <h2>Top Slow Travel Cities</h2>
                    <Row className="destination-carousel">

                        {/* Left Arrow: Show only if not at the first card */}
                        {currentIndexCities > 0 && (
                            <Button variant="outline-secondary" className="carousel-control prev"
                                onClick={() => handlePrev(setCurrentIndexCities, currentIndexCities)}>
                                <FaArrowLeft />
                            </Button>
                        )}

                        {/* Destination Cards */}
                        <div className="carousel-wrapper">
                            <Row
                                className="carousel-row"
                                style={{
                                    transform: `translateX(-${(currentIndexCities / 4) * 100}%)`
                                }}>
                                {topSlowCities.map((city, index) => (
                                    <Col md={3} key={index}>
                                        <Card className='destination-card'>
                                            <Card.Img variant="top" src={city.image} />
                                            <Card.Body>
                                                <Card.Title>{city.name}</Card.Title>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                ))}
                            </Row>
                        </div>

                        {/* Right Arrow: Show only if not at the last card */}
                        {currentIndexCities + 4 < topSlowCities.length && (
                            <Button variant="outline-secondary" className="carousel-control next"
                                onClick={() => handleNext(topSlowCities, setCurrentIndexCities, currentIndexCities)}>
                                <FaArrowRight />
                            </Button>
                        )}
                    </Row>
                </Container>
            </Container>
        </>
    );
};

export default BookingPage;
