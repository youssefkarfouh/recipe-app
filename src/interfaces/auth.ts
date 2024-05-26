import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

export interface AuthState {
    user: string;
    token: string;
    roles:string[],
    accessToken:string 
}

export interface AuthContextType {
    auth: AuthState;
    setAuth: Dispatch<SetStateAction<AuthState>>;
    persist: boolean;
    setPersist: Dispatch<SetStateAction<boolean>>;
}


// // Define the props for the AuthProvider
export interface AuthProviderProps {
    children: ReactNode;
}