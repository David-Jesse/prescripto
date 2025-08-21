import {useState} from "react";
import {useAppContext} from "../context/AppContext.tsx";
import upload_icon from '../assets/upload_icon.png'
import axios from "axios";
import {toast} from "react-toastify";

const MyProfile = () => {
    const {userData, setUserData, token, backendUrl, loadUserData} = useAppContext();

    if (!userData) {
        toast.error('Please login to access this page')
        return;
    }

    const updateUserProfileData = async () => {
        try {
            const formData = new FormData();

            formData.append('name', userData.name)
            formData.append('phone', userData.phone)
            formData.append('address', JSON.stringify(userData.address))
            formData.append('gender', userData.gender)
            formData.append('dob', userData?.dob)

            image && formData.append('image', image)

            const {data} = await axios.post(backendUrl + '/api/user/update-profile', formData, {headers: {token}})
            if (data.success) {
                toast.success('Profile updated successfully')
                loadUserData();
                setIsEdit(false)
                setImage(null)
            } else {
                toast.error(data.message)
            }
        } catch (error: any) {
            console.error('Error updating user profile:', error);
            toast.error(error.message)
        }
    }
    const [isEdit, setIsEdit] = useState(false);
    const [image, setImage] = useState<File | null>(null);

    return userData && (
        <div className={'max-w-lg flex flex-col gap-2 text-sm'}>

            {
                isEdit
                    ? <label htmlFor="image">
                        <div className={'inline-block relative cursor-pointer'}>
                            <img src={image ? URL.createObjectURL(image) : userData.image} alt=""
                                 className={'w-36 rounded opacity-75'}/>
                            <img src={image ? "" : upload_icon} alt="" className={'w-10 absolute bottom-12 right-12'}/>
                        </div>
                        <input onChange={(e) => setImage(e.target.files?.[0] || null)} type="file" id={'image'} hidden/>
                    </label>
                    :
                    <img src={userData.image} alt={'User image'} className={'w-36 rounded'}/>
            }


            {isEdit ? <input className={'bg-gray-50 text-3xl  max-w-60 mt-4'} type="text" value={userData.name}
                             onChange={e => setUserData({...userData, name: e.target.value})}/>
                : <p className={'font-medium text-3xl text-zinc-800 mt-4'}>{userData.name}</p>
            }

            <hr className={'bg-zinc-400 h-[1px] border-none'}/>
            <div>
                <p className={'text-neutral-500 underline mt-3'}>CONTACT INFORMATION</p>
                <div className={'grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-600'}>
                    <p className={'font-medium'}>Email id:</p>
                    <p className={'text-blue-500'}>{userData.email}</p>
                    <p className={'font-medium'}>Phone:</p>

                    {
                        isEdit
                            ? <input className={'bg-gray-100 max-w-52'} type="text" value={userData.phone}
                                     onChange={e => setUserData((prev: any) => prev ? {
                                         ...prev,
                                         phone: e.target.value
                                     } : null)}/>
                            : <p className={'text-blue-400'}>{userData.phone}</p>
                    }
                    <p className={'font-medium'}>Address:</p>
                    {
                        isEdit
                            ? <p>
                                <input className={'bg-gray-50 text-zinc-700'}
                                       onChange={(e) => setUserData((prev: { address: any; }) => ({
                                           ...prev,
                                           address: {...prev.address, line1: e.target.value}
                                       }))} value={userData.address.line1} type="text"/>
                                <br/>
                                <input className={'bg-gray-50 text-zinc-700'} type="text"
                                       onChange={(e) => setUserData(prev => ({
                                           ...prev,
                                           address: {...prev.address, line2: e.target.value}
                                       }))} value={userData.address.line2}/>
                            </p>
                            : <p className={'text-gray-500'}>
                                {userData.address.line1} <br/>
                                {userData.address.line2}
                            </p>
                    }
                </div>
            </div>
            <div>
                <p className={'text-neutral-500 underline mt-3'}>BASIC INFORMATION</p>
                <div className={'grid grid-cols-[1fr_3fr] gap-y-2.5 mt-3 text-neutral-600'}>
                    <p className={'font-medium'}>GENDER:</p>
                    {
                        isEdit
                            ? <select className={'max-w-20 bg-gray-100'}
                                      onChange={(e) => setUserData(prev => ({...prev, gender: e.target.value}))}
                                      value={userData.gender}>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                            </select>
                            : <p className={'text-gray-400 '}>{userData.gender}</p>
                    }
                    <p className={'font-medium'}>Birthday:</p>
                    {
                        isEdit ?
                            <input className={'max-w-28 bg-gray-100'} type="date"
                                   onChange={(e) => setUserData((prev: any) => ({...prev, dob: e.target.value}))}
                                   value={userData.dob}/>
                            : <p className={'text-gray-400'}>{userData.dob}</p>
                    }
                </div>
            </div>

            <div className={'mt-10 '}>
                {
                    isEdit ? <button
                            className={'border border-[#5f6fff] px-8 py-2 cursor-pointer rounded-full hover:bg-[#5f6fff] hover:text-white transition-all'}
                            onClick={updateUserProfileData}>Save information</button>
                        : <button
                            className={'border border-[#5f6fff] px-8 py-2 cursor-pointer rounded-full hover:bg-[#5f6fff] hover:text-white transition-all'}
                            onClick={() => setIsEdit(true)}>Edit</button>
                }
            </div>
        </div>
    )
}

export default MyProfile;