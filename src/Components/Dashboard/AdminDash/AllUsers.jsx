import Swal from "sweetalert2";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaTrashAlt, FaUser } from "react-icons/fa";
import { useState } from "react";

const AllUsers = () => {
    const axiosSecure = useAxiosSecure();
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const { data: users = [], refetch } = useQuery({
        queryKey: ['users', currentPage],
        queryFn: async () => {
            const res = await axiosSecure.get(`/users?page=${currentPage}`);
            return res.data;
        }
    })

    const handleMakeAdmin = user => {
        axiosSecure.patch(`/user/admin/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Admin now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleMakeDeliveryMan = user => {
        axiosSecure.patch(`/user/deliveryMan/${user._id}`)
            .then(res => {
                console.log(res.data)
                if (res.data.modifiedCount > 0) {
                    refetch();
                    Swal.fire({
                        position: "top-end",
                        icon: "success",
                        title: `${user.name} is an Delivery Man now!`,
                        showConfirmButton: false,
                        timer: 1500
                    })
                }
            })
    }

    const handleDelete = user => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {

                axiosSecure.delete(`/user/${user._id}`)
                    .then(res => {
                        if (res.data.deletedCount > 0) {
                            refetch();
                            Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                        }
                    })
            }
        });

    }



    return (
        <div>
            <div className=" flex justify-evenly bg-red-300">
                <h1 className="text-3xl">All Users :</h1>
                <h1 className="text-3xl">Total Users : {users.length}</h1>
            </div>
            <div className="overflow-x-auto">
                <table className="table table-zebra w-full">
                    {/* head */}
                    <thead>
                        <tr>
                            <th>Sl</th>
                            <th>Name</th>
                            <th>Phone Number</th>
                            <th>Total Spent</th>
                            <th>Role 1</th>
                            <th>Role 2</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            users.map((user, index) => <tr key={user._id}>
                                {/* <th>{index + 1}</th> */}
                                <th>{(currentPage - 1) * pageSize + index + 1}</th>
                                <td>{user.name}</td>
                                <td>Phone Number</td>
                                <td>Total Spent</td>
                                <th>
                                    {user.role === 'admin' ? 'Admin' : <button onClick={() => handleMakeAdmin(user)} className="btn hover:bg-orange-600 bg-orange-400 btn-sm">
                                        {/* <FaUser className=" text-white"></FaUser> */}
                                        Make Admin
                                    </button>}
                                </th>
                                <th>
                                    {user.role === 'deliveryMan' ? 'Delivery Man' : <button onClick={() => handleMakeDeliveryMan(user)} className="btn hover:bg-orange-600 bg-orange-400 btn-sm">
                                        {/* <FaUser className=" text-white"></FaUser> */}
                                        Make Delivery Man
                                    </button>}
                                </th>
                                <th>
                                    <button onClick={() => handleDelete(user)} className="btn btn-ghost btn-lg">
                                        <FaTrashAlt className=" text-red-600"></FaTrashAlt>
                                    </button>
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
                    disabled={users.length < pageSize}
                    className="btn mx-2"
                >
                    Next
                </button>
            </div>
        </div>
    );
};

export default AllUsers;