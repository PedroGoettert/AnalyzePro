import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { RegisterForm } from "@/components/registerForm";
import { auth } from "@/lib/auth";

export default async function Register() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		return redirect("/");
	}

	return (
		<div>
			<RegisterForm />
		</div>
	);
}
