import AppUsage from "./AppUsage";
import Banner from "./Banner";
import Features from "./Features";
import OurFeatures from "./OurFeatures";
import TopDeliveryMan from "./TopDeliveryMan";

const Home = () => {
    return (
        <div>
            <Banner></Banner>
            <OurFeatures></OurFeatures>
            <AppUsage></AppUsage>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;