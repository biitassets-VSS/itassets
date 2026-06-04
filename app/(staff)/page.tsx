import { createClient } from '@/lib/supabase/server';
import Link from 'next/link';
import { formatDate } from '@/lib/utils';
import { PlusIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default async function StaffPage() {
  const supabase = await createClient();
  const { data: staff } = await supabase
    .from('staff_members')
    .select('*')
    .order('created_at', { ascending: false });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Staff Management
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {staff?.length ?? 0} total staff members
          </p>
        </div>
        <Link
          href="/admin/staff/add"
          className="inline-flex items-center gap-2 px-4 py-2.5 bg-indigo-600
                     hover:bg-indigo-500 text-white font-medium rounded-xl transition-all"
        >
          <PlusIcon className="w-4 h-4" />
          Add Staff
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {!staff || staff.length === 0 ? (
          <div className="col-span-3 text-center py-12 text-gray-400">
            No staff members yet. Add your first staff member!
          </div>
        ) : staff.map(member => (
          <div key={member.id}
               className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                          border-gray-100 dark:border-gray-800 p-5 hover:shadow-md
                          transition-all">
            <div className="flex items-start justify-between mb-3">
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center
                  ${member.is_active
                    ? 'bg-green-100 dark:bg-green-900'
                    : 'bg-gray-100 dark:bg-gray-800'}`}>
                  <UserCircleIcon className={`w-6 h-6
                    ${member.is_active ? 'text-green-600' : 'text-gray-400'}`} />
                </div>
                <div>
                  <p className="font-semibold text-gray-900 dark:text-white">
                    {member.staff_name}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    {member.department}
                  </p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium
                ${member.is_active
                  ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                  : 'bg-gray-100 text-gray-500 dark:bg-gray-800 dark:text-gray-400'}`}>
                {member.is_active ? 'Active' : 'Inactive'}
              </span>
            </div>

            <div className="space-y-1 text-sm">
              <p className="text-gray-500 dark:text-gray-400">
                📧 {member.email}
              </p>
              {member.phone_number && (
                <p className="text-gray-500 dark:text-gray-400">
                  📞 {member.phone_number}
                </p>
              )}
              <p className="text-gray-500 dark:text-gray-400">
                📅 Joined {formatDate(member.join_date)}
              </p>
            </div>

            <Link
              href={`/admin/staff/${member.id}`}
              className="mt-4 block text-center py-2 border border-indigo-200
                         dark:border-indigo-800 text-indigo-600 dark:text-indigo-400
                         rounded-xl text-sm hover:bg-indigo-50 dark:hover:bg-indigo-950
                         transition-all"
            >
              Manage
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
