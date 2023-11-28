import { Link } from "react-router-dom";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
    useEffect(() => {
        AOS.init({
            duration: 1200,
            offset: 200,
            easing: 'ease-in-out',
        });
    }, []);

    const images = [
        "https://i.ibb.co/kxwhMTx/swiftsend01.jpg",
        "https://i.ibb.co/rHphqsV/swiftsend3.jpg",
        "https://i.ibb.co/0CRzxNP/swiftsend5.jpg",
        "https://i.ibb.co/x1C0pLk/swiftsend2.jpg",
        "https://i.ibb.co/ypvgJxv/swiftsend4.jpg",
    ];

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
    };

    return (
        <Slider {...settings}>
            {images.map((imageUrl, index) => (
                <div key={index} className="h-[80vh] relative p-2 md:p-4">
                    <div
                        data-aos="fade-zoom-in"
                        data-aos-offset="200"
                        data-aos-easing="ease-in-sine"
                        data-aos-duration="1200"
                        className="absolute inset-0 bg-cover bg-center opacity-40"
                        style={{
                            backgroundImage: `url('${imageUrl}')`,
                        }}
                    ></div>
                    <div className="absolute inset-0 bottom-40 flex flex-col justify-center items-center space-y-4 text-white">
                        <h1
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            className="text-xl md:text-2xl lg:text-6xl text-red-600 font-bold"
                        >
                            Safe And Super Fast Delivery
                        </h1>
                        <div
                            data-aos="fade-up"
                            data-aos-duration="1200"
                            className="flex items-center"
                        >
                            <input
                                type="text"
                                placeholder="Search..."
                                className="px-4 py-2 mr-2 bg-white text-gray-800 border rounded-md focus:outline-1"
                            />
                            <Link to="#">
                                <button className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-blue-600 focus:outline-none">
                                    Search
                                </button>
                            </Link>
                        </div>
                    </div>
                </div>
            ))}
        </Slider>
    );
};

export default Banner;
