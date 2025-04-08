import { useState, useEffect, useRef } from "react";
import { Container, Row, Col, Card, Button, Form, Spinner } from "react-bootstrap";
import { FaStar } from "react-icons/fa";
import { Autocomplete } from '@react-google-maps/api';
import { fetchExperiences } from '@/services/index';

const LocalExperiences = () => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const [autocompleteSelected, setAutocompleteSelected] = useState(false);
    const autoCompleteRef = useRef(null);
    const inputRef = useRef(null);
    const [experiences, setExperiences] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState("");
    const [sortBy, setSortBy] = useState("");

    // Fetch experiences on page load (geolocation-based)
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                const { latitude, longitude } = position.coords;
                fetchExperiences({ lat: latitude, lng: longitude }, category, sortBy).then((data) => {
                    setExperiences(data);
                    setLoading(false);
                }).catch((error) => {
                    console.error("Error fetching experiences:", error);
                });
            }, (error) => {
                console.error("Error getting geolocation:", error);
            });
        } else {
            console.warn("Geolocation is not supported by this browser.");
            fetchExperiences("Current Location", category, sortBy).then((data) => {
                setExperiences(data);
                setLoading(false);
            }).catch((error) => {
                console.error("Error fetching experiences:", error);
            });
        }
    }, []);

    // Global event listener for Enter key outside input box
    useEffect(() => {
        const handleGlobalKeyDown = (e) => {
            if (e.key === 'Enter' && document.activeElement !== inputRef.current) {
                e.preventDefault(); // Prevent default behavior
                handleSearch();
            }
        };

        document.addEventListener('keydown', handleGlobalKeyDown);
        return () => {
            document.removeEventListener('keydown', handleGlobalKeyDown);
        };
    }, [searchInput, category, sortBy]);

    // Handle place selection from Autocomplete // Handle place selection from Autocomplete
    const handlePlaceSelect = () => {
        if (autoCompleteRef.current) {
            const place = autoCompleteRef.current.getPlace();
            if (place && place.place_id) {
                setSearchInput(place.formatted_address);
                setSelectedPlaceId(place.place_id);
                setAutocompleteSelected(true); // Mark as selected
            }
        }
    };

    const handleSearch = () => {
        if (!searchInput.trim()) {
            alert("Please enter a destination before searching.");
            return;
        }
        fetchExperiences(searchInput, category, sortBy).then((data) => {
            setExperiences(data);
        }).catch((error) => {
            console.error("Error fetching experiences:", error);
        });
    };

    // Handle Enter Key Behavior// Handle Enter Key Behavior
    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form behavior

            // If autocomplete is open, select the option first
            if (!autocompleteSelected) {
                handlePlaceSelect();
            } else {
                handleSearch(); // If already selected, trigger search
            }
        }
    };


    return (
        <Container className="local-experiences mt-5">
            {/* Header */}
            <Row className="mb-5">
                <Col>
                    <h1 className="text-center">Discover Local Experiences</h1>
                </Col>
            </Row>

            {/* Search, Filters & Sorting */}
            <Row className="mb-4">
                <Col md={5}>
                    <Autocomplete
                        onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
                        onPlaceChanged={handlePlaceSelect}
                        className="autocomplete"
                    >
                        <Form.Control
                            ref={inputRef}
                            type="text"
                            placeholder="Search Destination..."
                            value={searchInput}
                            onChange={(e) => {
                                setSearchInput(e.target.value);
                                setAutocompleteSelected(false); // Reset selection
                            }}
                            onKeyDown={handleKeyDown}
                            style={{ borderRadius: "30px" }}
                        />
                    </Autocomplete>
                </Col>

                {/* Category Select */}
                <Col md={3}>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="">All Categories</option>
                        <option value="Workshops">Workshops</option>
                        <option value="Cultural">Cultural</option>
                        <option value="Eco-Friendly">Eco-Friendly</option>
                        <option value="Dining">Dining</option>
                        <option value="Adventure">Adventure</option>
                        <option value="Tours">Tours</option>
                    </Form.Select>
                </Col>

                {/* Sort By Select */}
                <Col md={2}>
                    <Form.Select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
                        <option value="">Sort By</option>
                        <option value="Price">Price</option>
                        <option value="Rating">Rating</option>
                        <option value="Popularity">Popularity</option>
                    </Form.Select>
                </Col>

                {/* Search Button */}
                <Col md={2}>
                    <Button variant="success" onClick={handleSearch}>Search</Button>
                </Col>
            </Row>

            {/* Experience Grid */}
            {loading ? (
                <Spinner animation="border" className="d-block mx-auto mt-5" />
            ) : (
                <Row>
                    {experiences.length > 0 ? experiences.map((experience, index) => (
                        <Col md={4} key={index} className="mb-4">
                            <Card className="experience-card shadow-lg">
                                <Card.Img variant="top" src={experience.image} className="experience-image" />
                                <Card.Body>
                                    <Card.Title className="experience-title">{experience.name}</Card.Title>
                                    <Card.Text className="experience-text">
                                        <strong>Location:</strong> {experience.address} <br />
                                        <strong>Rating:</strong> {experience.rating} ⭐ ({experience.userRatings} reviews)
                                    </Card.Text>
                                    <div className="rating">
                                        {[...Array(Math.round(experience.rating === "No Rating" ? 0 : experience.rating))].map((_, i) => (
                                            <FaStar key={i} color="#ffcc00" />
                                        ))}
                                        {[...Array(5 - Math.round(experience.rating === "No Rating" ? 0 : experience.rating))].map((_, i) => (
                                            <FaStar key={i} color="#d3d3d3" />
                                        ))}
                                    </div>
                                    <Button variant="success" className="rounded-pill" href={`/booking-details/${experience.id}`}>
                                        View Details
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Col>
                    )) : (
                        <Col>
                            <p className="text-center mt-4">No experiences found for this location.</p>
                        </Col>
                    )}
                </Row>
            )}
        </Container>
    );
};

export default LocalExperiences;
