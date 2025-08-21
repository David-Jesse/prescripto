import React, {createContext, type ReactNode, useEffect} from 'react';
import {useContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

export interface Doctor {
    _id: string;
    name: string;
    image?: string;
    speciality: string;
    degree: string;
    experience: string;
    about: string;
    fees: number;
    address?: {
        line1: string;
        line2: string;
    };
    date?: number;
    slots_booked?: number;
}

interface UserData {
    _id: string;
    name: string;
    email: string;
    phone: string;
    image: string;
    gender: string;
    dob: string;
    address: {
        line1: string;
        line2: string;
    };
}

interface AppContextType {
    doctors: Doctor[];
    currencySymbol: string;
    getDoctors: () => void;
    loading: boolean;
    token: string | null;
    setToken: (token: string) => void;
    backendUrl: string;
    setUserData: React.Dispatch<React.SetStateAction<UserData | null>>;
    userData: UserData | null;
    loadUserData: () => void;
}

export const AppContext = createContext<AppContextType | undefined>(undefined);

interface AppContextProviderProps {
    children: ReactNode;
}


const AppContextProvider = ({children}: AppContextProviderProps) => {

    const currencySymbol = "$";
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [doctors, setDoctors] = useState([])
    const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '')
    const [loading, setLoading] = useState(false)
    const [userData, setUserData] = useState<UserData | null>(null)

    const getDoctors = async () => {
        try {
            setLoading(true)
            const {data} = await axios.get(backendUrl + '/api/doctor/list')
            if (data.success) {
                setDoctors(data.doctors)
            } else {
                toast.error(data.message)
            }
        } catch (error: string | any) {
            console.error('Error fetching doctors:', error);

            // Better error handling
            if (axios.isAxiosError(error)) {
                if (error.response) {
                    toast.error(error.response.data?.message || 'Server error occurred')
                } else if (error.request) {
                    toast.error('Network error. Please check your connection')
                } else {
                    toast.error('An unexpected error occurred. Please try again later')
                }
            } else {
                toast.error(error?.message || 'An unexpected error occurred')
            }
        } finally {
            setLoading(false)
        }
    }

    const loadUserData = async () => {
        try {
            const {data} = await axios.get(backendUrl + '/api/user/get-profile', {headers: {token}})

            if (data.success) {
                setUserData(data.userData)
            } else {
                toast.error(data.message)
            }
        } catch (error) {
            console.error('Error loading user data:', error);
            toast.error('Failed to load user data. Please try again later');
        }
    }


    useEffect(() => {
        getDoctors()
    }, []);

    useEffect(() => {
        if (token) {
            loadUserData()
        } else {
            setUserData(null)
        }
    }, [token])

    const value: AppContextType = {
        doctors,
        currencySymbol,
        getDoctors,
        loading,
        token,
        setToken,
        backendUrl,
        userData, setUserData,
        loadUserData
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