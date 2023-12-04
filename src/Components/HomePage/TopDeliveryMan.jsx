import React, { useEffect } from 'react';
import SubHeading from '../Shared/SubHeading';
import AOS from 'aos';
import 'aos/dist/aos.css';

const deliveryMenData = [
    {
        name: 'Delivery Man 1',
        image: 'https://i.ibb.co/PMX06RF/3.jpg',
        parcelsDelivered: 86,
        averageRating: 5,
    },
    {
        name: 'Delivery Man 2',
        image: 'https://i.ibb.co/RhkW525/boy2.jpg',
        parcelsDelivered: 86,
        averageRating: 5,
    },
    {
        name: 'Delivery Man 3',
        image: 'https://i.ibb.co/RhkW525/boy2.jpg',
        parcelsDelivered: 86,
        averageRating: 5,
    },
    {
        name: 'Delivery Man 4',
        image: 'https://i.ibb.co/RhkW525/boy2.jpg',
        parcelsDelivered: 86,
        averageRating: 5,
    },
    {
        name: 'Delivery Man 5',
        image: 'https://i.ibb.co/RhkW525/boy2.jpg',
        parcelsDelivered: 86,
        averageRating: 5,
    },
];

const TopDeliveryManCard = ({ name, image, parcelsDelivered, averageRating }) => (
    <div className="stat flex flex-col md:block items-center border p-2 text-center">
        <div className="stat-figure flex flex-col text-secondary items-center">
            <h1 className=' text-red-600 text-xl md:text-2xl'>{name}</h1>
            <div className="avatar online">
                <div className="w-16 rounded-full">
                    <img src={image} alt={name} />
                </div>
            </div>
        </div>
        <div className=" flex flex-col items-center ">
            <div className=" text-blue-600">Parcel Delivered</div>
            <div className="stat-value">{parcelsDelivered}</div>
            <div className="stat-title text-blue-600">Average Ratings</div>
            <div className="stat-value">{averageRating}</div>
        </div>
    </div>
);

const TopDeliveryMan = () => {
    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 200,
            easing: 'ease-in-out',
        });
    }, []);

    return (
        <div data-aos="flip-left" data-aos-anchor-placement="top-center" className=' text-center pb-12 '>
            <SubHeading subHeading={'Our Dedicated'} heading={'Top Delivery Men'}></SubHeading>
            <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 xl:grid-cols-5 pr-4 pl-4 gap-4">
                {deliveryMenData.map((deliveryMan, index) => (
                    <TopDeliveryManCard key={index} {...deliveryMan} />
                ))}
            </div>
        </div>
    );
};

export default TopDeliveryMan;
