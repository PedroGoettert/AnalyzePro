"use client";

import { useEffect, useState } from "react";
import type { Campaign } from "@/generated/prisma";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

export type CompanyProps = {
	id: string;
	name: string;
	email: string;
	campaigns: Campaign[];
};

export function CompanyTable({ companies }: { companies: CompanyProps[] }) {
	
	const [search, setSearch] = useState("");
	const [currentPage, setCurrentPage] = useState(1)
	const itensPerPage = 5
	
	useEffect(() => {
		setCurrentPage(1);
	}, [search]);

	const filteredCompanies = companies.filter(
		(company) =>
			company.name.toLowerCase().includes(search.toLowerCase()) ||
			company.email.toLocaleLowerCase().includes(search.toLowerCase()),
	);

	// Ve o total de paginas que tem. Math.Ceil arredonda para cima o número de páginas
	const totalPages = Math.ceil(filteredCompanies.length / itensPerPage);

	const indexOfLastItem = currentPage * itensPerPage; // Índice do último item da página atual
	console.log(indexOfLastItem);
	const indexOfFirstItem = indexOfLastItem - itensPerPage; // Índice do primeiro item da página atual
	console.log(indexOfFirstItem);

	const currentCompanies = filteredCompanies.slice(indexOfFirstItem, indexOfLastItem); // Itens da página atual

	const goToNextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const goToPreviousPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

		

	return (
		<section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
				<h3 className="text-2xl font-bold text-gray-900">Clientes Cadastrados</h3>
				<div className="flex w-full sm:w-auto">
					<Input
						name="search"
						type="text"
						placeholder="Pesquisar por nome ou email..."
						className="w-full sm:w-[250px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
						onChange={(e) => setSearch(e.target.value)}
					/>
				</div>
			</div>

			<div className="overflow-x-auto rounded-lg border border-gray-200">
				<table className="min-w-full divide-y divide-gray-200">
					<thead className="bg-gray-50">
						<tr>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
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
					<tbody className="bg-white divide-y divide-gray-200">
						{/* Renderiza as empresas da página atual */}
						{currentCompanies.length === 0 ? (
							<tr>
								<td colSpan={3} className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
									{filteredCompanies.length === 0 && search !== ""
										? "Nenhum resultado encontrado para sua busca."
										: "Nenhuma empresa cadastrada."}
								</td>
							</tr>
						) : (
							currentCompanies.map((company: CompanyProps) => (
								<tr key={company.id} className="hover:bg-gray-50 transition-colors duration-150">
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{company.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{company.email}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-blue-100 text-blue-800">
											{company.campaigns.length}
										</span>
									</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</div>

			{/* Controles de Paginação */}
			{totalPages > 1 && ( // Só mostra os controles se houver mais de uma página
				<div className="flex justify-between items-center mt-4 px-6 py-3 border-t border-gray-200">
					<Button
						onClick={goToPreviousPage}
						disabled={currentPage === 1}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Anterior
					</Button>
					<span className="text-sm text-gray-700">
						Página {currentPage} de {totalPages}
					</span>
					<Button
						onClick={goToNextPage}
						disabled={currentPage === totalPages}
						className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
					>
						Próxima
					</Button>
				</div>
			)}
		</section>
	);
}