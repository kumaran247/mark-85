import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { Mail, Lock, Sparkles, KeyRound } from 'lucide-react';

const SignIn = () => {
  const navigate = useNavigate();
  const { signin } = useAuth();
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [role, setRole] = useState('customer');
  const [workerStatus, setWorkerStatus] = useState('approved');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [forgotPasswordMsg, setForgotPasswordMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return;

    setIsSubmitting(true);
    try {
      const loggedUser = await signin(email, role, workerStatus);
      if (loggedUser.role === 'customer') {
        navigate('/user/dashboard');
      } else if (loggedUser.role === 'worker') {
        navigate('/worker/dashboard');
      } else if (loggedUser.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleForgotPassword = () => {
    setForgotPasswordMsg('A simulated recovery instructions link has been sent to your email.');
    setTimeout(() => setForgotPasswordMsg(''), 4000);
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#030307] px-4 py-16">
      {/* Background canvas */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.12} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="rounded-3xl glassmorphism border-white/5 p-8 shadow-2xl space-y-6">
          <div className="text-left space-y-2">
            <Badge variant="primary" className="mb-1"><Sparkles className="w-3 h-3" /> Cooperative Network</Badge>
            <h1 className="text-3xl font-bold text-white">Sign In</h1>
            <p className="text-sm text-gray-400 font-light">Access your cooperative dashboard workspace.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              label="Email Address"
              type="email"
              placeholder="name@domain.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />

            <div className="space-y-1">
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
              <div className="flex justify-between items-center text-xs mt-1">
                <label className="flex items-center gap-1.5 text-gray-400 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="accent-coop-500 rounded border-white/10"
                  />
                  Remember me
                </label>
                <button
                  type="button"
                  onClick={handleForgotPassword}
                  className="text-coop-400 hover:underline cursor-pointer bg-transparent border-none"
                >
                  Forgot password?
                </button>
              </div>
            </div>

            {forgotPasswordMsg && (
              <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg text-left">
                {forgotPasswordMsg}
              </div>
            )}

            {/* Simulated verification flow helper selector */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 text-left space-y-3 mt-4">
              <span className="text-xs font-semibold text-gray-300 flex items-center gap-1.5">
                <KeyRound className="w-3.5 h-3.5 text-coop-400" /> Simulated Role Options
              </span>
              <div className="grid grid-cols-2 gap-2">
                <div className="flex flex-col gap-1 text-xs">
                  <label className="text-gray-400">Target Role</label>
                  <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="px-2 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                  >
                    <option value="customer">Customer</option>
                    <option value="worker">Worker</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>

                {role === 'worker' && (
                  <div className="flex flex-col gap-1 text-xs animate-pulse-slow">
                    <label className="text-gray-400">Worker Status</label>
                    <select
                      value={workerStatus}
                      onChange={(e) => setWorkerStatus(e.target.value)}
                      className="px-2 py-1.5 rounded-lg bg-black/40 border border-white/10 text-white"
                    >
                      <option value="approved">Approved</option>
                      <option value="pending">Pending</option>
                    </select>
                  </div>
                )}
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6 py-3 font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Verifying Credentials...' : 'Sign In'}
            </Button>
          </form>

          <p className="text-sm text-gray-500 text-center">
            New to the cooperative?{' '}
            <button
              onClick={() => navigate('/signup')}
              className="text-coop-400 hover:underline bg-transparent border-none cursor-pointer"
            >
              Sign Up
            </button>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
