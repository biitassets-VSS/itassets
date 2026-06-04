import { createClient } from '@/lib/supabase/server';
import AssetForm from '@/components/assets/AssetForm';

export default async function AddAssetPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('asset_categories')
    .select('*')
    .order('name');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Asset
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Fill in the asset details below
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6">
        <AssetForm categories={categories ?? []} />
      </div>
    </div>
  );
}

import { createClient } from '@/lib/supabase/server';
import AssetForm from '@/components/assets/AssetForm';

export default async function AddAssetPage() {
  const supabase = await createClient();
  const { data: categories } = await supabase
    .from('asset_categories')
    .select('*')
    .order('name');

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add New Asset
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Fill in the asset details below
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6">
        <AssetForm categories={categories ?? []} />
      </div>
    </div>
  );
}
