'use client';

import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const COLORS = {
  'In Stock': '#3b82f6',
  'Assigned': '#22c55e',
  'Repaired': '#eab308',
  'Discard': '#ef4444',
  'Lost': '#6b7280',
};

interface Props {
  data: { status: string }[];
}

export default function AssetsByStatus({ data }: Props) {
  const counts = data.reduce<Record<string, number>>((acc, item) => {
    acc[item.status] = (acc[item.status] ?? 0) + 1;
    return acc;
  }, {});

  const chartData = Object.entries(counts).map(([name, value]) => ({
    name, value
  }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border
                    border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Assets by Status
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={4}
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell
                key={index}
                fill={COLORS[entry.name as keyof typeof COLORS] ?? '#94a3b8'}
              />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
