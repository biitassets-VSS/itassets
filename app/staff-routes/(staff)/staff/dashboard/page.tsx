import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import StatsCard from '@/components/dashboard/StatsCard';
import {
  CubeIcon, ClipboardDocumentCheckIcon,
  ExclamationCircleIcon,
} from '@heroicons/react/24/outline';
import { formatDate, getConditionColor } from '@/lib/utils';
import Link from 'next/link';
import { cn } from '@/lib/utils';

export default async function StaffDashboard() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/staff/login');

  const { data: staffMember } = await supabase
    .from('staff_members')
    .select('*')
    .eq('user_id', user.id)
    .single();

  if (!staffMember) redirect('/staff/login');

  const { data: assignments } = await supabase
    .from('asset_assignments')
    .select('*, assets(asset_name, asset_id, status, inspection_date)')
    .eq('staff_id', staffMember.id)
    .eq('is_current', true);

  const today = new Date();
  const assetList = assignments ?? [];

  const upcomingInspections = assetList.filter(a => {
    if (!a.assets?.inspection_date) return false;
    const d = new Date(a.assets.inspection_date);
    const diff = (d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24);
    return diff >= 0 && diff <= 7;
  });

  const { data: pendingInspections } = await supabase
    .from('inspections')
    .select('*')
    .eq('staff_id', staffMember.id)
    .eq('condition_status', 'Pending');

  const cards = [
    { title: 'Assigned Assets', value: assetList.length,
      icon: CubeIcon, color: 'from-indigo-500 to-indigo-600' },
    { title: 'Upcoming Inspections', value: upcomingInspections.length,
      icon: ClipboardDocumentCheckIcon, color: 'from-orange-500 to-orange-600' },
    { title: 'Pending Inspections', value: pendingInspections?.length ?? 0,
      icon: ExclamationCircleIcon, color: 'from-red-500 to-red-600' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-indigo-500 to-purple-600 rounded-2xl p-6 text-white">
        <h1 className="text-2xl font-bold">
          Welcome, {staffMember.staff_name}! 👋
        </h1>
        <p className="text-indigo-100 mt-1">
          {staffMember.department} · {formatDate(new Date().toISOString())}
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {cards.map((card, i) => <StatsCard key={i} {...card} />)}
      </div>

      {/* My Assets Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6">
        <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          My Assigned Assets
        </h2>
        {assetList.length === 0 ? (
          <p className="text-gray-500 text-center py-8">No assets assigned yet.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-100 dark:border-gray-800">
                  {['Asset ID', 'Name', 'Status', 'Inspection Date', 'Action'].map(h => (
                    <th key={h} className="pb-3 text-left text-xs font-medium
                                          text-gray-500 uppercase tracking-wide">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
                {assetList.map(a => (
                  <tr key={a.id}>
                    <td className="py-3 font-mono text-xs text-indigo-600">
                      {a.assets?.asset_id}
                    </td>
                    <td className="py-3 font-medium text-gray-900 dark:text-white">
                      {a.assets?.asset_name}
                    </td>
                    <td className="py-3">
                      <span className={cn(
                        'px-2 py-1 rounded-full text-xs font-medium text-white',
                        a.assets?.status === 'Assigned' ? 'bg-green-500' : 'bg-blue-500'
                      )}>
                        {a.assets?.status}
                      </span>
                    </td>
                    <td className="py-3 text-gray-600 dark:text-gray-400">
                      {formatDate(a.assets?.inspection_date ?? null)}
                    </td>
                    <td className="py-3">
                      <Link href="/staff/inspections"
                            className="text-indigo-500 hover:underline text-xs">
                        Submit Inspection
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
