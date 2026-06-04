'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

interface Asset {
  id: string;
  asset_id: string;
  asset_name: string;
}

interface Staff {
  id: string;
  staff_name: string;
  department: string;
}

interface Props {
  assets: Asset[];
  staff: Staff[];
}

export default function QuickAssignForm({ assets, staff }: Props) {
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
      setForm((f) => ({ ...f, asset_id: '', staff_id: '', remarks: '' }));
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
    <form
      onSubmit={handleAssign}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4"
    >
      <select
        value={form.asset_id}
        onChange={(e) => setForm((f) => ({ ...f, asset_id: e.target.value }))}
        required
        className={selectClass}
      >
        <option value="">Select Asset (In Stock)</option>
        {assets.map((a) => (
          <option key={a.id} value={a.id}>
            {a.asset_name} ({a.asset_id})
          </option>
        ))}
      </select>

      <select
        value={form.staff_id}
        onChange={(e) => setForm((f) => ({ ...f, staff_id: e.target.value }))}
        required
        className={selectClass}
      >
        <option value="">Select Staff Member</option>
        {staff.map((s) => (
          <option key={s.id} value={s.id}>
            {s.staff_name} – {s.department}
          </option>
        ))}
      </select>

      <input
        type="date"
        value={form.assignment_date}
        onChange={(e) =>
          setForm((f) => ({ ...f, assignment_date: e.target.value }))
        }
        required
        className={selectClass}
      />

      <input
        type="text"
        value={form.remarks}
        placeholder="Remarks (optional)"
        onChange={(e) => setForm((f) => ({ ...f, remarks: e.target.value }))}
        className={selectClass}
      />

      <button
        type="submit"
        disabled={loading}
        className="py-2 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300
                   text-white font-medium rounded-xl transition-all"
      >
        {loading ? 'Assigning...' : 'Assign Asset'}
      </button>
    </form>
  );
}
