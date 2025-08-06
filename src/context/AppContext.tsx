import {createContext, type ReactNode} from 'react';
import {doctors} from "../data.ts";

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

export default AppContextProvider;