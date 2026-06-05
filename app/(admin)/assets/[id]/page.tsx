import { createClient } from '@/lib/supabase/server';
import { notFound } from 'next/navigation';
import AssetForm from '@/components/assets/AssetForm';
import QRCodeDisplay from '@/components/assets/QRCode';
import {
  formatCurrency,
  formatDate,
  getStatusColor,
  calculateDepreciation,
} from '@/lib/utils';
import Image from 'next/image';

export default async function AssetDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const supabase = await createClient();

  const { data: asset } = await supabase
    .from('assets')
    .select('*, asset_categories(name)')
    .eq('id', id)
    .single();

  if (!asset) notFound();

  const { data: categories } = await supabase
    .from('asset_categories')
    .select('*')
    .order('name');

  const { data: history } = await supabase
    .from('asset_history')
    .select('*')
    .eq('asset_id', id)
    .order('created_at', { ascending: false });

  const depreciation =
    asset.purchase_price && asset.purchase_date
      ? calculateDepreciation(
          asset.purchase_price,
          asset.purchase_date,
          asset.depreciation_rate ?? 20
        )
      : null;

  const photos = [
    asset.photo_thumbnail_1,
    asset.photo_thumbnail_2,
    asset.photo_vertical_1,
    asset.photo_vertical_2,
    asset.photo_vertical_3,
    asset.photo_vertical_4,
  ].filter((p): p is string => Boolean(p));

  const categoryName =
    (asset.asset_categories as { name: string } | null)?.name ?? '—';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {asset.asset_name}
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1 font-mono text-sm">
            {asset.asset_id}
          </p>
        </div>
        <span
          className={`px-3 py-1.5 rounded-full text-sm font-medium
                     ${getStatusColor(asset.status)}`}
        >
          {asset.status}
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Main */}
        <div className="lg:col-span-2 space-y-6">
          {/* Info Card */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                          border-gray-100 dark:border-gray-800 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
              Asset Information
            </h2>
            <div className="grid grid-cols-2 gap-4 text-sm">
              {[
                ['Category', categoryName],
                ['Brand', asset.brand ?? '—'],
                ['Model', asset.model_number ?? '—'],
                ['Serial No.', asset.serial_number ?? '—'],
                ['Purchase Date', formatDate(asset.purchase_date)],
                [
                  'Purchase Price',
                  asset.purchase_price
                    ? formatCurrency(asset.purchase_price)
                    : '—',
                ],
                [
                  'Asset Value',
                  asset.asset_value
                    ? formatCurrency(asset.asset_value)
                    : '—',
                ],
                ['Warranty Date', formatDate(asset.warranty_date)],
                ['Inspection Date', formatDate(asset.inspection_date)],
                ['Decommission Date', formatDate(asset.decommission_date)],
              ].map(([label, value]) => (
                <div key={label}>
                  <p className="text-gray-500 dark:text-gray-400 text-xs">
                    {label}
                  </p>
                  <p className="font-medium text-gray-900 dark:text-white mt-0.5">
                    {value}
                  </p>
                </div>
              ))}
            </div>
            {asset.notes && (
              <div className="mt-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                <p className="text-xs text-gray-500 dark:text-gray-400">Notes</p>
                <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">
                  {asset.notes}
                </p>
              </div>
            )}
          </div>

          {/* Depreciation */}
          {depreciation && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                            border-gray-100 dark:border-gray-800 p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                📉 Depreciation Analysis
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
                {[
                  [
                    'Original Value',
                    formatCurrency(depreciation.originalValue),
                    'text-gray-600 dark:text-gray-400',
                  ],
                  [
                    'Current Value',
                    formatCurrency(depreciation.currentValue),
                    'text-green-600',
                  ],
                  [
                    'Depreciated',
                    formatCurrency(depreciation.depreciatedAmount),
                    'text-red-500',
                  ],
                  [
                    'Years Owned',
                    `${depreciation.yearsOwned} yrs`,
                    'text-blue-600',
                  ],
                ].map(([label, value, color]) => (
                  <div
                    key={label}
                    className="bg-gray-50 dark:bg-gray-800 rounded-xl p-3"
                  >
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      {label}
                    </p>
                    <p className={`font-bold text-sm mt-1 ${color}`}>{value}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Edit Form */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                          border-gray-100 dark:border-gray-800 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
              ✏️ Edit Asset
            </h2>
            <AssetForm
              categories={categories ?? []}
              mode="edit"
              assetId={id}
              initialData={asset}
            />
          </div>

          {/* History */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                          border-gray-100 dark:border-gray-800 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
              📋 Asset History
            </h2>
            {!history || history.length === 0 ? (
              <p className="text-gray-400 text-sm">No history records yet.</p>
            ) : (
              <div className="space-y-3">
                {history.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-start gap-3 p-3 bg-gray-50
                               dark:bg-gray-800 rounded-xl"
                  >
                    <div className="w-2 h-2 rounded-full bg-indigo-500 mt-1.5 flex-shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-gray-900 dark:text-white">
                        {h.action}
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        {formatDate(h.created_at)}
                        {h.notes ? ` · ${h.notes}` : ''}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        {/* Right Column */}
        <div className="space-y-6">
          {/* QR Code */}
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                          border-gray-100 dark:border-gray-800 p-6">
            <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
              🔲 QR Code
            </h2>
            <QRCodeDisplay
              assetId={asset.asset_id}
              assetName={asset.asset_name}
            />
          </div>

          {/* Photos */}
          {photos.length > 0 && (
            <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                            border-gray-100 dark:border-gray-800 p-6">
              <h2 className="font-semibold text-gray-900 dark:text-white mb-4">
                📸 Photos
              </h2>
              <div className="grid grid-cols-2 gap-2">
                {photos.map((url, i) => (
                  <div
                    key={i}
                    className="relative aspect-square rounded-xl overflow-hidden
                               bg-gray-100 dark:bg-gray-800"
                  >
                    <Image
                      src={url}
                      alt={`Asset photo ${i + 1}`}
                      fill
                      className="object-cover"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
