import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { formatDate, getStatusColor } from '@/lib/utils';
import Link from 'next/link';

export default async function MyAssetsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect('/staff/login');

  const { data: staffMember } = await supabase
    .from('staff_members')
    .select('id, staff_name')
    .eq('user_id', user.id)
    .single();

  if (!staffMember) redirect('/staff/login');

  const { data: assignments } = await supabase
    .from('asset_assignments')
    .select(`
      *,
      assets(
        id, asset_id, asset_name, brand, status,
        inspection_date, warranty_date, asset_categories(name)
      )
    `)
    .eq('staff_id', staffMember.id)
    .eq('is_current', true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          My Assets
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {assignments?.length ?? 0} assets assigned to you
        </p>
      </div>

      {!assignments || assignments.length === 0 ? (
        <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                        border-gray-100 dark:border-gray-800 p-12 text-center">
          <p className="text-4xl mb-3">📦</p>
          <p className="text-gray-400">No assets assigned to you yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {assignments.map((a) => {
            const asset = a.assets as {
              id: string;
              asset_id: string;
              asset_name: string;
              brand: string | null;
              status: string;
              inspection_date: string | null;
              warranty_date: string | null;
              asset_categories: { name: string } | null;
            } | null;

            if (!asset) return null;

            return (
              <div
                key={a.id}
                className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                           border-gray-100 dark:border-gray-800 p-5"
              >
                <div className="flex items-start justify-between mb-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">
                      {asset.asset_name}
                    </p>
                    <p className="text-xs font-mono text-indigo-500 mt-0.5">
                      {asset.asset_id}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium
                               ${getStatusColor(asset.status)}`}
                  >
                    {asset.status}
                  </span>
                </div>

                <div className="space-y-1.5 text-sm text-gray-600 dark:text-gray-400">
                  <p>
                    📂{' '}
                    {asset.asset_categories?.name ?? '—'}
                  </p>
                  {asset.brand && <p>🏷️ {asset.brand}</p>}
                  <p>📅 Assigned: {formatDate(a.assignment_date)}</p>
                  <p>🔍 Inspection: {formatDate(asset.inspection_date)}</p>
                  <p>🛡️ Warranty: {formatDate(asset.warranty_date)}</p>
                </div>

                <Link
                  href="/staff/inspections"
                  className="mt-4 block text-center py-2 border border-emerald-200
                             dark:border-emerald-800 text-emerald-600 dark:text-emerald-400
                             rounded-xl text-sm hover:bg-emerald-50 dark:hover:bg-emerald-950
                             transition-all"
                >
                  Submit Inspection
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
