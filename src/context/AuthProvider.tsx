import React, { Dispatch, ReactNode, SetStateAction, createContext, useState } from "react";
import { AuthContextType, AuthProviderProps, AuthState } from "../interfaces/auth";


const AuthContext = createContext<AuthContextType>({
  auth: {roles:[], accessToken:'' , token:'' , user:''},
  setAuth: (value: React.SetStateAction<AuthState>): void =>{},
  persist: false,
  setPersist:  (value: React.SetStateAction<boolean>): void =>{}
});


export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [auth, setAuth] = useState<AuthState>({roles:[], accessToken:'' , token:'' , user:''});
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




// // Implement the AuthProvider component
// export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
//   const [auth, setAuth] = useState<AuthState>({});
//   const [persist, setPersist] = useState<boolean>(
//     JSON.parse(localStorage.getItem("persist") || "false")
//   );

//   return (
//     <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthContext;