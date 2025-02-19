import { GoogleMap, Marker } from "@react-google-maps/api";

const mapContainerStyle = {
    width: "100%",
<<<<<<< HEAD
    height: "300px",
=======
    height: "450px",
>>>>>>> 3bec758 (adding booking feature files)
    borderRadius: "10px",
};

const defaultCenter = { lat: 40.7128, lng: -74.0060 }; // Default to New York

const GoogleMapComponent = ({ lat, lng }) => {

    return (
        <GoogleMap
            mapContainerStyle={mapContainerStyle}
            zoom={14}
            center={{ lat: lat || defaultCenter.lat, lng: lng || defaultCenter.lng }}
        >
            <Marker position={{ lat: lat || defaultCenter.lat, lng: lng || defaultCenter.lng }} />
        </GoogleMap>
    );
};

export default GoogleMapComponent;
