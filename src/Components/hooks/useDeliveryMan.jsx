import { useContext } from "react";
import { AuthContext } from "../Providers/AuthProvider";
import useAxiosSecure from "./useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const useDeliveryMan = () => {
    const { user } = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    const { data: isDeliveryMan } = useQuery({
        queryKey: [user?.email, 'isDeliveryMan'],
        // enabled: !loading,
        queryFn: async () => {
            // console.log('asking or checking is deliveryMan', user);
            const res = await axiosSecure.get(`/user/deliveryMan/${user.email}`);
            console.log(res.data);
            return res.data?.deliveryMan;
        }
    })
    return [isDeliveryMan]
};
export default useDeliveryMan;