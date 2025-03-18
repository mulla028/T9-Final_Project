import { FaCar, FaBiking, FaWalking, FaBus } from "react-icons/fa";
import { useRouter } from "next/router";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "@/components/MapComponent";
import React, { useState, useEffect, useRef } from "react";

const mapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const ItineraryPlanner = () => {
    const router = useRouter();
    const { id, day } = router.query;

    const [stops, setStops] = useState([]);
    const [newStop, setNewStop] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [travelMode, setTravelMode] = useState("DRIVING");

    const inputRef = useRef(null);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setCurrentLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                    setLoadingLocation(false);
                },
                () => {
                    setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
                    setLoadingLocation(false);
                }
            );
        } else {
            setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
            setLoadingLocation(false);
        }
    }, []);

    useEffect(() => {
        const savedStop = localStorage.getItem("newStop");
        if (savedStop) {
            const parsedStop = JSON.parse(savedStop);

            setStops(prevStops => {
                if (!prevStops.some(stop => stop.address === parsedStop.address)) {
                    return [...prevStops, parsedStop];
                }
                return prevStops;
            });

            localStorage.removeItem("newStop");
        }
    }, []);

    useEffect(() => {
        if (window.google && window.google.maps && inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current);

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.formatted_address) {
                    setNewStop({
                        name: place.name || "Not Available",
                        address: place.formatted_address
                    });
                }
            });
        }
    }, []);

    const handleAddStop = () => {
        if (!newStop || !newStop.address) return;
        setStops([...stops, newStop]);
        setNewStop(null);
    };

    const handleRemoveStop = (index) => {
        setStops(stops.filter((_, i) => i !== index));
    };

    return (
        <Container className="itinerary-planner" style={{ marginTop: "60px" }}>
            <div className="hero">
                <h1>Plan Your Eco-Friendly Adventure</h1>
                <p>Curate personalized itineraries with sustainable travel options.</p>
            </div>

            <Row className="mt-5">
                <Col md={8}>
                    <APIProvider apiKey={mapAPI} libraries={["places"]}>
                        {loadingLocation ? (
                            <p>Fetching your location...</p>
                        ) : (
                            <MapComponent
                                origin={currentLocation}
                                stops={stops}
                                setStops={setStops}
                                travelMode={travelMode}
                            />
                        )}
                    </APIProvider>
                </Col>

                <Col md={4}>
                    <h4>Itinerary Stops</h4>
                    <ListGroup className="mb-3">
                        {stops.map((stop, index) => (
                            <ListGroup.Item key={index} className="d-flex flex-column">
                                <div className="d-flex justify-content-between align-items-center">
                                    <strong>{stop.name || stop.address}</strong>
                                    <Button onClick={() => handleRemoveStop(index)} variant="outline-danger" size="sm">
                                        Remove
                                    </Button>
                                </div>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Form className="mb-3" onSubmit={(e) => e.preventDefault()}>
                        <Form.Control
                            type="text"
                            placeholder="Search or add a new stop"
                            className="mb-2"
                            ref={inputRef}
                            value={newStop?.name || newStop?.address || ""}
                            onChange={(e) => setNewStop({ ...newStop, address: e.target.value })}
                        />
                        <Button
                            onClick={handleAddStop}
                            variant="outline-success"
                            className="w-100"
                            disabled={!newStop || (!newStop.name && !newStop.address)}
                        >
                            Add Stop
                        </Button>
                    </Form>

                    <h4>Travel Mode</h4>
                    <div className="d-flex justify-content-between mb-4">
                        <Button variant={travelMode === "DRIVING" ? "success" : "outline-secondary"} onClick={() => setTravelMode("DRIVING")}><FaCar /> Drive</Button>
                        <Button variant={travelMode === "BICYCLING" ? "success" : "outline-secondary"} onClick={() => setTravelMode("BICYCLING")}><FaBiking /> Bike</Button>
                        <Button variant={travelMode === "WALKING" ? "success" : "outline-secondary"} onClick={() => setTravelMode("WALKING")}><FaWalking /> Walk</Button>
                        <Button variant={travelMode === "TRANSIT" ? "success" : "outline-secondary"} onClick={() => setTravelMode("TRANSIT")}><FaBus /> Public Transport</Button>
                    </div>

                    <Button variant="primary" className="w-100">
                        Save Itinerary
                    </Button>
                </Col>
            </Row>
        </Container>
    );
};

export default ItineraryPlanner;
