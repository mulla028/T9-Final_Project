// pages/auth/callback.js
import { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import { setToken } from '@/services';


const Callback = () => {
    const router = useRouter();
    const { login } = useAuth();

    useEffect(() => {
        // Extract the token from the URL
        const token = new URLSearchParams(window.location.search).get('token');
        if (token) {
            // Store the token (e.g., in localStorage)
            setToken(token);

            // Set the authentication state
            login(token);

            // Redirect to the home page or another route
            router.push('/');
        } else {
            console.error('No token found in the URL');
        }
    }, [router]);

    return <div>Processing your login...</div>;
};

export default Callback;
