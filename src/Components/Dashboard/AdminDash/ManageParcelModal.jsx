import React, { useState, useEffect } from 'react';
import useAxiosSecure from "../../hooks/useAxiosSecure";

const ManageParcelModal = ({ isOpen, onClose, parcel }) => {
    const axiosSecure = useAxiosSecure();
    const [deliveryMen, setDeliveryMen] = useState([]);
    const [selectedDeliveryMan, setSelectedDeliveryMan] = useState('');
    const [approximateDeliveryDate, setApproximateDeliveryDate] = useState('');

    useEffect(() => {
        // Fetch delivery men from the database when the modal opens
        const fetchDeliveryMen = async () => {
            try {
                const response = await axiosSecure.get('/deliveryMen');
                setDeliveryMen(response.data);
            } catch (error) {
                console.error('Error fetching delivery men:', error);
            }
        };

        if (isOpen) {
            fetchDeliveryMen();
        }
    }, [axiosSecure, isOpen]);

    const handleAssign = async () => {
        try {
            // Update the parcel information in the database
            const response = await axiosSecure.put(`/bookedParcels/${parcel._id}`, {
                status: 'On The Way',
                deliveryMenId: selectedDeliveryMan,
                approximateDeliveryDate,
            });

            if (response.data.success) {
                // After updating the parcel, close the modal
                onClose();
            } else {
                console.error('Failed to update parcel:', response.data.message);
                // Handle the error as needed
            }
        } catch (error) {
            console.error('Error updating parcel:', error);
            // Handle the error as needed
        }
    };

    return (
        <div>
            {/* Implement your modal UI here */}
            {isOpen && (
                <div>
                    <h2>Manage Parcel</h2>
                    <label htmlFor="deliveryMan">Select Delivery Man:</label>
                    <select
                        id="deliveryMan"
                        value={selectedDeliveryMan}
                        onChange={(e) => setSelectedDeliveryMan(e.target.value)}
                    >
                        <option value="" disabled>
                            Select Delivery Man
                        </option>
                        {deliveryMen.map((deliveryMan) => (
                            <option key={deliveryMan._id} value={deliveryMan._id}>
                                {deliveryMan.name}
                            </option>
                        ))}
                    </select>
                    <br />
                    <label htmlFor="approximateDeliveryDate">Approximate Delivery Date:</label>
                    <input
                        type="date"
                        id="approximateDeliveryDate"
                        value={approximateDeliveryDate}
                        onChange={(e) => setApproximateDeliveryDate(e.target.value)}
                    />
                    <br />
                    <button onClick={handleAssign}>Assign</button>
                    <button onClick={onClose}>Cancel</button>
                </div>
            )}
        </div>
    );
};

export default ManageParcelModal;
