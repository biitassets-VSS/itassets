'use client';

import { type ElementType } from 'react';
import { cn } from '@/lib/utils';

interface StatsCardProps {
  title: string;
  value: number | string;
  icon: ElementType;
  color: string;
  delay?: number;
}

export default function StatsCard({
  title, value, icon: Icon, color, delay = 0
}: StatsCardProps) {
  return (
    <div
      className={cn(
        'rounded-2xl p-5 text-white shadow-lg card-hover animate-fade-in-up',
        `bg-gradient-to-br ${color}`
      )}
      style={{ animationDelay: `${delay * 80}ms` }}
    >
      <div className="flex items-start justify-between">
        <div>
          <p className="text-white/80 text-sm font-medium">{title}</p>
          <p className="text-2xl font-bold mt-1">
            {typeof value === 'number' ? value.toLocaleString('en-IN') : value}
          </p>
        </div>
        <div className="bg-white/20 rounded-xl p-2">
          <Icon className="w-6 h-6 text-white" />
        </div>
      </div>
    </div>
  );
}
