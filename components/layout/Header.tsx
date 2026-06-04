'use client';

import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import { Profile } from '@/types';
import ThemeToggle from './ThemeToggle';
import NotificationBell from '@/components/notifications/NotificationBell';
import { ArrowRightOnRectangleIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import toast from 'react-hot-toast';

export default function Header({ profile }: { profile: Profile }) {
  const router = useRouter();
  const supabase = createClient();

  async function handleLogout() {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    router.push('/admin/login');
    router.refresh();
  }

  return (
    <header className="h-16 bg-white dark:bg-gray-900 border-b border-gray-100
                       dark:border-gray-800 flex items-center justify-between px-6">
      <h2 className="font-semibold text-gray-700 dark:text-gray-200 hidden sm:block">
        IT Assets Management System
      </h2>

      <div className="flex items-center gap-3 ml-auto">
        <ThemeToggle />
        <NotificationBell userId={profile.id} />

        <div className="flex items-center gap-2 pl-3 border-l border-gray-200
                        dark:border-gray-700">
          <UserCircleIcon className="w-8 h-8 text-indigo-500" />
          <div className="hidden sm:block">
            <p className="text-sm font-medium text-gray-900 dark:text-white leading-tight">
              {profile.full_name ?? profile.email}
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">
              {profile.role}
            </p>
          </div>
        </div>

        <button
          onClick={handleLogout}
          className="p-2 text-gray-400 hover:text-red-500 transition-colors"
          title="Logout"
        >
          <ArrowRightOnRectangleIcon className="w-5 h-5" />
        </button>
      </div>
    </header>
  );
}
