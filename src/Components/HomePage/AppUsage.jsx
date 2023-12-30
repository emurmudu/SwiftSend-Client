import React, { useEffect, useState } from "react";
import CountUp from "react-countup";
import SubHeading from "../Shared/SubHeading";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { FaAd, FaBookOpen, FaBox, FaBoxOpen, FaBoxes, FaChartBar, FaEdit, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUserSecret, FaUsers, FaUtensils } from "react-icons/fa";
import { useLoaderData } from "react-router-dom";

const AppUsage = () => {
    const [users, setUsers] = useState([]);
    const [bookings, setBookings] = useState([]);
    console.log(users.length);

    useEffect(() => {
        AOS.init({
            duration: 1000,
            offset: 200,
            easing: 'ease-in-out',
        });
    }, []);

    useEffect(() => {
        fetch('http://localhost:5000/users')
            .then(res => res.json())
            .then(data => setUsers(data))
    }, [])
    useEffect(() => {
        fetch('http://localhost:5000/bookedParcels')
            .then(res => res.json())
            .then(data => setBookings(data))
    }, [])



    return (
        <div className=" text-center">
            <SubHeading subHeading={'Our App Highlight'} heading={'Usage Information'}></SubHeading>
            <div data-aos="flip-left" data-aos-anchor-placement="top-center" className="stats w-5/6 mx-auto shadow mb-24 flex items-center text-center">
                <div className="stat place-items-center">
                    <div className="stat-title">Number of Parcel Booked</div>
                    <div className="stat-value">{bookings.length}</div>
                    <div className="stat-desc">From January 1st to February 1st</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Number of Registered Users</div>
                    <div className="stat-value text-secondary">{users.length}</div>
                    <div className="stat-desc text-secondary">↗︎ 40 (2%)</div>
                </div>

                <div className="stat place-items-center">
                    <div className="stat-title">Number of Parcel Delivered</div>
                    <div className="stat-value">1,200</div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>

            </div>
        </div>
    );
};

export default AppUsage;
