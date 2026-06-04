'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { EyeIcon, EyeSlashIcon, UserCircleIcon } from '@heroicons/react/24/outline';

export default function StaffLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const supabase = createClient();

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      toast.error(error.message);
      setLoading(false);
      return;
    }

    if (data.user) {
      const { data: profile } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profile?.role !== 'staff') {
        await supabase.auth.signOut();
        toast.error('Access denied. Staff account required.');
        setLoading(false);
        return;
      }

      // Check if staff is active
      const { data: staffMember } = await supabase
        .from('staff_members')
        .select('is_active, staff_name')
        .eq('user_id', data.user.id)
        .single();

      if (!staffMember?.is_active) {
        await supabase.auth.signOut();
        toast.error('Your account has been deactivated. Please contact admin.');
        setLoading(false);
        return;
      }

      toast.success(`Welcome back, ${staffMember.staff_name}!`);
      router.push('/staff/dashboard');
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-900 via-teal-900 to-slate-900
                    flex items-center justify-center p-4">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-emerald-500 rounded-full
                        mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-teal-500 rounded-full
                        mix-blend-multiply filter blur-xl opacity-20 animate-pulse" />
      </div>

      <div className="w-full max-w-md relative z-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-500
                          rounded-2xl mb-4 shadow-lg">
            <UserCircleIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white mb-1">
            Virtual Staffing Solution
          </h1>
          <p className="text-emerald-300 text-sm font-medium tracking-wide uppercase">
            Staff Member Portal
          </p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20 rounded-2xl
                        p-8 shadow-2xl">
          <h2 className="text-xl font-semibold text-white mb-6 text-center">
            Staff Login
          </h2>

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-sm font-medium text-emerald-200 mb-2">
                Registered Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="yourname@company.com"
                className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl
                           text-white placeholder-white/40 focus:outline-none
                           focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30
                           transition-all"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-emerald-200 mb-2">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="w-full px-4 py-3 pr-12 bg-white/10 border border-white/20
                             rounded-xl text-white placeholder-white/40 focus:outline-none
                             focus:border-emerald-400 focus:ring-2 focus:ring-emerald-400/30
                             transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/50
                             hover:text-white transition-colors"
                >
                  {showPassword
                    ? <EyeSlashIcon className="w-5 h-5" />
                    : <EyeIcon className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <Link href="/forgot-password"
                    className="text-sm text-emerald-300 hover:text-white transition-colors">
                Forgot Password?
              </Link>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-emerald-500 hover:bg-emerald-400 disabled:bg-emerald-700
                         text-white font-semibold rounded-xl transition-all duration-200
                         shadow-lg hover:shadow-emerald-500/30"
            >
              {loading ? 'Signing in...' : 'Sign In as Staff Member'}
            </button>
          </form>

          <div className="mt-6 text-center">
            <p className="text-white/50 text-sm">
              Admin?{' '}
              <Link href="/admin/login"
                    className="text-emerald-300 hover:text-white transition-colors">
                Admin Login
              </Link>
            </p>
          </div>
        </div>

        <p className="text-center text-white/40 text-xs mt-6">
          © Copyright Reserved AinodeArt 2026
        </p>
      </div>
    </div>
  );
}
