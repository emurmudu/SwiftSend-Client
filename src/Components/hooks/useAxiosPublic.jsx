import axios from "axios";

const axiosPublic = axios.create({
    baseURL: 'https://assignment-12-server-c6usoj9ec-elias-murmus-projects.vercel.app'
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
});

const useAxiosPublic = () => {
    return axiosPublic;
};

export default useAxiosPublic;