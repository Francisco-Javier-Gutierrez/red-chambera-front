// ========================
// La Red Chambera — Auth Context
// ========================

import {
    createContext,
    useContext,
    useState,
    useEffect,
    useCallback,
    type ReactNode,
} from 'react';
import type { User, LoginRequest, RegisterRequest } from '../types';
import * as api from '../services/api';

interface AuthContextType {
    user: User | null;
    token: string | null;
    loading: boolean;
    login: (data: LoginRequest) => Promise<void>;
    register: (data: RegisterRequest) => Promise<void>;
    logout: () => void;
    isAuthenticated: boolean;
    hasRole: (role: string) => boolean;
    updateUser: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
    const [user, setUser] = useState<User | null>(null);
    const [token, setToken] = useState<string | null>(
        localStorage.getItem('token'),
    );
    const [loading, setLoading] = useState(true);

    // On mount, if there's a saved token, validate it
    useEffect(() => {
        if (token) {
            api
                .getMe()
                .then((u) => setUser(u))
                .catch(() => {
                    localStorage.removeItem('token');
                    setToken(null);
                    setUser(null);
                })
                .finally(() => setLoading(false));
        } else {
            setLoading(false);
        }
    }, [token]);

    const login = useCallback(async (data: LoginRequest) => {
        const res = await api.login(data);
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setUser(res.user);
    }, []);

    const register = useCallback(async (data: RegisterRequest) => {
        const res = await api.register(data);
        localStorage.setItem('token', res.token);
        setToken(res.token);
        setUser(res.user);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem('token');
        setToken(null);
        setUser(null);
    }, []);

    const hasRole = useCallback(
        (role: string) => user?.rol === role,
        [user],
    );

    const updateUser = useCallback((u: User) => setUser(u), []);

    return (
        <AuthContext.Provider
            value={{
                user,
                token,
                loading,
                login,
                register,
                logout,
                isAuthenticated: !!user,
                hasRole,
                updateUser,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const ctx = useContext(AuthContext);
    if (!ctx) throw new Error('useAuth must be used within AuthProvider');
    return ctx;
}
