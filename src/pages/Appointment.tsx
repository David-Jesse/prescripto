import {useParams} from "react-router-dom";
import {useAppContext} from "../context/AppContext.tsx";
import {useEffect, useState} from "react";
import verified_icon from '../assets/verified_icon.svg'
import info_icon from '../assets/info_icon.svg'
import RelatedDoctors from "../components/related-doctors";

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

interface TimeSlot {
    dateTime: Date;
    time: string;
}

const Appointment = () => {
    const {docId} = useParams()
    const {doctors, currencySymbol} = useAppContext();
    const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

    const [docInfo, setDocInfo] = useState<DoctorInfo | null>(null)
    const [docSlot, setDocSlots] = useState<TimeSlot[][]>([])
    const [slotIndex, setSlotIndex] = useState<number>(0)
    const [slotTime, setSlotTime] = useState('')

    const fetchDocInfo = async () => {
        const docInfo = doctors.find(doc => doc._id === docId)
        setDocInfo(docInfo || null)
    }

    const getAvailableSlots = () => {
        setDocSlots([])

        // getting current date
        let today = new Date();

        for (let i = 0; i < 7; i++) {
            // Getting date with index
            let currentDate = new Date(today)
            currentDate.setDate(today.getDate() + i);

            // Setting end time of the date with index
            let endTime = new Date()
            endTime.setDate(today.getDate() + i);
            endTime.setHours(21, 0, 0, 0)

            // Setting hours
            if (today.getDate() === currentDate.getDate()) {
                currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10)
                currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0)
            } else {
                currentDate.setHours(10);
                currentDate.setMinutes(0);
            }

            let timeSlots: TimeSlot[] = []

            while (currentDate < endTime) {
                let formattedTime = currentDate.toLocaleTimeString([], {hour: '2-digit', minute: '2-digit'})

                // add slot to array
                timeSlots.push({
                    dateTime: new Date(currentDate),
                    time: formattedTime
                })

                // Increment current by 30mins
                currentDate.setMinutes(currentDate.getMinutes() + 30)
            }

            setDocSlots(prev => ([...prev, timeSlots]))
        }
    }

    useEffect(() => {
            if (docId && doctors.length > 0) {
                fetchDocInfo().catch(error => {
                    console.error('Error fetching doctor info: ', error.message || error, '')
                });
            }

        },
        [doctors, docId])

    useEffect(() => {
        getAvailableSlots()
    }, [docInfo])

    useEffect(() => {
        console.log(docSlot)
    }, [docSlot])

    return docInfo && (
        <div>
            {/*  Doctor details  */}
            <div className={'flex flex-col sm:flex-row gap-4'}>
                <div>
                    <img src={docInfo.image} alt={`Dr, ${docInfo.name}`}
                         className={'bg-[#5f6fff] w-full sm:max-w-72 rounded-lg'}/>
                </div>

                <div
                    className={'flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'}>
                    {/*{Doc info: Name, degree and experience}*/}
                    <p className={'flex items-center gap-2 text-2xl font-medium text-gray-600'}>{docInfo.name} <img
                        className={'w-5'} src={verified_icon} alt="verified-icon"/></p>
                    <div className={'flex items-center gap-2 text-sm mt-1 text-gray-600'}>
                        <p>{docInfo.degree} - {docInfo.speciality}</p>
                        <button className={'py-0.5 px-2 border text-xs rounded-full'}>{docInfo.experience}</button>
                    </div>

                    {/* Doc About */}
                    <div className={''}>
                        <p className={'flex items-center gap-1 text-sm font-medium text-gray-600 mt-3'}>About <img
                            src={info_icon} alt="info-icon"/></p>
                        <p className={'text-sm text-gray-500 max-w-[700px] mt-1'}>{docInfo.about}</p>
                    </div>
                    <p className={'text-gray-500 font-medium mt-4'}>
                        Appointment fee: <span className={'text-gray-600'}>{currencySymbol}{docInfo.fees}</span>
                    </p>
                </div>
            </div>

            {/* Booking Slots */}
            <div className={'sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'}>
                <p>Booking slots</p>
                <div className={'flex gap-3 items-center w-full overflow-x-scroll mt-4'}>
                    {
                        docSlot.length && docSlot.map((item, index) => (
                            <div onClick={() => setSlotIndex(index)} key={index}
                                 className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-[#5f6fff] text-white' : 'border border-gray-200'}`}>
                                <p>{item[0] && daysOfWeek[item[0].dateTime.getDay()]}</p>
                                <p>{item[0] && item[0].dateTime.getDate()}</p>
                            </div>
                        ))
                    }
                </div>

                <div className={'flex items-center gap-3 mt-3 overflow-x-scroll'}>
                    {docSlot.length && docSlot[slotIndex].map((item, index) => (
                        <p key={index} onClick={() => setSlotTime(item.time)}
                           className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-[#5f6fff] text-white' : 'text-gray-400 border border-gray-300'}`}>{item.time.toLowerCase()}
                        </p>
                    ))}
                </div>

                <button className={'bg-[#5f6fff] text-white text-sm font-light px-12 py-3 rounded-full mt-10 cursor-pointer'}>
                    Book an appointment
                </button>
            </div>

            {/* Related Doctors section*/}
            <RelatedDoctors docId={docId} speciality={docInfo.speciality}/>
        </div>
    )
}

export default Appointment;