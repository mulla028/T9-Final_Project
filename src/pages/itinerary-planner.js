"use client";
import { FaCar, FaBiking, FaWalking, FaBus } from "react-icons/fa";
import { Container, Row, Col, Button, Form, ListGroup } from "react-bootstrap";
import { APIProvider, places } from "@vis.gl/react-google-maps";
import MapComponent from "@/components/MapComponent";
import React, { useState, useEffect, useRef } from "react";

const mapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const ItineraryPlanner = () => {
    const [stops, setStops] = useState([]);
    const [newStop, setNewStop] = useState("");
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const [travelMode, setTravelMode] = useState("DRIVING"); // Track selected travel mode
    const inputRef = useRef(null);

    useEffect(() => {
        const checkGoogle = setInterval(() => {
            if (window.google && window.google.maps && window.google.maps.places) {
                setGoogleLoaded(true);
                clearInterval(checkGoogle);
            }
        }, 500);

        return () => clearInterval(checkGoogle);
    }, []);

    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    setCurrentLocation({ lat: latitude, lng: longitude });
                    setLoadingLocation(false);
                },
                (error) => {
                    console.error("Error getting location:", error);
                    setCurrentLocation({ lat: 40.7128, lng: -74.0060 }); // Default to New York
                    setLoadingLocation(false);
                }
            );
        } else {
            console.error("Geolocation not supported");
            setCurrentLocation({ lat: 40.7128, lng: -74.0060 });
            setLoadingLocation(false);
        }
    }, []);

    useEffect(() => {
        if (googleLoaded && inputRef.current) {
            const autocomplete = new window.google.maps.places.Autocomplete(inputRef.current, {
                types: ["geocode"],
            });

            autocomplete.addListener("place_changed", () => {
                const place = autocomplete.getPlace();
                if (place.geometry && place.formatted_address) {
                    setNewStop(place.formatted_address);
                }
            });
        }
    }, [googleLoaded]);

    const handleAddStop = () => {
        if (newStop.trim() === "") return;
        setStops([...stops, newStop]);
        setNewStop("");
    };

    const handleRemoveStop = (index) => {
        setStops(stops.filter((_, i) => i !== index));
    };

    // Function to update travel mode
    const handleTravelModeChange = (mode) => {
        setTravelMode(mode);
    };

    return (
        <Container className="itinerary-planner" style={{ marginTop: "60px" }}>
            <div className="hero">
                <h1>Plan Your Eco-Friendly Adventure</h1>
                <p>Curate personalized itineraries with sustainable travel options.</p>
            </div>

            <Row className="mt-5">
                <Col md={8}>
                    <div>
                        <APIProvider apiKey={mapAPI} libraries={["places"]}>
                            <div>
                                {loadingLocation ? (
                                    <p>Fetching your location...</p>
                                ) : (
                                    <MapComponent
                                        origin={currentLocation}
                                        stops={stops}
                                        setStops={setStops}
                                        travelMode={travelMode} // Pass selected travel mode
                                    />
                                )}
                            </div>
                        </APIProvider>
                    </div>
                </Col>

                <Col md={4}>
                    <h4>Itinerary Stops</h4>
                    <ListGroup className="mb-3">
                        {stops.map((stop, index) => (
                            <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                                <strong>{stop}</strong>
                                <Button onClick={() => handleRemoveStop(index)} variant="outline-danger" size="sm">
                                    Remove
                                </Button>
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Form className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Add a new stop"
                            className="mb-2"
                            ref={inputRef}
                            value={newStop}
                            onChange={(e) => setNewStop(e.target.value)}
                        />
                        <Button onClick={handleAddStop} variant="outline-success" className="w-100">
                            Add Stop
                        </Button>
                    </Form>

                    <h4>Travel Mode</h4>
                    <div className="d-flex justify-content-between mb-4">
                        <Button 
                            variant={travelMode === "DRIVING" ? "success" : "outline-secondary"} 
                            style={{ color: travelMode === "DRIVING" ? "white" : "black" }}
                            className="mode-button" 
                            onClick={() => setTravelMode("DRIVING")}
                        >
                            <FaCar /> Drive
                        </Button>
                        <Button 
                            variant={travelMode === "BICYCLING" ? "success" : "outline-secondary"} 
                            style={{ color: travelMode === "BICYCLING" ? "white" : "black" }}
                            className="mode-button" 
                            onClick={() => setTravelMode("BICYCLING")}
                        >
                            <FaBiking /> Bike
                        </Button>
                        <Button 
                            variant={travelMode === "WALKING" ? "success" : "outline-secondary"} 
                            style={{ color: travelMode === "WALKING" ? "white" : "black" }}
                            className="mode-button" 
                            onClick={() => setTravelMode("WALKING")}
                        >
                            <FaWalking /> Walk
                        </Button>
                        <Button 
                            variant={travelMode === "TRANSIT" ? "success" : "outline-secondary"} 
                            style={{ color: travelMode === "TRANSIT" ? "white" : "black" }}
                            className="mode-button" 
                            onClick={() => setTravelMode("TRANSIT")}
                        >
                            <FaBus /> Public Transport
                        </Button>
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
