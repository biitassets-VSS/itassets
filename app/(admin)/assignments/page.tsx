import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';
import QuickAssignForm from '@/components/assignments/AssignmentForm';

export default async function AssignmentsPage() {
  const supabase = await createClient();

  const { data: assignments } = await supabase
    .from('asset_assignments')
    .select(`
      *,
      assets(asset_id, asset_name, status),
      staff_members(staff_name, department)
    `)
    .order('created_at', { ascending: false });

  const { data: assets } = await supabase
    .from('assets')
    .select('id, asset_id, asset_name')
    .eq('status', 'In Stock');

  const { data: staff } = await supabase
    .from('staff_members')
    .select('id, staff_name, department')
    .eq('is_active', true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Asset Assignments
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage asset assignments, transfers and returns
        </p>
      </div>

      {/* Quick Assign Form - Client Component */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Quick Assign Asset
        </h2>
        <QuickAssignForm assets={assets ?? []} staff={staff ?? []} />
      </div>

      {/* Assignments Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Assignment History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {[
                  'Asset', 'Staff Member', 'Department',
                  'Assigned Date', 'Return Date', 'Status',
                ].map((h) => (
                  <th
                    key={h}
                    className="px-4 py-3 text-left text-xs font-semibold
                               text-gray-500 uppercase tracking-wide"
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {!assignments || assignments.length === 0 ? (
                <tr>
                  <td
                    colSpan={6}
                    className="px-4 py-12 text-center text-gray-400"
                  >
                    No assignments yet.
                  </td>
                </tr>
              ) : (
                assignments.map((a) => {
                  const asset = a.assets as
                    | { asset_id: string; asset_name: string }
                    | null;
                  const member = a.staff_members as
                    | { staff_name: string; department: string }
                    | null;
                  return (
                    <tr
                      key={a.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-800/50
                                 transition-colors"
                    >
                      <td className="px-4 py-3">
                        <p className="font-medium text-gray-900 dark:text-white">
                          {asset?.asset_name ?? '—'}
                        </p>
                        <p className="text-xs text-indigo-500 font-mono">
                          {asset?.asset_id ?? '—'}
                        </p>
                      </td>
                      <td className="px-4 py-3 text-gray-900 dark:text-white">
                        {member?.staff_name ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {member?.department ?? '—'}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(a.assignment_date)}
                      </td>
                      <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                        {formatDate(a.return_date)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium
                            ${
                              a.is_current
                                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                                : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'
                            }`}
                        >
                          {a.is_current ? 'Active' : 'Returned'}
                        </span>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

export default async function AssignmentsPage() {
  const supabase = await createClient();

  const { data: assignments } = await supabase
    .from('asset_assignments')
    .select(`
      *,
      assets(asset_id, asset_name, status),
      staff_members(staff_name, department)
    `)
    .order('created_at', { ascending: false });

  const { data: assets } = await supabase
    .from('assets')
    .select('id, asset_id, asset_name')
    .eq('status', 'In Stock');

  const { data: staff } = await supabase
    .from('staff_members')
    .select('id, staff_name, department')
    .eq('is_active', true);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Asset Assignments
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Manage asset assignments, transfers and returns
        </p>
      </div>

      {/* Quick Assign Form */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6">
        <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
          Quick Assign Asset
        </h2>
        <QuickAssignForm assets={assets ?? []} staff={staff ?? []} />
      </div>

      {/* Assignments Table */}
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 overflow-hidden">
        <div className="p-6 border-b border-gray-100 dark:border-gray-800">
          <h2 className="font-semibold text-gray-900 dark:text-white">
            Assignment History
          </h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 dark:bg-gray-800">
              <tr>
                {['Asset', 'Staff Member', 'Department',
                  'Assigned Date', 'Return Date', 'Status'].map(h => (
                  <th key={h} className="px-4 py-3 text-left text-xs font-semibold
                                        text-gray-500 uppercase tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50 dark:divide-gray-800">
              {!assignments || assignments.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-4 py-12 text-center text-gray-400">
                    No assignments yet.
                  </td>
                </tr>
              ) : assignments.map(a => (
                <tr key={a.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                  <td className="px-4 py-3">
                    <p className="font-medium text-gray-900 dark:text-white">
                      {(a.assets as { asset_name: string } | null)?.asset_name}
                    </p>
                    <p className="text-xs text-indigo-500 font-mono">
                      {(a.assets as { asset_id: string } | null)?.asset_id}
                    </p>
                  </td>
                  <td className="px-4 py-3 text-gray-900 dark:text-white">
                    {(a.staff_members as { staff_name: string } | null)?.staff_name}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {(a.staff_members as { department: string } | null)?.department}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(a.assignment_date)}
                  </td>
                  <td className="px-4 py-3 text-gray-500 dark:text-gray-400">
                    {formatDate(a.return_date)}
                  </td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs font-medium
                      ${a.is_current
                        ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                        : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                      {a.is_current ? 'Active' : 'Returned'}
                    </span>
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

// Quick Assign Client Component
'use client';
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';

function QuickAssignForm({
  assets,
  staff,
}: {
  assets: { id: string; asset_id: string; asset_name: string }[];
  staff: { id: string; staff_name: string; department: string }[];
}) {
  const router = useRouter();
  const [form, setForm] = useState({
    asset_id: '',
    staff_id: '',
    assignment_date: new Date().toISOString().split('T')[0],
    remarks: '',
  });
  const [loading, setLoading] = useState(false);

  async function handleAssign(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await fetch('/api/assignments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error);
      toast.success('Asset assigned successfully!');
      router.refresh();
      setForm(f => ({ ...f, asset_id: '', staff_id: '', remarks: '' }));
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Assignment failed');
    } finally {
      setLoading(false);
    }
  }

  const selectClass = `w-full px-3 py-2 border border-gray-200 dark:border-gray-700
    rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all`;

  return (
    <form onSubmit={handleAssign}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      <select value={form.asset_id}
              onChange={e => setForm(f => ({ ...f, asset_id: e.target.value }))}
              required className={selectClass}>
        <option value="">Select Asset (In Stock)</option>
        {assets.map(a => (
          <option key={a.id} value={a.id}>
            {a.asset_name} ({a.asset_id})
          </option>
        ))}
      </select>

      <select value={form.staff_id}
              onChange={e => setForm(f => ({ ...f, staff_id: e.target.value }))}
              required className={selectClass}>
        <option value="">Select Staff Member</option>
        {staff.map(s => (
          <option key={s.id} value={s.id}>
            {s.staff_name} – {s.department}
          </option>
        ))}
      </select>

      <input type="date" value={form.assignment_date}
             onChange={e => setForm(f => ({ ...f, assignment_date: e.target.value }))}
             required className={selectClass} />

      <input type="text" value={form.remarks} placeholder="Remarks (optional)"
             onChange={e => setForm(f => ({ ...f, remarks: e.target.value }))}
             className={selectClass} />

      <button type="submit" disabled={loading}
              className="py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300
                         text-white font-medium rounded-xl transition-all">
        {loading ? 'Assigning...' : 'Assign Asset'}
      </button>
    </form>
  );
}
