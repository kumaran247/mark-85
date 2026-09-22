import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Sidebar from '../../components/common/Sidebar';
import { 
  Briefcase, DollarSign, Star, Calendar, ShieldCheck, 
  Settings, LogOut, ArrowRight, ShieldAlert, Award, FileText,
  Clock, CheckCircle2, ChevronRight, UserCheck
} from 'lucide-react';

const WorkerDashboard = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const metrics = [
    { title: "Today's Jobs", value: '2 Active', desc: 'Plumbing checks', color: 'text-emerald-400 border-white/5' },
    { title: 'Pending Requests', value: '1 Match Request', desc: 'Awaiting accept', color: 'text-amber-400 border-amber-500/20' },
    { title: "Today's Earnings", value: '₹1,250', desc: 'Paid to wallet', color: 'text-white border-white/5' },
    { title: 'Monthly Earnings', value: '₹24,500', desc: 'August payouts', color: 'text-white border-white/5' },
    { title: 'Co-op Rating', value: '4.8 ★', desc: '142 reviews verified', color: 'text-amber-400 border-white/5' }
  ];

  const quickLinks = [
    { title: 'Job Requests Board', path: '/worker/jobs', desc: 'Review client match requests', icon: Briefcase, color: 'text-emerald-400' },
    { title: 'Earnings & Ledgers', path: '/worker/earnings', desc: 'View payout breakdowns', icon: DollarSign, color: 'text-coop-400' },
    { title: 'Calendar Availability', path: '/worker/availability', desc: 'Set weekly gig schedules', icon: Calendar, color: 'text-sky-400' },
    { title: 'Ratings & Reviews', path: '/worker/reviews', desc: 'Check customer feedback logs', icon: Star, color: 'text-amber-400' },
    { title: 'Co-op Documents', path: '/worker/documents', desc: 'Track certificates expiries', icon: Award, color: 'text-teal-400' },
    { title: 'Profile Settings', path: '/worker/profile', desc: 'Configure bank & skills nodes', icon: Settings, color: 'text-gray-400' }
  ];

  // Professional Job history table data
  const recentJobs = [
    { id: 'bk_129', customer: 'Ravi', service: 'Plumbing Repair', date: '25 Aug 2026', payout: 450, status: 'Active' },
    { id: 'bk_128', customer: 'Elena Rostova', service: 'Leak Container', date: '24 Aug 2026', payout: 500, status: 'Completed' },
    { id: 'bk_127', customer: 'Priya Nair', service: 'Wiring Repair', date: '22 Aug 2026', payout: 750, status: 'Completed' },
    { id: 'bk_126', customer: 'Suresh Raj', service: 'AC Installation', date: '19 Aug 2026', payout: 600, status: 'Completed' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#040909] via-[#020505] to-black text-white flex">
      <Sidebar />
      <div className="grow overflow-y-auto h-screen">
      {/* Header */}
      <header className="glassmorphism sticky top-0 left-0 right-0 z-40 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-600 to-coop-400 flex items-center justify-center font-bold text-white shadow-lg">
            C
          </div>
          <span className="font-semibold text-lg text-white tracking-wider">
            Coop<span className="text-coop-400 font-bold">Worker</span>
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Button variant="secondary" className="text-xs px-3.5 py-1.5 flex items-center gap-1.5" onClick={signout}>
            <LogOut className="w-3.5 h-3.5" /> Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Greetings header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 text-left border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest block">WORKER REGISTRY</span>
            <div className="flex items-center gap-3 flex-wrap">
              <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Good morning, Mukesh.</h1>
              <div className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/5 px-2.5 py-1 rounded border border-emerald-500/10 uppercase">
                <ShieldCheck className="w-3.5 h-3.5" /> Verified co-op member
              </div>
            </div>
            <p className="text-sm text-gray-400 font-light">Your cooperative registry partner dashboard.</p>
          </div>
        </div>

        {/* Dashboard Metrics grid */}
        <div className="grid grid-cols-2 lg:grid-cols-5 gap-6">
          {metrics.map((card, idx) => (
            <div 
              key={idx} 
              onClick={() => card.title === 'Pending Requests' && navigate('/worker/jobs')}
              className={`p-6 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2 cursor-pointer hover:border-coop-500/20 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 ${card.color}`}
            >
              <span className="text-[10px] text-gray-500 uppercase tracking-wider font-semibold">{card.title}</span>
              <h3 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">{card.value}</h3>
              <p className="text-[10px] text-gray-500 font-light mt-1">{card.desc}</p>
            </div>
          ))}
        </div>

        {/* Professional Recent Job Dispatches Table */}
        <div className="space-y-4 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight border-b border-white/5 pb-3">Recent Job Dispatches</h2>
          <div className="w-full overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl">
            <div className="overflow-x-auto">
              <table className="w-full border-collapse text-left text-xs md:text-sm">
                <thead>
                  <tr className="border-b border-white/5 bg-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">
                    <th className="px-6 py-4">Job ID</th>
                    <th className="px-6 py-4">Customer</th>
                    <th className="px-6 py-4">Service</th>
                    <th className="px-6 py-4 font-sans">Date</th>
                    <th className="px-6 py-4">Est. Payout</th>
                    <th className="px-6 py-4">Status</th>
                    <th className="px-6 py-4 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5 font-sans">
                  {recentJobs.map((job) => (
                    <tr key={job.id} className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono font-bold text-coop-300">{job.id}</td>
                      <td className="px-6 py-4 font-semibold text-white">{job.customer}</td>
                      <td className="px-6 py-4 text-gray-300">{job.service}</td>
                      <td className="px-6 py-4 text-gray-400 text-xs">{job.date}</td>
                      <td className="px-6 py-4 font-bold text-white">₹{job.payout}</td>
                      <td className="px-6 py-4">
                        <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          job.status === 'Active' 
                            ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' 
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}>
                          <span className={`w-1.5 h-1.5 rounded-full ${
                            job.status === 'Active' ? 'bg-amber-500 animate-ping' : 'bg-emerald-500'
                          }`} />
                          {job.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button 
                          onClick={() => navigate(`/worker/jobs/${job.id}`)}
                          className="inline-flex items-center gap-1 text-[11px] font-bold text-coop-400 hover:text-white transition-colors cursor-pointer"
                        >
                          Details <ChevronRight className="w-3.5 h-3.5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Quick Links Shortcut Panels */}
        <div className="space-y-6 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/5 pb-3">Worker Workspace</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {quickLinks.map((link, idx) => {
              const IconComp = link.icon;
              return (
                <div 
                  key={idx}
                  onClick={() => navigate(link.path)}
                  className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-coop-500/30 hover:bg-white/10 transition-all duration-300 group flex items-start gap-4 cursor-pointer"
                >
                  <div className={`p-3 rounded-xl bg-white/5 ${link.color} shrink-0 group-hover:scale-110 transition-transform`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-base font-bold text-white group-hover:text-coop-300 transition-colors flex items-center gap-1">
                      {link.title} <ArrowRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all" />
                    </h3>
                    <p className="text-xs text-gray-400 font-light">{link.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>
      </div>
    </div>
  );
};

export default WorkerDashboard;
