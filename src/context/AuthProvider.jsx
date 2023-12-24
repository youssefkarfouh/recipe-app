import { createContext, useEffect, useState } from 'react'


const AuthContext = createContext({})

export const AuthProvider = ({ children }) => {

    const [auth, setAuth] = useState({});
    const [persist, setPersist] = useState(JSON.parse(localStorage.getItem("persist")) || false);

    useEffect(() => {
        console.log( "type of persist" , typeof JSON.parse(localStorage.getItem("persist")));
    }, [])

    return (

        <AuthContext.Provider value={{ auth, setAuth, persist, setPersist }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext