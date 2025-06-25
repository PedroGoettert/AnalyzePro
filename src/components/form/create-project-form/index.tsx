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
			className="space-y-6"
		>
			<div className="grid gap-4">
				<div className="grid gap-2">
					<Label>Nome do Projeto</Label>
					<Input
						name="name"
						placeholder="Ex.: Gestão de Tráfego Junho"
						required
					/>
				</div>

				<div className="grid gap-2">
					<Label>Descrição</Label>
					<Input
						name="description"
						placeholder="Ex.: Campanha Google Ads para Junho"
					/>
				</div>

				<div className="grid gap-2">
					<Label>Local da Campanha</Label>
					<Input name="source" placeholder="Ex.: Facebook, Google..." />
				</div>

				<div className="grid gap-2">
					<Label>Empresa</Label>
					<Select onValueChange={setSelectedCompanyId} value={selectedCompanyId}>
						<SelectTrigger name="companyId" className="w-full">
							<SelectValue placeholder="Select a timezone" />
						</SelectTrigger>
						<SelectContent>
							{companies.map((company) => (
								<SelectItem key={company.id} value={company.id}>
									{company.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input type="hidden" name="companyId" value={selectedCompanyId} />
				</div>

				<div className="grid gap-2">
					<Label>Data de Início</Label>
					<Input name="startDate" type="date" required />
				</div>

				<div className="grid gap-2">
					<Label>Data de Término</Label>
					<Input name="endDate" type="date" required />
				</div>
			</div>

			<DialogFooter>
				<Button
					type="submit"
					className="w-full bg-purple-500 hover:bg-purple-600"
				>
					Cadastrar Projeto
				</Button>
			</DialogFooter>
		</form>
	);
}
