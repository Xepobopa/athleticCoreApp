import { authService } from "@/services/authServices";
import { CheckAndAddMockUsers, ClearAuthedUser, GetAuthedUser, SetAuthedUser, User } from "@/services/storageService";
import React, { useEffect } from "react";

interface AuthContextType {
    user: User | null;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<void>;
    register: (email: string, password: string) => Promise<void>;
    logout: () => void;
    isReady: boolean;
}

export const AuthContext = React.createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const [user, setUser] = React.useState<User | null>(null);
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const [isReady, setIsReady] = React.useState<boolean>(false);

    useEffect(() => {
        async function initializeApp() {
            try {
                await CheckAndAddMockUsers();
                
                const authedUser = await GetAuthedUser();
                if (authedUser) {
                    setUser(authedUser);
                }
            } catch (e) {
                console.error("Init error", e);
            } finally {
                setIsReady(true);
            }
        }

        initializeApp();
    }, []);
        
    const login = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate an API call to authenticate the user
            const user = await authService.login(email, password);
            SetAuthedUser(user);
            setUser(user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const register = async (email: string, password: string) => {
        setIsLoading(true);
        try {
            // Simulate an API call to register the user
            const user = await authService.register(email, password);
            SetAuthedUser(user);
            setUser(user);
        } catch (error) {
            throw error;
        } finally {
            setIsLoading(false);
        }
    };

    const logout = () => {
        setUser(null);
        ClearAuthedUser();
    };

    return (
        <AuthContext.Provider value={{ user, isLoading, login, register, logout, isReady }}>
            {children}
        </AuthContext.Provider>
    );
}

export function useAuth(): AuthContextType {
    const context = React.useContext(AuthContext);
    if (context === undefined) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}