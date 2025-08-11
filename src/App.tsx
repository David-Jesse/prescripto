import {Routes, Route} from "react-router-dom";
import Home from "./pages/Home.tsx";
import Doctors from "./pages/Doctors.tsx";
import Login from "./pages/Login.tsx";
import About from "./pages/About.tsx";
import Contact from "./pages/Contact.tsx";
import MyProfile from "./pages/MyProfile.tsx";
import MyAppointments from "./pages/MyAppointments.tsx";
import Appointment from "./pages/Appointment.tsx";
import Navbar from "./components/Navbar.tsx";
import Footer from "./components/footer.tsx";


const App = () => {
    return (
        <div className={'mx-4 sm:mx-[10%]'}>
            <Navbar/>
            <Routes>
                <Route path={'/'} element={<Home/>}/>
                <Route path={'/doctors'} element={<Doctors/>}/>
                <Route path={'/doctors/:speciality'} element={<Doctors/>}/>
                <Route path={'/login'} element={<Login/>}/>
                <Route path={'/about'} element={<About/>}/>
                <Route path={'/contact'} element={<Contact/>}/>
                <Route path={'/my-profile'} element={<MyProfile/>}/>
                <Route path={'/my-appointment'} element={<MyAppointments/>}/>
                <Route path={'/appointment/:docId'} element={<Appointment/>}/>
            </Routes>
            <Footer/>
        </div>
    )
}

export default App;