import { useContext, useState } from "react";
import { Link, NavLink, useLoaderData } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import useAdmin from "../hooks/useAdmin";


const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);
    const [profileDropdown, setProfileDropdown] = useState(false);
    const [isAdmin] = useAdmin();

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
        {/* <li><NavLink to='/dashboard'>Dashboard</NavLink></li> */}
        {
            user && isAdmin && <li> <Link to="/dashboard/statistics">Dashboard</Link> </li>
        }
        {
            user && !isAdmin && <li> <Link to="/dashboard/userHome">Dashboard</Link> </li>
        }
        <li><NavLink to='/blog'>Notification</NavLink></li>
        {/* {
            user &&
            <>

            </>
        } */}
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
                <div className=" cursor-pointer normal-case font-bold text-2xl md:text-3xl">
                    <span className="text-red-600">Swift<span className=" text-blue-600">Send</span></span>

                </div>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {navLinks}
                </ul>
            </div>

            <div className="navbar-end">
                {user ? (
                    <>
                        <div className="flex items-center gap-1">
                            <img
                                onClick={handleProfileDropdown}
                                className=" md:block btn btn-ghost btn-circle avatar"
                                src={user.photoURL || 'https://i.ibb.co/FH5XVy5/images.jpg'}
                                alt="Profile"

                            />
                            {profileDropdown && (
                                <ul tabIndex={0} className="absolute flex items-end z-10 right-2 md:right-2 xl:right-20 sm:right-8 mt-40 menu menu-sm dropdown-content p-2 shadow bg-base-100 rounded ">
                                    <li className="font-bold p-2">{user.displayName}</li>

                                    {
                                        user && isAdmin && <li> <Link to="/dashboard/statistics">Dashboard</Link> </li>
                                    }
                                    {
                                        user && !isAdmin && <li> <Link to="/dashboard/userHome">Dashboard</Link> </li>
                                    }
                                    {
                                        !user && !isAdmin && <li> <Link to="/dashboard/deliveryManHome">Dashboard</Link> </li>
                                    }
                                    <li onClick={handleLogOut}><a>Logout</a></li>

                                </ul>
                            )}
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