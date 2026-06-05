import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import InspectionForm from '@/components/inspections/InspectionForm';
import { formatDate, getConditionColor } from '@/lib/utils';

export default async function StaffInspectionsPage() {
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
    .select('*, assets(id, asset_id, asset_name, status)')
    .eq('staff_id', staffMember.id)
    .eq('is_current', true);

  const { data: inspections } = await supabase
    .from('inspections')
    .select('*, assets(asset_id, asset_name)')
    .eq('staff_id', staffMember.id)
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Inspections
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Submit and view your inspection reports
        </p>
      </div>

      {/* Submit Inspection */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Submit New Inspection
        </h2>
        <InspectionForm
          assignments={assignments ?? []}
          staffId={staffMember.id}
        />
      </div>

      {/* Inspection History */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            My Inspection History
          </h2>
        </div>
        <div className="divide-y divide-gray-50 dark:divide-gray-800">
          {!inspections || inspections.length === 0 ? (
            <p className="px-6 py-12 text-center text-gray-400">
              No inspections submitted yet.
            </p>
          ) : (
            inspections.map((insp) => {
              const asset = insp.assets as
                | { asset_id: string; asset_name: string }
                | null;
              return (
                <div key={insp.id} className="p-4 flex items-center gap-4">
                  <div
                    className={`w-3 h-3 rounded-full flex-shrink-0
                                ${getConditionColor(insp.condition_status)}`}
                  />
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-gray-900 dark:text-white text-sm">
                      {asset?.asset_name ?? '—'}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {asset?.asset_id} · {formatDate(insp.inspection_date)}
                    </p>
                  </div>
                  <span
                    className={`px-2 py-1 rounded-full text-xs font-medium text-white
                               ${getConditionColor(insp.condition_status)}`}
                  >
                    {insp.condition_status}
                  </span>
                </div>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
