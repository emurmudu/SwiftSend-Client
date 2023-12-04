import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Home from "../HomePage/Home";
import Login from "../Users/Login";
import Register from "../Users/Register";
import PrivateRoute from "./PrivateRoute";
import Dashboard from "../Dashboard/Dashboard";
import UserHome from "../Dashboard/UsersDash/UserHome";
import AdminHome from "../Dashboard/AdminDash/AdminHome";
import Checkout from "../Dashboard/UsersDash/Checkout";
import MyProfile from "../Dashboard/UsersDash/MyProfile";
import MyParcels from "../Dashboard/UsersDash/MyParcels";
import ParcelBooking from "../Dashboard/UsersDash/ParcelBooking";
import PaySuccess from "../Dashboard/UsersDash/PaySuccess";
import UpdateBooking from "../Dashboard/UsersDash/UpdateBooking";
import DeliveryManHome from "../Dashboard/DeliveryManDash/DeliveryManHome";
import MyDelivList from "../Dashboard/DeliveryManDash/MyDelivList";
import MyReviews from "../Dashboard/DeliveryManDash/MyReviews";
import AllUsers from "../Dashboard/AdminDash/AllUsers";
import AllDevliMan from "../Dashboard/AdminDash/AllDevliMan";
import AllParcels from "../Dashboard/AdminDash/AllParcels";
import ManageParcel from "../Dashboard/AdminDash/ManageParcel";
import Statistics from "../Dashboard/AdminDash/Statistics";
import OurFeatures from "../HomePage/OurFeatures";
import Deliveries from "../Dashboard/DeliveryManDash/Deliveries";
import ErrorPage from "../HomePage/ErrorPage";
import AppUsage from "../HomePage/AppUsage";
// import ErrorPage from "../HomePage/ErrorPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: 'login',
                element: <Login></Login>
            },
            {
                path: 'register',
                element: <Register></Register>
            },
            {
                path: 'ourFeature',
                element: <OurFeatures></OurFeatures>
            },
            {
                path: 'ourFeature',
                element: <AppUsage></AppUsage>,
            },

        ]
    },

    {
        path: 'dashboard',
        element: <PrivateRoute><Dashboard></Dashboard></PrivateRoute>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [

            // Users related routes
            {
                path: 'userHome',
                element: <UserHome></UserHome>
            },

            {
                path: 'checkout',
                element: <Checkout></Checkout>
            },
            {
                path: 'myProfile',
                element: <MyProfile></MyProfile>


            },
            {
                path: 'myParcels',
                element: <MyParcels></MyParcels>
            },
            {
                path: 'parcelBooking',
                element: <ParcelBooking></ParcelBooking>
            },
            {
                path: 'paySuccess',
                element: <PaySuccess></PaySuccess>
            },
            {
                path: 'updateBooking/:id',
                element: <UpdateBooking></UpdateBooking>,
                loader: ({ params }) => fetch(`http://localhost:5001/updateBooking/${params.id}`)
            },


            //Delivery man related routes
            {
                path: 'deliveryManHome',
                element: <DeliveryManHome></DeliveryManHome>
            },
            {
                path: 'deliveryManHome',
                element: <DeliveryManHome></DeliveryManHome>
            },
            {
                path: 'myDeliveryList',
                element: <MyDelivList></MyDelivList>
            },
            {
                path: 'myReviews',
                element: <MyReviews></MyReviews>
            },
            {
                path: 'deliveries',
                element: <Deliveries></Deliveries>
            },


            //Admin routes
            {
                path: 'adminHome',
                element: <AdminHome></AdminHome>
            },
            {
                path: 'allUsers',
                element: <AllUsers></AllUsers>
            },
            {
                path: 'allDeliveryMan',
                element: <AllDevliMan></AllDevliMan>
            },
            {
                path: 'allParcels',
                element: <AllParcels></AllParcels>
            },

            {
                path: 'manageParcel',
                element: <ManageParcel></ManageParcel>
            },
            {
                path: 'statistics',
                element: <Statistics></Statistics>
            }

        ]
    }

]);

export default router;