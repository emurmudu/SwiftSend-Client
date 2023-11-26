import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../Providers/AuthProvider";
import axios from "axios";
import Cookies from "js-cookie";

const axiosSecure = axios.create({
    baseURL: 'http://localhost:8000'
})

const useAxiosSecure = () => {
    const navigate = useNavigate();
    const { logout } = useContext(AuthContext)

    axiosSecure.interceptors.request.use(function (config) {
        // Retrieve the 'access-token' from cookies
        const token = Cookies.get('access-token');
        // console.log('request stopped by interceptors', token)
        config.headers.authorization = `Bearer ${token}`;
        return config;
    }, function (error) {
        // do something with request error
        return Promise.reject(error);
    });

    // interceptors for 401 and 403 status
    axiosSecure.interceptors.response.use(function (response) {
        return response;
    }, async (error) => {
        const status = error.response.status;
        // console.log('status error in the interceptors', status);

        // for 401 or 403 logout the user and move the user to the login page
        if (status === 401 || status === 403) {
            await logout();
            navigate('/login')
        }
        return Promise.reject(error);
    })

    return axiosSecure;
};

export default useAxiosSecure;
