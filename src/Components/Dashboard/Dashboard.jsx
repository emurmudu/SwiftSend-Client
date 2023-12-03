import { FaAd, FaBookOpen, FaBox, FaBoxOpen, FaBoxes, FaChartBar, FaEdit, FaEnvelope, FaHome, FaList, FaSearch, FaShoppingCart, FaUser, FaUserSecret, FaUsers, FaUtensils } from "react-icons/fa";
import { NavLink, Outlet } from "react-router-dom";
import useAdmin from "../hooks/useAdmin";
import { FaBoxesPacking, FaBoxesStacked, FaDollarSign } from "react-icons/fa6";
import useDeliveryMan from "../hooks/useDeliveryMan";


const Dashboard = () => {
    // const [isAdmin] = useAdmin();
    const [isAdmin] = useAdmin();
    const [isDeliveryMan] = useDeliveryMan();
    // const isAdmin = true;
    // const isDeliveryMan = true;

    return (
        <div className=" flex">
            {/* Dashboard sidebar  */}
            <div className=" mt-6 mb-6 w-64 bg-red-300">
                <ul className=" menu">
                    {
                        isAdmin ? (
                            //Admin dashboard
                            <>
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
                            </>)
                            :
                            //Delivery Man dashboard
                            isDeliveryMan ? (<>
                                <li> <NavLink to='/dashboard/deliveryManHome'>
                                    <FaHome></FaHome>
                                    Delivery Man Home</NavLink></li>

                                <li> <NavLink to='/dashboard/myDeliveryList'>
                                    <FaBox></FaBox>
                                    Delivery List</NavLink></li>
                                {/* <li> <NavLink to='/dashboard/deliveries'>
                                    <FaBox></FaBox>
                                    Delivery List</NavLink></li> */}

                                <li> <NavLink to='/dashboard/myReviews'>
                                    <FaBoxesPacking></FaBoxesPacking>
                                    Users Reviews </NavLink></li>
                            </>)
                                : (
                                    //User dashboard
                                    <>
                                        <li> <NavLink to='/dashboard/userHome'>
                                            <FaHome></FaHome>
                                            User Home</NavLink></li>

                                        <li> <NavLink to='/dashboard/myParcels'>
                                            <FaBox></FaBox>
                                            My Parcels</NavLink></li>
                                        {/* <li> <NavLink to='/dashboard/deliveries'>
                                            <FaBox></FaBox>
                                            My Parcels</NavLink></li> */}

                                        <li> <NavLink to='/dashboard/parcelBooking'>
                                            <FaBoxesPacking></FaBoxesPacking>
                                            Parcel Booking </NavLink></li>

                                        {/* <li> <NavLink to='/dashboard/updateBooking'>
                                            <FaBoxOpen></FaBoxOpen>
                                            Update Booking</NavLink></li> */}

                                        <li> <NavLink to='/dashboard/paySuccess'>
                                            <FaDollarSign></FaDollarSign>
                                            Pay Success </NavLink></li>
                                        <li> <NavLink to='/dashboard/myProfile'>
                                            <FaEdit></FaEdit>
                                            My Profile </NavLink></li>
                                    </>)
                    }

                    {/* Shared nav link  */}
                    <div className=" divider"></div>

                    <li> <NavLink to='/'>
                        <FaHome></FaHome>
                        Browser Home</NavLink></li>
                </ul>
            </div>
            {/* // Dashboard content  */}
            <div className=" bg-red-100 flex-1 mt-6 p-6 mb-6">
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default Dashboard;