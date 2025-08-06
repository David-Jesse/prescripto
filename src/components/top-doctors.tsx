import {useNavigate} from "react-router-dom";
import {useAppContext} from "../context/AppContext.tsx";

interface DoctorType {
    _id: string;
    image: string;
    name: string;
    speciality: string;
}


const TopDoctors = () => {

    const navigate = useNavigate();
    const {doctors} = useAppContext();

    return (
        <div className={'flex flex-col items-center gap-4 text-gray-900 my-16 md:mx-10'}>
            <h2 className={'text-3xl font-medium'}>Top Doctors to Book</h2>
            <p className={'sm:w-1/3 text-center text-sm'}>Simply browse through our extensive list of trusted
                doctors.</p>

            <div className={'w-full grid gap-4 gap-y-6 pt-5 px-3 sm:px-0'}
                 style={{gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))'}}
            >
                {doctors.slice(0, 10).map((item: DoctorType, index) => (
                    <div key={index} onClick={() => navigate(`/appointment/${item._id}`)}
                         className={'border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[-10px] transition-all duration-400'}>
                        <img className={'bg-blue-50'} src={item.image} alt="doctors-image"/>
                        <div className={'p-4'}>
                            <div className={'flex items-center gap-2 text-sm text-center text-green-500'}>
                                <p className={'w-2 h-2 bg-green-500 rounded-full'}></p><p>Available</p>
                            </div>

                            <p className={'text-lg font-medium text-gray-900'}>{item.name}</p>
                            <p className={'text-gray-600 text-sm'}>{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            <button onClick={() => {navigate('/doctors'); scrollTo(0,0)}} className={'bg-blue-50 text-gray-600 px-12 py-3 rounded-full mt-10 cursor-pointer hover:text-gray-600/200'}>more</button>
        </div>
    )
}

export default TopDoctors;