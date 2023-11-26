import { FaFacebook, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
    return (
        <div>
            <footer className="footer footer-center p-10 bg-base-200 text-base-content rounded">
                <nav className="grid grid-flow-col gap-4">
                    <a className="link link-hover">Home</a>
                    <a className="link link-hover">Dashboard</a>
                    <a className="link link-hover">Notification</a>

                </nav>
                <nav>
                    <div className=" text-xl grid grid-flow-col gap-4">
                        <a className=" text-red-600" href=""><FaTwitter></FaTwitter></a>
                        <a className=" text-red-600" href=""><FaFacebook></FaFacebook></a>
                        <a className=" text-red-600" href=""><FaYoutube></FaYoutube></a>
                    </div>
                </nav>
                <aside>
                    <p>Copyright © 2023 - All right reserved by SwiftSend Inc.</p>
                </aside>
            </footer>
        </div>
    );
};

export default Footer;