'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AssetAssignment, ConditionStatus } from '@/types';
import toast from 'react-hot-toast';

interface Props {
  assignments: AssetAssignment[];
  staffId: string;
  onSuccess?: () => void;
}

const CONDITIONS: ConditionStatus[] = ['Good', 'Pending', 'Issue Found', 'Damaged'];

const CONDITION_COLORS: Record<ConditionStatus, string> = {
  'Good': 'border-green-400 bg-green-50 dark:bg-green-950',
  'Pending': 'border-orange-400 bg-orange-50 dark:bg-orange-950',
  'Issue Found': 'border-red-400 bg-red-50 dark:bg-red-950',
  'Damaged': 'border-red-700 bg-red-100 dark:bg-red-950',
};

export default function InspectionForm({ assignments, staffId, onSuccess }: Props) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  const [form, setForm] = useState({
    asset_id: '',
    inspection_date: new Date().toISOString().split('T')[0],
    condition_status: 'Good' as ConditionStatus,
    notes: '',
    comments: '',
  });

  const [photos, setPhotos] = useState<(File | null)[]>([null, null, null]);

  function validateImage(file: File): boolean {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Only JPG, JPEG, PNG, WEBP allowed');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return false;
    }
    return true;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.asset_id) { toast.error('Please select an asset'); return; }
    setLoading(true);

    try {
      const timestamp = Date.now();
      const photoUrls: (string | null)[] = [];

      for (let i = 0; i < 3; i++) {
        const file = photos[i];
        if (file) {
          const path = `inspections/${timestamp}/photo_${i + 1}_${file.name}`;
          const { data, error } = await supabase.storage
            .from('inspection-photos')
            .upload(path, file, { upsert: true });
          if (!error) {
            const { data: { publicUrl } } = supabase.storage
              .from('inspection-photos')
              .getPublicUrl(data.path);
            photoUrls.push(publicUrl);
          } else {
            photoUrls.push(null);
          }
        } else {
          photoUrls.push(null);
        }
      }

      const { data: { user } } = await supabase.auth.getUser();

      const { error } = await supabase.from('inspections').insert({
        ...form,
        staff_id: staffId,
        photo_1: photoUrls[0],
        photo_2: photoUrls[1],
        photo_3: photoUrls[2],
        submitted_by: user?.id,
      });

      if (error) throw error;

      toast.success('Inspection submitted successfully!');
      onSuccess?.();
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Submission failed');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full px-3 py-2 border border-gray-200 dark:border-gray-700
    rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all`;

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Asset Selection */}
      <div>
        <label className="block text-xs font-medium text-gray-600
                          dark:text-gray-400 mb-1">Asset *</label>
        <select
          value={form.asset_id}
          onChange={e => setForm(f => ({ ...f, asset_id: e.target.value }))}
          required
          className={inputClass}
        >
          <option value="">Select Asset</option>
          {assignments.map(a => (
            <option key={a.id} value={a.asset_id}>
              {a.assets?.asset_name} ({a.assets?.asset_id})
            </option>
          ))}
        </select>
      </div>

      {/* Inspection Date */}
      <div>
        <label className="block text-xs font-medium text-gray-600
                          dark:text-gray-400 mb-1">Inspection Date *</label>
        <input
          type="date"
          value={form.inspection_date}
          onChange={e => setForm(f => ({ ...f, inspection_date: e.target.value }))}
          required
          className={inputClass}
        />
      </div>

      {/* Condition Status */}
      <div>
        <label className="block text-xs font-medium text-gray-600
                          dark:text-gray-400 mb-2">Condition Status *</label>
        <div className="grid grid-cols-2 gap-3">
          {CONDITIONS.map(c => (
            <button
              key={c}
              type="button"
              onClick={() => setForm(f => ({ ...f, condition_status: c }))}
              className={`p-3 rounded-xl border-2 text-sm font-medium transition-all
                ${form.condition_status === c
