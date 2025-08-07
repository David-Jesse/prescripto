import about_image from '../assets/about_image.png'

const About = () => {
    return (
        <div>
            <div className={'text-center text-2xl pt-10 text-gray-500'}>
                <p>ABOUT <span className={'text-gray-700 font-medium'}>US</span></p>
            </div>

            <div className={'my-10 flex flex-col md:flex-row gap-12'}>
                <img className={'w-full md:max-w-[360px]'} src={about_image} alt="about-image"/>
                <div className={'flex flex-col justify-center gap-4 md:w-2/4 text-sm text-gray-600'}>
                    <p>
                        Welcome to Prescripto. Your trusted partner in Managing your Healthcare needs conveniently and effectively.
                        At Prescripto, we understand the importance of managing your healthcare effectively. Our mission is to provide a seamless and user-friendly platform for managing your healthcare needs.
                    </p>
                    <p>
                        Prescripto is committed to excellence in healthcare technology. We continously strive to improve our services and offerings to meet the evolving needs of our customers.
                        Whether you're booking your first appointment or managing your healthcare needs, Prescripto is here to help.
                    </p>
                    <b>Our Vision</b>
                    <p>
                        Our vision at Prescripto is to be the leading provider of healthcare technology in the world. We aim to be the go-to platform for managing your healthcare needs, providing you with the best possible experience.
                    </p>
                </div>
            </div>

            <div className={'text-xl my-4'}>
                <p>WHY <span className={'text-gray-700 font-semibold'}>CHOOSE US</span></p>
            </div>

            <div className={'flex flex-col md:flex-row mb-10'}>
                <div className={'border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600'}>
                    <b>EFFICIENCY:</b>
                    <p>Streamlined Appointment Scheduling That Fits Into Your Busy Lifestyle.</p>
                </div>

                <div className={'border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600'}>
                    <b>CONVENIENCE:</b>
                    <p>Access To A Network Of Trusted Healthcare Professionals In Your Area.</p>
                </div>

                <div className={'border px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[15px] hover:bg-[#5f6fff] hover:text-white transition-all duration-300 text-gray-600'}>
                    <b>PERSONALIZATION:</b>
                    <p>Tailored Recommendations And Reminders To Help You Stay On Top Of Your Health.</p>
                </div>
            </div>
        </div>
    )
}

export default About;