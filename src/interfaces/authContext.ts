import { Dispatch, ReactNode, SetStateAction, createContext } from "react";

export interface I_AuthState {
    user?: string;
    pwd?: string;
    roles?:string[],
    accessToken?:string 
}

export interface I_AuthContextType {
    auth: I_AuthState;
    setAuth: Dispatch<SetStateAction<I_AuthState>>;
    persist: boolean;
    setPersist: Dispatch<SetStateAction<boolean>>;
}
