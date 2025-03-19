// services/index.js
import { jwtDecode } from 'jwt-decode';
import Router from 'next/router';
import { API_BASE_URL } from '@/utils/general';

export function setToken(token) {
    localStorage.setItem('access_token', token);
}

export function getToken() {
    return localStorage.getItem('access_token');
}

export function readToken() {
    try {
        const token = getToken();
        console.log('Reading token:', token); // Add this line
        return token ? token : null; // Return the token string instead of decoding here
    } catch (err) {
        return null;
    }
}

export function decodeToken(token) {
    try {
        return jwtDecode(token);
    } catch (err) {
        console.error('Error decoding token:', err);
        return null;
    }
}

export function isAuthenticated() {
    const token = readToken();
    return token ? true : false;
}

export function removeToken() {
    localStorage.removeItem('access_token');
    localStorage.removeItem('email');
}

export async function authenticateAdmin(email, password) {
    const res = await my_fetch(`${API_BASE_URL}/Admin/login/admin`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
        setToken(data.token);
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function registerUser(user, password, confirmPassword) {
    const { firstName, lastName, email } = user;
    const res = await my_fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username: `${firstName} ${lastName}`, email, password, confirmPassword }),
    });

    const data = await res.json();
    console.log('Response:', data); // Debugging line

    if (res.status === 200) {
        setToken(data.token);
        return data.token;
    } else {
        throw new Error(data.message);
    }
}

export async function authenticateUser(email, password) {
    const res = await my_fetch(`${API_BASE_URL}/auth/login`, {
        method: "POST",
        body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (res.status === 200) {
        setToken(data.token);
        return data.token;
    } else {
        throw new Error(data.message);
    }
}

export async function sendPasswordResetEmail(email) {
    const res = await my_fetch(`${API_BASE_URL}/passwordResetEmail`, {
        method: "POST",
        body: JSON.stringify(email),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
        return 200;
    } else {
        throw new Error(data.message);
    }
}

export async function setPassword(id, password) {
    const res = await my_fetch(`${API_BASE_URL}/resetPassword`, {
        method: "POST",
        body: JSON.stringify({ id, password }),
    });

    const data = await res.json();
    console.log(data);
    if (res.status === 200) {
        return 200;
    } else {
        throw new Error(data.message);
    }
}

export async function getItineraryForDay(id, day) {
    const res = await my_fetch(`${API_BASE_URL}/itinerary`, {
        method: "POST",
        body: JSON.stringify({id, day}),
    });

    const data = await res.json();
    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function getItineraries(id) {
    const res = await my_fetch(`${API_BASE_URL}/itineraries`, {
        method: "POST",
        body: JSON.stringify({id}),
    });

    const data = await res.json();
    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export const updateItineraryForDay = async (id, day, newItinerary, transportMode) => {
    try {
        const response = await my_fetch(`${API_BASE_URL}/setItinerary`, {
            method: "POST",
            body: JSON.stringify({
                id,
                day,
                newItinerary,
                transportMode, // Send the travel mode here
            }),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("Failed to update itinerary");
        }

        return await response.json();
    } catch (error) {
        console.error("Error updating itinerary:", error);
        throw error;
    }
};

export async function fetchPlaces(location, travelStyle) {
    const res = await my_fetch(`${API_BASE_URL}/places?location=${encodeURIComponent(location)}&travelStyle=${travelStyle}`);
    console.log("fetchPlaces() res: ", res);
    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.error);
    }
}

export async function fetchPlaceDetails(place_id) {
    const res = await my_fetch(`${API_BASE_URL}/places/details?place_id=${place_id}`);
    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.error);
    }
}

export async function fetchNearbyAttractions(location) {
    const locationString = `${location.lat},${location.lng}`; // Convert location object to string
    const res = await my_fetch(`${API_BASE_URL}/places/nearby?location=${encodeURIComponent(locationString)}`);
    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.error);
    }
}

export async function my_fetch(url, args) {
    const _args = {
        ...args,
        headers: {
            "content-type": "application/json",
            "x-auth-token": getToken()
        }
    }
    try {
        const response = await fetch(url, _args);

        if (response?.status === 401) {
            removeToken();
            Router.push("/login");
            return;
        }
        return response;
    } catch (error) {
        console.error(error.response);
        throw error;
    }
}