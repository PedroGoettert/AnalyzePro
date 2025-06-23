"use client";

import { useState } from "react";
import type { Campaign } from "@/generated/prisma";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

export type CompanyProps = {
	id: string;
	name: string;
	email: string;
	campaigns: Campaign[];
};

export function CompanyTable({ companies }: { companies: CompanyProps[] }) {
	const [search, setSearch] = useState("");

	const filteredCompanies = companies.filter(
		(company) =>
			company.name.toLowerCase().includes(search.toLowerCase()) ||
			company.email.toLocaleLowerCase().includes(search.toLowerCase()),
	);

	return (
		<section>
			<form className="flex items-center justify-between mb-4 px-5">
				<h3 className="text-2xl font-semibold">Clientes Cadastrados</h3>
				<div className="flex gap-2">
					<Input
						name="search"
						type="text"
						placeholder="Pesquisar por nome ou email..."
						className="w-[250px]"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</form>

			<div className="overflow-x-auto">
				<table className="min-w-full bg-white rounded-md shadow">
					<thead>
						<tr>
							<th className="px-6 py-3 border-b text-left text-sm font-medium">
								Empresa
							</th>
							<th className="px-6 py-3 border-b text-left text-sm font-medium">
								Email
							</th>
							<th className="px-6 py-3 border-b text-left text-sm font-medium">
								Projetos Ativos
							</th>
						</tr>
					</thead>
					<tbody>
						{filteredCompanies.map((company: CompanyProps) => (
							<tr key={company.id} className="hover:bg-gray-50">
								<td className="px-6 py-4 border-b">{company.name}</td>
								<td className="px-6 py-4 border-b">{company.email}</td>
								<td className="px-6 py-4 border-b">
									{company.campaigns.length}
								</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</section>
	);
}
