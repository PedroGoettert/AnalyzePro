import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateCompanyForm } from "@/components/form/create-company-form";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogFooter,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { Campaign } from "@/generated/prisma";
import { auth } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";

type CompanyProps = {
	id: string;
	name: string;
	email: string;
	campaigns: Campaign[];
};

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

	const companys: CompanyProps[] = JSON.parse(JSON.stringify(user.Company));

	return (
		<div className="min-h-screen bg-gray-100">
			<Header />

			{/* Main */}
			<main className="max-w-7xl mx-auto px-6 py-10">
				{/* Ações rápidas */}
				<div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-yellow-500 text-white rounded-lg p-6 hover:bg-yellow-600 transition">
								Cadastrar Empresa
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px]">
							<DialogHeader>
								<DialogTitle className="text-xl">Cadastrar Empresa</DialogTitle>
								<DialogDescription>
									Preencha os dados da empresa que irá contratar seus serviços.
								</DialogDescription>
							</DialogHeader>

							<CreateCompanyForm />
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-purple-500 text-white rounded-lg p-6 hover:bg-purple-600 transition">
								Cadastrar Projeto
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px]">
							<DialogHeader>
								<DialogTitle className="text-xl">Cadastrar Projeto</DialogTitle>
								<DialogDescription>
									Crie um novo projeto, serviço ou campanha vinculada à uma
									empresa.
								</DialogDescription>
							</DialogHeader>

							<form className="space-y-6">
								<div className="grid gap-4">
									<div className="grid gap-2">
										<Label>Nome do Projeto</Label>
										<Input
											placeholder="Ex.: Gestão de Tráfego Junho"
											required
										/>
									</div>

									<div className="grid gap-2">
										<Label>Descrição</Label>
										<Input placeholder="Ex.: Campanha Google Ads para Junho" />
									</div>

									<div className="grid gap-2">
										<Label>Empresa</Label>
										<Input placeholder="Nome da Empresa" required />
										{/* Ideal substituir por um Select que lista empresas */}
									</div>

									<div className="grid gap-2">
										<Label>Data de Início</Label>
										<Input type="date" required />
									</div>

									<div className="grid gap-2">
										<Label>Data de Término</Label>
										<Input type="date" required />
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
						</DialogContent>
					</Dialog>

					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-green-500 text-white rounded-lg p-6 hover:bg-green-600 transition">
								Upload de Dados
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px]">
							<DialogHeader>
								<DialogTitle className="text-xl">Upload de Arquivo</DialogTitle>
								<DialogDescription>
									Faça upload de arquivos (.csv, .xlsx, etc.) para importar
									dados.
								</DialogDescription>
							</DialogHeader>

							<form className="space-y-6">
								<div className="grid gap-4">
									<div className="grid gap-2">
										<Label>Selecione o Arquivo</Label>
										<Input type="file" accept=".csv, .xlsx" required />
									</div>
								</div>

								<DialogFooter>
									<Button
										type="submit"
										className="w-full bg-green-500 hover:bg-green-600"
									>
										Enviar Arquivo
									</Button>
								</DialogFooter>
							</form>
						</DialogContent>
					</Dialog>
				</div>

				{/* Lista de Clientes */}
				<section>
					<h3 className="text-2xl font-semibold mb-4">Clientes Cadastrados</h3>
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
								{companys.map((company) => (
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
			</main>
		</div>
	);
}
