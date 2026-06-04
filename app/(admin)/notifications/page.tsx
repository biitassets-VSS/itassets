import { createClient } from '@/lib/supabase/server';
import { formatDate } from '@/lib/utils';

const TYPE_STYLES: Record<string, string> = {
  inspection_reminder: 'border-l-orange-400 bg-orange-50 dark:bg-orange-950/20',
  warranty_alert: 'border-l-yellow-400 bg-yellow-50 dark:bg-yellow-950/20',
  info: 'border-l-blue-400 bg-blue-50 dark:bg-blue-950/20',
  warning: 'border-l-red-400 bg-red-50 dark:bg-red-950/20',
  success: 'border-l-green-400 bg-green-50 dark:bg-green-950/20',
  error: 'border-l-red-600 bg-red-50 dark:bg-red-950/20',
};

const TYPE_ICONS: Record<string, string> = {
  inspection_reminder: '🔔',
  warranty_alert: '⚠️',
  info: 'ℹ️',
  warning: '🚨',
  success: '✅',
  error: '❌',
};

export default async function NotificationsPage() {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  const { data: notifications } = await supabase
    .from('notifications')
    .select('*')
    .eq('user_id', user?.id)
    .order('created_at', { ascending: false });

  const unread = notifications?.filter((n) => !n.is_read).length ?? 0;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Notifications
          </h1>
          <p className="text-gray-500 dark:text-gray-400 mt-1">
            {unread} unread · {notifications?.length ?? 0} total
          </p>
        </div>
      </div>

      <div className="space-y-3">
        {!notifications || notifications.length === 0 ? (
          <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                          border-gray-100 dark:border-gray-800 p-12 text-center">
            <p className="text-4xl mb-3">🔔</p>
            <p className="text-gray-400">No notifications yet.</p>
          </div>
        ) : (
          notifications.map((n) => (
            <div
              key={n.id}
              className={`border-l-4 rounded-2xl p-4 shadow-sm border
                          border-gray-100 dark:border-gray-800 transition-all
                          ${TYPE_STYLES[n.type] ?? TYPE_STYLES['info']}
                          ${!n.is_read ? 'ring-1 ring-indigo-200 dark:ring-indigo-800' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3">
                  <span className="text-xl flex-shrink-0">
                    {TYPE_ICONS[n.type] ?? '📬'}
                  </span>
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-semibold text-gray-900 dark:text-white text-sm">
                        {n.title}
                      </p>
                      {!n.is_read && (
                        <span className="w-2 h-2 rounded-full bg-indigo-500 flex-shrink-0" />
                      )}
                    </div>
                    <p className="text-gray-600 dark:text-gray-400 text-sm mt-0.5">
                      {n.message}
                    </p>
                    <p className="text-xs text-gray-400 mt-1">
                      {formatDate(n.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
