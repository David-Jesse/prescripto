import Header from "../components/Header.tsx";
import SpecialityMenu from "../components/speciality-menu.tsx";
import TopDoctors from "../components/top-doctors.tsx";
import Banner from "../components/banner.tsx";

const Home = () => {
    return (
        <div>
            <Header/>
            <SpecialityMenu/>
            <TopDoctors/>
            <Banner/>
        </div>
    )
}

export default Home;