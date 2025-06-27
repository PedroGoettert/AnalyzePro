"use client";

import { useState } from "react";
import { createCampaignResult } from "@/app/actions/campaign";
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

export function CreateCampaignResultForm({
	companies,
}: {
	companies?: CompanyProps[];
}) {
	const [source, setSource] = useState<string | undefined>();
	const [companyId, setCompanyId] = useState<string | undefined>();
	const [campaignId, setCampaignId] = useState<string | undefined>("");

	const company = companies?.find((company) => company.id === companyId);

	if (!companies || companies.length === 0) {
		return (
			<div className="text-red-500">
				Nenhuma empresa disponível. Por favor, crie uma empresa primeiro.
			</div>
		);
	}

	return (
		<form action={createCampaignResult} className="space-y-6 ">
			<div className="grid gap-4">
				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">Local da Campanha</Label>
					<Select onValueChange={setSource} value={source}>
						<SelectTrigger
							name="companyId"
							className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
						>
							{" "}
							{/* Select Trigger estilizado e responsivo */}
							<SelectValue placeholder="Selecione uma empresa" />{" "}
							{/* Placeholder mais descritivo */}
						</SelectTrigger>
						<SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
							<SelectItem value="google">Google</SelectItem>
							<SelectItem value="meta">Meta</SelectItem>
						</SelectContent>
					</Select>
					<Input type="hidden" name="source" value={source} required />
				</div>

				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">
						Selecione a Empresa
					</Label>
					<Select
						name="companyId"
						onValueChange={setCompanyId}
						value={companyId}
						required
					>
						<SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
							<SelectValue placeholder="Selecione uma empresa" />
						</SelectTrigger>
						<SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
							{companies.map((company) => (
								<SelectItem key={company.id} value={company.id}>
									{company.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input type="hidden" name="companyId" />
				</div>

				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">
						Selecione a campanha
					</Label>
					<Select
						onValueChange={setCampaignId}
						value={campaignId}
						name="campaignId"
						required
					>
						<SelectTrigger className="w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
							<SelectValue placeholder="Selecione uma campanha" />
						</SelectTrigger>
						<SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
							{company?.campaigns?.map((campaign) => (
								<SelectItem key={campaign.id} value={campaign.id}>
									{campaign.name}
								</SelectItem>
							))}
						</SelectContent>
					</Select>
					<Input type="hidden" name="campaignId" />
				</div>
				<div className="grid gap-2">
					<Label className="font-medium text-gray-700">
						Selecione o Arquivo
					</Label>
					<Input
						type="file"
						name="file"
						accept=".csv, .xlsx"
						required
						className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 focus:outline-none focus:border-blue-500 focus:ring-blue-500"
					/>
				</div>
			</div>

			<DialogFooter className="pt-4">
				<Button
					type="submit"
					className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-xl py-3 px-5 shadow-md transition-all duration-300 ease-in-out"
				>
					Enviar Arquivo
				</Button>
			</DialogFooter>
		</form>
	);
}
