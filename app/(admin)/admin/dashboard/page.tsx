import { createClient } from '@/lib/supabase/server';
import StatsCard from '@/components/dashboard/StatsCard';
import AssetsByCategory from '@/components/dashboard/AssetsByCategory';
import AssetsByStatus from '@/components/dashboard/AssetsByStatus';
import MonthlyAssignment from '@/components/dashboard/MonthlyAssignment';
import InspectionOverview from '@/components/dashboard/InspectionOverview';
import {
  ComputerDesktopIcon, CubeIcon, ArchiveBoxIcon,
  WrenchIcon, TrashIcon, UsersIcon, UserCheckIcon,
  UserMinusIcon, CurrencyRupeeIcon,
} from '@heroicons/react/24/outline';
import { formatCurrency } from '@/lib/utils';

export default async function AdminDashboard() {
  const supabase = await createClient();

  // Fetch all stats in parallel
  const [
    { count: totalAssets },
    { count: assignedAssets },
    { count: inStockAssets },
    { count: repairedAssets },
    { count: discardAssets },
    { count: totalStaff },
    { count: activeStaff },
    { count: inactiveStaff },
    { data: assetValueData },
    { data: categoryData },
    { data: statusData },
    { data: monthlyData },
    { data: inspectionData },
  ] = await Promise.all([
    supabase.from('assets').select('*', { count: 'exact', head: true }),
    supabase.from('assets').select('*', { count: 'exact', head: true })
      .eq('status', 'Assigned'),
    supabase.from('assets').select('*', { count: 'exact', head: true })
      .eq('status', 'In Stock'),
    supabase.from('assets').select('*', { count: 'exact', head: true })
      .eq('status', 'Repaired'),
    supabase.from('assets').select('*', { count: 'exact', head: true })
      .eq('status', 'Discard'),
    supabase.from('staff_members').select('*', { count: 'exact', head: true }),
    supabase.from('staff_members').select('*', { count: 'exact', head: true })
      .eq('is_active', true),
    supabase.from('staff_members').select('*', { count: 'exact', head: true })
      .eq('is_active', false),
    supabase.from('assets').select('asset_value'),
    supabase.from('assets').select('status, asset_categories(name)')
      .not('category_id', 'is', null),
    supabase.from('assets').select('status'),
    supabase.from('asset_assignments').select('assignment_date')
      .order('assignment_date', { ascending: false }).limit(100),
    supabase.from('inspections').select('condition_status, inspection_date'),
  ]);

  const totalAssetValue = (assetValueData ?? []).reduce(
    (sum, a) => sum + (a.asset_value ?? 0), 0
  );

  const cards = [
    { title: 'Total Assets', value: totalAssets ?? 0,
      icon: CubeIcon, color: 'from-indigo-500 to-indigo-600', delay: 0 },
    { title: 'Assigned Assets', value: assignedAssets ?? 0,
      icon: ComputerDesktopIcon, color: 'from-green-500 to-green-600', delay: 1 },
    { title: 'In Stock', value: inStockAssets ?? 0,
      icon: ArchiveBoxIcon, color: 'from-blue-500 to-blue-600', delay: 2 },
    { title: 'Repaired', value: repairedAssets ?? 0,
      icon: WrenchIcon, color: 'from-yellow-500 to-yellow-600', delay: 3 },
    { title: 'Discarded', value: discardAssets ?? 0,
      icon: TrashIcon, color: 'from-red-500 to-red-600', delay: 4 },
    { title: 'Total Staff', value: totalStaff ?? 0,
      icon: UsersIcon, color: 'from-purple-500 to-purple-600', delay: 5 },
    { title: 'Active Staff', value: activeStaff ?? 0,
      icon: UserCheckIcon, color: 'from-teal-500 to-teal-600', delay: 6 },
    { title: 'Inactive Staff', value: inactiveStaff ?? 0,
      icon: UserMinusIcon, color: 'from-gray-500 to-gray-600', delay: 7 },
    { title: 'Total Asset Value',
      value: formatCurrency(totalAssetValue),
      icon: CurrencyRupeeIcon, color: 'from-pink-500 to-pink-600', delay: 8 },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Virtual Staffing Solution – IT Assets Overview
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {cards.map((card, i) => (
          <StatsCard key={i} {...card} />
        ))}
      </div>

      {/* Charts Row 1 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <AssetsByCategory data={categoryData ?? []} />
        <AssetsByStatus data={statusData ?? []} />
      </div>

      {/* Charts Row 2 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <MonthlyAssignment data={monthlyData ?? []} />
        <InspectionOverview data={inspectionData ?? []} />
      </div>
    </div>
  );
}
