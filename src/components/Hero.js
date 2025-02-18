import { useState, useRef, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import { Autocomplete } from '@react-google-maps/api';
import { fetchPlaces } from '@/services/index';

const Hero = ({ setSearchResults }) => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const [autocompleteSelected, setAutocompleteSelected] = useState(false);
    const autoCompleteRef = useRef(null);
    const inputRef = useRef(null);
    const [travelStyle, setTravelStyle] = useState('Cultural Immersion');

    // Handle place selection from Autocomplete
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

    // Handle search logic
    const handleSearch = async () => {
        if (!searchInput.trim()) {
            alert("Please enter a destination before searching.");
            return;
        }
    
        console.log("🔍 Sending request to API with:", { searchInput, travelStyle });
    
        try {
            const data = await fetchPlaces(searchInput, travelStyle);
            console.log("✅ Search Results:", data);
            setSearchResults(data);
        } catch (error) {
            console.error("❌ Error fetching places:", error);
        }
    };    

    // Handle Enter Key Behavior
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
    }, [searchInput, travelStyle]);

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

                {/* Search Form */}
                <Form
                    className="d-flex justify-content-center align-items-center mt-4 gap-2"
                    style={{ animation: 'fadeIn 2s ease-out' }}
                >
                    {/* Destination Field with Autocomplete */}
                    <div className="position-relative" style={{ width: '50%' }}>
                        <Autocomplete
                            onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
                            onPlaceChanged={handlePlaceSelect}
                        >
                            <Form.Control
                                ref={inputRef}
                                type="text"
                                placeholder="Where do you want to slow down?"
                                className="search-input"
                                style={{
                                    width: '100%',
                                    minWidth: '250px',
                                    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                                }}
                                value={searchInput}
                                onChange={(e) => {
                                    setSearchInput(e.target.value);
                                    setAutocompleteSelected(false); // Reset selection
                                }}
                                onKeyDown={handleKeyDown} // Handles Enter key behavior
                            />
                        </Autocomplete>
                    </div>

                    {/* Category Select */}
                    <Form.Select
                        value={travelStyle}
                        className="search-input"
                        style={{
                            width: '25%',
                            minWidth: '180px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}
                        onChange={(e) => setTravelStyle(e.target.value)}
                    >
                        <option>Cultural Immersion</option>
                        <option>Eco-Stays</option>
                        <option>Outdoor Adventures</option>
                        <option>Eco-Tourism</option>
                        <option>Farm-to-Table Dining</option>
                        <option>Wildlife Conservation</option>
                    </Form.Select>

                    {/* Search Button */}
                    <Button
                        variant="success"
                        className="search-button"
                        style={{
                            minWidth: '120px',
                            background: 'linear-gradient(90deg, #28a745, #218838)',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                        }}
                        onClick={handleSearch}
                    >
                        Search
                    </Button>
                </Form>
            </Container>
        </div>
    );
};

export default Hero;
