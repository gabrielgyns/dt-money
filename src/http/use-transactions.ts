import { useQuery } from "@tanstack/react-query";
import type { Transaction } from "../types/transaction.type";

type TransactionsResponse = Transaction[];

export function useTransactions(query?: string) {
	const url = new URL("http://localhost:3333/transactions");

	if (query) {
		url.searchParams.append("q", query);
	}

	return useQuery({
		queryKey: ["get-transactions", query],
		queryFn: async () => {
			const response = await fetch(url);
			const result: TransactionsResponse = await response.json();

			return result;
		},
		enabled: true,
	});
}
