'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon, CubeIcon, UsersIcon, ArrowsRightLeftIcon,
  ClipboardDocumentListIcon, BellIcon, ChartBarIcon,
  ShieldCheckIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/admin/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/admin/assets', label: 'Assets', icon: CubeIcon },
  { href: '/admin/staff', label: 'Staff Members', icon: UsersIcon },
  { href: '/admin/assignments', label: 'Assignments', icon: ArrowsRightLeftIcon },
  { href: '/admin/inspections', label: 'Inspections', icon: ClipboardDocumentListIcon },
  { href: '/admin/notifications', label: 'Notifications', icon: BellIcon },
  { href: '/admin/reports', label: 'Reports', icon: ChartBarIcon },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100
                      dark:border-gray-800 flex flex-col shadow-sm">
      {/* Logo */}
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-indigo-500 rounded-xl p-2">
            <ShieldCheckIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-gray-900 dark:text-white leading-tight">
              Virtual Staffing
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              IT Assets System
            </p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium',
                'transition-all duration-200',
                active
                  ? 'bg-indigo-50 dark:bg-indigo-950 text-indigo-600 dark:text-indigo-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              <Icon className={cn('w-5 h-5',
                active ? 'text-indigo-600 dark:text-indigo-400' : 'text-gray-400')} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-400 text-center">
          © AinodeArt 2026
        </p>
      </div>
    </aside>
  );
}
