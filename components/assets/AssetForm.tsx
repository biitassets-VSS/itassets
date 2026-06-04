'use client';

import { useState, useRef } from 'react';
import { createClient } from '@/lib/supabase/client';
import { AssetCategory, AssetStatus } from '@/types';
import toast from 'react-hot-toast';
import QRCode from './QRCode';

interface Props {
  categories: AssetCategory[];
  onSuccess?: () => void;
  initialData?: Partial<Record<string, unknown>>;
  mode?: 'create' | 'edit';
  assetId?: string;
}

const STATUSES: AssetStatus[] = ['In Stock', 'Assigned', 'Repaired', 'Discard', 'Lost'];

export default function AssetForm({
  categories, onSuccess, initialData, mode = 'create', assetId
}: Props) {
  const supabase = createClient();
  const [loading, setLoading] = useState(false);
  const [generatedAssetId, setGeneratedAssetId] = useState<string | null>(null);
  const [form, setForm] = useState({
    category_id: (initialData?.category_id as string) ?? '',
    asset_name: (initialData?.asset_name as string) ?? '',
    brand: (initialData?.brand as string) ?? '',
    model_number: (initialData?.model_number as string) ?? '',
    serial_number: (initialData?.serial_number as string) ?? '',
    purchase_date: (initialData?.purchase_date as string) ?? '',
    purchase_price: (initialData?.purchase_price as string) ?? '',
    asset_value: (initialData?.asset_value as string) ?? '',
    warranty_date: (initialData?.warranty_date as string) ?? '',
    inspection_date: (initialData?.inspection_date as string) ?? '',
    decommission_date: (initialData?.decommission_date as string) ?? '',
    status: (initialData?.status as AssetStatus) ?? 'In Stock',
    notes: (initialData?.notes as string) ?? '',
    depreciation_rate: (initialData?.depreciation_rate as string) ?? '20',
  });

  const [photos, setPhotos] = useState<{
    thumbnail1: File | null; thumbnail2: File | null;
    vertical1: File | null; vertical2: File | null;
    vertical3: File | null; vertical4: File | null;
  }>({
    thumbnail1: null, thumbnail2: null,
    vertical1: null, vertical2: null,
    vertical3: null, vertical4: null,
  });

  const ALLOWED_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];

  function validateImage(file: File): boolean {
    if (!ALLOWED_TYPES.includes(file.type)) {
      toast.error('Only JPG, JPEG, PNG, WEBP images allowed');
      return false;
    }
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Image must be under 5MB');
      return false;
    }
    return true;
  }

  async function uploadPhoto(file: File, path: string): Promise<string | null> {
    const { data, error } = await supabase.storage
      .from('asset-photos')
      .upload(path, file, { upsert: true });
    if (error) { toast.error('Photo upload failed: ' + error.message); return null; }
    const { data: { publicUrl } } = supabase.storage
      .from('asset-photos')
      .getPublicUrl(data.path);
    return publicUrl;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const timestamp = Date.now();
      const photoUrls: Record<string, string | null> = {};

      // Upload photos
      const photoEntries = [
        ['thumbnail1', 'photo_thumbnail_1'],
        ['thumbnail2', 'photo_thumbnail_2'],
        ['vertical1', 'photo_vertical_1'],
        ['vertical2', 'photo_vertical_2'],
        ['vertical3', 'photo_vertical_3'],
        ['vertical4', 'photo_vertical_4'],
      ];

      for (const [key, field] of photoEntries) {
        const file = photos[key as keyof typeof photos];
        if (file) {
          const path = `assets/${timestamp}/${field}_${file.name}`;
          photoUrls[field] = await uploadPhoto(file, path);
        }
      }

      const payload = {
        ...form,
        purchase_price: form.purchase_price ? parseFloat(form.purchase_price) : null,
        asset_value: form.asset_value ? parseFloat(form.asset_value) : null,
        depreciation_rate: parseFloat(form.depreciation_rate),
        ...photoUrls,
      };

      let result;
      if (mode === 'create') {
        result = await fetch('/api/assets', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      } else {
        result = await fetch(`/api/assets/${assetId}`, {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(payload),
        });
      }

      const json = await result.json();
      if (!result.ok) throw new Error(json.error);

      if (mode === 'create') setGeneratedAssetId(json.data.asset_id);
      toast.success(`Asset ${mode === 'create' ? 'created' : 'updated'} successfully!`);
      onSuccess?.();
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Something went wrong');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full px-3 py-2 border border-gray-200 dark:border-gray-700
    rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-400 focus:border-transparent
    transition-all`;

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div>
          <label className="block text-xs font-medium text-gray-600
                            dark:text-gray-400 mb-1">
            Category *
          </label>
          <select
            value={form.category_id}
            onChange={e => setForm(f => ({ ...f, category_id: e.target.value }))}
            required
            className={inputClass}
          >
            <option value="">Select Category</option>
            {categories.map(c => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600
                            dark:text-gray-400 mb-1">
            Asset Name *
          </label>
          <input
            type="text"
            value={form.asset_name}
            onChange={e => setForm(f => ({ ...f, asset_name: e.target.value }))}
            required
            placeholder="e.g. Dell Laptop Pro"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600
                            dark:text-gray-400 mb-1">Status</label>
          <select
            value={form.status}
            onChange={e => setForm(f => ({ ...f, status: e.target.value as AssetStatus }))}
            className={inputClass}
          >
            {STATUSES.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
        </div>

        {[
          { label: 'Brand', key: 'brand', type: 'text', placeholder: 'e.g. Dell' },
          { label: 'Model Number', key: 'model_number', type: 'text', placeholder: 'e.g. XPS-15' },
          { label: 'Serial Number', key: 'serial_number', type: 'text', placeholder: 'e.g. SN12345' },
          { label: 'Purchase Date', key: 'purchase_date', type: 'date', placeholder: '' },
          { label: 'Purchase Price (INR)', key: 'purchase_price', type: 'number', placeholder: '0.00' },
          { label: 'Asset Value (INR)', key: 'asset_value', type: 'number', placeholder: '0.00' },
          { label: 'Warranty Date', key: 'warranty_date', type: 'date', placeholder: '' },
          { label: 'Inspection Date', key: 'inspection_date', type: 'date', placeholder: '' },
          { label: 'Decommission Date', key: 'decommission_date', type: 'date', placeholder: '' },
          { label: 'Depreciation Rate (%)', key: 'depreciation_rate', type: 'number', placeholder: '20' },
        ].map(({ label, key, type, placeholder }) => (
          <div key={key}>
            <label className="block text-xs font-medium text-gray-600
                              dark:text-gray-400 mb-1">{label}</label>
            <input
              type={type}
              value={form[key as keyof typeof form]}
              onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
              placeholder={placeholder}
              step={type === 'number' ? '0.01' : undefined}
              className={inputClass}
            />
          </div>
        ))}
      </div>

      {/* Notes */}
      <div>
        <label className="block text-xs font-medium text-gray-600
                          dark:text-gray-400 mb-1">
          Notes / Condition Details
        </label>
        <textarea
          value={form.notes}
          onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
          rows={3}
          placeholder="Enter any notes or condition details..."
          className={`${inputClass} resize-none`}
        />
      </div>

      {/* Photo Upload */}
      <div>
        <h3 className="text-sm font-semibold text-gray-900 dark:text-white mb-3">
          📸 Photo Upload
        </h3>

        <p className="text-xs text-gray-500 mb-3">
          Top Section: 2 Thumbnail Images (4×4) · Bottom: 4 Vertical Images (2×4)
        </p>

        {/* Thumbnails */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {['thumbnail1', 'thumbnail2'].map((key, i) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600
                                dark:text-gray-400 mb-1">
                Thumbnail {i + 1}
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file && validateImage(file)) {
                    setPhotos(p => ({ ...p, [key]: file }));
                  }
                }}
                className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3
                           file:rounded-lg file:border-0 file:text-xs file:font-medium
                           file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100
                           cursor-pointer"
              />
            </div>
          ))}
        </div>

        {/* Verticals */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['vertical1', 'vertical2', 'vertical3', 'vertical4'].map((key, i) => (
            <div key={key}>
              <label className="block text-xs font-medium text-gray-600
                                dark:text-gray-400 mb-1">
                Photo {i + 1}
              </label>
              <input
                type="file"
                accept=".jpg,.jpeg,.png,.webp"
                onChange={e => {
                  const file = e.target.files?.[0];
                  if (file && validateImage(file)) {
                    setPhotos(p => ({ ...p, [key]: file }));
                  }
                }}
                className="w-full text-xs text-gray-500 file:mr-3 file:py-1.5 file:px-3
                           file:rounded-lg file:border-0 file:text-xs file:font-medium
                           file:bg-indigo-50 file:text-indigo-700 hover:file:bg-indigo-100
                           cursor-pointer"
              />
            </div>
          ))}
        </div>
      </div>

      {/* QR Code Preview */}
      {generatedAssetId && (
        <div className="border border-indigo-200 dark:border-indigo-800 rounded-xl p-4">
          <h3 className="text-sm font-semibold mb-3 text-gray-900 dark:text-white">
            🔲 Generated QR Code
          </h3>
          <QRCode assetId={generatedAssetId} assetName={form.asset_name} />
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="w-full py-3 bg-indigo-600 hover:bg-indigo-500 disabled:bg-indigo-300
                   text-white font-semibold rounded-xl transition-all shadow-lg"
      >
        {loading ? 'Saving...' : mode === 'create' ? 'Create Asset' : 'Update Asset'}
      </button>
    </form>
  );
}
