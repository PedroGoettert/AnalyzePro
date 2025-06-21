import { headers } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "@/components/loginForm";
import { auth } from "@/lib/auth";

export default async function LoginPage() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (session) {
		return redirect("/");
	}

	return (
		<div className="flex items-center justify-center min-h-screen bg-gray-100">
			<LoginForm />
		</div>
	);
}
