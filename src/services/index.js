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

export async function fetchPlaces(location, travelStyle) {
    const res = await my_fetch(`${API_BASE_URL}/places?location=${encodeURIComponent(location)}&travelStyle=${travelStyle}`);
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


