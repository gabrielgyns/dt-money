import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { ArrowDownCircle, ArrowUpCircle, X } from "lucide-react";
import { Controller, useForm } from "react-hook-form";
import z from "zod";
import { useCreateTransaction } from "../http/use-create-transaction";

const newTransactionFormSchema = z.object({
	description: z.string(),
	price: z.number(),
	category: z.string(),
	type: z.enum(["income", "outcome"]),
});

type NewTransactionForm = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
	const { mutateAsync: createTransaction, isPending: isCreatingTransaction } =
		useCreateTransaction();

	const {
		control,
		register,
		handleSubmit,
		reset: resetForm,
	} = useForm<NewTransactionForm>({
		resolver: zodResolver(newTransactionFormSchema),
		defaultValues: {
			description: "",
			category: "",
			price: 0,
			type: "income",
		},
	});

	function handleCreateTransactions(data: NewTransactionForm) {
		createTransaction({
			...data,
			createdAt: new Date().toISOString(),
		});

		resetForm();
	}

	return (
		<Dialog.Portal>
			<Dialog.Overlay className="fixed inset-0 h-screen w-screen bg-black/75" />

			<Dialog.Content className="-translate-6/12 fixed top-[50%] left-[50%] min-w-128 rounded-md bg-[#202024] px-12 py-10">
				<Dialog.Title className="font-bold text-[#E1E1E6] text-xl">
					Nova transação
				</Dialog.Title>

				<Dialog.Close className="absolute top-6 right-6 border-0 bg-transparent text-[#7c7c8a] leading-0">
					<X size={24} />
				</Dialog.Close>

				<form
					className="mt-8 flex flex-col gap-4"
					onSubmit={handleSubmit(handleCreateTransactions)}
				>
					<input
						{...register("description")}
						className="input-base"
						placeholder="Descrição"
						required
						type="text"
					/>
					<input
						{...register("price", { valueAsNumber: true })}
						className="input-base"
						placeholder="Preço"
						required
						type="number"
					/>
					<input
						{...register("category")}
						className="input-base"
						placeholder="Categoria"
						required
						type="text"
					/>

					<Controller
						control={control}
						name="type"
						render={({ field }) => (
							<RadioGroup.Root
								className="mt-2 grid grid-cols-2 gap-4"
								onValueChange={field.onChange}
								value={field.value}
							>
								<TransactionButton type="income" />

								<TransactionButton type="outcome" />
							</RadioGroup.Root>
						)}
					/>

					<button
						className="!font-bold mt-6 h-14.5 rounded-md border-0 bg-[#00875F] px-5 text-white transition-colors hover:bg-[#00875F]/80"
						disabled={isCreatingTransaction}
						type="submit"
					>
						Cadastrar
					</button>
				</form>
			</Dialog.Content>
		</Dialog.Portal>
	);
}

function TransactionButton({ type }: { type: "income" | "outcome" }) {
	const icon =
		type === "income" ? (
			<ArrowUpCircle className="text-[#00b37e]" />
		) : (
			<ArrowDownCircle className="text-[#f75a68]" />
		);

	return (
		<RadioGroup.Item className={`radio-button ${type}`} value={type}>
			{icon}
			{type === "income" ? "Entrada" : "Saída"}
		</RadioGroup.Item>
	);
}
