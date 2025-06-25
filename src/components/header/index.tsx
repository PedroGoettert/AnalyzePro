"use client";

import { useState } from "react";
import Link from "next/link";

export function Header() {
	const [isOpen, setIsOpen] = useState(false); // Estado para controlar a abertura/fechamento do menu mobile

	return (
		<header className="bg-white shadow-md">
			<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
				<Link href="/" className="text-2xl font-extrabold text-gray-900 hover:text-blue-700 transition-colors duration-200">
					Data Analytics
				</Link>

				{/* Navegação para Desktop */}
				<nav className="hidden md:flex gap-8 items-center">
					<Link href="/" className="text-gray-600 hover:text-blue-700 transition-colors duration-200 font-medium text-lg">
						Home
					</Link>
					<Link href="/dashboard" className="text-gray-600 hover:text-blue-700 transition-colors duration-200 font-medium text-lg">
						Dashboard
					</Link>
					<Link href="/projects" className="text-gray-600 hover:text-blue-700 transition-colors duration-200 font-medium text-lg">
						Projetos
					</Link>
					<Link href="/clients" className="text-gray-600 hover:text-blue-700 transition-colors duration-200 font-medium text-lg">
						Clientes
					</Link>
					<Link href="/upload" className="text-gray-600 hover:text-blue-700 transition-colors duration-200 font-medium text-lg">
						Upload Dados
					</Link>
				</nav>

				{/* Botão do Menu Hamburguer para Mobile */}
				<div className="md:hidden flex items-center">
					<button
						onClick={() => setIsOpen(!isOpen)}
						className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						aria-label="Toggle menu"
					>
						<span className="sr-only">Open main menu</span>
						<div className="block w-6 transform transition-all duration-300 ease-in-out">
							<span
								aria-hidden="true"
								className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-in-out ${
									isOpen ? "rotate-45 translate-y-1.5" : ""
								}`}
							></span>
							<span
								aria-hidden="true"
								className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-in-out mt-1 ${
									isOpen ? "opacity-0" : ""
								}`}
							></span>
							<span
								aria-hidden="true"
								className={`block h-0.5 w-6 bg-gray-700 transition-all duration-300 ease-in-out mt-1 ${
									isOpen ? "-rotate-45 -translate-y-1.5" : ""
								}`}
							></span>
						</div>
					</button>
				</div>
			</div>

			{/* REMOVIDO: O overlay semitransparente foi removido */}

			{/* Menu Mobile (Slide-in Lateral Direita) */}
			<div
				className={`fixed top-0 right-0 bottom-0 w-64 bg-white z-50 md:hidden transform transition-transform duration-300 ease-in-out shadow-lg ${ // Adicionado shadow-lg para destacar o menu
					isOpen ? "translate-x-0" : "translate-x-full" // Desliza da direita para fora da tela
				}`}
			>
				<div className="flex justify-start p-4"> {/* Botão de fechar movido para a esquerda dentro do menu */}
					<button
						onClick={() => setIsOpen(false)}
						className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
						aria-label="Close menu"
					>
						<span className="sr-only">Close main menu</span>
						{/* Ícone de "X" para fechar */}
						<svg
							className="h-6 w-6"
							xmlns="http://www.w3.org/2000/svg"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
							aria-hidden="true"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth="2"
								d="M6 18L18 6M6 6l12 12"
							/>
						</svg>
					</button>
				</div>
				<nav className="flex flex-col items-start p-4 space-y-6">
					<Link
						href="/"
						className="text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 w-full py-2"
						onClick={( ) => setIsOpen(false)}
					>
						Home
					</Link>
					<Link
						href="/dashboard"
						className="text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 w-full py-2"
						onClick={() => setIsOpen(false)}
					>
						Dashboard
					</Link>
					<Link
						href="/projects"
						className="text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 w-full py-2"
						onClick={() => setIsOpen(false)}
					>
						Projetos
					</Link>
					<Link
						href="/clients"
						className="text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 w-full py-2"
						onClick={() => setIsOpen(false)}
					>
						Clientes
					</Link>
					<Link
						href="/upload"
						className="text-xl font-semibold text-gray-800 hover:text-blue-700 transition-colors duration-200 w-full py-2"
						onClick={() => setIsOpen(false)}
					>
						Upload Dados
					</Link>
				</nav>
			</div>
		</header>
	);
}
