import {createContext, type ReactNode} from 'react';
import {doctors} from "../data.ts";
import {useContext} from "react";

interface AppContextType {
    doctors: typeof doctors;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}


const AppContextProvider = ({children}: AppContextProviderProps) => {


    const value: AppContextType = {
        doctors
    }

    return (
        <AppContext.Provider value={value}>
            {children}
        </AppContext.Provider>
    )
}

// Custom hook
export const useAppContext = () => {
    const context: AppContextType | undefined = useContext(AppContext);
    if (context === undefined) {
        throw new Error('useAppContext must be used within an AppContextProvider');
    }
    return context;
}

export default AppContextProvider;