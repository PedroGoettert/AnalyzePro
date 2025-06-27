import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { type CompanyProps, CompanyTable } from "@/components/companyTable";
import { CreateCampaignResultForm } from "@/components/form/create-campaign-form";
import { CreateCompanyForm } from "@/components/form/create-company-form";
import { CreateProjectForm } from "@/components/form/create-project-form";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { auth } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";

export default async function Home() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/login");
	}

	const user = await prismaClient.user.findUnique({
		where: {
			id: session.user.id,
		},
		include: {
			Company: {
				include: {
					campaigns: true,
				},
			},
		},
	});

	if (!user) {
		return { message: "Usuário não encontrado" };
	}

	const company = await prismaClient.company.findMany({
		where: {
			userId: user.id,
		},
		include: {
			campaigns: true,
		},
	});
	const companies: CompanyProps[] = JSON.parse(JSON.stringify(company));

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800">
			{/* Main */}
			<main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
				{" "}
				{/* Padding responsivo: px-4 para mobile, sm:px-6 para telas pequenas, lg:px-8 para telas grandes */}
				<h1 className="text-3xl font-bold text-gray-900 mb-8">Visão Geral</h1>
				{/* Ações rápidas */}
				<section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
					{" "}
					{/* Grid responsivo: 1 coluna no mobile (grid-cols-1), 3 colunas a partir de telas médias (md:grid-cols-3) */}
					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full bg-blue-600 text-white rounded-xl py-4 px-6 shadow-lg hover:bg-blue-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
								{" "}
								{/* w-full garante que o botão ocupe 100% da largura da coluna, ideal para mobile */}
								Cadastrar Empresa
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl">
							{" "}
							{/* Diálogo responsivo: largura total no mobile, max-w de 500px a partir de telas pequenas (sm) */}
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-gray-900">
									Cadastrar Empresa
								</DialogTitle>
								<DialogDescription className="text-gray-600 mt-2">
									Preencha os dados da empresa que irá contratar seus serviços.
								</DialogDescription>
							</DialogHeader>
							<CreateCompanyForm />
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full bg-purple-600 text-white rounded-xl py-4 px-6 shadow-lg hover:bg-purple-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
								{" "}
								{/* w-full para mobile */}
								Cadastrar Projeto
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl">
							{" "}
							{/* Diálogo responsivo */}
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-gray-900">
									Cadastrar Projeto
								</DialogTitle>
								<DialogDescription className="text-gray-600 mt-2">
									Crie um novo projeto, serviço ou campanha vinculada à uma
									empresa.
								</DialogDescription>
							</DialogHeader>
							<CreateProjectForm companies={companies} />
						</DialogContent>
					</Dialog>
					<Dialog>
						<DialogTrigger asChild>
							<Button className="w-full bg-green-600 text-white rounded-xl py-4 px-6 shadow-lg hover:bg-green-700 transition-all duration-300 ease-in-out transform hover:-translate-y-1">
								{" "}
								{/* w-full para mobile */}
								Upload de Dados
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl">
							{" "}
							{/* Diálogo responsivo */}
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-gray-900">
									Upload de Arquivo
								</DialogTitle>
								<DialogDescription className="text-gray-600 mt-2">
									Faça upload de arquivos (.csv, .xlsx, etc.) para importar
									dados.
								</DialogDescription>
							</DialogHeader>
							<CreateCampaignResultForm companies={companies} />
						</DialogContent>
					</Dialog>
				</section>
				<div className="bg-white rounded-xl shadow-lg p-6">
					{" "}
					{/* Este contêiner se adapta ao espaço disponível, tornando-o responsivo */}
					<h2 className="text-2xl font-bold text-gray-900 mb-6">
						Minhas Empresas
					</h2>
					{/* Para a tabela, se ela tiver muitas colunas, você pode precisar envolver CompanyTable em um div com overflow-x-auto para rolagem horizontal no mobile */}
					{/* Exemplo: <div className="overflow-x-auto"> <CompanyTable companies={companies} /> </div> */}
					<CompanyTable companies={companies} />
				</div>
			</main>
		</div>
	);
}
