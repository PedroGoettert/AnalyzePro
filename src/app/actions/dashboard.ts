// app/actions/dashboard.ts
"use server"; // Indica que este arquivo contém Server Actions

import { prismaClient } from "@/lib/prisma"; // Certifique-se de que este caminho está correto

// 1. Obter o Total de Empresas
export async function getTotalCompanies(): Promise<number> {
	try {
		const total = await prismaClient.company.count();
		return total;
	} catch (error) {
		console.error("Erro ao buscar o total de empresas:", error);
		throw new Error("Falha ao buscar o total de empresas.");
	}
}

// 2. Obter o Total de Campanhas Ativas
export async function getTotalActiveCampaigns(): Promise<number> {
	try {
		const total = await prismaClient.campaign.count({
			where: {
				status: true, // Assumindo que 'true' significa campanha ativa
			},
		});
		return total;
	} catch (error) {
		console.error("Erro ao buscar o total de campanhas ativas:", error);
		throw new Error("Falha ao buscar o total de campanhas ativas.");
	}
}

// 3. Obter Resultados Globais de Campanhas (Impressões, Cliques, Leads, Vendas, Custo)
export interface GlobalResults {
	impressions: number;
	clicks: number;
	leads: number;
	sales: number;
	cost: number;
	cpc: number; // Custo por Clique
	cpl: number; // Custo por Lead
	cpv: number; // Custo por Venda
}

export async function getGlobalCampaignResults(): Promise<GlobalResults> {
	try {
		const results = await prismaClient.campaignResult.aggregate({
			_sum: {
				impressions: true,
				clicks: true,
				leads: true,
				sales: true,
				cost: true,
			},
		});

		// Lidar com valores nulos caso não haja dados
		const totalImpressions = results._sum.impressions || 0;
		const totalClicks = results._sum.clicks || 0;
		const totalLeads = results._sum.leads || 0;
		const totalSales = results._sum.sales || 0;
		const totalCost = results._sum.cost || 0;

		// Calcular métricas derivadas
		const cpc = totalClicks > 0 ? totalCost / totalClicks : 0;
		const cpl = totalLeads > 0 ? totalCost / totalLeads : 0;
		const cpv = totalSales > 0 ? totalCost / totalSales : 0;

		return {
			impressions: totalImpressions,
			clicks: totalClicks,
			leads: totalLeads,
			sales: totalSales,
			cost: totalCost,
			cpc: cpc,
			cpl: cpl,
			cpv: cpv,
		};
	} catch (error) {
		console.error("Erro ao buscar resultados globais de campanhas:", error);
		throw new Error("Falha ao buscar resultados globais de campanhas.");
	}
}

// 4. Obter Campanhas por Fonte
export interface CampaignSourceData {
	source: string;
	count: number;
}

export async function getCampaignsBySource(): Promise<CampaignSourceData[]> {
	try {
		const data = await prismaClient.campaign.groupBy({
			by: ["source"],
			_count: {
				id: true,
			},
			orderBy: {
				_count: {
					id: "desc",
				},
			},
		});

		return data.map((item) => ({
			source: item.source,
			count: item._count.id,
		}));
	} catch (error) {
		console.error("Erro ao buscar campanhas por fonte:", error);
		throw new Error("Falha ao buscar campanhas por fonte.");
	}
}

// 5. Obter Tendência Diária de Resultados (ex: últimos 30 dias)
export interface DailyResult {
	date: string; // Formato YYYY-MM-DD
	impressions: number;
	clicks: number;
	leads: number;
	sales: number;
	cost: number;
}

export async function getDailyResultsTrend(days = 30): Promise<DailyResult[]> {
	try {
		const endDate = new Date();
		const startDate = new Date();
		startDate.setDate(endDate.getDate() - days); // Define a data de início

		const results = await prismaClient.campaignResult.groupBy({
			by: ["date"], // Agrupa por data
			_sum: {
				impressions: true,
				clicks: true,
				leads: true,
				sales: true,
				cost: true,
			},
			where: {
				date: {
					gte: startDate, // Maior ou igual à data de início
					lte: endDate, // Menor ou igual à data de fim
				},
			},
			orderBy: {
				date: "asc", // Ordena por data ascendente
			},
		});

		// Preencher datas sem dados para garantir uma linha contínua no gráfico
		const dateMap = new Map<string, DailyResult>();
		for (
			let d = new Date(startDate);
			d <= endDate;
			d.setDate(d.getDate() + 1)
		) {
			const dateStr = d.toISOString().split("T")[0];
			dateMap.set(dateStr, {
				date: dateStr,
				impressions: 0,
				clicks: 0,
				leads: 0,
				sales: 0,
				cost: 0,
			});
		}

		results.forEach((r) => {
			const dateStr = r.date.toISOString().split("T")[0];
			dateMap.set(dateStr, {
				date: dateStr,
				impressions: r._sum.impressions || 0,
				clicks: r._sum.clicks || 0,
				leads: r._sum.leads || 0,
				sales: r._sum.sales || 0,
				cost: r._sum.cost || 0,
			});
		});

		return Array.from(dateMap.values()); // Converte o mapa de volta para um array
	} catch (error) {
		console.error("Erro ao buscar tendência diária de resultados:", error);
		throw new Error("Falha ao buscar tendência diária de resultados.");
	}
}
