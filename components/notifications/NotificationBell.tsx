'use client';

import { useState, useEffect } from 'react';
import { BellIcon } from '@heroicons/react/24/outline';
import { createClient } from '@/lib/supabase/client';
import { Notification } from '@/types';
import { cn } from '@/lib/utils';

export default function NotificationBell({ userId }: { userId: string }) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [open, setOpen] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    fetchNotifications();

    // Realtime subscription
    const channel = supabase
      .channel('notifications')
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'notifications',
        filter: `user_id=eq.${userId}`,
      }, (payload) => {
        setNotifications(prev => [payload.new as Notification, ...prev]);
      })
      .subscribe();

    return () => { supabase.removeChannel(channel); };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  async function fetchNotifications() {
    const { data } = await supabase
      .from('notifications')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(10);
    setNotifications(data ?? []);
  }

  async function markAllRead() {
    await supabase
      .from('notifications')
      .update({ is_read: true })
      .eq('user_id', userId);
    setNotifications(prev => prev.map(n => ({ ...n, is_read: true })));
  }

  const unreadCount = notifications.filter(n => !n.is_read).length;

  const typeColor: Record<string, string> = {
    inspection_reminder: 'border-l-orange-400',
    warranty_alert: 'border-l-yellow-400',
    info: 'border-l-blue-400',
    warning: 'border-l-red-400',
    success: 'border-l-green-400',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!open)}
        className="relative p-2 rounded-xl text-gray-500 hover:text-indigo-500
                   hover:bg-gray-100 dark:hover:bg-gray-800 transition-all"
      >
        <BellIcon className="w-5 h-5" />
        {unreadCount > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs
                           rounded-full w-4 h-4 flex items-center justify-center font-bold">
            {unreadCount > 9 ? '9+' : unreadCount}
          </span>
        )}
      </button>

      {open && (
        <>
          <div className="fixed inset-0 z-30" onClick={() => setOpen(false)} />
          <div className="absolute right-0 top-12 z-40 w-80 bg-white dark:bg-gray-900
                          rounded-2xl shadow-xl border border-gray-100 dark:border-gray-800
                          overflow-hidden">
            <div className="flex items-center justify-between p-4 border-b
                            border-gray-100 dark:border-gray-800">
              <h3 className="font-semibold text-gray-900 dark:text-white">
                Notifications
              </h3>
              {unreadCount > 0 && (
                <button onClick={markAllRead}
                        className="text-xs text-indigo-500 hover:underline">
                  Mark all read
                </button>
              )}
            </div>

            <div className="divide-y divide-gray-100 dark:divide-gray-800 max-h-80 overflow-y-auto">
              {notifications.length === 0 ? (
                <p className="p-4 text-sm text-gray-500 text-center">
                  No notifications
                </p>
              ) : notifications.map(n => (
                <div key={n.id}
                     className={cn(
                       'p-3 border-l-4 transition-colors',
                       typeColor[n.type] ?? 'border-l-gray-300',
                       !n.is_read ? 'bg-indigo-50 dark:bg-indigo-950/30' : ''
                     )}>
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {n.title}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400 mt-0.5">
                    {n.message}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
