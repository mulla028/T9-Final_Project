import { useState, useRef } from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { Autocomplete } from '@react-google-maps/api';
import { FaMapMarkerAlt, FaList, FaUsers } from 'react-icons/fa';
import { fetchPlaces } from '@/services/index';

const Hero = ({ setSearchResults }) => { // Receive setSearchResults as a prop
    const [searchInput, setSearchInput] = useState("");
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const autoCompleteRef = useRef(null);
    const [travelStyle, setTravelStyle] = useState('Cultural Immersion');
    const [groupSize, setGroupSize] = useState(1);

    const handlePlaceSelect = () => {
        if (autoCompleteRef.current) {
            const place = autoCompleteRef.current.getPlace();
            if (place && place.place_id) {
                setSearchInput(place.formatted_address);
                setSelectedPlaceId(place.place_id);
            }
        }
    };

    const handleSearch = async () => {
        if (!searchInput.trim()) return;

        try {
            const place = autoCompleteRef.current?.getPlace();
            const placeId = place?.place_id || selectedPlaceId;

            // Fetch search results and update index.js state
            const data = await fetchPlaces(searchInput, travelStyle);
            setSearchResults(data); // Update state in index.js
        } catch (error) {
            console.error("Error fetching places:", error);
        }
    };

    return (
        <div
            id="hero"
            className="hero-section"
            style={{
                background: `linear-gradient(to bottom, rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.6)), 
                             url(https://images.unsplash.com/photo-1721456793774-03b354e24171?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                height: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                flexDirection: 'column',
            }}
        >
            <Container className="hero-content text-center">
                <h1 className="hero-title" style={{ color: '#fff', marginBottom: '30px', animation: 'fadeIn 1s ease-out' }}>
                    Discover the Art of Slow Travel
                </h1>
                <p className="hero-subtitle" style={{ color: '#f0f0f0', marginBottom: '55px', animation: 'fadeIn 1.5s ease-out' }}>
                    Extended stays, cultural immersion, eco-conscious.
                </p>

                {/* Search Bar */}
                <Container className="search-container" style={{ animation: 'fadeIn 2s ease-out' }}>
                    <Form className="search-form">
                        <Row className="search-row">
                            {/* Destination Field with Autocomplete */}
                            <Col md={4} className='search-col'>
                                <Form.Group className="search-group">
                                    <FaMapMarkerAlt className="search-icon" />
                                    <Autocomplete
                                        onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
                                        onPlaceChanged={handlePlaceSelect}
                                    >
                                        <Form.Control
                                            type="text"
                                            placeholder="Where to?"
                                            value={searchInput}
                                            onChange={(e) => setSearchInput(e.target.value)}
                                        />
                                    </Autocomplete>
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
                                <Button className="search-button" onClick={handleSearch}>Search</Button>
                            </Col>
                        </Row>
                    </Form>
                </Container>
            </Container>
        </div>
    );
};

export default Hero;
