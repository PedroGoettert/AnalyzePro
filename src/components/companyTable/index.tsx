"use client";

import { useState } from "react";
import type { Campaign } from "@/generated/prisma";
import { Input } from "../ui/input"; // Assumindo que este é o componente Input estilizado do shadcn/ui ou similar

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
		<section className="bg-white rounded-xl shadow-lg p-4 sm:p-6"> {/* Contêiner principal com fundo branco, cantos arredondados, sombra e padding responsivo */}
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0"> {/* Layout responsivo para o cabeçalho: coluna no mobile, linha em telas maiores */}
				<h3 className="text-2xl font-bold text-gray-900">Clientes Cadastrados</h3> {/* Título mais proeminente */}
				<div className="flex w-full sm:w-auto"> {/* Contêiner para o input de busca, ocupa largura total no mobile */}
					<Input
						name="search"
						type="text"
						placeholder="Pesquisar por nome ou email..."
						className="w-full sm:w-[250px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200" // Input estilizado e responsivo
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg border border-gray-200"> {/* Contêiner para rolagem horizontal da tabela, com borda e cantos arredondados */}
				<table className="min-w-full divide-y divide-gray-200"> {/* Tabela com divisores de linha */}
					<thead className="bg-gray-50"> {/* Cabeçalho da tabela com fundo suave */}
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider" // Estilo do cabeçalho da coluna
							>
								Empresa
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Email
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Projetos Ativos
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200"> {/* Corpo da tabela com divisores de linha */}
						{filteredCompanies.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
									Nenhuma empresa encontrada.
								</td>
							</tr>
						) : (
							filteredCompanies.map((company: CompanyProps) => (
								<tr key={company.id} className="hover:bg-gray-50 transition-colors duration-150"> {/* Efeito de hover suave */}
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900"> {/* Célula de dados */}
										{company.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{company.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800"> {/* Estilo de "badge" para projetos ativos */}
											{company.campaigns.length}
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>
		</section>
	);
}
