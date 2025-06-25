"use client";

import { useId, useState, useTransition } from "react";
import type { CompanyProps } from "@/components/companyTable";
import { Button } from "@/components/ui/button";
import { DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";
import { createProject } from "@/app/actions/project";

export function CreateProjectForm({
	companies,
}: {
	companies: CompanyProps[];
}) {
	const [isPending, startTransition] = useTransition();
	const [selectedCompanyId, setSelectedCompanyId] = useState<string | undefined>()

	return (
		<form
			action={(formData) => {
				startTransition(() => {
					createProject(formData);
				});
			}}
			className="space-y-6 p-2" // Adicionado um padding leve para o formulário dentro do diálogo
		>
			<div className="grid gap-4"> {/* Grid para espaçamento vertical entre os campos */}
				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">Nome do Projeto</Label> {/* Label com fonte mais forte e cor mais escura */}
					<Input
						name="name"
						placeholder="Ex.: Gestão de Tráfego Junho"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" // Input estilizado e responsivo
					/>
				</div>

				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">Descrição</Label>
					<Input
						name="description"
						placeholder="Ex.: Campanha Google Ads para Junho"
						className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
					/>
				</div>

				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">Local da Campanha</Label>
					<Input
						name="source"
						placeholder="Ex.: Facebook, Google..."
						className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
					/>
				</div>

				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">Empresa</Label>
					<Select onValueChange={setSelectedCompanyId} value={selectedCompanyId}>
						<SelectTrigger name="companyId" className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"> {/* Select Trigger estilizado e responsivo */}
							<SelectValue placeholder="Selecione uma empresa" /> {/* Placeholder mais descritivo */}
						</SelectTrigger>
						<SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200"> {/* Conteúdo do Select estilizado */}
							{companies.map((company) => (
								<SelectItem key={company.id} value={company.id} className="px-3 py-2 hover:bg-gray-100 cursor-pointer"> {/* Item do Select estilizado */}
									{company.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					{/* O input hidden para companyId é uma boa prática para formulários HTML */}
					<Input type="hidden" name="companyId" value={selectedCompanyId} />
				</div>

				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">Data de Início</Label>
					<Input
						name="startDate"
						type="date"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
					/>
				</div>

				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">Data de Término</Label>
					<Input
						name="endDate"
						type="date"
						required
						className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
					/>
				</div>
			</div>

			<DialogFooter className="pt-4"> {/* Padding superior para separar do último campo */}
				<Button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-5 shadow-md transition-all duration-300 ease-in-out" // Botão modernizado e consistente
					disabled={isPending} // Desabilita o botão durante o envio
				>
					{isPending ? "Cadastrando..." : "Cadastrar Projeto"} {/* Feedback visual durante o envio */}
				</Button>
			</DialogFooter>
		</form>
	);
}
