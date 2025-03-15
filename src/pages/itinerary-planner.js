"use client";
import { FaCar, FaBiking, FaWalking, FaBus } from "react-icons/fa";
import { useRouter } from 'next/router';
import { Container, Row, Col, Card, Button, Form, ListGroup, Navbar, Stack } from "react-bootstrap";
import { APIProvider } from "@vis.gl/react-google-maps";
import MapComponent from "@/components/MapComponent";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { getItineraryForDay, updateItineraryForDay } from "@/services";

const mapAPI = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const ItineraryPlanner = () => {
    const router = useRouter();
    const { id } = router.query;
    const { day } = router.query;


    const [stops, setStops] = useState([{}]);
    const [itinerary, setItinerary] = useState(null);

    const [newStop, setNewStop] = useState(null);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const [travelMode, setTravelMode] = useState("DRIVING"); // Track selected travel mode

    const inputRef = useRef(null);

    const onLoad = async (e) => {
        e.preventDefault();

    };

    useEffect(() => {
        if (!id || !day) return;

        // Fetch the itinerary for the specific user and day
        const fetchItinerary = async () => {
            try {
                const itineraryData = await getItineraryForDay(id, day);
                //console.log("Fetched itinerary:", itineraryData); // Debug log
                if (itineraryData) {
                    setItinerary(itineraryData); // Save the full itinerary

                    const mapTravelMode = (mode) => {
                        const modeMap = {
                            "drive" : "DRIVING",
                            "bike" : "BICYCLING",
                            "walk" :  "WALKING",
                            "public transport" : "TRANSIT"
                        };
                        return modeMap[mode] || "DRIVING"; // Default to "drive" if the mode is unrecognized
                      };

                    const mappedMode = mapTravelMode(itineraryData.itinerary.transport.mode);
                    setTravelMode(mappedMode);
                    let newStops = []; // Temporary array to accumulate stops

                    // Convert itinerary data to stop data from stay
                    itineraryData.itinerary.stay?.forEach(itinerary => {
                        const newStop = {
                            name: itinerary.name,
                            address: itinerary.location,
                            placeId: itinerary.placeId
                        };
                        newStops.push(newStop);
                    });

                    // Add experiences to the stops
                    itineraryData.itinerary.experiences?.forEach(itinerary => {
                        
                        const newStop = {
                            name: itinerary.name,
                            address: itinerary.location,
                            placeId: itinerary.placeId
                        };
                        newStops.push(newStop);
                    });


                   // console.log("Stops to set:", newStops); // Debug log
                    setStops(newStops); // Set stops with all accumulated stops
                } else {
                    console.log("No itinerary found");
                }
            } catch (error) {
                console.error("Error fetching itinerary:", error);
            }
        };

        fetchItinerary();
    }, [id, day]);

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
    }, [googleLoaded]);

    const handleAddStop = () => {
        if (!newStop || !newStop.address) return;
        setStops([...stops, newStop]);
        setNewStop(null);
    };

    const handleRemoveStop = (index) => {
        setStops(stops.filter((_, i) => i !== index));
    };

    const handleSaveItinerary = async () => {
        if (!id || !day) return;

        const updatedItinerary = {
            day: Number(day),
            stay: itinerary?.stay || null,
            experiences: stops.map(stop => ({
                placeId: stop.placeId || null,
                name: stop.name,
                location: stop.address,
                time: "Morning", // Placeholder - allow users to set this dynamically
                paid: false, // Default value
            })),
        };

        try {
            await updateItineraryForDay(id, day, updatedItinerary, travelMode);
            alert("Itinerary saved successfully!");
        } catch (error) {
            console.error("Error saving itinerary:", error);
            alert("Failed to save itinerary");
        }
    };

    return (
        <Container className="itinerary-planner" style={{ marginTop: "60px" }} onLoad={onLoad} >
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

                                {/* Contact & Booking Section - Only show if stops exist */}
                                {/* {stop.name && (<div className="mt-2">
                                    <p><strong>Phone:</strong> {stop.phone}</p>
                                    <p><strong>Website:</strong> <a href={stop.website} target="blank">Website</a></p>
                                </div>) */}

                                
                                {/* Pricing & Availability Section */}
                                {/* <div className="mt-2">
                                        <h6>Pricing & Availability</h6>
                                        <p>Standard Pricing: $100</p>
                                        <p>Availability: Open 9 AM - 5 PM</p>
                                    </div> */}
                            </ListGroup.Item>
                        ))}
                    </ListGroup>

                    <Form className="mb-3">
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

                    <Button variant="primary" className="w-100" onClick={handleSaveItinerary}>
                        Save Itinerary
                    </Button>
                </Col>
            </Row>
        </Container>
    );
    // } else {
    //     return (
    //         <Container className="text-center mt-5">
    //             <h1>Trip could not be found</h1>
    //             <Link href="/">Return to home page</Link>
    //         </Container>
    //     );
    // }
};

export default ItineraryPlanner;
