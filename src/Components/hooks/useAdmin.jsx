import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useAdmin = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isAdmin } = useQuery({
        queryKey: [user?.email, 'isAdmin'],
        // enabled: !loading,
        queryFn: async () => {
            // console.log('asking or checking is admin', user);
            const res = await axiosSecure.get(`/user/admin/${user.email}`);
            console.log(res.data);
            return res.data?.admin;
        }
    })
    return [isAdmin]
};

export default useAdmin;