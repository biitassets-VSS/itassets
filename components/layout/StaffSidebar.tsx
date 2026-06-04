'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon, CubeIcon, ClipboardDocumentListIcon, UserCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/staff/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/staff/my-assets', label: 'My Assets', icon: CubeIcon },
  { href: '/staff/inspections', label: 'Inspections', icon: ClipboardDocumentListIcon },
];

export default function StaffSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100
                      dark:border-gray-800 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 rounded-xl p-2">
            <UserCircleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-gray-900 dark:text-white">
              Staff Portal
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              IT Assets System
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              <Icon className={cn('w-5 h-5',
                active ? 'text-emerald-600' : 'text-gray-400')} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-400 text-center">© AinodeArt 2026</p>
      </div>
    </aside>
  );
}

'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  HomeIcon, CubeIcon, ClipboardDocumentListIcon, UserCircleIcon,
} from '@heroicons/react/24/outline';
import { cn } from '@/lib/utils';

const navItems = [
  { href: '/staff/dashboard', label: 'Dashboard', icon: HomeIcon },
  { href: '/staff/my-assets', label: 'My Assets', icon: CubeIcon },
  { href: '/staff/inspections', label: 'Inspections', icon: ClipboardDocumentListIcon },
];

export default function StaffSidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-white dark:bg-gray-900 border-r border-gray-100
                      dark:border-gray-800 flex flex-col shadow-sm">
      <div className="p-6 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="bg-emerald-500 rounded-xl p-2">
            <UserCircleIcon className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="font-bold text-sm text-gray-900 dark:text-white">
              Staff Portal
            </h1>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              IT Assets System
            </p>
          </div>
        </div>
      </div>

      <nav className="flex-1 p-4 space-y-1">
        {navItems.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link key={href} href={href}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all',
                active
                  ? 'bg-emerald-50 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400'
                  : 'text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800'
              )}
            >
              <Icon className={cn('w-5 h-5',
                active ? 'text-emerald-600' : 'text-gray-400')} />
              {label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-gray-100 dark:border-gray-800">
        <p className="text-xs text-gray-400 text-center">© AinodeArt 2026</p>
      </div>
    </aside>
  );
}
