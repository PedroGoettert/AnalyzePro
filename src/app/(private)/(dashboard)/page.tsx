import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { DashboardComponent } from "@/components/dashboard";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/login");
	}

	console.log(session.user);

	return (
		<div>
			<DashboardComponent />
		</div>
	);
}
