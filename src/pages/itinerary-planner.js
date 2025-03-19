"use client";
import { FaCar, FaBiking, FaWalking, FaBus, FaLeaf } from "react-icons/fa";
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
    const [selectedLocation, setSelectedLocation] = useState(null);
    const [addSelectedLocation, setAddSelectedLocation] = useState(false);
    const [loadingLocation, setLoadingLocation] = useState(true);
    const [googleLoaded, setGoogleLoaded] = useState(false);
    const [travelMode, setTravelMode] = useState("DRIVING"); // Track selected travel mode
    const [checkInDate, setCheckInDate] = useState(null);
    const [checkOutDate, setCheckOutDate] = useState(null);
    const [showCheckin, setshowCheckin] = useState(false);
    const [travelDistance, setTravelDistance] = useState(0);

    const inputRef = useRef(null);

    const onLoad = async (e) => {
        e.preventDefault();

    };

    useEffect(() => {
        if (!id || !day) return;

        const fetchItinerary = async () => {
            try {
                const itineraryData = await getItineraryForDay(id, day);
                if (itineraryData) {
                    setItinerary(itineraryData);
                    const newStops = [];
                    const addedPlaces = new Set();

                    // Set the travel mode based on fetched itinerary
                    if (itineraryData.itinerary.transport?.mode) {
                        switch (itineraryData.itinerary.transport.mode) {
                            case "drive":
                                setTravelMode("DRIVING");
                                break;
                            case "bike":
                                setTravelMode("BICYCLING");
                                break;

                            case "walk":
                                setTravelMode("WALKING");
                                break;

                            case "public transport":
                                setTravelMode("TRANSIT");
                                break;

                        }
                    }

                    // Process Stay as a Stop (if it exists)
                    if (itineraryData.itinerary.stay) {
                        const stay = itineraryData.itinerary.stay;
                        const key = stay.placeId || stay.location; // Unique key for deduplication
                        if (!addedPlaces.has(key)) {
                            newStops.push({
                                name: stay.placeName || "Stay Location",
                                address: stay.location || stay.address,
                                placeId: stay.placeId,
                                checkIn: stay.checkIn,
                                checkOut: stay.checkOut,
                                guests: stay.guests,
                                preferences: stay.preferences,
                            });
                            addedPlaces.add(key);
                        }
                    }

                    // Process Experiences as Stops
                    itineraryData.itinerary.experiences?.forEach(exp => {
                        const key = exp.placeId || exp.location;
                        if (!addedPlaces.has(key)) {
                            newStops.push({
                                name: exp.name,
                                address: exp.location,
                                placeId: exp.placeId,
                                time: exp.time
                            });
                            addedPlaces.add(key);
                        }
                    });

                    setStops(newStops);

                } else {
                    setLoadingLocation(false);
                }
            } catch (error) {
                console.error("Error fetching itinerary:", error);
                setLoadingLocation(false);
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
        // **Set Default Map Location to First Stop**
        if (stops.length > 0 && window.google && window.google.maps) {
            const firstStop = stops[0];
            const geocoder = new window.google.maps.Geocoder();
            geocoder.geocode({ address: firstStop.address }, (results, status) => {
                if (status === "OK" && results[0].geometry) {
                    setCurrentLocation({
                        lat: results[0].geometry.location.lat(),
                        lng: results[0].geometry.location.lng()
                    });
                    setLoadingLocation(false);
                } else {
                    console.error("Geocoding failed:", status);
                    setLoadingLocation(false);
                }
            });
        } else {
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
                        name: place.name || "Unnamed Place",
                        placeName: place.name || "Unnamed Place",
                        address: place.formatted_address || "Unknown Address",
                        phone: place.formatted_phone_number || "Not Available",
                        email: place.formatted_email || "Not Available",
                        placeId: place.place_id,
                        website: place.website || "Not Available",
                        price: place.price_level !== undefined ? `$${place.price_level}` : "N/A",
                        availability: place.opening_hours ? (place.opening_hours.open_now ? "Open Now" : "Closed") : "N/A",
                        type: place.types[0]
                    });
                }
            });
        }
    }, [googleLoaded]);

    useEffect(() => {
        if (!addSelectedLocation) return;

        if (selectedLocation && selectedLocation.type === "lodging") {
            setshowCheckin(true);

            // Check if there's already a lodging stop
            const stayCheck = stops.some(stop => stop.type === "lodging" || stop.checkIn);

            if (stayCheck) {
                alert("You have already selected your stay for this day, please remove to add another.");
                setSelectedLocation(null); // Hide InfoWindow after adding the stop
                setAddSelectedLocation(false); // Reset the flag
                setshowCheckin(false);
                return;
            }

            // Add lodging stop with check-in and check-out dates
            setStops((prevStops) => [
                ...prevStops,
                { ...selectedLocation, checkIn: checkInDate, checkOut: checkOutDate }
            ]);

        } else {
            // For non-lodging locations, just add the stop
            setStops((prevStops) => [...prevStops, selectedLocation]);
        }

        setSelectedLocation(null); // Hide InfoWindow after adding the stop
        setAddSelectedLocation(false); // Reset the flag
        setshowCheckin(false);

    }, [addSelectedLocation, selectedLocation, checkInDate, checkOutDate]);


    const handleAddStop = () => {
        if (!newStop || !newStop.address) return;
        setshowCheckin(true);

        // If it's a lodging type, include check-in and check-out dates
        if (newStop.type === "lodging" && checkInDate && checkOutDate) {
            setStops([...stops, { ...newStop, checkInDate, checkOutDate }]);
        } else {
            setStops([...stops, newStop]);
        }

        setNewStop(null); // Clear the input after adding
        setCheckInDate(null); // Reset check-in date
        setCheckOutDate(null); // Reset check-out date
        setshowCheckin(false);

    };

    const handleRemoveStop = (index) => {
        setStops(stops.filter((_, i) => i !== index));
    };

    function convertTimeTo12HourFormat(time24) {
        const [hours, minutes] = time24.split(":").map(Number);
        const ampm = hours >= 12 ? "PM" : "AM";
        const hours12 = hours % 12 || 12; // Convert 0 or 12+ to 12-hour format
        return `${hours12}:${minutes.toString().padStart(2, "0")}:00 ${ampm}`;
    }

    function convertTimeTo24HourFormat(time12) {
        const [time, period] = time12.split(" ");
        let [hours, minutes] = time.split(":").map(Number);

        if (period === "PM" && hours !== 12) {
            hours += 12; // Convert PM hours (except 12 PM)
        } else if (period === "AM" && hours === 12) {
            hours = 0; // Convert 12 AM to 00
        }

        return `${hours.toString().padStart(2, "0")}:${minutes.toString().padStart(2, "0")}`;
    }

    const handleSaveItinerary = async () => {
        if (!id || !day) return;

        let stay = {};
        let experiences = [];
        let missingFields = [];

        stops.forEach((stop, index) => {
            if (stop.type === "lodging" || stop.checkIn) {
                if (!stop.checkIn || !stop.checkOut || !stop.guests) {
                    missingFields.push(`Lodging stop ${index + 1} is missing checkin date`);
                }
                if (!stop.checkOut || !stop.guests) {
                    missingFields.push(`Lodging stop ${index + 1} is missing checkout date`);
                }
                if (!stop.checkIn || !stop.checkOut || !stop.guests) {
                    missingFields.push(`Lodging stop ${index + 1} is missing guest number`);
                }
                stay = {
                    placeId: stop.placeId || null,
                    placeName: stop.name || null,
                    checkIn: stop.checkIn,
                    checkOut: stop.checkOut,
                    location: stop.address || null,
                    phone: stop.phone || null,
                    guests: stop.guests || null,
                    preferences: stop.preferences || null,
                    paid: false, // Default value
                };
            } else {
                if (!stop.address || !stop.time) {
                    missingFields.push(`Experience stop ${index + 1} is missing required details.`);
                }
                experiences.push({
                    placeId: stop.placeId || null,
                    name: stop.name || null,
                    location: stop.address || null,
                    time: stop.time ? convertTimeTo12HourFormat(stop.time) : null,
                    paid: false, // Default value
                });
            }
        });

        if (missingFields.length > 0) {
            alert(`Please fill in all required fields:\n\n${missingFields.join("\n")}`);
            return;
        }

        const updatedItinerary = {
            day: Number(day),
            stay: stay,
            experiences: experiences,
        };

        try {
            await updateItineraryForDay(id, day, updatedItinerary, travelMode);
            alert("Itinerary saved successfully!");
            router.push({
                pathname: "/overview",
                query: { id },
            });
        } catch (error) {
            console.error("Error saving itinerary:", error);
            alert("Failed to save itinerary");
        }
    };

    const goBack = async () => {
        router.push({
            pathname: "/overview",
            query: { id },
        });
    };

    const viewImpactDashboard = () => {
        // Map travel mode to the format expected by the impact dashboard
        let impactMode = "car";
        switch (travelMode) {
            case "DRIVING":
                impactMode = "car";
                break;
            case "BICYCLING":
                impactMode = "bike";
                break;
            case "WALKING":
                impactMode = "walk";
                break;
            case "TRANSIT":
                impactMode = "public";
                break;
            default:
                impactMode = "car";
        }

        router.push({
            pathname: "/impact-dashboard",
            query: { 
                id: id,
                day: day,
                distance: travelDistance || 0,
                mode: impactMode
            }
        });
    };
    
    const updateTravelDistance = (distance) => {
        setTravelDistance(distance);
    };

    return (
        <>
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
                                    stops={stops}
                                    setStops={setStops}
                                    travelMode={travelMode}
                                    selectedLocation={selectedLocation}
                                    setSelectedLocation={setSelectedLocation}
                                    addSelectedLocation={addSelectedLocation}
                                    setAddSelectedLocation={setAddSelectedLocation}
                                    updateTravelDistance={updateTravelDistance}
                                />
                            )}
                        </APIProvider>
                    </Col>

                    <Col md={4} >
                        <h4>Itinerary Stops for Day {day}</h4>
                        <ListGroup className="mb-3 itinerary-sidebar">
                            {stops.map((stop, index) => (
                                <ListGroup.Item key={index} className="d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-center">
                                        <strong>{stop.name || stop.address}</strong>
                                        <Button onClick={() => handleRemoveStop(index)} variant="outline-danger" size="sm">
                                            Remove
                                        </Button>
                                    </div>

                                    {/* Show Check-in and Check-out Dates for Lodging Type */}
                                    {(stop.type === "lodging" || stop.checkIn) && (
                                        <div className="mt-2">
                                            <Form.Group controlId="checkIn">
                                                <Form.Label>Check-in Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={stop.checkIn ? stop.checkIn.split("T")[0] : ""}
                                                    onChange={(e) => {
                                                        // Update the check-in date for the specific stop
                                                        const updatedStops = [...stops];
                                                        updatedStops[index].checkIn = e.target.value;
                                                        setStops(updatedStops);
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="checkOut">
                                                <Form.Label>Check-out Date</Form.Label>
                                                <Form.Control
                                                    type="date"
                                                    value={stop.checkOut ? stop.checkOut.split("T")[0] : ""}
                                                    onChange={(e) => {
                                                        // Update the check-out date for the specific stop
                                                        const updatedStops = [...stops];
                                                        updatedStops[index].checkOut = e.target.value;
                                                        setStops(updatedStops);
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="guests">
                                                <Form.Label>No of Guests</Form.Label>
                                                <Form.Control
                                                    type="integer"
                                                    value={stop.guests || ""}
                                                    onChange={(e) => {
                                                        // Update the check-out date for the specific stop
                                                        const updatedStops = [...stops];
                                                        updatedStops[index].guests = e.target.value;
                                                        setStops(updatedStops);
                                                    }}
                                                />
                                            </Form.Group>
                                            <Form.Group controlId="preferences">
                                                <Form.Label>Preferences</Form.Label>
                                                <Form.Control
                                                    type="string"
                                                    value={stop.preferences || ""}
                                                    onChange={(e) => {
                                                        // Update the check-out date for the specific stop
                                                        const updatedStops = [...stops];
                                                        updatedStops[index].preferences = e.target.value;
                                                        setStops(updatedStops);
                                                    }}
                                                />
                                            </Form.Group>
                                        </div>
                                    )}

                                    {(stop.type != "lodging" && !stop.checkIn) && (
                                        <div className="mt-2">
                                            <Form.Group controlId="checkInDate">
                                                <Form.Label>Time</Form.Label>
                                                <Form.Control
                                                    type="time"
                                                    value={stop.time ? convertTimeTo24HourFormat(stop.time) : ""}
                                                    onChange={(e) => {
                                                        // Update the check-in date for the specific stop
                                                        const updatedStops = [...stops];
                                                        updatedStops[index].time = e.target.value;
                                                        setStops(updatedStops);
                                                    }}
                                                />
                                            </Form.Group>
                                        </div>
                                    )}
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
                                onChange={(e) => setNewStop({ ...newStop, 
                                    address: e.target.value })}
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

                        <div className="text-center mt-4">
                            <Button 
                                variant="success" 
                                className="w-100 mb-3" 
                                onClick={viewImpactDashboard}
                                disabled={stops.length < 2 || travelDistance <= 0}
                            >
                                <FaLeaf className="me-2" /> View Environmental Impact
                            </Button>
                        </div>

                        <div className="text-center mt-2">
                            <Button variant="primary" className="w-100" onClick={handleSaveItinerary}>
                                Save Itinerary
                            </Button>
                        </div>

                        <Button variant="outline-primary"
                            className="mt-3 w-100" onClick={goBack}>
                            Go Back
                        </Button>
                    </Col>
                </Row>
            </Container>
            <style>
                {`
                .itinerary-sidebar {
                    max-height: 25vh; /* Full height */
                    overflow-y: auto; /* Enables scrolling */
                    padding: 10px;
                    border-right: 1px solid #ddd; /* Optional: Adds a border to separate from main content */
                }
            `}
            </style>
        </>
    );
};

export default ItineraryPlanner;