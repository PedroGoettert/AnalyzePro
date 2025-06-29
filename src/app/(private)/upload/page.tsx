import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { CreateCampaignResultForm } from "@/components/form/create-campaign-form";
import { auth } from "@/lib/auth";

export default async function UploadPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/login");
	}

	return (
		<div className="min-h-screen bg-gray-50 text-gray-800 p-4 md:p-10">
			<div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-6">
				<h1 className="text-2xl font-bold text-gray-900 mb-6">
					Upload de Dados de Campanhas
				</h1>
				<p className="text-gray-600 mb-8">
					Importe seus dados de campanhas via arquivo CSV ou XLSX. Certifique-se
					de que o arquivo segue o formato esperado.
				</p>
				<CreateCampaignResultForm />
			</div>
		</div>
	);
}
