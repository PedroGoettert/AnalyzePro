"use server";

import { auth } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";
import { headers } from "next/headers";
import {redirect} from "next/navigation";

export async function createProject(formData: FormData) {
	console.log(formData);
	
	await prismaClient.campaign.create({
		data: {
			name: formData.get("name") as string,
			description: formData.get("description") as string,
			source: formData.get("source") as string,
			companyId: formData.get("companyId") as string,
			endDate: new Date(formData.get("endDate") as string),
			startDate: new Date(formData.get("startDate") as string),
		}
	})

	redirect("/")
}
