import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import {
    GoogleMap,
    useJsApiLoader,
    DirectionsRenderer,
    InfoWindowF,
    Marker,
} from "@react-google-maps/api";

const containerStyle = {
    width: "100%",
    height: "500px",
};

const MapComponent = ({ stops, setStops, travelMode, selectedLocation, setSelectedLocation, addSelectedLocation, setAddSelectedLocation }) => {
    const [directionsState, setDirectionsState] = useState(null);
    const [travelTimes, setTravelTimes] = useState([]);
    const [travelDistance, setTravelDistance] = useState([]);
    const [placesService, setPlacesService] = useState(null);
    const [map, setMap] = useState(null); // Store map instance
    const [origin, setOrigin] = useState(null); // Store origin location (first stop)
    const [isLoading, setIsLoading] = useState(true); // Loading state for geocoding
    const [isOriginLoaded, setIsOriginLoaded] = useState(false); // Track if origin is loaded

    const { isLoaded } = useJsApiLoader({
        googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
    });

    // Update directionsState whenever stops array changes
    useEffect(() => {
        if (!isLoaded || typeof window === "undefined" || !window.google) return;

        if (stops.length === 0 || !origin) {
            setDirectionsState(null); // Clear directions if no stops or origin is not set
            return;
        }

        const DirectionsService = new google.maps.DirectionsService();

        const finalDestination = stops[stops.length - 1];
        const waypoints = stops.slice(1, -1).map((stop) => ({
            location: stop.address,
            stopover: true,
        }));
        
        // Calculate directions after origin is set
        if(origin.address != finalDestination.address) {
            DirectionsService.route(
                {
                    origin: origin.address,
                    destination: finalDestination.address,
                    waypoints: waypoints,
                    travelMode: google.maps.TravelMode[travelMode], // Use the passed travelMode
                    unitSystem: google.maps.UnitSystem.METRIC,
                },
                (result, status) => {
                    if (status === "OK") {
                        setDirectionsState(result);
    
                        // Extract durations (travel time) for each leg of the journey
                        const times = result.routes[0].legs.map((leg) => leg.duration.text);
                        const distance = result.routes[0].legs.map((leg) => leg.distance.text);
                        setTravelTimes(times);
                        setTravelDistance(distance);
                    } else {
                        console.error(`Error fetching directions: ${status}`);
                    }
                }
            );
        }

    }, [stops, travelMode, origin, isLoaded]); 

    useEffect(() => {
        if (isLoaded && map) {
            const service = new google.maps.places.PlacesService(map);
            setPlacesService(service);
        }
    }, [isLoaded, map]);

    // Set origin
    useEffect(() => {
        if (!isLoaded || !window.google || stops.length === 0) return;

        const firstStop = stops[0];

        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: firstStop.address }, (results, status) => {
            console.log("First address is: ", firstStop.address);
            if (status === "OK" && results[0].geometry) {
            console.log("geometry: ", results[0].geometry);

                setOrigin({
                    address: firstStop.address,
                    lat: results[0].geometry.location.lat(),
                    lng: results[0].geometry.location.lng(),
                });
                setIsOriginLoaded(true);
                setIsLoading(false); // Once the origin is set, stop loading
            } else {
                console.error("Geocoding failed:", status);
                setIsLoading(false); // Stop loading even if geocoding fails
            }
        });
    }, [isLoaded, stops]);

    const handleMapClick = (event) => {
        event.stop();
        console.log(event.placeId);

        setSelectedLocation(null);

        if (event.placeId && placesService) {
            const request = {
                placeId: event.placeId,
            };

            placesService.getDetails(request, (place, status) => {
                if (status === 'OK') {
                    console.log("Place:",  place);
                    setSelectedLocation({
                        lat: place.geometry.location.lat(),
                        lng: place.geometry.location.lng(),
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
        setAddSelectedLocation(true);
    };

    // Prevent map rendering if origin is not set or loading is still true
    if (!isLoaded || isLoading || !isOriginLoaded) {
        return <p>Loading map...</p>;
    }

    return (
        <>
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={origin} 
            zoom={10}
            onClick={handleMapClick}
            onLoad={(map) => setMap(map)}
        >
            {directionsState && <DirectionsRenderer options={{ directions: directionsState }} />}

            <Marker key={0} position={{ lat: origin.lat, lng: origin.lng }} />


            {/* Show markers for all stops */}
            {stops.map((stop, index) => (
                <Marker key={index} position={{ lat: stop.lat, lng: stop.lng }} />
            ))}

            {/* Show InfoWindow when a location is clicked */}
            {selectedLocation && (
                <InfoWindowF
                    position={{ lat: selectedLocation.lat, lng: selectedLocation.lng }}
                    onCloseClick={() => {
                        setSelectedLocation(null);
                        setAddSelectedLocation(false);
                     }}
                >
                    <div>
                        <h6>{selectedLocation.name || selectedLocation.placeName}</h6>
                        <p><strong>{selectedLocation.address}</strong></p>
                        <a href="#" onClick={handleAddStop} style={{ color: "blue", cursor: "pointer" }}>
                            Add Stop
                        </a>
                    </div>
                </InfoWindowF>
            )}

            {/* Display travel times between stops */}
            {travelTimes.length > 0 && (
                <div style={{ position: "absolute", top: "10px", left: "10px", background: "white", padding: "10px", zIndex: 10 }}>
                    <h4>Estimated Travel Times/Distance:</h4>
                    <ul>
                        {travelTimes.map((time, index) => (
                            <li key={index}>{`Stop ${index + 1} to Stop ${index + 2}: ${time}`}</li>
                        ))}
                    </ul>
                </div>
            )}
        </GoogleMap>
        </>
    );
};

MapComponent.propTypes = {
    origin: PropTypes.shape({
        lat: PropTypes.number.isRequired,
        lng: PropTypes.number.isRequired,
    }),
    stops: PropTypes.arrayOf(PropTypes.object).isRequired,
    setStops: PropTypes.func.isRequired,
    travelMode: PropTypes.string.isRequired,
    selectedLocation: PropTypes.object,
    setSelectedLocation: PropTypes.func.isRequired,
    addSelectedLocation : PropTypes.object,
    setAddSelectedLocation : PropTypes.func,
};

export default MapComponent;
