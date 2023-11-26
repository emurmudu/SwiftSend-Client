import { FaAd, FaBookOpen, FaBox, FaBoxOpen, FaBoxes, FaChartBar, FaEdit, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUserSecret, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaBoxesPacking, FaBoxesStacked, FaDollarSign } from "react-icons/fa6";


const Dashboard = () => {
    const [isAdmin] = useAdmin();
    return (
        <div className=" flex ">
            {/* Dashboard sidebar  */}
            <div className=" pt-8 w-64 min-h-screen bg-fuchsia-100">
                <ul className=" menu">
                    {
                        isAdmin ? <>

                            <li> <NavLink to='/dashboard/adminHome'>
                                <FaHome></FaHome>
                                Admin Home</NavLink></li>

                            <li> <NavLink to='/dashboard/allUsers'>
                                <FaUsers></FaUsers>
                                All Users </NavLink></li>


                            <li> <NavLink to='/dashboard/allDeliveryMan'>
                                <FaUserSecret></FaUserSecret>
                                All Delivery Man</NavLink></li>


                            <li> <NavLink to='/dashboard/allParcels'>
                                <FaBoxes></FaBoxes>
                                All Parcels</NavLink></li>

                            <li> <NavLink to='/dashboard/manageParcel'>
                                <FaBoxesStacked></FaBoxesStacked>
                                Manage Parcel</NavLink></li>
                            <li> <NavLink to='/dashboard/statistics'>
                                <FaChartBar></FaChartBar>
                                Statistics</NavLink></li>
                        </>
                            :
                            <>
                                <li> <NavLink to='/dashboard/userHome'>
                                    <FaHome></FaHome>
                                    User Home</NavLink></li>

                                <li> <NavLink to='/dashboard/myParcels'>
                                    <FaBox></FaBox>
                                    My Parcels</NavLink></li>

                                <li> <NavLink to='/dashboard/parcelBooking'>
                                    <FaBoxesPacking></FaBoxesPacking>
                                    Parcel Booking </NavLink></li>

                                <li> <NavLink to='/dashboard/updateBooking'>
                                    <FaBoxOpen></FaBoxOpen>
                                    Update Booking</NavLink></li>

                                <li> <NavLink to='/dashboard/paySuccess'>
                                    <FaDollarSign></FaDollarSign>
                                    Pay Success </NavLink></li>
                                <li> <NavLink to='/dashboard/myProfile'>
                                    <FaEdit></FaEdit>
                                    My Profile </NavLink></li>
                            </>




                    }



                    {/* Shared nav link  */}
                    <div className=" divider"></div>

                    <li> <NavLink to='/'>
                        <FaHome></FaHome>
                        Browser Home</NavLink></li>

                </ul>
            </div>
            {/* // Dashboard content  */}
            <div className=" bg-fuchsia-50 flex-1 p-8 ">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;