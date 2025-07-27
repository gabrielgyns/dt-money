import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "../lib/axios";
import type { Transaction } from "../types/transaction.type";

type TransactionRequest = Omit<Transaction, "id">;

export function useCreateTransaction() {
	const queryClient = useQueryClient();

	return useMutation({
		mutationFn: async (data: TransactionRequest) => {
			const response = await api.post("/transactions", {
				...data,
			});

			return response;
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["get-transactions"] });
		},
	});
}
