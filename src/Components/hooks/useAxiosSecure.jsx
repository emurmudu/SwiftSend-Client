import { useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000'
});

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logOut } = useContext(AuthContext);

    useEffect(() => {
        // Setup interceptors on mount
        const requestInterceptor = axiosSecure.interceptors.request.use(function (config) {
            const token = localStorage.getItem('access-token');
            config.headers.authorization = `Bearer ${token}`;
            return config;
        }, function (error) {
            return Promise.reject(error);
        });

        const responseInterceptor = axiosSecure.interceptors.response.use(function (response) {
            return response;
        }, async (error) => {
            const status = error.response.status;
            if (status === 401 || status === 403) {
                // await logOut();
                // navigate('/login');
                navigate('/');
            }
            return Promise.reject(error);
        });

        // Cleanup interceptors on unmount
        return () => {
            axiosSecure.interceptors.request.eject(requestInterceptor);
            axiosSecure.interceptors.response.eject(responseInterceptor);
        };
    }, [navigate, logOut]);

    return axiosSecure;
};

export default useAxiosSecure;
