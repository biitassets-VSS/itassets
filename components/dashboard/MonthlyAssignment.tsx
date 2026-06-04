'use client';

import {
  AreaChart, Area, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts';

interface Props {
  data: { assignment_date: string }[];
}

export default function MonthlyAssignment({ data }: Props) {
  const months = [
    'Jan','Feb','Mar','Apr','May','Jun',
    'Jul','Aug','Sep','Oct','Nov','Dec'
  ];

  const counts = data.reduce<Record<string, number>>((acc, item) => {
    const month = months[new Date(item.assignment_date).getMonth()];
    acc[month] = (acc[month] ?? 0) + 1;
    return acc;
  }, {});

  const chartData = months.map(m => ({ month: m, assignments: counts[m] ?? 0 }));

  return (
    <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 shadow-sm border
                    border-gray-100 dark:border-gray-800">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        Monthly Asset Assignments
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <AreaChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" className="opacity-30" />
          <XAxis dataKey="month" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} />
          <Tooltip />
          <Area
            type="monotone"
            dataKey="assignments"
            stroke="#6366f1"
            fill="#6366f1"
            fillOpacity={0.2}
            strokeWidth={2}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
