import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";
import useAuth from "./useAuth";

const useRole = () => {
  const axiosPublic = useAxiosPublic();
  const { user } = useAuth();
  const {
    data: userData = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["userData"],
    queryFn: async () => {
      const res = await axiosPublic.get(`/users/${user.email}`);
      return res.data;
    },
  });
  return [userData, refetch, isLoading];
};

export default useRole;
