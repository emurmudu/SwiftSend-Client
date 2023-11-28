import AppUsage from "./AppUsage";
import Banner from "./Banner";
import Features from "./Features";
import OurFeatures from "./OurFeatures";
import TopDeliveryMan from "./TopDeliveryMan";

const Home = () => {
    return (
        <div>
            <Banner id="home" />
            <OurFeatures id="features" />
            <AppUsage></AppUsage>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;