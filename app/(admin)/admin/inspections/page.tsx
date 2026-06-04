import { createClient } from '@/lib/supabase/server';
import { formatDate, getConditionColor } from '@/lib/utils';

export default async function InspectionsPage() {
  const supabase = await createClient();

  const { data: inspections } = await supabase
    .from('inspections')
    .select(`
      *,
      assets(asset_id, asset_name),
      staff_members(staff_name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Inspections
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          All asset inspection records
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Asset','Staff','Date','Condition','Notes','Photos'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold
                                        text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {!inspections || inspections.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No inspections recorded yet.
                  </td>
                </tr>
              ) : inspections.map(insp => (
                <tr key={insp.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(insp.assets as { asset_name: string } | null)?.asset_name}
                    </p>
                    <p className="text-xs text-indigo-500 font-mono">
                      {(insp.assets as { asset_id: string } | null)?.asset_id}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {(insp.staff_members as { staff_name: string } | null)?.staff_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDate(insp.inspection_date)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1
                                     rounded-full text-xs font-medium text-white
                                     ${getConditionColor(insp.condition_status)}`}>
                      {insp.condition_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {insp.notes ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {[insp.photo_1, insp.photo_2, insp.photo_3]
                      .filter(Boolean).length} photo(s)
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

import { createClient } from '@/lib/supabase/server';
import { formatDate, getConditionColor } from '@/lib/utils';

export default async function InspectionsPage() {
  const supabase = await createClient();

  const { data: inspections } = await supabase
    .from('inspections')
    .select(`
      *,
      assets(asset_id, asset_name),
      staff_members(staff_name)
    `)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Inspections
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          All asset inspection records
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Asset','Staff','Date','Condition','Notes','Photos'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold
                                        text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {!inspections || inspections.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No inspections recorded yet.
                  </td>
                </tr>
              ) : inspections.map(insp => (
                <tr key={insp.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(insp.assets as { asset_name: string } | null)?.asset_name}
                    </p>
                    <p className="text-xs text-indigo-500 font-mono">
                      {(insp.assets as { asset_id: string } | null)?.asset_id}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {(insp.staff_members as { staff_name: string } | null)?.staff_name}
                  </td>
                  <td className="px-4 py-3 text-gray-600 dark:text-gray-400">
                    {formatDate(insp.inspection_date)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1
                                     rounded-full text-xs font-medium text-white
                                     ${getConditionColor(insp.condition_status)}`}>
                      {insp.condition_status}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400 max-w-xs truncate">
                    {insp.notes ?? '—'}
                  </td>
                  <td className="px-4 py-3 text-gray-500">
                    {[insp.photo_1, insp.photo_2, insp.photo_3]
                      .filter(Boolean).length} photo(s)
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
