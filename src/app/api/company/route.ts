import { auth } from "@/lib/auth";
import { headers } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	console.log(session);

	if (!session) {
		return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
	}

	return NextResponse.json({ message: "Funcionando!", session });
}
