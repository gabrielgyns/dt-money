import { zodResolver } from "@hookform/resolvers/zod";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import z from "zod";

const searchFormSchema = z.object({
	query: z.string(),
});

type SearchForm = z.infer<typeof searchFormSchema>;

interface SearchFormProps {
	onSearch: (query: string) => void;
}

export function SearchForm({ onSearch }: SearchFormProps) {
	const {
		register,
		handleSubmit,
		reset: resetForm,
	} = useForm<SearchForm>({
		resolver: zodResolver(searchFormSchema),
		defaultValues: {
			query: "",
		},
	});

	function handleSearchTransactions(data: SearchForm) {
		onSearch(data.query);
		resetForm();
	}

	return (
		<form
			className="flex gap-4"
			onSubmit={handleSubmit(handleSearchTransactions)}
		>
			<input
				{...register("query")}
				className="input-base flex-1 rounded-md border-0 bg-[#121214] p-4 text-[#c4c4cc] placeholder:text-[#7c7c8a]"
				placeholder="Busque por transações..."
				type="text"
			/>
			<button
				className="!font-bold flex items-center gap-3 rounded-md border border-[#00b37e] bg-transparent p-4 text-[#00b37e] transition-all hover:border-[#00875f] hover:bg-[#00875f] hover:text-white"
				type="submit"
			>
				<SearchIcon size={18} />
				Search
			</button>
		</form>
	);
}
