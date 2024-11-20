import { axiosInstance } from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";

export const useFetchData = ({ onError }) => {
  return useQuery({
    queryFn: async () => {
      const response = await axiosInstance.get('/user/clasements');
      return response.data; // Ensure we're returning just the 'data' field
    },
    queryKey: ['fetch.clasements'],
    onError,
  });
};
