import axios from 'axios';
import { useContext, useEffect, useState } from 'react';
import useAuth from '../../hooks/useAuth';

const MyDelivList = () => {
    const { user } = useAuth();
    const [parcels, setParcels] = useState([]);

    useEffect(() => {
        const fetchParcels = async () => {
            try {
                if (user) {
                    const response = await axios.get(`https://assignment-12-server-c6usoj9ec-elias-murmus-projects.vercel.app/api/bookedParcels?deliveryMenId=${user._id}`);
                    setParcels(response.data);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchParcels();
    }, [user]);







    const viewLocation = (latitude, longitude) => {
        console.log(`Viewing location at ${latitude}, ${longitude}`);
    };

    const cancelBooking = (parcelId) => {
        if (window.confirm('Are you sure you want to cancel this booking?')) {
            console.log(`Canceling booking with ID ${parcelId}`);
        }
    };

    const deliverParcel = (parcelId) => {
        if (window.confirm('Are you sure you want to deliver this parcel?')) {
            console.log(`Delivering parcel with ID ${parcelId}`);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Delivery Man Dashboard</h1>
            <table className="table-auto w-full">
                <thead>
                    <tr>
                        <th className="border px-4 py-2">User's Name</th>
                        <th className="border px-4 py-2">Receiver's Name</th>
                        <th className="border px-4 py-2">User's Phone</th>
                        <th className="border px-4 py-2">Requested Delivery Date</th>
                        <th className="border px-4 py-2">Approximate Delivery Date</th>
                        <th className="border px-4 py-2">Receiver's Phone</th>
                        <th className="border px-4 py-2">Receiver's Address</th>
                        <th className="border px-4 py-2">View Location</th>
                        <th className="border px-4 py-2">Cancel</th>
                        <th className="border px-4 py-2">Deliver</th>
                    </tr>
                </thead>
                <tbody>
                    {parcels.map(parcel => (
                        <tr key={parcel._id}>
                            <td className="border px-4 py-2">{parcel.name}</td>
                            <td className="border px-4 py-2">{parcel.receiver_name}</td>
                            <td className="border px-4 py-2">{parcel.users_phone}</td>
                            <td className="border px-4 py-2">{parcel.requested_delivery_date}</td>
                            <td className="border px-4 py-2">{parcel.approximateDeliveryDate}</td>
                            <td className="border px-4 py-2">{parcel.receiver_phone}</td>
                            <td className="border px-4 py-2">{parcel.delivery_address}</td>
                            <td className="border px-4 py-2">
                                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-1 px-2 rounded" onClick={() => viewLocation(parcel.latitude, parcel.longitude)}>View</button>
                            </td>
                            <td className="border px-4 py-2">
                                <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-2 rounded ml-2" onClick={() => cancelBooking(parcel._id)}>Cancel</button>
                            </td>
                            <td className="border px-4 py-2">
                                <button className="bg-green-500 hover:bg-green-700 text-white font-bold py-1 px-2 rounded ml-2" onClick={() => deliverParcel(parcel._id)}>Deliver</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default MyDelivList;
