interface KPICardProps {
	title: string;
	value: string;
}

export function KPICard({ title, value }: KPICardProps) {
	return (
		<div className="bg-white rounded-xl shadow-md p-5 flex flex-col items-start">
			<p className="text-sm font-medium text-gray-500">{title}</p>
			<p className="text-3xl font-bold text-gray-900 mt-1">{value}</p>
		</div>
	);
}
