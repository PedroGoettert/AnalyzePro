"use server";

import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { prismaClient } from "@/lib/prisma";

export async function createCompany(formData: FormData) {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	const name = formData.get("name") as string;
	const email = formData.get("email") as string;

	if (!session) {
		throw new Error("Usuário não autenticado");
	}

	await prismaClient.company.create({
		data: {
			name,
			email,
			userId: session.user.id,
		},
	});

	redirect("/");
}
