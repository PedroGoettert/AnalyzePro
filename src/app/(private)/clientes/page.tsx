import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { CompanyProps, CompanyTable } from "@/components/companyTable";
import { Button } from "@/components/ui/button";
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from "@/components/ui/dialog";
import { CreateCompanyForm } from "@/components/form/create-company-form"; // Reutilizando o formulário de criação de empresa
import { prismaClient } from "@/lib/prisma";

export default async function ClientsPage() {
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
		<div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-10">
			<div className="max-w-7xl mx-auto">
				<div className="flex justify-between items-center mb-6">
					<h1 className="text-3xl font-bold text-gray-900">Meus Clientes</h1>
					<Dialog>
						<DialogTrigger asChild>
							<Button className="bg-blue-600 text-white rounded-xl py-2 px-4 shadow-md hover:bg-blue-700 transition-all duration-300 ease-in-out">
								+ Novo Cliente
							</Button>
						</DialogTrigger>
						<DialogContent className="sm:max-w-[500px] rounded-xl shadow-2xl">
							<DialogHeader>
								<DialogTitle className="text-2xl font-bold text-gray-900">
									Cadastrar Novo Cliente
								</DialogTitle>
								<DialogDescription className="text-gray-600 mt-2">
									Preencha os dados do novo cliente.
								</DialogDescription>
							</DialogHeader>
							<CreateCompanyForm />
						</DialogContent>
					</Dialog>
				</div>
				<CompanyTable companies={companies} />
			</div>
		</div>
	);
}
