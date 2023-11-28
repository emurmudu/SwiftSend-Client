import { Outlet } from "react-router-dom";
import Navbar from "../HomePage/Navbar";
import Footer from "../HomePage/Footer";

const Main = () => {
    return (
        <div>
            <Navbar></Navbar>
            {/* <div className=" min-h-screen"> */}
            <div className=' bg-red-100 container min-h-[calc(100vh-68px)]'>
                <Outlet></Outlet>

            </div>
            <Footer></Footer>
        </div>
    );
};

export default Main;