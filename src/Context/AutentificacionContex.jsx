import { useContext, createContext, useState, useEffect } from "react";

export const AuthContext  = createContext()

export const AuthContextProvider = ({children}) =>{

    const access_token = sessionStorage.getItem('accessToken')
    const [isAuthenticatedUser, setIsAuthenticatedUser] = useState(Boolean(access_token))
    const [userData, setUserData] = useState(sessionStorage.getItem('userData'))

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
        if(confirm('¿Cerrar sesión?')){
            sessionStorage.removeItem('accessToken')
            sessionStorage.removeItem('userData')
            sessionStorage.removeItem('author_id')
            setIsAuthenticatedUser(false)
            return
        }
        return
    }

    const login = (accessToken) => {
        sessionStorage.setItem('accessToken', accessToken)
        setIsAuthenticatedUser(true)
    }

    return (
        <AuthContext.Provider value={{
            logout: logout,
            isAuthenticatedUser: isAuthenticatedUser,
            login: login,
            userData: userData,
            setUserData: setUserData
        }} >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuthContext = () => {
    return useContext(AuthContext)
}