import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic";

const useSessions = () => {
  const axiosPublic = useAxiosPublic();
  const {
    data: sessions = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["sessions"],
    queryFn: async () => {
      const res = await axiosPublic.get("/sessions");
      return res.data;
    },
  });
  return [sessions, refetch, isLoading];
};

export default useSessions;
