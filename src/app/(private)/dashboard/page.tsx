import { headers } from "next/headers";
import { redirect } from "next/navigation";
import { DashboardComponent } from "@/components/dashboard";
import { auth } from "@/lib/auth";

export default async function Dashboard() {
	const session = await auth.api.getSession({
		headers: await headers(),
	});

	if (!session) {
		return redirect("/login");
	}

	return (
		<div>
			<DashboardComponent />
		</div>
	);
}
