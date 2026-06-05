import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { getStatusColor, formatDate, formatCurrency } from '@/lib/utils';
import { PlusIcon, MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default async function AssetsPage({
  searchParams,
}: {
  searchParams: Promise<{ status?: string; search?: string }>;
}) {
  const { status, search } = await searchParams;
  const supabase = await createClient();

  let query = supabase
    .from('assets')
    .select('*, asset_categories(name)')
    .order('created_at', { ascending: false });

  if (status) query = query.eq('status', status);
  if (search) {
    query = query.or(
      `asset_name.ilike.%${search}%,asset_id.ilike.%${search}%,serial_number.ilike.%${search}%,brand.ilike.%${search}%`
    );
  }

  const { data: assets } = await query;

  const statuses = ['In Stock', 'Assigned', 'Repaired', 'Discard', 'Lost'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Asset Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {assets?.length ?? 0} total assets
          </p>
        </div>
        <Link
          href="/admin/assets/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600
                     hover:bg-indigo-500 text-white font-medium rounded-xl
                     transition-all shadow-lg shadow-indigo-500/20"
        >
          <PlusIcon className="w-4 h-4" />
          Add Asset
        </Link>
      </div>

      {/* Filters */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-4 shadow-sm border
                      border-gray-100 dark:border-gray-800">
        <div className="flex flex-col sm:flex-row gap-3">
          {/* Search */}
          <form className="flex-1">
            <div className="relative">
              <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2
                                              w-4 h-4 text-gray-400" />
              <input
                name="search"
                defaultValue={search}
                placeholder="Search by name, ID, brand, serial..."
                className="w-full pl-9 pr-4 py-2 border border-gray-200 dark:border-gray-700
                           rounded-xl text-sm bg-gray-50 dark:bg-gray-800 text-gray-900
                           dark:text-white focus:outline-none focus:ring-2
                           focus:ring-indigo-400 transition-all"
              />
            </div>
          </form>

          {/* Status Filter */}
          <div className="flex gap-2 flex-wrap">
            <Link
              href="/admin/assets"
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                ${!status
                  ? 'bg-indigo-600 text-white'
                  : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
            >
              All
            </Link>
            {statuses.map(s => (
              <Link
                key={s}
                href={`/admin/assets?status=${s}`}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all
                  ${status === s
                    ? 'bg-indigo-600 text-white'
                    : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400'}`}
              >
                {s}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Assets Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Asset ID','Name','Category','Brand','Status',
                  'Purchase Price','Inspection Date','Action'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold
                                        text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {!assets || assets.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-4 py-12 text-center text-gray-400">
                    No assets found. Add your first asset!
                  </td>
                </tr>
              ) : assets.map(asset => (
                <tr key={asset.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3 font-mono text-xs text-indigo-600 dark:text-indigo-400 font-medium">
                    {asset.asset_id}
                  </td>
                  <td className="px-4 py-3 font-medium text-gray-900 dark:text-white">
                    {asset.asset_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {(asset.asset_categories as { name: string } | null)?.name ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {asset.brand ?? '—'}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                                     ${getStatusColor(asset.status)}`}>
                      {asset.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {asset.purchase_price
                      ? formatCurrency(asset.purchase_price)
                      : '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDate(asset.inspection_date)}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/admin/assets/${asset.id}`}
                      className="text-indigo-500 hover:text-indigo-700 text-xs
                                 font-medium hover:underline"
                    >
                      View / Edit
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
