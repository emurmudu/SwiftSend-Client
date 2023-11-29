import { useState, useEffect } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import Modal from "react-modal";

const ManageParcelModal = ({ isOpen, onClose, onAssign, deliveryMen }) => {
    const [selectedDeliveryman, setSelectedDeliveryman] = useState("");
    const [approximateDeliveryDate, setApproximateDeliveryDate] = useState("");

    const handleAssign = () => {
        onAssign(selectedDeliveryman, approximateDeliveryDate);
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onRequestClose={onClose}>
            <h2>Manage Parcel</h2>
            <label>Select Deliveryman:</label>
            <select
                value={selectedDeliveryman}
                onChange={(e) => setSelectedDeliveryman(e.target.value)}
            >
                {deliveryMen.map((deliveryman) => (
                    <option key={deliveryman._id} value={deliveryman._id}>
                        {deliveryman.name} - {deliveryman._id}
                    </option>
                ))}
            </select>
            <label>Approximate Delivery Date:</label>
            <input
                type="date"
                value={approximateDeliveryDate}
                onChange={(e) => setApproximateDeliveryDate(e.target.value)}
            />
            <button onClick={handleAssign}>Assign</button>
        </Modal>
    );
};

const AllParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedParcel, setSelectedParcel] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [deliveryMen, setDeliveryMen] = useState([]);
    const pageSize = 5;


    useEffect(() => {
        const fetchDeliveryMen = async () => {
            try {
                const res = await axiosSecure.get("http://localhost:5001/deliveryMen");
                setDeliveryMen(res.data);
            } catch (error) {
                console.error("Error fetching delivery men:", error);
            }
        };

        fetchDeliveryMen();
    }, [axiosSecure]);

    const { data: parcels = [] } = useQuery({
        queryKey: ["bookedParcels", currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookedParcels?page=${currentPage}`);
            return res.data;
        },
    });

    const handleManage = (parcel) => {
        setSelectedParcel(parcel);
        setIsModalOpen(true);
    };

    const handleAssign = async (deliverymanId, approximateDeliveryDate) => {
        try {
            const updateRes = await axiosSecure.put(
                `/bookedParcels/${selectedParcel._id}`,
                {
                    status: "On The Way",
                    deliveryMenId: deliverymanId,
                    approximateDeliveryDate,
                }
            );

            if (updateRes.data.modifiedCount > 0) {
                const addRes = await axiosSecure.post(
                    `/bookedParcels/${selectedParcel.email}`,
                    {
                        status: "On The Way",

                        deliveryMenId:

                            approximateDeliveryDate,
                    }
                );

                if (addRes.data.insertedCount > 0) {
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: "Parcel updated and added successfully!",
                        showConfirmButton: false,
                        timer: 1500,
                    });


                }
            }

            setSelectedParcel(null);
            setIsModalOpen(false);
        } catch (error) {
            console.error("Error updating parcel:", error);
            Swal.fire({
                position: "top-end",
                icon: "error",
                title: "Error updating parcel. Please try again.",
                showConfirmButton: false,
                timer: 1500,
            });
        }
    };

    const closeModal = () => {
        setSelectedParcel(null);
        setIsModalOpen(false);
    };

    return (
        <div>
            <div className="flex justify-evenly mb-6">
                <h1 className="text-3xl">All Parcels Information</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead className="bg-red-200">
                        <tr className="text-neutral-950">
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Booking Date</th>
                            <th>Requested Delivery Date</th>
                            <th>Cost</th>
                            <th>Status</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {parcels.map((parcel, index) => (
                            <tr key={parcel._id}>
                                <th>{(currentPage - 1) * pageSize + index + 1}</th>
                                <td>{parcel.name}</td>
                                <td>{parcel.users_phone}</td>
                                <td>{parcel.booking_date}</td>
                                <td>{parcel.requested_delivery_date}</td>
                                <td>{parcel.price}</td>
                                <td>{parcel.status}</td>
                                <th>
                                    {
                                        <button
                                            onClick={() => handleManage(parcel)}
                                            className="btn hover:bg-orange-600 bg-orange-400 btn-sm"
                                        >
                                            Manage
                                        </button>
                                    }
                                </th>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center my-4">
                <button
                    onClick={() => setCurrentPage((prevPage) => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn mx-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage((prevPage) => prevPage + 1)}
                    disabled={parcels.length < pageSize}
                    className="btn mx-2"
                >
                    Next
                </button>
            </div>
            {/* Modal for managing and assigning */}
            {selectedParcel && (
                <ManageParcelModal
                    isOpen={isModalOpen}
                    onClose={closeModal}
                    onAssign={handleAssign}
                    deliveryMen={deliveryMen}
                />
            )}
        </div>
    );
};

export default AllParcels;