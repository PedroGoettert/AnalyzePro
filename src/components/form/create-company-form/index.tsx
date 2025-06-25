"use client";

import { useId, useTransition } from "react";
import { createCompany } from "@/app/actions/company";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function CreateCompanyForm() {
	const [isPending, startTransition] = useTransition();
	const emailId = useId();
	const nameId = useId();

	return (
		<form
			action={(formData) => {
				startTransition(() => {
					createCompany(formData);
				});
			}}
			className="space-y-6 p-2" // Adicionado um padding leve para o formulário dentro do diálogo
		>
			<div className="grid gap-4"> {/* Grid para espaçamento vertical entre os campos */}
				<div className="grid gap-2">
					<Label htmlFor={nameId} className="font-medium text-gray-700">Nome da Empresa</Label> {/* Label com fonte mais forte e cor mais escura */}
					<Input
						id={nameId}
						name="name"
						placeholder="Ex.: Pedro LTDA"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" // Input estilizado e responsivo
					/>
				</div>

				<div className="grid gap-2">
					<Label htmlFor={emailId} className="font-medium text-gray-700">Email da Empresa</Label> {/* Label com fonte mais forte e cor mais escura */}
					<Input
						id={emailId}
						type="email"
						name="email"
						placeholder="empresa@email.com"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" // Input estilizado e responsivo
					/>
				</div>
			</div>

			<DialogFooter className="pt-4"> {/* Padding superior para separar do último campo */}
				<Button
					type="submit"
					disabled={isPending}
					className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-5 shadow-md transition-all duration-300 ease-in-out" // Botão modernizado e consistente
				>
					{isPending ? "Cadastrando..." : "Cadastrar Empresa"} {/* Feedback visual durante o envio */}
				</Button>
			</DialogFooter>
		</form>
	);
}
