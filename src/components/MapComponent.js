"use client";

import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    GoogleMap,
    useJsApiLoader,
    DirectionsRenderer,
    InfoWindow,
    Marker,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const MapComponent = ({ origin, stops, setStops, travelMode }) => {
    const [directionsState, setDirectionsState] = useState(null);
    const [selectedLocation, setSelectedLocation] = useState(null); // Stores clicked location details
    const [travelTimes, setTravelTimes] = useState([]);
    const [placesService, setPlacesService] = useState(null);
    const [map, setMap] = useState(null); // Store map instance
    console.log(travelMode);


    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    // Update directionsState whenever stops array changes
    useEffect(() => {
        if (!isLoaded || typeof window === "undefined" || !window.google) return;
        
        if (stops.length === 0) {
            setDirectionsState(null); // Clear directions if no stops
            return;
        }

        const DirectionsService = new google.maps.DirectionsService();

        const finalDestination = stops[stops.length - 1];
        const waypoints = stops.slice(0, -1).map((stop) => ({
            location: stop,
            stopover: true,
        }));
        DirectionsService.route(
            {
                origin,
                destination: finalDestination,
                waypoints: waypoints,
                travelMode: google.maps.TravelMode[travelMode], // Use the passed travelMode
                unitSystem: google.maps.UnitSystem.METRIC,
            },
            (result, status) => {
                if (status === "OK") {
                    setDirectionsState(result);

                     // Extract durations (travel time) for each leg of the journey
                     const times = result.routes[0].legs.map((leg) => leg.duration.text);
                     setTravelTimes(times);
                } else {
                    console.error(`Error fetching directions: ${status}`);
                }
            }

        );

    }, [origin, stops, travelMode, isLoaded]);

    useEffect(() => {
        if (isLoaded && map) {
            const service = new google.maps.places.PlacesService(map);
            setPlacesService(service);
        }
    }, [isLoaded, map]);

    const handleMapClick = (event) => {
        event.stop();
        console.log(event.placeId);

        if (event.placeId && placesService) {
            const request = {
                placeId: event.placeId,
                fields: ['name', 'formatted_address', 'place_id', 'geometry', 'photo'],
            };

            placesService.getDetails(request, (place, status) => {
                if (status === 'OK') {
                    setSelectedLocation({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
                        name: place.name || "Unnamed Place",
                        address: place.formatted_address || "Unknown Address",
                        placeId: place.place_id,
                    });
                } else {
                    console.error("Error fetching nearby places:", status);
                }
            });
        } else {
            const latLng = event.latLng;

            const geocoder = new google.maps.Geocoder();
            geocoder.geocode({ location: latLng }, (results, status) => {
                if (status === google.maps.GeocoderStatus.OK && results[0]) {
                    const address = results[0].formatted_address;
                    setSelectedLocation({
                        lat: latLng.lat(),
                        lng: latLng.lng(),
                        address: address || "Unknown Address",
                    });
                } else {
                    console.error("Geocoder failed due to: " + status);
                }
            });
        }
    };

    const handleAddStop = () => {
        if (!selectedLocation) return;
        setStops((prevStops) => [...prevStops, selectedLocation.address]);
        setSelectedLocation(null); // Hide InfoWindow after adding stop
    };

    if (!isLoaded) {
        return <p>Loading map...</p>;
    }

    return (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={origin}
            zoom={10}
            onClick={handleMapClick}
            onLoad={(map) => setMap(map)}
        >
            {directionsState && <DirectionsRenderer options={{ directions: directionsState }} />}

            {/* Show markers for all stops */}
            {stops.map((stop, index) => (
                <Marker key={index} position={{ lat: stop.lat, lng: stop.lng }} />
            ))}

            {/* Show InfoWindow when a location is clicked */}
            {selectedLocation && (
                <InfoWindow
                    position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                    onCloseClick={() => setSelectedLocation(null)}
                >
                    <div>
                        <h6>{selectedLocation.name}</h6>
                        <p><strong>{selectedLocation.address}</strong></p>
                        <a href="#" onClick={handleAddStop} style={{ color: "blue", cursor: "pointer" }}>
                            Add Stop
                        </a>
                    </div>
                </InfoWindow>
            )}

            {/* Display travel times between stops */}
            {travelTimes.length > 0 && (
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "white", padding: "10px", zIndex: 10 }}>
                    <h4>Estimated Travel Times:</h4>
                    <ul>
                        {travelTimes.map((time, index) => (
                            <li key={index}>{`Stop ${index + 1} to Stop ${index + 2}: ${time}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </GoogleMap>
    );
};

MapComponent.propTypes = {
    origin: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }),
    stops: PropTypes.arrayOf(PropTypes.string).isRequired,
    setStops: PropTypes.func.isRequired,
};

export default MapComponent;
