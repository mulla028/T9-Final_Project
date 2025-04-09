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
        const params = new URLSearchParams(window.location.search);
        const accessToken = params.get('accessToken');
        const refreshToken = params.get('refreshToken');

        if (accessToken && refreshToken) {
            setToken({ accessToken, refreshToken });

            // Set the authentication state
            login(accessToken);

            // Redirect to the home page or another route
            router.push('/');
        } else {
            console.error('No token found in the URL');
        }
    }, [router]);

    return <div>Processing your login...</div>;
};

export default Callback;
