import { createContext, useContext, useState, useEffect } from 'react';
import { readToken, removeToken, decodeToken } from '@/services';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [authState, setAuthState] = useState({
        token: null,
        username: '',
        role: ''
    });

    useEffect(() => {
        const token = readToken();

        if (!token) {
            setAuthState({
                token: null,
                username: '',
                role: '',
            });
            return;
        }

        const decoded = decodeToken(token);

        setAuthState({
            token,
            username: decoded.username || '',
            role: decoded.role || '',
        });
    }, []);

    const login = (token) => {
        const decoded = decodeToken(token);
        setAuthState({
            token,
            username: decoded.username || '', // Assuming the decoded token contains the username
            role: decoded.role || '', // Assuming the decoded token contains the role
        });
    };

    const logout = () => {
        removeToken();
        setAuthState({
            token: null,
            username: ''
        });
    };

    return (
        <AuthContext.Provider value={{ authState, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth() {
    return useContext(AuthContext);
}
