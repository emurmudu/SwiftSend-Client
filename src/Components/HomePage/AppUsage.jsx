import React, { useEffect } from "react";
import CountUp from "react-countup";
import SubHeading from "../Shared/SubHeading";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaAd, FaBookOpen, FaBox, FaBoxOpen, FaBoxes, FaChartBar, FaEdit, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUserSecret, FaUsers, FaUtensils } from "react-icons/fa";

const AppUsage = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 200,
            easing: 'ease-in-out',
        });
    }, []);

    const statisticsData = [
        { title: "Number of Parcel Booked", count: 1200, icon: "📦" },
        { title: "Number of Parcel Delivered", count: 800, icon: "🚚" },
        { title: "Number of Users", count: 5000, icon: "👥" },
    ];

    return (
        <div data-aos="flip-left" data-aos-anchor-placement="top-center" className="mb-24 text-center">
            <SubHeading
                subHeading={"Service Providing"}
                heading={"Usage Statistics"}>
            </SubHeading>
            <div className="flex flex-wrap justify-center">
                {statisticsData.map((statistic, index) => (
                    <div key={index} className="max-w-sm rounded overflow-hidden shadow-lg m-4" data-aos="fade-up">
                        <div className="p-4">
                            <div className="text-4xl mb-4">{statistic.icon}</div>
                            <h3 className="text-xl font-semibold mb-2">{statistic.title}</h3>
                            <p className="text-gray-700">
                                <CountUp end={statistic.count} duration={2} separator="," />
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AppUsage;
