import { ArrowDownCircle, ArrowUpCircle, EuroIcon } from "lucide-react";
import { useSummary } from "../hooks/use-summary";
import type { Transaction } from "../types/transaction.type";
import { priceFormatter } from "../utils/formatter";

export function Summary({ transactions }: { transactions: Transaction[] }) {
	const summary = useSummary(transactions); // I don't think we need this, since is to simple this app, but I like it.

	return (
		<section className="-mt-20 mx-auto grid w-full max-w-6xl grid-cols-3 gap-8">
			<SummaryCard
				amount={priceFormatter.format(summary.income)}
				icon={<ArrowUpCircle color="#00b37e" size={28} />}
				label="Entradas"
			/>

			<SummaryCard
				amount={priceFormatter.format(summary.outcome)}
				icon={<ArrowDownCircle color="#f75a68" size={28} />}
				label="Saídas"
			/>

			<SummaryCard
				amount={priceFormatter.format(summary.total)}
				icon={<EuroIcon color="#fff" size={28} />}
				isTotal
				label="Total"
			/>
		</section>
	);
}

interface SummaryCardProps {
	label: string;
	amount: string; // number
	icon: React.ReactNode;
	isTotal?: boolean;
	iconColor?: "normal" | "destructive";
}

function SummaryCard({
	amount,
	label,
	icon,
	isTotal = false,
}: SummaryCardProps) {
	// It can be improved.

	return (
		<div
			className={"rounded-md p-8"}
			style={{
				backgroundColor: isTotal ? "#015f43" : "#323238",
			}}
		>
			<header className="flex items-center justify-between text-[#c4c4cc]">
				<span>{label}</span>
				{icon}
			</header>

			<strong className="mt-4 block text-3xl">{amount}</strong>
		</div>
	);
}
