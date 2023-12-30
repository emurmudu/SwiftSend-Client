import { useEffect } from "react";
import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const AllDevliMan = () => {
    const [deliveryMen, setDeliveryMen] = useState([]);
    const axiosSecure = useAxiosSecure();

    useEffect(() => {
        // Fetch delivery men data from an API endpoint
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('http://localhost:5000/deliveryMen'); // Replace with your API endpoint
                setDeliveryMen(response.data);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="container mx-auto mt-8">
            <h1 className="text-3xl font-semibold mb-4">All Delivery Men</h1>
            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Name</th>
                        <th className="border border-gray-300 px-4 py-2">Phone Number</th>
                        <th className="border border-gray-300 px-4 py-2">Parcels Delivered</th>
                        <th className="border border-gray-300 px-4 py-2">Average Review</th>
                    </tr>
                </thead>
                <tbody>
                    {deliveryMen.map((deliveryMan) => (
                        <tr key={deliveryMan.id}>
                            <td className="border border-gray-300 px-4 py-2">{deliveryMan.name}</td>
                            <td className="border border-gray-300 px-4 py-2">{deliveryMan.phoneNumber}</td>
                            <td className="border border-gray-300 px-4 py-2">{deliveryMan.parcelsDelivered}</td>
                            <td className="border border-gray-300 px-4 py-2">{deliveryMan.averageReview}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};
export default AllDevliMan;