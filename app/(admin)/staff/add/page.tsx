'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddStaffPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    staff_name: '',
    department: '',
    join_date: new Date().toISOString().split('T')[0],
    phone_number: '',
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      toast.success('Staff member added successfully!');
      router.push('/admin/staff');
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Failed to add staff');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full px-3 py-2 border border-gray-200 dark:border-gray-700
    rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all`;

  const fields = [
    { label: 'Full Name *', key: 'staff_name', type: 'text', placeholder: 'John Doe' },
    { label: 'Department *', key: 'department', type: 'text', placeholder: 'IT Department' },
    { label: 'Join Date *', key: 'join_date', type: 'date', placeholder: '' },
    { label: 'Phone Number', key: 'phone_number', type: 'tel', placeholder: '+91 9876543210' },
    { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'staff@company.com' },
    { label: 'Login Password *', key: 'password', type: 'password', placeholder: 'Min 8 characters' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add Staff Member
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Create a new staff account
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600
                                  dark:text-gray-400 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  required={label.includes('*')}
                  placeholder={placeholder}
                  minLength={key === 'password' ? 8 : undefined}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500
                         disabled:bg-indigo-300 text-white font-medium rounded-xl
                         transition-all"
            >
              {loading ? 'Creating...' : 'Create Staff Member'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600
                         dark:text-gray-400 font-medium rounded-xl transition-all
                         hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function AddStaffPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    staff_name: '',
    department: '',
    join_date: new Date().toISOString().split('T')[0],
    phone_number: '',
    email: '',
    password: '',
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/staff', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.error);

      toast.success('Staff member added successfully!');
      router.push('/admin/staff');
    } catch (err: unknown) {
      toast.error((err as Error).message ?? 'Failed to add staff');
    } finally {
      setLoading(false);
    }
  }

  const inputClass = `w-full px-3 py-2 border border-gray-200 dark:border-gray-700
    rounded-xl bg-white dark:bg-gray-800 text-gray-900 dark:text-white text-sm
    focus:outline-none focus:ring-2 focus:ring-indigo-400 transition-all`;

  const fields = [
    { label: 'Full Name *', key: 'staff_name', type: 'text', placeholder: 'John Doe' },
    { label: 'Department *', key: 'department', type: 'text', placeholder: 'IT Department' },
    { label: 'Join Date *', key: 'join_date', type: 'date', placeholder: '' },
    { label: 'Phone Number', key: 'phone_number', type: 'tel', placeholder: '+91 9876543210' },
    { label: 'Email Address *', key: 'email', type: 'email', placeholder: 'staff@company.com' },
    { label: 'Login Password *', key: 'password', type: 'password', placeholder: 'Min 8 characters' },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Add Staff Member
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          Create a new staff account
        </p>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-sm border
                      border-gray-100 dark:border-gray-800 p-6 max-w-2xl">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {fields.map(({ label, key, type, placeholder }) => (
              <div key={key}>
                <label className="block text-xs font-medium text-gray-600
                                  dark:text-gray-400 mb-1">{label}</label>
                <input
                  type={type}
                  value={form[key as keyof typeof form]}
                  onChange={e => setForm(f => ({ ...f, [key]: e.target.value }))}
                  required={label.includes('*')}
                  placeholder={placeholder}
                  minLength={key === 'password' ? 8 : undefined}
                  className={inputClass}
                />
              </div>
            ))}
          </div>

          <div className="flex gap-3 pt-2">
            <button
              type="submit"
              disabled={loading}
              className="px-6 py-2.5 bg-indigo-600 hover:bg-indigo-500
                         disabled:bg-indigo-300 text-white font-medium rounded-xl
                         transition-all"
            >
              {loading ? 'Creating...' : 'Create Staff Member'}
            </button>
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2.5 bg-gray-100 dark:bg-gray-800 text-gray-600
                         dark:text-gray-400 font-medium rounded-xl transition-all
                         hover:bg-gray-200 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
