import Link from "next/link";

export function Header() {
	return (
		<header className="bg-white shadow">
			<div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
				<h1 className="text-xl font-bold">Data Analytics</h1>
				<nav className="flex gap-6">
					<Link href="/" className="hover:text-blue-600">
						Home
					</Link>
					<Link href="/dashboard" className="hover:text-blue-600">
						Dashboard
					</Link>
					<Link href="/projects" className="hover:text-blue-600">
						Projetos
					</Link>
					<Link href="/clients" className="hover:text-blue-600">
						Clientes
					</Link>
					<Link href="/upload" className="hover:text-blue-600">
						Upload Dados
					</Link>
				</nav>
			</div>
		</header>
	);
}
