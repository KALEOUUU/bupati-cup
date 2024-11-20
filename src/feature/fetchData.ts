import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchData = () => {
  return useQuery({
    queryFn: async () => {
        const clasementsTeam = await axiosInstance.get('/user/clasements')
        return clasementsTeam
    },
    queryKey: ['fetch.clasements'],
  })
}