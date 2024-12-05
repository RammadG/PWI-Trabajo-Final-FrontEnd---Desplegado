import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext  = createContext()

export const AuthContextProvider = ({children}) =>{

    const access_token = sessionStorage.getItem('access_token')
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(Boolean(access_token))

    useEffect(
        () => {
            const access_token = sessionStorage.getItem('access_token')
            if(access_token) {
                setIsAuthenticatedUser(true)
            }
        }, 
        []
    )
    const logout = () =>{
        sessionStorage.removeItem('access_token')
        setIsAuthenticatedUser(false)
    }

    const login = (accessToken) => {
        sessionStorage.setItem('accessToken', accessToken)
        setIsAuthenticatedUser(true)
    }

    return (
        <AuthContext.Provider value={{
            logout: logout,
            isAuthenticatedUser: isAuthenticatedUser,
            login: login
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}