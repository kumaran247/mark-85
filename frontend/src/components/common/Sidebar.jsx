import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import { 
  LayoutDashboard, Search, ClipboardList, MapPinned, 
  CreditCard, ReceiptText, Star, History, Heart, 
  Bell, CircleHelp, UserRound, Settings, LogOut, ShieldAlert,
  Inbox, Briefcase, Award, Map, TrendingUp, ShieldCheck
} from 'lucide-react';

const Sidebar = () => {
  const { user, signout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const role = user?.role || 'customer';

  // Grouped links for Customer
  const customerSections = [
    {
      title: 'MAIN',
      links: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/user/dashboard' },
        { label: 'Find Workers', icon: Search, path: '/user/workers' },
        { label: 'My Requests', icon: ClipboardList, path: '/user/request' },
        { label: 'Live Tracking', icon: MapPinned, path: '/user/tracking/bk_123' }
      ]
    },
    {
      title: 'SERVICES',
      links: [
        { label: 'Payments', icon: CreditCard, path: '/user/bills/bk_123' },
        { label: 'Bills', icon: ReceiptText, path: '/user/bills/bk_123' },
        { label: 'Ratings', icon: Star, path: '/user/rating/bk_123' },
        { label: 'History', icon: History, path: '/user/history' }
      ]
    },
    {
      title: 'PERSONAL',
      links: [
        { label: 'Saved Workers', icon: Heart, path: '/user/saved-workers' },
        { label: 'Notifications', icon: Bell, path: '/user/notifications' },
        { label: 'Support', icon: CircleHelp, path: '/user/support' }
      ]
    }
  ];

  // Grouped links for Worker
  const workerSections = [
    {
      title: 'MAIN',
      links: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/worker/dashboard' },
        { label: 'Job Requests', icon: Inbox, path: '/worker/jobs' },
        { label: 'My Jobs', icon: Briefcase, path: '/worker/jobs' }
      ]
    },
    {
      title: 'OPERATIONS',
      links: [
        { label: 'Navigation', icon: MapPinned, path: '/worker/navigation/bk_128' },
        { label: 'Availability', icon: Clock3 => Clock3 = Clock3 || History, iconOverride: '🟢', path: '/worker/availability' },
        { label: 'Earnings', icon: CreditCard, path: '/worker/earnings' },
        { label: 'Reviews', icon: Star, path: '/worker/reviews' },
        { label: 'Documents', icon: Award, path: '/worker/documents' }
      ]
    },
    {
      title: 'PERSONAL',
      links: [
        { label: 'Profile', icon: UserRound, path: '/worker/profile' }
      ]
    }
  ];

  // Grouped links for Admin
  const adminSections = [
    {
      title: 'MAIN',
      links: [
        { label: 'Dashboard', icon: LayoutDashboard, path: '/admin/dashboard' },
        { label: 'Worker Verification', icon: ShieldCheck, path: '/admin/workers/verification' },
        { label: 'Users', icon: Users => Users = Users || UserRound, iconOverride: '👥', path: '/admin/users' }
      ]
    },
    {
      title: 'SERVICES',
      links: [
        { label: 'Services', icon: Settings, path: '/admin/services' },
        { label: 'Bookings', icon: ClipboardList, path: '/admin/bookings' },
        { label: 'Payments', icon: CreditCard, path: '/admin/bookings' },
        { label: 'Complaints', icon: ShieldAlert, path: '/admin/complaints' }
      ]
    },
    {
      title: 'ANALYTICS',
      links: [
        { label: 'Demand Map', icon: Map, path: '/admin/analytics' },
        { label: 'Analytics', icon: TrendingUp, path: '/admin/analytics' }
      ]
    }
  ];

  const sections = role === 'admin' ? adminSections : role === 'worker' ? workerSections : customerSections;

  return (
    <aside className="w-64 glassmorphism border-r border-white/5 h-screen flex flex-col justify-between p-6 shrink-0 sticky top-0">
      <div className="space-y-6 overflow-y-auto pr-2 max-h-[82vh] text-left">
        {/* Brand Header */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-600 to-coop-400 flex items-center justify-center font-bold text-white shadow-lg shadow-coop-500/20">
            C
          </div>
          <span className="font-semibold text-lg text-white tracking-wider">
            Coop<span className="text-coop-400 font-bold">{role === 'admin' ? 'Admin' : role === 'worker' ? 'Worker' : 'Gig'}</span>
          </span>
        </div>

        {/* Sections Navigation */}
        <nav className="space-y-5">
          {sections.map((section, secIdx) => (
            <div key={secIdx} className="space-y-1.5">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold block px-4">
                {section.title}
              </span>
              <div className="space-y-0.5">
                {section.links.map((link, idx) => {
                  const isActive = location.pathname === link.path;
                  const Icon = link.icon;
                  return (
                    <button
                      key={idx}
                      onClick={() => navigate(link.path)}
                      className={`w-full flex items-center gap-3 px-4 py-2 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                        isActive 
                          ? 'bg-coop-600/10 text-white border border-coop-500/20 shadow-lg shadow-coop-500/5' 
                          : 'text-gray-400 hover:text-white hover:bg-white/5 border border-transparent'
                      }`}
                    >
                      {link.iconOverride ? (
                        <span className="text-base leading-none">{link.iconOverride}</span>
                      ) : (
                        <Icon className={`w-4.5 h-4.5 ${isActive ? 'text-coop-400' : 'text-gray-400'}`} />
                      )}
                      <span>{link.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>
      </div>

      {/* Footer Profile Sign-Out */}
      <div className="border-t border-white/5 pt-4 flex items-center justify-between gap-3 text-left">
        <div className="flex items-center gap-2 overflow-hidden">
          <div className="w-8 h-8 rounded-full bg-coop-500/20 border border-coop-500/30 flex items-center justify-center font-bold text-white text-xs shrink-0">
            {user?.name?.charAt(0).toUpperCase() || 'P'}
          </div>
          <div className="space-y-0.5 overflow-hidden">
            <p className="text-xs font-bold text-white truncate">{user?.name || 'Partner'}</p>
            <span className="text-[9px] text-gray-500 capitalize">{role} node</span>
          </div>
        </div>
        <div className="flex gap-1 shrink-0">
          <button 
            onClick={() => navigate(role === 'worker' ? '/worker/profile' : role === 'admin' ? '/admin/dashboard' : '/user/profile')}
            className="text-gray-400 hover:text-white cursor-pointer bg-white/5 p-1.5 rounded-lg border border-white/5"
            title="Profile Settings"
          >
            <Settings className="w-3.5 h-3.5" />
          </button>
          <button 
            onClick={signout}
            className="text-gray-400 hover:text-red-400 cursor-pointer bg-white/5 p-1.5 rounded-lg border border-white/5"
            title="Sign Out"
          >
            <LogOut className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
