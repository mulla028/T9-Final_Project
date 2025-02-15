import { useRouter } from 'next/router';
import { useEffect, useState, useMemo, useRef } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow, Autocomplete } from '@react-google-maps/api';
import axios from 'axios';
import Header from '../components/Header'; 

const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

const MapPage = () => {
    const router = useRouter();
    const { destination, place_id } = router.query;
    const [coordinates, setCoordinates] = useState(null);
    const [placeDetails, setPlaceDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showInfoWindow, setShowInfoWindow] = useState(false);
    const autoCompleteRef = useRef(null);
    const [searchInput, setSearchInput] = useState('');

    const libraries = useMemo(() => ['places'], []);

    // Memoized Header to prevent unnecessary re-renders
    const MemoizedHeader = useMemo(() => <Header />, []);

    const [markers, setMarkers] = useState([]);

    useEffect(() => {
        if (!destination) {
            setError("No destination provided.");
            setLoading(false);
            return;
        }
    
        setShowInfoWindow(false); 
    
        if (place_id) {
            console.log("🔹 Fetching place details for:", place_id);
            fetchPlaceDetails(place_id);
        } else {
            console.log("🔹 Fetching place_id for:", destination);
            axios
                .get(`https://maps.googleapis.com/maps/api/geocode/json`, {
                    params: { address: destination, key: GOOGLE_MAPS_API_KEY },
                })
                .then((response) => {
                    if (response.data.status !== "OK" || response.data.results.length === 0) {
                        setError(`Geocode API Error: ${response.data.status}`);
                        return;
                    }
    
                    const location = response.data.results[0];
                    const { lat, lng } = location.geometry.location;
                    const placeId = location.place_id;
    
                    console.log("✅ Location found:", { lat, lng, placeId });
    
                    if (!placeId) {
                        setError("No place_id found for this location.");
                        return;
                    }
    
                    setCoordinates({ lat, lng });
                    fetchPlaceDetails(placeId);
                })
                .catch((error) => {
                    console.error("Error fetching location:", error);
                    setError("Error fetching location.");
                })
                .finally(() => setLoading(false));
        }
    }, [destination, place_id]);      
    
    const fetchPlaceDetails = (placeId) => {
        if (!placeId) {
            setError("Invalid place ID.");
            return;
        }
    
        console.log("Fetching details for place_id:", placeId);
    
        axios
            .get(`/api/place?place_id=${placeId}`)
            .then((response) => {
                console.log("Place Details:", response.data);
    
                if (!response.data || !response.data.geometry || !response.data.geometry.location) {
                    setError("Invalid location data.");
                    return;
                }
    
                const { lat, lng } = response.data.geometry.location;
    
                setPlaceDetails(response.data);
                setShowInfoWindow(true); 
                setMarkers([{ lat, lng }]);
                setCoordinates({ lat, lng });
            })
            .catch((error) => {
                console.error("Error fetching place details:", error);
                setError("Error fetching place details.");
            });
    }; 
    
    const handlePlaceSelect = () => {
        if (autoCompleteRef.current) {
            const place = autoCompleteRef.current.getPlace();
            if (place && place.place_id) {
                setSearchInput(place.formatted_address);
                router.push(`/map?destination=${encodeURIComponent(place.formatted_address)}&place_id=${place.place_id}`);
            }
        }
    };

    const handleSearch = () => {
        if (searchInput.trim()) {
            router.push(`/map?destination=${encodeURIComponent(searchInput)}`);
        }
    };

    return (
        <>
            {MemoizedHeader}

            <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY} libraries={libraries}>
                <div style={{ display: "flex", height: "100vh", width: "100%", paddingTop: "70px" }}>

                    {/* Sidebar with Search Box & Location Info */}
                    <div
                        style={{
                            width: "350px",
                            background: "white",
                            padding: "15px",
                            overflowY: "auto",
                            wordWrap: "break-word", 
                            whiteSpace: "normal",   
                            boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                            zIndex: 10,
                            position: "relative",
                        }}
                    >
                        {/* 🔍 Search Box */}
                        <div
                            style={{
                                position: "relative",
                                width: "100%",
                                background: "white",
                                borderRadius: "30px",
                                boxShadow: "0 4px 10px rgba(0,0,0,0.2)",
                                display: "flex",
                                alignItems: "center",
                                padding: "8px 15px",
                                marginBottom: "20px",
                            }}
                        >
                            <Autocomplete
                                onLoad={(autocomplete) => (autoCompleteRef.current = autocomplete)}
                                onPlaceChanged={handlePlaceSelect}
                            >
                                <input
                                    type="text"
                                    placeholder="Search a location..."
                                    value={searchInput}
                                    onChange={(e) => setSearchInput(e.target.value)}
                                    onKeyPress={(e) => e.key === "Enter" && handleSearch()}
                                    style={{
                                        flex: 1,
                                        border: "none",
                                        outline: "none",
                                        fontSize: "14px",
                                        padding: "10px",
                                        borderRadius: "25px",
                                        backgroundColor: "#f1f3f4",
                                    }}
                                />
                            </Autocomplete>
                            <button
                                onClick={handleSearch}
                                style={{
                                    borderRadius: "25px",
                                    padding: "8px 15px",
                                    fontSize: "14px",
                                    marginLeft: "10px",
                                    background: "green",
                                    color: "white",
                                    border: "none",
                                    cursor: "pointer",
                                }}
                            >
                                Search
                            </button>
                        </div>

                        {placeDetails && (
                            <>
                                {placeDetails.photos && placeDetails.photos.length > 0 && (
                                    <img
                                        src={`https://maps.googleapis.com/maps/api/place/photo?maxwidth=400&photoreference=${placeDetails.photos[0].photo_reference}&key=${GOOGLE_MAPS_API_KEY}`}
                                        alt={placeDetails.name}
                                        style={{
                                            width: "100%",
                                            height: "200px",
                                            objectFit: "cover",
                                            borderRadius: "10px",
                                            marginBottom: "10px",
                                        }}
                                    />
                                )}
                                <h2>{placeDetails?.name}</h2>
                                <p><strong>Address:</strong> {placeDetails?.formatted_address}</p>
                                <p><strong>Phone Number:</strong> {placeDetails?.formatted_phone_number ||"N/A"}</p>
                                <p><strong>Overview:</strong> {placeDetails?.overview || "No description available"}</p>
                                <p><strong>Rating:</strong>  {placeDetails?.rating} ⭐</p>
                                <p>
                                    <strong>Website:&nbsp;</strong> 
                                    {placeDetails?.website ? (
                                        <a href={placeDetails.website} target="_blank" rel="noopener noreferrer"
                                        style={{ display: "inline" }}>
                                            {placeDetails.website}
                                        </a>
                                    ) : "N/A"}
                                </p>
                            </>
                        )}
                    </div>

                    {/* Map */}
                    <div style={{ flexGrow: 1, position: "relative" }}>
                        {coordinates ? (
                            <GoogleMap
                                mapContainerStyle={{ height: "100%", width: "100%" }}
                                center={coordinates}
                                zoom={14}
                            >
                                {markers.map((marker, index) => (
                                    <Marker
                                        key={index}
                                        position={marker}
                                        onClick={() => setShowInfoWindow(true)}
                                    />
                                ))}

                                {showInfoWindow && placeDetails && (
                                    <InfoWindow
                                        position={coordinates}
                                        onCloseClick={() => setShowInfoWindow(false)}
                                    >
                                        <div style={{ padding: "10px", maxWidth: "250px" }}>
                                            <h3>{placeDetails.name}</h3>
                                            <p>{placeDetails.formatted_address}</p>
                                        </div>
                                    </InfoWindow>
                                )}
                            </GoogleMap>
                        ) : (
                            <p style={{ textAlign: "center", paddingTop: "50px" }}>Loading map...</p>
                        )}
                    </div>
                </div>
            </LoadScript>
        </>
    );
};

export default MapPage;
