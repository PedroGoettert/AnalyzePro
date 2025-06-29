import { ProjectsList, type ProjectProps } from "@/components/projects-list";
import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

// Dados mockados para os projetos
const mockProjects: ProjectProps[] = [
	{
		id: "proj1",
		name: "Campanha de Verão 2024",
		description: "Foco em leads para produtos de verão.",
		status: "active",
		companyName: "Empresa Alpha",
		startDate: "2024-06-01",
		endDate: "2024-08-31",
	},
	{
		id: "proj2",
		name: "Otimização SEO - Q2",
		description: "Melhorar ranking para palavras-chave principais.",
		status: "finished",
		companyName: "Beta Solutions",
		startDate: "2024-04-01",
		endDate: "2024-06-30",
	},
	{
		id: "proj3",
		name: "Lançamento de Produto X",
		description: "Estratégia de marketing para novo produto.",
		status: "pending",
		companyName: "Gamma Corp",
		startDate: "2024-07-15",
		endDate: "2024-09-30",
	},
	{
		id: "proj4",
		name: "Análise de Mercado 2024",
		description: "Estudo aprofundado do mercado atual.",
		status: "active",
		companyName: "Empresa Alpha",
		startDate: "2024-05-01",
		endDate: "2024-11-30",
	},
	{
		id: "proj5",
		name: "Campanha de Inverno",
		description: "Campanha de leads para produtos de inverno.",
		status: "active",
		companyName: "Delta Marketing",
		startDate: "2024-06-15",
		endDate: "2024-09-15",
	},
	{
		id: "proj6",
		name: "Rebranding da Marca",
		description: "Atualização completa da identidade visual.",
		status: "pending",
		companyName: "Epsilon Tech",
		startDate: "2024-08-01",
		endDate: "2024-12-31",
	},
	{
		id: "proj7",
		name: "Auditoria de Google Ads",
		description: "Auditoria de contas de Google Ads.",
		status: "finished",
		companyName: "Zeta Innovations",
		startDate: "2024-03-01",
		endDate: "2024-03-31",
	},
	{
		id: "proj8",
		name: "Desenvolvimento de Conteúdo",
		description: "Criação de conteúdo para blog e redes sociais.",
		status: "active",
		companyName: "Theta Analytics",
		startDate: "2024-06-01",
		endDate: "2025-06-01",
	},
];

export default async function ProjectsPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/login");
	}

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-10">
			<div className="max-w-7xl mx-auto">
				<h1 className="text-3xl font-bold text-gray-900 mb-6">Meus Projetos</h1>
				<ProjectsList projects={mockProjects} />
			</div>
		</div>
	);
}
