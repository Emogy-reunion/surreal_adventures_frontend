'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

const AuthContext = createContext();

export function AuthProvider({ children }) {
        const [user, setUser] = useState(null);
        const [loading, setLoading] = useState(true);
        const router = useRouter();

        // Initial Boot Check: Runs ONCE when the app loads or the page is refreshed
        useEffect(() => {
                const fetchUser = async () => {
                        try {
                                const response = await fetch('/api/v1/user_data', {
                                        method: 'GET',
                                        credentials: 'include'
                                });

                                if (response.ok) {
                                        const data = await response.json();
                                        setUser(data);
                                } else {
                                        setUser(null);
                                }
                        } catch {
                                setUser(null);
                        } finally {
                                setLoading(false);
                        }
                };
                fetchUser();
        }, []);


        // Controlled Refresh Interval: Only activates when a valid user state exists
        useEffect(() => {
                // Prevent running background token updates if the user is unauthenticated
                if (!user) return;

                const interval = setInterval(async () => {
                        try {
                                const response = await fetch('/api/v1/refresh_token', {
                                        method: 'POST',
                                        credentials: 'include'
                                });

                                if (!response.ok) {
                                        setUser(null);
                                        router.push('/guest/login');
                                }
                        } catch {
                                setUser(null);
                                router.push('/guest/login');
                        }
                }, 10 * 60 * 1000); // 10 minutes

                return () => clearInterval(interval);
        }, [user, router]); // Dynamically turns on/off based on the 'user' state


        // Login Synchronizer: Updates global state instantly when login succeeds
        const login = (userData) => {
                setUser(userData);
        };


        // Logout Handler
        const logout = async () => {
                try {
                        const response = await fetch('/api/v1/logout', {
                                method: 'POST',
                                credentials: 'include'
                        });

                        if (response.ok) {
                                setUser(null);
                                router.push('/guest/login');
                        }
                } catch (error) {
                        console.error("Logout failed:", error);
                }
        };


        return (
                <AuthContext.Provider value={{ user, loading, login, logout }}>
                        {children}
                </AuthContext.Provider>
        );
}

export const useAuth = () => useContext(AuthContext);
