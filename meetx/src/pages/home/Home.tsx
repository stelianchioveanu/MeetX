import TopBar from "@/components/topbar/TopBar";
import Section1 from "./sections/Section1";
import Section2 from "./sections/Section2";
import Section3 from "./sections/Section3";
import Section4 from "./sections/Section4";
import Section5 from "./sections/Section5";
import Footer from "@/components/footer/Footer";
import Section6 from "./sections/Section6";
import { useMediaQuery } from "react-responsive";

const Home = () => {
    const isMobile = useMediaQuery({ query: "(max-width: 640px)" });
    return (
    <div className="flex flex-col items-center font bg-[rgba(17,20,28,1)]">
        <TopBar></TopBar>
        <Section1 disableParallax={isMobile}></Section1>
        <Section2></Section2>
        <Section5></Section5>
        <Section3></Section3>
        <Section4></Section4>
        <Section6></Section6>
        <Footer></Footer>
    </div>);
}
 
export default Home;