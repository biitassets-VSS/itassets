'use client';

import { RadarChart, Radar, PolarGrid, PolarAngleAxis, ResponsiveContainer, Tooltip } from 'recharts';

interface Props {
  data: { condition_status: string }[];
}

const CONDITIONS = ['Good', 'Pending', 'Issue Found', 'Damaged'];
const CONDITION_COLORS: Record<string, string> = {
  'Good': '#22c55e',
  'Pending': '#f59e0b',
  'Issue Found': '#ef4444',
  'Damaged': '#7f1d1d',
};

export default function InspectionOverview({ data }: Props) {
  const counts = data.reduce<Record<string, number>>((acc, item) => {
    acc[item.condition_status] = (acc[item.condition_status] ?? 0) + 1;
    return acc;
  }, {});

  const chartData = CONDITIONS.map(c => ({ condition: c, count: counts[c] ?? 0 }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border
                    border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Inspection Status Overview
      </h3>

      {/* Status Legend */}
      <div className="flex flex-wrap gap-3 mb-4">
        {CONDITIONS.map(c => (
          <span key={c} className="flex items-center gap-1.5 text-xs font-medium text-gray-600
                                    dark:text-gray-400">
            <span className="w-3 h-3 rounded-full inline-block"
                  style={{ backgroundColor: CONDITION_COLORS[c] }} />
            {c}: {counts[c] ?? 0}
          </span>
        ))}
      </div>

      <ResponsiveContainer width="100%" height={220}>
        <RadarChart data={chartData}>
          <PolarGrid />
          <PolarAngleAxis dataKey="condition" tick={{ fontSize: 12 }} />
          <Radar dataKey="count" stroke="#6366f1" fill="#6366f1" fillOpacity={0.4} />
          <Tooltip />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
