import { Header } from "@/components/header";

export default function PrivateLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<div>
			<Header />
			{children}
		</div>
	);
}
