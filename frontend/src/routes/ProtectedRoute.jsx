import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import Badge from '../components/common/Badge';
import Button from '../components/common/Button';
import { ShieldAlert, FileText, CheckCircle2, Clock, LogOut, ShieldCheck } from 'lucide-react';

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, loading, isAuthenticated, approveWorkerSimulated, signout } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-[#030307] flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-coop-500 border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/signin" replace />;
  }

  // Intercept Workers who are Pending Verification
  const approvedList = JSON.parse(localStorage.getItem('approved_workers') || '[]');
  const isApprovedByAdmin = user.role === 'worker' && approvedList.includes(user.email.toLowerCase().trim());

  if (user.role === 'worker' && user.status === 'pending' && !isApprovedByAdmin) {
    return (
      <div className="min-h-screen bg-[#030307] flex flex-col items-center justify-center px-6 py-12 text-center">
        <div className="p-8 max-w-lg rounded-3xl glassmorphism border-amber-500/20 shadow-2xl flex flex-col items-center gap-6 relative overflow-hidden">
          <div className="absolute top-0 right-0 p-4">
            <Badge variant="warning">Verification Pending</Badge>
          </div>

          <div className="w-16 h-16 rounded-2xl bg-amber-500/10 text-amber-400 flex items-center justify-center text-3xl font-bold animate-pulse-slow">
            <Clock className="w-8 h-8" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-white">Verification Registry Review</h1>
            <p className="text-sm text-gray-400 max-w-md mx-auto">
              Your worker account registration is complete. Co-op trustees are currently checking safety certificates and professional records.
            </p>
          </div>

          {/* Checklist simulation */}
          <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-5 text-left space-y-3">
            <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Verification Checklist</h4>
            <div className="space-y-2.5 text-sm">
              <div className="flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span className="text-gray-300">Basic Account Credentials Setup</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-gray-300">Government Identity Review</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-400 shrink-0" />
                <span className="text-gray-300">Background Safety Verification Checks</span>
              </div>
            </div>
          </div>

          {/* Dev helper to simulate admin approval */}
          <div className="p-4 rounded-xl bg-coop-500/10 border border-coop-500/20 w-full text-left space-y-3">
            <span className="text-xs font-semibold text-coop-300 flex items-center gap-1.5"><ShieldCheck className="w-3.5 h-3.5" /> Simulation Bypass Controls</span>
            <p className="text-xs text-gray-400">Instantly simulate co-op trustee approval to proceed to the Worker Dashboard.</p>
            <Button variant="primary" className="w-full py-2 text-xs font-semibold" onClick={approveWorkerSimulated}>
              Approve Worker Account Now
            </Button>
          </div>

          <div className="flex w-full gap-4 border-t border-white/5 pt-6">
            <Button variant="secondary" className="grow text-sm py-2" onClick={signout}>
              <LogOut className="w-4 h-4" /> Sign Out
            </Button>
          </div>
        </div>
      </div>
    );
  }

  // Intercept unauthorized access attempts
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen bg-[#030307] flex flex-col items-center justify-center px-6 text-center">
        <div className="p-8 max-w-md rounded-3xl glassmorphism border-red-500/20 shadow-2xl flex flex-col items-center gap-6">
          <div className="w-16 h-16 rounded-2xl bg-red-500/10 text-red-400 flex items-center justify-center text-3xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div>
            <Badge variant="warning" className="mb-2">Access Restrained</Badge>
            <h1 className="text-2xl font-bold text-white mb-2">Unauthorized Area</h1>
            <p className="text-sm text-gray-400">
              Your profile is registered as <strong className="text-coop-300 uppercase">{user.role}</strong>. You do not possess the required cooperative credentials to access this dashboard.
            </p>
          </div>
          <div className="flex gap-4 w-full">
            <Button variant="secondary" className="grow text-sm py-2" onClick={() => window.location.href = '/'}>
              Go Home
            </Button>
            <Button variant="primary" className="grow text-sm py-2" onClick={() => window.location.href = '/signup'}>
              Change Role
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return children;
};

export default ProtectedRoute;
