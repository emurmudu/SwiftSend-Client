import { useContext, useState } from "react";
import { NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [profileDropdown, setProfileDropdown] = useState(false);

    const handleProfileDropdown = () => {
        setProfileDropdown(!profileDropdown);
    };

    const handleLogOut = () => {
        logOut()
            .then(() => toast('You are logged out'))
            .catch(error => {
                console.error(error);
                toast.error('Error during logout');
            })
    }


    const navLinks = <>
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/allFoods'>Dashboard</NavLink></li>
        <li><NavLink to='/blog'>Notification</NavLink></li>
        {
            user &&
            <>

            </>
        }
    </>


    const profileLinks = <>
        <li ><NavLink to='/myAddedFoods'>User Name</NavLink></li>
        <li ><NavLink to='/addFoodItem'>Dashboard</NavLink></li>
        <li ><NavLink to='/myOrders'>Logout</NavLink></li>
        {
            user &&
            <>

            </>
        }
    </>



    return (
        <div className="navbar shadow-md bg-base-100">
            <div className="navbar-start">
                <div className="dropdown">
                    <label tabIndex={0} className="btn btn-ghost lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
                    </label>
                    <ul tabIndex={0} className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52">
                        {navLinks}
                    </ul>
                </div>
                <a className=" cursor-pointer normal-case font-bold text-2xl md:text-3xl">
                    <span className="text-yellow-700">Swift</span>
                    <span><span className=" shadow-yellow-600">S</span>end</span>
                </a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <>
                        <span className="hidden lg:block font-bold p-2">{user.displayName}</span>
                        <div className="flex items-center gap-1">
                            <img
                                onClick={handleProfileDropdown}
                                className=" md:block btn btn-ghost btn-circle avatar"
                                src={user.photoURL || 'https://i.ibb.co/FH5XVy5/images.jpg'}
                                alt="Profile"

                            />
                            {profileDropdown && (
                                // <ul className=" absolute w-max flex flex-col rounded-none z-10 right-28 mt-48 text-right p-4 lg:text-left">
                                <ul tabIndex={0} className="absolute z-10 right-12 xl:right-36 md:right-12 lg:right-14 mt-40 menu menu-sm dropdown-content  p-2 shadow bg-base-100 rounded ">
                                    {profileLinks}
                                </ul>
                            )}
                            <a onClick={handleLogOut} className="btn btn-sm font-bold dark:text-white dark:bg-zinc-700">
                                Logout
                            </a>
                        </div>
                    </>
                ) : (
                    <NavLink to="/login">
                        <a className=" font-bold">Login</a>
                    </NavLink>
                )}
            </div>
            <ToastContainer />
        </div>
    );
};

export default Navbar;