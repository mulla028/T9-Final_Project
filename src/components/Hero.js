import { Container, Form, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import { LoadScript, Autocomplete } from "@react-google-maps/api";
import { useRouter } from "next/router"; // ✅ Correct Next.js navigation

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY; // ✅ Use public key for frontend

const Hero = () => {
    const [searchInput, setSearchInput] = useState("");
    const [selectedPlaceId, setSelectedPlaceId] = useState(null);
    const autoCompleteRef = useRef(null);
    const router = useRouter();

    // ✅ Ensure correct selection when using the dropdown
    const handlePlaceSelect = () => {
        if (autoCompleteRef.current) {
            const place = autoCompleteRef.current.getPlace();
            if (place && place.place_id) {
                console.log("✅ Correct Place Selected:", place);
                setSearchInput(place.formatted_address);
                setSelectedPlaceId(place.place_id);
            }
        }
    };

    // ✅ Handle both button click and Enter key press
    const handleSearch = () => {
        if (searchInput.trim()) {
            // 🔹 Ensure we always fetch the selected place
            const place = autoCompleteRef.current?.getPlace();
            const placeId = place?.place_id || selectedPlaceId; // ✅ Use manually stored placeId if needed

            if (!placeId) {
                console.warn("⚠ No place_id found, using address only:", searchInput);
            }

            // ✅ Redirect with accurate place_id
            const queryParams = placeId
                ? `destination=${encodeURIComponent(searchInput)}&place_id=${placeId}`
                : `destination=${encodeURIComponent(searchInput)}`;

            console.log("🚀 Navigating to:", `/map?${queryParams}`);
            router.push(`/map?${queryParams}`);
        }
    };

    // ✅ Fix Enter Key Issue: Ensure selection before navigating
    const handleKeyPress = (event) => {
        if (event.key === "Enter") {
            event.preventDefault(); // ❌ Prevents page reload

            if (!selectedPlaceId) {
                console.warn("⚠ No place selected yet, forcing selection...");
                handlePlaceSelect(); // 🔹 Force selection from dropdown
                setTimeout(() => handleSearch(), 200); // 🔹 Small delay to ensure data is updated
            } else {
                handleSearch();
            }
        }
    };

    return (
        <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={["places"]}>
            <div
                id="hero"
                className="hero-section"
                style={{
                    backgroundImage:
                        "url(https://images.unsplash.com/photo-1721456793774-03b354e24171?q=80&w=1376&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)",
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    height: "100vh",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                }}
            >
                <Container className="hero-content text-center">
                    <h1 className="hero-title">Discover the Art of Slow Travel</h1>
                    <p className="hero-subtitle">
                        Plan longer, eco-conscious trips that immerse you in culture, reduce your footprint, and support local communities.
                    </p>

                    {/* Search Bar */}
                    <Form className="d-flex justify-content-center mt-4" onSubmit={(e) => e.preventDefault()}>
                        <Autocomplete
                            onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
                            onPlaceChanged={handlePlaceSelect} // ✅ Ensure place selection is stored
                        >
                            <Form.Control
                                type="text"
                                placeholder="Search for Destinations"
                                className="search-input"
                                style={{
                                    width: "75%",
                                    maxWidth: "800px",
                                    minWidth: "500px",
                                    padding: "14px",
                                    borderRadius: "8px",
                                    fontSize: "18px",
                                    height: "55px",
                                    border: "2px solid #ddd",
                                }}
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                onKeyDown={handleKeyPress} // ✅ Fix Enter Key Issue
                            />
                        </Autocomplete>
                        <Button
                            variant="success"
                            className="search-button"
                            style={{
                                marginLeft: "12px",
                                padding: "14px 28px",
                                fontSize: "18px",
                                height: "55px",
                                borderRadius: "8px",
                            }}
                            onClick={handleSearch}
                        >
                            Search
                        </Button>
                    </Form>
                </Container>
            </div>
        </LoadScript>
    );
};

export default Hero;
