import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Swal from "sweetalert2";
import { FaTrashAlt } from "react-icons/fa";

const AllParcels = () => {

    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    // const { data: parcels = [], refetch } = useQuery({
    const { data: parcels = [] } = useQuery({
        queryKey: ['bookedParcels', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookedParcels?page=${currentPage}`);
            return res.data;
        }
    })


    // const handleManage = (role) => {
    // axiosSecure.get(`/user/${role._id}`)
    //     .then(res => {
    //         console.log(res.data)
    //         if (res.data.modifiedCount > 0) {
    //             refetch();
    //             Swal.fire({
    //                 position: "top-end",
    //                 icon: "success",
    //                 title: `${user.name} is an Delivery Man now!`,
    //                 showConfirmButton: false,
    //                 timer: 1500
    //             })
    //         }
    //     })
    // }



    return (
        <div>
            <div className=" flex justify-evenly mb-6">
                <h1 className="text-3xl">All Parcels Information </h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead className=" bg-red-200">
                        <tr className=" text-neutral-950">
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
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{(currentPage - 1) * pageSize + index + 1}</th>
                                <td>{parcel.name}</td>
                                <td>{parcel.users_phone}</td>
                                <td>{parcel.booking_date}</td>
                                <td>{parcel.requested_delivery_date}</td>
                                <td>{parcel.price}</td>
                                <td>{parcel.status}</td>
                                <th>
                                    {<button onClick={() => handleManage(parcel)} className="btn hover:bg-orange-600 bg-orange-400 btn-sm">
                                        Manage
                                    </button>}
                                </th>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center my-4">
                <button
                    onClick={() => setCurrentPage(prevPage => Math.max(prevPage - 1, 1))}
                    disabled={currentPage === 1}
                    className="btn mx-2"
                >
                    Previous
                </button>
                <button
                    onClick={() => setCurrentPage(prevPage => prevPage + 1)}
                    disabled={parcels.length < pageSize}
                    className="btn mx-2"
                >
                    Next
                </button>
            </div>
        </div>
    )
};

export default AllParcels;