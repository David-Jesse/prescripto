import group_profiles from '../assets/group_profiles.png'
import arrow_icon from '../assets/arrow_icon.svg'
import header_img from '../assets/header_img.png'

const Header = () => {
    return (
        <div className={'flex flex-col md:flex-row flex-wrap bg-[#5f6fff] rounded-lg px-6 md:px-10 lg:px-20'}>
            {/*Left section*/}
            <div className={'md:w-1/2 flex flex-col items-start gap-4 justify-center py-10 m-auto md:py-[10vw] md:mb-[-30px]'}>
                <p className={'text-3xl md:texl-4cl lg:text-5xl font-semibold text-white leading-tight md:leading-tight lg:leading-tight'}>
                    Book Appointment <br/>
                    With Trusted Doctors
                </p>
                <div className={'flex flex-col md:flex-row items-center gap-3 text-sm text-white font-light'}>
                    <img src={group_profiles} className={'w-28'} alt="group-profiles"/>
                    <p>Simply browse through our extensive list of trusted doctors, <br className={'hidden sm:block'}/> schedule your appointment hassle-free.</p>
                </div>
                <a href="#speciality" className={'flex items-center gap-2 bg-white py-3 px-8 text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all rounded-full duration-300'}>
                    Book appointment <img src={arrow_icon} className={'w-3'} alt="arrow-icon"/>
                </a>
            </div>

            {/*  Right section*/}
            <div className={'md:w-1/2 relative'}>
                <img src={header_img} className={'w-full md:absolute bottom-0 h-auto rounded-lg'} alt="hero-header-img"/>
            </div>
        </div>
    )
}

export default Header;