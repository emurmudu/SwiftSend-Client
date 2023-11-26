
import React, { useEffect } from "react";
import SubHeading from "../Shared/SubHeading";
import AOS from 'aos';
import 'aos/dist/aos.css'; // You can also use <link> for styles

const DeliveryManCard = ({ name, image, parcelsDelivered, averageRating }) => (
    <div className="max-w-sm rounded overflow-hidden shadow-lg m-4">
        <img className="w-full h-40 object-cover" src={image} alt={name} />
        <div className="p-4">
            <h3 className="text-xl font-semibold mb-2">{name}</h3>
            <p className="text-gray-700">Parcels Delivered: {parcelsDelivered}</p>
            <p className="text-gray-700">Average Rating: {averageRating}</p>
        </div>
    </div>
);

const TopDeliveryMan = () => {

    useEffect(() => {
        AOS.init({
            duration: 1200,
            offset: 200,
            easing: 'ease-in-out',
        });
    }, []);

    const deliveryMenData = [
        {
            name: "John Doe",
            image: "https://placehold.it/300x200",
            parcelsDelivered: 150,
            averageRating: 4.8,
        },
        {
            name: "Jane Smith",
            image: "https://placehold.it/300x200",
            parcelsDelivered: 120,
            averageRating: 4.5,
        },
        {
            name: "Mike Johnson",
            image: "https://placehold.it/300x200",
            parcelsDelivered: 100,
            averageRating: 4.7,
        },
        {
            name: "Emily Davis",
            image: "https://placehold.it/300x200",
            parcelsDelivered: 90,
            averageRating: 4.2,
        },
        {
            name: "David Brown",
            image: "https://placehold.it/300x200",
            parcelsDelivered: 80,
            averageRating: 4.6,
        },
    ];

    // Sort delivery men by parcels delivered and average rating
    const sortedDeliveryMen = deliveryMenData.sort(
        (a, b) => b.parcelsDelivered - a.parcelsDelivered || b.averageRating - a.averageRating
    );

    return (
        <div data-aos="flip-left" data-aos-anchor-placement="top-center" className="text-center mb-24">
            <SubHeading
                subHeading={"Our Dedicated"}
                heading={"Top Delivery Men"}>
            </SubHeading>
            <div className="flex flex-wrap justify-center">
                {sortedDeliveryMen.slice(0, 5).map((deliveryMan, index) => (
                    <DeliveryManCard key={index} {...deliveryMan} />
                ))}
            </div>
        </div>
    );
};

export default TopDeliveryMan;
