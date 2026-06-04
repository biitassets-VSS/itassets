'use client';

import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

interface Props {
  data: { status: string; asset_categories: { name: string } | null }[];
}

export default function AssetsByCategory({ data }: Props) {
  const counts = data.reduce<Record<string, number>>((acc, item) => {
    const name = item.asset_categories?.name ?? 'Unknown';
    acc[name] = (acc[name] ?? 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts)
    .map(([name, count]) => ({ name: name.length > 12 ? name.slice(0, 12) + '…' : name, count }))
    .sort((a, b) => b.count - a.count);

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border
                    border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Assets by Category
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={chartData} margin={{ bottom: 20 }}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="name" tick={{ fontSize: 11 }} angle={-30} textAnchor="end" />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
