// services/index.js
import { jwtDecode } from 'jwt-decode';
import Router from 'next/router';
import { API_BASE_URL } from '@/utils/general';

export function setToken(data) {
    const { accessToken, refreshToken } = data;
    localStorage.setItem('access_token', accessToken);
    localStorage.setItem('refresh_token', refreshToken);
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
    localStorage.removeItem('refresh_token');
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

export async function registerUser({ username, email }, password, confirmPassword) {
    const res = await my_fetch(`${API_BASE_URL}/auth/register`, {
        method: "POST",
        body: JSON.stringify({ username, email, password, confirmPassword }),
    });


    const data = await res.json();
    console.log('Response:', data); // Debugging line

    if (res.status === 200) {
        setToken(data);
        return data.accessToken;
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
        setToken(data);
        return data.accessToken;
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

export async function fetchProfile() {
    const res = await my_fetch(`${API_BASE_URL}/users/profile`);
    const data = await res.json();
    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function updateProfile(user) {
    const res = await my_fetch(`${API_BASE_URL}/users/profile`, {
        method: "PUT",
        body: JSON.stringify(user),
    });

    const data = await res.json();
    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function deleteProfile(id) {
    const res = await my_fetch(`${API_BASE_URL}/users/profile/${id}`, {
        method: "DELETE",
    });

    const data = await res.json();
    if (res.status === 200) {
        return data;
    }
    else {
        throw new Error(data.message);
    }
}

export async function updatePassword(password, newPassword, confirmPassword) {
    const res = await my_fetch(`${API_BASE_URL}/users/password`, {
        method: "PUT",
        body: JSON.stringify({ password, newPassword, confirmPassword }),
    });

    const data = await res.json();
    if (res.status === 200) {
        return 200;
    } else {
        throw new Error(data.message);
    }
}

export async function addBooking(booking) {
    const res = await my_fetch(`${API_BASE_URL}/bookings/add`, {
        method: "POST",
        body: JSON.stringify(booking),
    });

    if (res.status === 201) {
        return res;
    } else {
        throw new Error(data.message);
    }
}

export async function getItineraryForDay(id, day) {
    const res = await my_fetch(`${API_BASE_URL}/itinerary`, {
        method: "POST",
        body: JSON.stringify({ id, day }),
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
        body: JSON.stringify({ id }),
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

export const deleteItineraryForDay = async (id, day) => {
    try {
        const response = await my_fetch(`${API_BASE_URL}/deleteItinerary`, {
            method: "DELETE",
            body: JSON.stringify({
                id,
                day
            }),
        });

        console.log(response);

        if (!response.ok) {
            throw new Error("Failed to delete itinerary");
        }

        return await response.json();
    } catch (error) {
        console.error("Error deleting itinerary:", error);
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

export async function fetchExperiences(location, category, sortBy) {
    const res = await my_fetch(`${API_BASE_URL}/places/experiences?location=${encodeURIComponent(location)}&category=${category}&sortBy=${sortBy}`);
    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.error);
    }
}

export async function createOrUpdateTip(url, method, tip) {
    await my_fetch(url, {
        method: method,
        body: JSON.stringify(tip),
    });
}

export async function deleteTip(id) {
    await my_fetch(`${API_BASE_URL}/tips/${id}`, {
        method: "DELETE",
    });
}

export async function fetchNotifications() {
    const res = await my_fetch(`${API_BASE_URL}/notifications`);
    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function markNotificationAsRead(id) {
    const res = await my_fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: "PATCH",
    });

    if (res.status === 204) {
        return;
    } else {
        const data = await res.json();
        throw new Error(data.message);
    }
}

export async function markAllNotificationsAsRead() {
    const res = await my_fetch(`${API_BASE_URL}/notifications/mark-all-read`, {
        method: "PATCH",
    });

    if (res.status === 204) {
        return;
    } else {
        const data = await res.json();
        throw new Error(data.message);
    }
}

export async function dismissNotification(id) {
    const res = await my_fetch(`${API_BASE_URL}/notifications/${id}`, {
        method: "DELETE",
    });

    if (res.status === 204) {
        return;
    } else {
        const data = await res.json();
        throw new Error(data.message);
    }
}

export async function fetchUnreadCount() {
    const res = await my_fetch(`${API_BASE_URL}/notifications/unread-count`);
    const data = await res.json();

    if (res.status === 200) {
        return data.unreadCount;
    } else if (res.status === 204) {
        return 0; // If the user is not logged in, return 0 unread notifications
    } else {
        throw new Error(data.message);
    }
}

export async function sendSupportMessage(formData) {
    const res = await my_fetch(`${API_BASE_URL}/support/contact`, {
        method: "POST",
        body: JSON.stringify(formData),
    });

    const data = await res.json();

    if (res.status === 200) {
        return data;
    } else {
        throw new Error(data.message);
    }
}

export async function fetchTerms() {
    const res = await my_fetch(`${API_BASE_URL}/terms`);
    const data = await res.json();

    if (res.status === 200) {
        return data.terms.content;
    } else {
        throw new Error(data.message);
    }
}

export async function updateTerms(terms) {
    const res = await my_fetch(`${API_BASE_URL}/terms`, {
        method: "POST",
        body: JSON.stringify({ content: terms }),
    });

    const data = await res.json();

    if (res.status === 200) {
        return data.terms.content;
    } else {
        throw new Error(data.message);
    }
}

export async function updatePolicy(privacy) {
    const res = await my_fetch(`${API_BASE_URL}/privacy`, {
        method: "POST",
        body: JSON.stringify({ content: privacy }),
    });

    const data = await res.json();

    if (res.status === 200) {
        return data.privacy.content;
    } else {
        throw new Error(data.message);
    }
}

export async function fetchPolicy() {
    const res = await my_fetch(`${API_BASE_URL}/privacy`);
    const data = await res.json();

    if (res.status === 200) {
        return data.privacy.content;
    } else {
        throw new Error(data.message);
    }
}

export async function fetchFaqs() {
    const res = await my_fetch(`${API_BASE_URL}/faqs`);
    const data = await res.json();

    if (res.status === 200) {
        return data.faqs;
    } else {
        throw new Error(data.message);
    }
}

export async function createFaq(faq) {
    const res = await my_fetch(`${API_BASE_URL}/faqs`, {
        method: "POST",
        body: JSON.stringify(faq),
    });

    const data = await res.json();

    if (res.status === 200) {
        return data.faq;
    } else {
        throw new Error(data.message);
    }
}

const fetchWithTokenRefresh = async (url, options) => {
    try {
        let retryResponse = null;
        // Access Token expired, try to refresh it
        const refreshResponse = await fetch(`${API_BASE_URL}/token/refresh-token`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ refreshToken: localStorage.getItem('refresh_token') })
        });

        if (refreshResponse.ok) {
            const { accessToken } = await refreshResponse.json();
            localStorage.setItem('access_token', accessToken);

            // Retry the original request with the new Access Token
            options.headers['x-auth-token'] = accessToken; // Update the token in headers
            retryResponse = await fetch(url, options);
            if (!retryResponse.ok) {
                throw new Error('Failed to fetch after token refresh');
            }
        }

        return retryResponse;
    } catch (error) {
        console.error("Error handling request:", error);
        throw error;
    }
};

export async function my_fetch(url, args) {
    const _args = {
        ...args,
        headers: {
            "Content-type": "application/json",
            "x-auth-token": getToken()
        }
    }
    try {
        const response = await fetch(url, _args);

        if (response?.status === 401) {
            // Token expired, try to refresh it
            return fetchWithTokenRefresh(url, _args);
        }
        return response;
    } catch (error) {
        console.error(error.response);
        throw error;
    }
}