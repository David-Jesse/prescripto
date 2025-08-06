import logo from '../assets/logo.svg'


const Footer = () => {

    const currentYear = new Date().getFullYear();
    return (
        <div className={'md:mx-10'}>
            <div className={'flex flex-col sm:grid grid-cols-[3fr_1fr_1fr] gap-14 my-10 mt-40 text-sm'}>

                {/*    Left section*/}
                <div>
                    <img className={'mb-5 w-40'} src={logo} alt="footer-logo"/>
                    <p className={'w-full md:w-2/3 text-gray-600 leading-6'}>Access top-rated healthcare professionals across specialties—from general practitioners to specialists—all at your fingertips.
                        Enjoy seamless scheduling, real-time availability, and secure medical consultations from the comfort of your home.
                        Your wellness journey starts here.
                    </p>
                </div>

                {/*center section*/}
                <div className={''}>
                    <p className={'text-xl font-medium mb-5'}>COMPANY</p>
                    <ul className={'flex flex-col gap-2 text-gray-600'}>
                        <li>Home</li>
                        <li>About us</li>
                        <li>Contact us</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>

                {/*Right section*/}
                <div>
                    <p className={'text-xl font-medium mb-5'}>GET IN TOUCH</p>
                    <ul className={'flex flex-col gap-2 text-gray-600'}>
                        <li>+1-212-456-7890</li>
                        <li>iyiowo19@gmail.com</li>
                    </ul>
                </div>
            </div>

            {/* Copyright section*/}
            <div>
                <hr/>
                <p className={'py-5 text-sm text-center'}>&copy; {currentYear} Prescripto - All Right Reserved.</p>
            </div>
        </div>
    )
}

export default Footer;