'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createClient } from '@/lib/supabase/client';
import toast from 'react-hot-toast';

export default function AddStaffPage() {
  const supabase = createClient();
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    password: '',
  });

  const inputClass = `w-full px-3 py-2.5 rounded-xl border border-gray-200
    dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white
    text-sm focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all`;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    if (!form.full_name || !form.email || !form.password) {
      toast.error('Full name, email and password are required');
      return;
    }

    setLoading(true);

    try {
      const { data: authData, error: authError } =
        await supabase.auth.admin.createUser({
          email: form.email,
          password: form.password,
          email_confirm: true,
        });

      if (authError) throw authError;

      const { error: profileError } = await supabase.from('staff').insert({
        id: authData.user.id,
        full_name: form.full_name,
        email: form.email,
        phone: form.phone,
        department: form.department,
        role: form.role,
      });

      if (profileError) throw profileError;

      toast.success('Staff member added successfully');
      router.push('/admin/staff');
    } catch (err: unknown) {
      toast.error((err as Error).message || 'Failed to add staff');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="max-w-xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
        Add Staff Member
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Full Name *
          </label>
          <input
            type="text"
            value={form.full_name}
            onChange={e => setForm(f => ({ ...f, full_name: e.target.value }))}
            placeholder="John Doe"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Email *
          </label>
          <input
            type="email"
            value={form.email}
            onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
            placeholder="john@example.com"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Password *
          </label>
          <input
            type="password"
            value={form.password}
            onChange={e => setForm(f => ({ ...f, password: e.target.value }))}
            placeholder="Min 6 characters"
            required
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Phone
          </label>
          <input
            type="tel"
            value={form.phone}
            onChange={e => setForm(f => ({ ...f, phone: e.target.value }))}
            placeholder="+91 00000 00000"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Department
          </label>
          <input
            type="text"
            value={form.department}
            onChange={e => setForm(f => ({ ...f, department: e.target.value }))}
            placeholder="e.g. IT, HR, Finance"
            className={inputClass}
          />
        </div>

        <div>
          <label className="block text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
            Role
          </label>
          <input
            type="text"
            value={form.role}
            onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
            placeholder="e.g. Engineer, Manager"
            className={inputClass}
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500
            disabled:bg-indigo-300 text-white font-medium transition-all"
        >
          {loading ? 'Adding...' : 'Add Staff Member'}
        </button>
      </form>
    </div>
  );
}
