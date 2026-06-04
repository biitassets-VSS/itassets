'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Password reset email sent!');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900
                    to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16
                          bg-indigo-500 rounded-2xl mb-4">
            <EnvelopeIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="text-indigo-300 mt-1">Virtual Staffing Solution</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20
                        rounded-2xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-xl font-semibold text-white mb-2">Email Sent!</h2>
              <p className="text-indigo-200 text-sm mb-6">
                Check your inbox for the password reset link.
              </p>
              <Link href="/admin/login"
                    className="text-indigo-300 hover:text-white transition-colors">
                ← Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20
                             rounded-xl text-white placeholder-white/40 focus:outline-none
                             focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white
                           font-semibold rounded-xl transition-all"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <div className="text-center">
                <Link href="/admin/login"
                      className="text-indigo-300 hover:text-white text-sm transition-colors">
                  ← Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
        <p className="text-center text-white/40 text-xs mt-6">
          © Copyright Reserved AinodeArt 2026
        </p>
      </div>
    </div>
  );
}

'use client';

import { useState } from 'react';
import { createClient } from '@/lib/supabase/client';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { EnvelopeIcon } from '@heroicons/react/24/outline';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const supabase = createClient();

  async function handleReset(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/update-password`,
    });

    if (error) {
      toast.error(error.message);
    } else {
      setSent(true);
      toast.success('Password reset email sent!');
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900
                    to-slate-900 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16
                          bg-indigo-500 rounded-2xl mb-4">
            <EnvelopeIcon className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-white">Reset Password</h1>
          <p className="text-indigo-300 mt-1">Virtual Staffing Solution</p>
        </div>

        <div className="bg-white/10 backdrop-blur-lg border border-white/20
                        rounded-2xl p-8 shadow-2xl">
          {sent ? (
            <div className="text-center">
              <div className="text-6xl mb-4">📧</div>
              <h2 className="text-xl font-semibold text-white mb-2">Email Sent!</h2>
              <p className="text-indigo-200 text-sm mb-6">
                Check your inbox for the password reset link.
              </p>
              <Link href="/admin/login"
                    className="text-indigo-300 hover:text-white transition-colors">
                ← Back to Login
              </Link>
            </div>
          ) : (
            <form onSubmit={handleReset} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-indigo-200 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 bg-white/10 border border-white/20
                             rounded-xl text-white placeholder-white/40 focus:outline-none
                             focus:border-indigo-400 focus:ring-2 focus:ring-indigo-400/30"
                />
              </div>
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 bg-indigo-500 hover:bg-indigo-400 text-white
                           font-semibold rounded-xl transition-all"
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
              <div className="text-center">
                <Link href="/admin/login"
                      className="text-indigo-300 hover:text-white text-sm transition-colors">
                  ← Back to Login
                </Link>
              </div>
            </form>
          )}
        </div>
        <p className="text-center text-white/40 text-xs mt-6">
          © Copyright Reserved AinodeArt 2026
        </p>
      </div>
    </div>
  );
}
