import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Transactions } from "./pages/transactions";

export function App() {
	const queryClient = new QueryClient();

	return (
		<QueryClientProvider client={queryClient}>
			<Transactions />
		</QueryClientProvider>
	);
}
