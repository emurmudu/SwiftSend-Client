import { useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { useContext } from "react";
import { AuthContext } from "../../Providers/AuthProvider";

const MyParcels = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const { user } = useContext(AuthContext);
    const pageSize = 5;

    // const { data: parcels = [], refetch } = useQuery({
    const { data: parcels = [] } = useQuery({
        queryKey: ['bookedParcels', user?.email, currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/bookedParcels/${user?.email}?page=${currentPage}`);
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
                    <thead className=" bg-red-200 shadow-sm">
                        <tr className=" text-neutral-950">
                            <th>Sl</th>
                            <th>Parcel Type</th>
                            <th>Requ. Delivery Date</th>
                            <th>Approx. Delivery Date</th>
                            <th>Booking Date</th>
                            <th>Delivery Man ID</th>
                            <th>Booking Status</th>
                            <th>Update</th>
                            <th>Cancel</th>
                            <th>Review</th>
                            <th>Pay</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            parcels.map((parcel, index) => <tr key={parcel._id}>
                                <th>{(currentPage - 1) * pageSize + index + 1}</th>
                                <td>{parcel.parcel_type}</td>
                                <td>{parcel.requested_delivery_date}</td>
                                <td></td>
                                <td>{parcel.booking_date}</td>
                                <td></td>
                                <td>{parcel.status}</td>
                                <th>
                                    {<button onClick={() => handleManage(parcel)} className="btn hover:bg-orange-600 bg-orange-400 btn-sm">
                                        Update
                                    </button>}
                                </th>
                                <th>
                                    {<button onClick={() => handleManage(parcel)} className="btn hover:bg-orange-600 bg-orange-400 btn-sm">
                                        Cancel
                                    </button>}
                                </th>
                                <th>
                                    {<button onClick={() => handleManage(parcel)} className="btn hover:bg-orange-600 bg-orange-400 btn-sm">
                                        Review
                                    </button>}
                                </th>
                                <th>
                                    {<button onClick={() => handleManage(parcel)} className="btn hover:bg-orange-600 bg-orange-400 btn-sm">
                                        Pay
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

export default MyParcels;