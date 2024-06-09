import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { I_AuthContextType, I_AuthState } from "../interfaces/authContext";


const AuthContext = createContext<I_AuthContextType>({
  auth: { roles: [], accessToken: '', pwd: '', user: '' },
  setAuth: (value: React.SetStateAction<I_AuthState>): void => { },
  persist: false,
  setPersist: (value: React.SetStateAction<boolean>): void => { }
});


export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [auth, setAuth] = useState<I_AuthState>({ roles: [], accessToken: '', pwd: '', user: '' });
  const [persist, setPersist] = useState<boolean>(
    JSON.parse(localStorage.getItem("persist") as string) || false,
  );

  return (
    <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;

