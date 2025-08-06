import logo from '../assets/logo.svg';
import profile_pic from '../assets/profile_pic.png';
import dropdown_icon from '../assets/dropdown_icon.svg'
import {NavLink, useNavigate} from "react-router-dom";
import {useState} from "react";

const Navbar = () => {

    const navigate = useNavigate();

    const [showMenu, setShowMenu] = useState<boolean>(false)
    const [token, setToken] = useState(true)
    return (
        <div className={'flex items-center justify-between text-sm py-4 mb-5 border-b border-b-gray-400'}>
            <a href="/" className={'cursor-pointer'}>
                <img src={logo} alt="logo" className={'w-44'}/>
            </a>

            <ul className={'hidden  md:flex items-start font-medium gap-[20px] text-gray-500'}>
                <NavLink to={'/'} className={'no-underline'}>
                    {({isActive}) => (
                        <>
                            <li className={'text-[#2e3238] hover:text-[#2e3238]/30 transition-all'}>HOME</li>
                            <hr className={`border-none outline-none h-0.5 w-3/5 bg-[#2e3238] m-auto mt-2 ${isActive ? 'block' : 'hidden'}`}/>
                        </>
                    )}

                </NavLink>
                <NavLink to={'/doctors'} className={'no-underline'}>
                    {({isActive}) => (
                        <>
                            <li className={'text-[#3e3238] hover:text-[#2e3238]/30 transition-all'}>ALL DOCTORS</li>
                            <hr className={`border-none outline-none h-0.5 w-3/5 bg-[#2e3238] bg-primary m-auto mt-1.5 ${isActive ? 'block' : 'hidden'}`}/>
                        </>
                    )}

                </NavLink>
                <NavLink to={'/about'} className={'no-underline'}>
                    {({isActive}) => (
                        <>
                            <li className={'text-[#3e3238] hover:text-[#2e3238]/30 transition-all'}>ABOUT</li>
                            <hr className={`border-none outline-none h-0.5 w-3/5 bg-[#2e3238] m-auto mt-1.5 ${isActive ? 'block' : 'hidden'}`}/>
                        </>
                    )}

                </NavLink>
                <NavLink to={'/contact'} className={'no-underline'}>
                    {({isActive}) => (
                        <>
                            <li className={'text-[#3e3238] hover:text-[#2e3238]/30 transition-all'}>CONTACT</li>
                            <hr className={`border-none outline-none h-0.5 w-3/5 bg-[#2e3238] m-auto mt-1.5 ${isActive ? 'block' : 'hidden'}`}/>
                        </>
                    )}

                </NavLink>
            </ul>
            <div className={'flex items-center gap-[10px]'}>
                {token ? <div className={'flex items-center gap-2 cursor-pointer group relative'}>
                        <img className={'w-8 rounded-full'} src={profile_pic} alt="profile-picture"/>
                        <img className={'w-2.5 h-auto align-middle transition-transform duration-300 group-hover:rotate-180'} src={dropdown_icon} alt="dropdown-icon"/>
                        <div
                            className={'absolute top-0 right-0 pt-14 text-base font-medium text-gray-600 z-20 hidden group-hover:block'}>
                            <div className={'min-w-48 bg-stone-100 rounded flex flex-col gap-4 shadow-lg p-4'}>
                                <p onClick={() => navigate('my-profile')} className={'hover:text-black cursor-pointer'}>
                                    My Profile
                                </p>
                                <p onClick={() => navigate('my-appointment')} className={'hover:text-black cursor-pointer'}>
                                    My Appointments
                                </p>
                                <p onClick={() => setToken(false)} className={'hover:text-black cursor-pointer'}>
                                    Logout
                                </p>
                            </div>
                        </div>
                    </div>
                    :
                    <button onClick={() => navigate('/login')}
                            className={'bg-[#5f6fff] text-white px-8 py-3 rounded-full font-light md:block hidden'}>Create
                        Account
                    </button>
                }

            </div>
        </div>
    );
}

export default Navbar;