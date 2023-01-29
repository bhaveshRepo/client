import React, { createContext, useContext, useState } from 'react'

export const AuthContext = createContext(); // useContext hook to skip heirarchical method
                                             // usefull for token and global states

const Auth = ({ children }) => {

    const [token, setToken] = useState(() => {
        const token = localStorage.getItem("token");
        return token !== null;
    })
    const [authenticate, setAuthenticate] = useState(() => {
        const authenticate = localStorage.getItem("authenticate");
        return token !== null
    })

    return (
        <AuthContext.Provider value={{ token, setToken, authenticate, setAuthenticate }}>
            {children}
        </AuthContext.Provider>
    )
}

export const LoginContext = () => useContext(AuthContext);

export default Auth;