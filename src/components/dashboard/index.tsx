"use client";

import { useEffect, useState } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement, // Adicionado para gráficos de linha
	LineElement, // Adicionado para gráficos de linha
	Title,
	Tooltip,
	Legend,
} from "chart.js";

// Importa o componente de card de KPI
import { KPICard } from "@/components/KPICard";

// Importa as funções de busca de dados (Server Actions)
import {
	getTotalCompanies,
	getTotalActiveCampaigns,
	getGlobalCampaignResults,
	getCampaignsBySource,
	getDailyResultsTrend,
	type GlobalResults,
	type CampaignSourceData,
	type DailyResult,
} from "@/app/actions/dashboard";

// Registra os componentes necessários do Chart.js
// ISSO É CRUCIAL para que os gráficos sejam renderizados corretamente
ChartJS.register(
	CategoryScale,
	LinearScale,
	BarElement,
	PointElement, // Registra PointElement
	LineElement, // Registra LineElement
	Title,
	Tooltip,
	Legend,
);

export function DashboardComponent() {
	const [totalCompanies, setTotalCompanies] = useState<number | null>(null);
	const [totalActiveCampaigns, setTotalActiveCampaigns] = useState<
		number | null
	>(null);
	const [globalResults, setGlobalResults] = useState<GlobalResults | null>(
		null,
	);
	const [campaignsBySource, setCampaignsBySource] = useState<
		CampaignSourceData[]
	>([]);
	const [dailyResults, setDailyResults] = useState<DailyResult[]>([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		async function loadDashboardData() {
			try {
				setLoading(true);
				const [
					companiesCount,
					activeCampaignsCount,
					globalStats,
					sourceData,
					dailyTrend,
				] = await Promise.all([
					getTotalCompanies(),
					getTotalActiveCampaigns(),
					getGlobalCampaignResults(),
					getCampaignsBySource(),
					getDailyResultsTrend(),
				]);

				setTotalCompanies(companiesCount);
				setTotalActiveCampaigns(activeCampaignsCount);
				setGlobalResults(globalStats);
				setCampaignsBySource(sourceData);
				setDailyResults(dailyTrend);
			} catch (err) {
				console.error("Falha ao carregar dados do dashboard:", err);
				setError(
					"Falha ao carregar dados do dashboard. Por favor, tente novamente.",
				);
			} finally {
				setLoading(false);
			}
		}
		loadDashboardData();
	}, []);

	// --- Preparação dos Dados e Opções para o Gráfico de Barras ---
	const barChartData = {
		labels: campaignsBySource.map((item) => item.source),
		datasets: [
			{
				label: "Número de Campanhas",
				data: campaignsBySource.map((item) => item.count),
				backgroundColor: "rgba(59, 130, 246, 0.6)", // Azul do Tailwind
				borderColor: "rgba(59, 130, 246, 1)",
				borderWidth: 1,
			},
		],
	};

	const barChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Campanhas por Fonte",
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				grid: {
					color: "rgba(224, 224, 224, 0.5)",
				},
			},
		},
	};

	// --- Preparação dos Dados e Opções para o Gráfico de Linha ---
	const lineChartData = {
		labels: dailyResults.map((item) => item.date),
		datasets: [
			{
				label: "Impressões Diárias",
				data: dailyResults.map((item) => item.impressions),
				borderColor: "rgb(75, 192, 192)",
				backgroundColor: "rgba(75, 192, 192, 0.5)",
				tension: 0.1,
				fill: false,
			},
			{
				label: "Cliques Diários",
				data: dailyResults.map((item) => item.clicks),
				borderColor: "rgb(255, 99, 132)",
				backgroundColor: "rgba(255, 99, 132, 0.5)",
				tension: 0.1,
				fill: false,
			},
		],
	};

	const lineChartOptions = {
		responsive: true,
		maintainAspectRatio: false,
		plugins: {
			legend: {
				position: "top" as const,
			},
			title: {
				display: true,
				text: "Tendência Diária de Impressões e Cliques",
			},
		},
		scales: {
			x: {
				grid: {
					display: false,
				},
			},
			y: {
				beginAtZero: true,
				grid: {
					color: "rgba(224, 224, 224, 0.5)",
				},
			},
		},
	};

	// --- Renderização Condicional (Carregamento, Erro, Conteúdo) ---
	if (loading) {
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
				<p className="text-lg text-gray-700">Carregando dashboard...</p>
			</div>
		);
	}

	if (error) {
		return (
			<div className="flex justify-center items-center min-h-[calc(100vh-64px)]">
				<p className="text-lg text-red-600">{error}</p>
			</div>
		);
	}

	return (
		<div className="p-4 md:p-10 mx-auto max-w-7xl">
			<h1 className="text-3xl font-bold text-gray-900 mb-6">
				Dashboard de Análise
			</h1>
			<p className="text-lg text-gray-600 mb-8">
				Visão geral do desempenho das suas empresas e campanhas.
			</p>

			{/* Seção de Cards de KPI */}
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
				<KPICard
					title="Total de Empresas"
					value={totalCompanies?.toLocaleString() || "N/A"}
				/>
				<KPICard
					title="Campanhas Ativas"
					value={totalActiveCampaigns?.toLocaleString() || "N/A"}
				/>
				<KPICard
					title="Total de Impressões"
					value={globalResults?.impressions?.toLocaleString() || "N/A"}
				/>
				<KPICard
					title="Total de Cliques"
					value={globalResults?.clicks?.toLocaleString() || "N/A"}
				/>
				<KPICard
					title="Total de Leads"
					value={globalResults?.leads?.toLocaleString() || "N/A"}
				/>
				<KPICard
					title="Total de Vendas"
					value={globalResults?.sales?.toLocaleString() || "N/A"}
				/>
				<KPICard
					title="Custo Total"
					value={`R$ ${globalResults?.cost?.toFixed(2) || "N/A"}`}
				/>
				<KPICard
					title="CPC Médio"
					value={`R$ ${globalResults?.cpc?.toFixed(2) || "N/A"}`}
				/>
			</div>

			{/* Seção de Gráficos */}
			<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
				{/* Gráfico de Barras: Campanhas por Fonte */}
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Campanhas por Fonte
					</h2>
					{campaignsBySource.length > 0 ? (
						<div style={{ height: "300px", width: "100%" }}>
							<Bar data={barChartData} options={barChartOptions} />
						</div>
					) : (
						<p className="text-center text-gray-500">
							Nenhum dado de campanha por fonte disponível.
						</p>
					)}
				</div>

				{/* Gráfico de Linha: Tendência Diária de Impressões e Cliques */}
				<div className="bg-white rounded-xl shadow-md p-6">
					<h2 className="text-xl font-semibold text-gray-800 mb-4">
						Tendência Diária
					</h2>
					{dailyResults.length > 0 ? (
						<div style={{ height: "300px", width: "100%" }}>
							<Line data={lineChartData} options={lineChartOptions} />
						</div>
					) : (
						<p className="text-center text-gray-500">
							Nenhum dado de tendência diária disponível.
						</p>
					)}
				</div>
			</div>
		</div>
	);
}
