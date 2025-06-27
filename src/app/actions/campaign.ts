import * as xlsx from "xlsx";

export async function createCampaignResult(formData: FormData) {
	const file = formData.get("file") as File;
	const source = formData.get("source") as string;
	const companyId = formData.get("companyId") as string;
	const campaingId = formData.get("campaignId") as string;

	if (!file) {
		throw new Error("Nenhum arquivo foi enviado.");
	}

	const buffer = await file.arrayBuffer();
	const workbook = xlsx.read(buffer, { type: "buffer" });
	const sheetName = workbook.SheetNames[0];
	const worksheet = workbook.Sheets[sheetName];
}
