'use client'
import { createContext, useContext, useState } from "react";

const AppContext = createContext({
    accessToken: "",
    setAccessToken: (accessToken: string) => { }
})

export const useAppContext = () => {
    const context = useContext(AppContext)
    if (!context) {
        throw new Error('useAppContext must be used withthin an AppProvider!')
    }
    return context;
}

const AppProvider = ({ children, initialAccessToken = "" }: { children: React.ReactNode, initialAccessToken?: string }) => {
    const [accessToken, setAccessToken] = useState(initialAccessToken);
    return (
        <AppContext.Provider value={{ accessToken, setAccessToken }}>
            {children}
        </AppContext.Provider>
    )
}

export default AppProvider;