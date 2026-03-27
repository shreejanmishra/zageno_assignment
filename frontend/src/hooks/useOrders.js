import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchOrders, createOrder } from "../api/axios";

export const useOrders = (page = 1, limit = 10) => {
  return useQuery({
    queryKey: ["orders", page, limit],
    queryFn: () => fetchOrders(page, limit),
  });
};

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["orders"] });
      // Invalidate all products queries to refresh the stock count
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product"] });
    },
  });
};
