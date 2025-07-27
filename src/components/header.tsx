import * as Dialog from "@radix-ui/react-dialog";
import logoImg from "../assets/logo.svg";
import { NewTransactionModal } from "./new-transaction-modal";

export function Header() {
	return (
		<header className="bg-[#121214] pt-10 pb-30">
			<div className="mx-auto flex w-full max-w-6xl items-center justify-between">
				<img alt="DT Money Logo" src={logoImg} />

				<Dialog.Root>
					<Dialog.Trigger asChild>
						<button
							className="!font-bold h-12.5 rounded-md border-0 bg-[#00875F] px-5 text-white transition-colors hover:bg-[#00875F]/80"
							type="button"
						>
							Nova transação
						</button>
					</Dialog.Trigger>

					<NewTransactionModal />
				</Dialog.Root>
			</div>
		</header>
	);
}
