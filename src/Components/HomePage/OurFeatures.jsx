import { FaBox, FaCode, FaHeart, FaRocket } from "react-icons/fa";
import SubHeading from "../Shared/SubHeading";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const OurFeatures = () => {
    return (
        <div data-aos="flip-left" data-aos-anchor-placement="top-center">
            {/* <h1>This is Our Features page</h1> */}
            <div data className="text-center mt-24 mb-24">
                <SubHeading
                    subHeading={"Standalone an Unique"}
                    heading={"Our Features"}>
                </SubHeading>
                {/* <h2 className="text-3xl font-semibold mb-8">Our Features</h2> */}
                <div className="flex flex-wrap justify-center">
                    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
                        <div className="p-4 flex flex-col items-center">
                            <div className="text-center text-3xl mb-4">
                                <FaRocket className=" text-red-600"></FaRocket>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Fast Delivery</h3>
                            <p className="text-gray-700 text-justify">
                                Experience unparalleled speed with our Parcel Management Delivery Services. We prioritize swift deliveries, ensuring your parcels reach their destination promptly. Leveraging advanced logistics and technology, we guarantee efficient and timely service. Trust us for a fast, reliable, and seamless delivery experience tailored to meet your needs.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
                        <div className="p-4 flex flex-col items-center">
                            <div className="text-center text-3xl mb-4">
                                <FaHeart className="text-red-600"></FaHeart>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Customer Satisfaction</h3>
                            <p className="text-gray-700 text-justify">
                                Our Parcel Management Delivery Services are driven by a relentless commitment to customer satisfaction. We prioritize your experience through timely deliveries, transparent tracking, and personalized service. Your peace of mind is our priority, ensuring a seamless and gratifying parcel management experience from start to finish.
                            </p>
                        </div>
                    </div>
                    <div className="max-w-xs rounded overflow-hidden shadow-lg m-4">
                        <div className="p-4 flex flex-col items-center">
                            <div className="text-center text-3xl mb-4">
                                <FaBox className="text-red-600"></FaBox>
                            </div>
                            <h3 className="text-xl font-semibold mb-2">Parcel Safety</h3>
                            <p className="text-gray-700 text-justify">
                                With dedicated teams and advanced technology, we ensure secure handling and protective packaging. Real-time tracking and tamper-evident features guarantee the safety and integrity of your shipments. Trust us for a reliable and inherently secure delivery experience, making your satisfaction our priority.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurFeatures;