import {useParams} from "react-router-dom";
import {useAppContext} from "../context/AppContext.tsx";
import {useEffect, useState} from "react";
import verified_icon from '../assets/verified_icon.svg'
import info_icon from '../assets/info_icon.svg'

interface DoctorInfo {
    _id: string;
    image: string;
    name: string;
    speciality: string;
    degree: string
    experience: string
    about: string
    fees: number
    address: {
        line1: string
        line2: string
    }
}

const Appointment = () => {
    const {docId} = useParams()
    const {doctors} = useAppContext();

    const [docInfo, setDocInfo] = useState<DoctorInfo | null>(null)

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo || null)
        console.log(docInfo)
    }

    useEffect(() => {
            if (docId && doctors.length > 0) {
                fetchDocInfo().catch(error => {
                    console.error('Error fetching doctor info: ', error.message || error, '')
                });
            }

        },
        [doctors, docId])

    return docInfo && (
        <div>
            {/*  Doctor details  */}
            <div className={'flex flex-col sm:flex-row gap-4'}>
                <div>
                    <img src={docInfo.image} alt={`Dr, ${docInfo.name}`} className={'bg-[#5f6fff] w-full sm:max-w-72 rounded-lg'}/>
                </div>

                <div className={'flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'}>
                    {/*{Doc info: Name, degree and experience}*/}
                    <p className={'flex items-center gap-2 text-2xl font-medium text-gray-600'}>{docInfo.name} <img className={'w-5'} src={verified_icon} alt="verified-icon"/></p>
                    <div className={'flex items-center gap-2 text-sm mt-1 text-gray-600'}>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className={'py-0.5 px-2 border text-xs rounded-full'}>{docInfo.experience}</button>
                    </div>

                    {/* Doc About */}
                    <div className={''}>
                        <p className={'flex items-center gap-1 text-sm font-medium text-gray-600 mt-3'}>About <img src={info_icon} alt="info-icon"/></p>
                        <p className={'text-sm text-gray-500 max-w-[700px] mt-1'}>{docInfo.about}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Appointment;