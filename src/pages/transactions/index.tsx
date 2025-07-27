import { Loader2 } from "lucide-react";
import { memo, useState } from "react";
import { Header } from "../../components/header";
import { SearchForm } from "../../components/search-form";
import { Summary } from "../../components/summary";
import { useTransactions } from "../../http/use-transactions";
import { dateFormatter, priceFormatter } from "../../utils/formatter";

export function Transactions() {
	const [searchQuery, setSearchQuery] = useState<string>("");
	const { data: transactions, isLoading } = useTransactions(searchQuery);

	function handleSearch(query: string) {
		setSearchQuery(query);
	}

	return (
		<div>
			<Header />
			<Summary transactions={transactions ?? []} />

			<main className="mx-auto mt-16 w-full max-w-6xl">
				<SearchForm onSearch={handleSearch} />

				<table className="mt-6 w-full border-separate border-spacing-y-2">
					<tbody>
						{isLoading ? (
							// Should be a Skeleton
							<p className="flex items-center gap-6">
								<Loader2 className="animate-spin" /> Loading...
							</p>
						) : (
							transactions?.map((transaction) => (
								<Row
									amount={priceFormatter.format(transaction.price)}
									category={transaction.category}
									date={dateFormatter.format(new Date(transaction.createdAt))}
									description={transaction.description}
									key={transaction.id}
									variant={transaction.type}
								/>
							))
						)}
					</tbody>
				</table>
			</main>
		</div>
	);
}

interface RowProps {
	description: string;
	amount: string; // number + format
	category: string;
	date: string; // date string formmated.
	variant?: "income" | "outcome";
}

// Memo here wouldn't be necessary I guess, too simple... reconciliation would be fast instead of deep comparasion some times.
const Row = memo(
	({ amount, category, date, description, variant = "income" }: RowProps) => {
		return (
			<tr>
				<td className="table-cell" width="50%">
					{description}
				</td>
				<td className="table-cell">
					<span
						style={{
							color: variant === "income" ? "#00B37e" : "#f75a68",
						}}
					>
						<span className="flex items-center gap-1">
							{variant === "outcome" && <p>-</p>} {amount}
						</span>
					</span>
				</td>
				<td className="table-cell">{category}</td>
				<td className="table-cell">{date}</td>
			</tr>
		);
	}
);
