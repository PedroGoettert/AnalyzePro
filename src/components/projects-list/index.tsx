"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select";

// Tipos mockados para os projetos
export type ProjectProps = {
	id: string;
	name: string;
	description?: string;
	status: "active" | "finished" | "pending"; // Adicionando status
	companyName: string; // Para exibir o nome da empresa
	startDate: string;
	endDate: string;
};

interface ProjectsListProps {
	projects: ProjectProps[];
}

export function ProjectsList({ projects }: ProjectsListProps) {
	const [search, setSearch] = useState("");
	const [filterStatus, setFilterStatus] = useState<string>("all"); // 'all', 'active', 'finished', 'pending'

	const filteredProjects = projects.filter((project) => {
		const matchesSearch =
			project.name.toLowerCase().includes(search.toLowerCase()) ||
			project.companyName.toLowerCase().includes(search.toLowerCase()) ||
			project.description?.toLowerCase().includes(search.toLowerCase());

		const matchesStatus =
			filterStatus === "all" || project.status === filterStatus;

		return matchesSearch && matchesStatus;
	});

	return (
		<section className="bg-white rounded-xl shadow-lg p-4 sm:p-6">
			<div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 gap-4 sm:gap-0">
				<h3 className="text-2xl font-bold text-gray-900">Meus Projetos</h3>
				<div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
					<Input
						name="search"
						type="text"
						placeholder="Pesquisar por nome ou empresa..."
						className="w-full sm:w-[250px] px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
						onChange={(e) => setSearch(e.target.value)}
					/>
					<Select onValueChange={setFilterStatus} value={filterStatus}>
						<SelectTrigger className="w-full sm:w-[150px] px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200">
							<SelectValue placeholder="Filtrar por status" />
						</SelectTrigger>
						<SelectContent className="bg-white rounded-lg shadow-lg border border-gray-200">
							<SelectItem value="all">Todos</SelectItem>
							<SelectItem value="active">Ativos</SelectItem>
							<SelectItem value="finished">Finalizados</SelectItem>
							<SelectItem value="pending">Pendentes</SelectItem>
						</SelectContent>
					</Select>
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
								Nome do Projeto
							</th>
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
								Status
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Início
							</th>
							<th
								scope="col"
								className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
							>
								Término
							</th>
						</tr>
					</thead>
					<tbody className="bg-white divide-y divide-gray-200">
						{filteredProjects.length === 0 ? (
							<tr>
								<td
									colSpan={5}
									className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center"
								>
									Nenhum projeto encontrado.
								</td>
							</tr>
						) : (
							filteredProjects.map((project: ProjectProps) => (
								<tr
									key={project.id}
									className="hover:bg-gray-50 transition-colors duration-150"
								>
									<td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
										{project.name}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{project.companyName}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										<span
											className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${project.status === "active" ? "bg-green-100 text-green-800" : project.status === "finished" ? "bg-blue-100 text-blue-800" : "bg-yellow-100 text-yellow-800"}`}
										>
											{project.status === "active"
												? "Ativo"
												: project.status === "finished"
													? "Finalizado"
													: "Pendente"}
										</span>
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{project.startDate}
									</td>
									<td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
										{project.endDate}
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
