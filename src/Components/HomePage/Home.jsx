import { Helmet } from "react-helmet";
import AppUsage from "./AppUsage";
import Banner from "./Banner";
import Features from "./Features";
import OurFeatures from "./OurFeatures";
import TopDeliveryMan from "./TopDeliveryMan";

const Home = () => {
    return (
        <div>
            <Helmet>
                <title>SwiftSend | Login</title>
            </Helmet>
            <Banner id="home" />
            <OurFeatures id="features" />
            <AppUsage></AppUsage>
            <TopDeliveryMan></TopDeliveryMan>
        </div>
    );
};

export default Home;