import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Sidebar from '../../components/common/Sidebar';
import WebThreads from '../../components/common/WebThreads';
import { 
  Users, Briefcase, FileText, TrendingUp, ShieldCheck, 
  Settings, LogOut, ArrowRight, ShieldAlert, Award,
  Check, X, Search, CheckCircle2, ChevronRight, AlertTriangle,
  IndianRupee, Plus, Play
} from 'lucide-react';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signout } = useAuth();

  const currentPath = location.pathname;

  // Mock Admin States
  const [pendingWorkers, setPendingWorkers] = useState([
    { id: 'w6', name: 'Sunita Patel', role: 'Gardener', date: '25 Aug 2026', cert: 'Govt Landscape Cert #G44' },
    { id: 'w7', name: 'David Miller', role: 'Electrician', date: '24 Aug 2026', cert: 'Wireman License A-909' }
  ]);

  const [verifiedWorkerIds, setVerifiedWorkerIds] = useState([]);
  const [successMsg, setSuccessMsg] = useState('');

  const handleVerifyWorker = (id, name) => {
    setVerifiedWorkerIds((prev) => [...prev, id]);
    
    // Save to shared localStorage key to approve globally!
    const approvedList = JSON.parse(localStorage.getItem('approved_workers') || '[]');
    const emailToApprove = name.toLowerCase().replace(/\s+/g, '') + '@gmail.com';
    if (!approvedList.includes(emailToApprove)) {
      approvedList.push(emailToApprove);
      localStorage.setItem('approved_workers', JSON.stringify(approvedList));
    }

    setSuccessMsg(`✓ Approved & activated co-op worker node: ${name}`);
    setTimeout(() => setSuccessMsg(''), 4000);
  };

  // 1. Statistics Summary Grid
  const statistics = [
    { title: 'Total Users', value: '1,240', desc: 'Active members ledger', color: 'text-white border-white/5' },
    { title: 'Total Workers', value: '348', desc: 'Pre-vetted partners', color: 'text-white border-white/5' },
    { title: 'Verified Workers', value: '320', desc: 'Active credentials', color: 'text-emerald-400 border-white/5' },
    { title: 'Pending Verification', value: `${pendingWorkers.length - verifiedWorkerIds.length}`, desc: 'Awaiting review logs', color: 'text-amber-400 border-amber-500/20' },
    { title: 'Active Jobs', value: '14', desc: 'Live dispatch coordinates', color: 'text-sky-400 border-white/5' },
    { title: 'Completed Jobs', value: '1,894', desc: 'Archived ledger nodes', color: 'text-white border-white/5' },
    { title: 'Total Revenue', value: '₹142,500', desc: 'Cooperative share (5%)', color: 'text-emerald-400 border-white/5' },
    { title: 'Active Complaints', value: '3 Pending', desc: 'Dispute registry tickets', color: 'text-red-400 border-red-500/20' }
  ];

  // 2. Tools shortcuts grid
  const tools = [
    { title: 'Worker Verification Board', path: '/admin/workers/verification', desc: 'Audit registration proofs & activate worker nodes', icon: ShieldCheck, color: 'text-emerald-400' },
    { title: 'Registry Users Management', path: '/admin/users', desc: 'Suspend, activate, or block members accounts', icon: Users, color: 'text-coop-400' },
    { title: 'Service Categories Manager', path: '/admin/services', desc: 'Configure service pricing caps & active specialties', icon: Settings, color: 'text-teal-400' },
    { title: 'Monitoring Ledger Bookings', path: '/admin/bookings', desc: 'Inspect transaction receipt ledgers live', icon: FileText, color: 'text-sky-400' },
    { title: 'Dispute Resolution Center', path: '/admin/complaints', desc: 'Resolve client complaints & refund requests', icon: ShieldAlert, color: 'text-red-400' },
    { title: 'Insights & Demand Heatmaps', path: '/admin/analytics', desc: 'Analyze geographical service demands heatmaps', icon: TrendingUp, color: 'text-amber-400' }
  ];

  return (
    <div className="min-h-screen bg-[#030307] text-white flex">
      <Sidebar />
      <div className="grow overflow-y-auto h-screen text-left">
        {/* Header */}
        <header className="glassmorphism sticky top-0 left-0 right-0 z-40 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-600 to-coop-400 flex items-center justify-center font-bold text-white shadow-lg">
              C
            </div>
            <span className="font-semibold text-lg text-white">
              Coop<span className="text-coop-400 font-bold">Admin</span>
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="secondary" className="text-xs px-3.5 py-1.5 flex items-center gap-1.5" onClick={signout}>
              <LogOut className="w-3.5 h-3.5" /> Sign Out
            </Button>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-6 py-12 space-y-10">
          {successMsg && (
            <div className="p-3.5 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl flex items-center gap-2">
              <CheckCircle2 className="w-4.5 h-4.5" />
              <span>{successMsg}</span>
            </div>
          )}

          {/* DYNAMIC CONTENT ROUTER PANELS */}

          {/* Tab 1: Admin Main Summary Dashboard */}
          {currentPath === '/admin/dashboard' && (
            <div className="space-y-12">
              <div className="flex justify-between items-end border-b border-white/5 pb-5">
                <div className="space-y-1.5">
                  <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-bold">COOPERATIVE LEDGER TRUSTEE</span>
                  <h1 className="text-3xl md:text-5xl font-bold tracking-tight">Governance Dashboard</h1>
                  <p className="text-sm text-gray-400 font-light">Cooperative ledger governance nodes parameters.</p>
                </div>
                <Badge variant="primary" className="text-xs py-1 px-3">Trust Layer Active</Badge>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
                {statistics.map((card, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => {
                      if (card.title === 'Pending Verification') navigate('/admin/workers/verification');
                      if (card.title === 'Active Complaints') navigate('/admin/complaints');
                    }}
                    className={`p-6 rounded-2xl bg-white/5 border border-white/5 text-left space-y-2 cursor-pointer hover:border-coop-500/20 hover:bg-white/10 transition-all ${card.color}`}
                  >
                    <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-medium">{card.title}</span>
                    <h3 className="text-xl sm:text-2xl font-bold mt-1 tracking-tight">{card.value}</h3>
                    <p className="text-[10px] text-gray-500 font-light mt-1">{card.desc}</p>
                  </div>
                ))}
              </div>

              {/* Operations Panels grid */}
              <div className="space-y-6 text-left">
                <h2 className="text-xl md:text-2xl font-bold text-white border-b border-white/5 pb-3">Co-op Trustees Administration</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {tools.map((link, idx) => {
                    const IconComp = link.icon;
                    return (
                      <div 
                        key={idx}
                        onClick={() => navigate(link.path)}
                        className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-coop-500/30 hover:bg-[#121222] transition-all duration-300 group flex items-start gap-4 cursor-pointer"
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
            </div>
          )}

          {/* Tab 2: Worker Verification List */}
          {currentPath === '/admin/workers/verification' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-5">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Worker Verification Board</h1>
                <p className="text-xs text-gray-400 mt-1 font-light">Approve worker applications to index them on CoopRegistry.</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl">
                <table className="w-full border-collapse text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">
                      <th className="px-6 py-4">Worker Candidate</th>
                      <th className="px-6 py-4">Applied Category</th>
                      <th className="px-6 py-4">Certifications Proof</th>
                      <th className="px-6 py-4">Submitted Date</th>
                      <th className="px-6 py-4">Credentials Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    {pendingWorkers.map((worker) => {
                      const isApproved = verifiedWorkerIds.includes(worker.id);
                      return (
                        <tr key={worker.id} className="hover:bg-white/5 transition-colors">
                          <td className="px-6 py-4 font-bold text-white">{worker.name}</td>
                          <td className="px-6 py-4 text-coop-300">{worker.role}</td>
                          <td className="px-6 py-4 text-gray-400 font-mono text-[10px]">{worker.cert}</td>
                          <td className="px-6 py-4 text-gray-400">{worker.date}</td>
                          <td className="px-6 py-4">
                            <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                              isApproved 
                                ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' 
                                : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                            }`}>
                              {isApproved ? 'Verified ✓' : 'Awaiting Review'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            {!isApproved ? (
                              <button 
                                onClick={() => handleVerifyWorker(worker.id, worker.name)}
                                className="px-3 py-1.5 rounded-lg bg-coop-600 hover:bg-coop-500 text-[10px] font-bold text-white transition-all cursor-pointer"
                              >
                                Approve & Verify
                              </button>
                            ) : (
                              <span className="text-[10px] text-gray-500 font-mono font-medium">Activated</span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 3: Users Accounts management */}
          {currentPath === '/admin/users' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-5">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Registry Users Management</h1>
                <p className="text-xs text-gray-400 mt-1 font-light">Moderate active community cooperative accounts.</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl">
                <table className="w-full border-collapse text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">
                      <th className="px-6 py-4">Full Name</th>
                      <th className="px-6 py-4">Email Address</th>
                      <th className="px-6 py-4">Role node</th>
                      <th className="px-6 py-4">Ledger Status</th>
                      <th className="px-6 py-4 text-right">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">Mukesh CEO</td>
                      <td className="px-6 py-4 text-gray-400">mukeshceo2030@gmail.com</td>
                      <td className="px-6 py-4 text-coop-300">Customer</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-red-400 hover:text-white cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5">Suspend</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">Arun Kumar</td>
                      <td className="px-6 py-4 text-gray-400">arun.kumar@gmail.com</td>
                      <td className="px-6 py-4 text-coop-300">Worker</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">Active</span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-red-400 hover:text-white cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5">Suspend</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 4: Service category prices setup */}
          {currentPath === '/admin/services' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-white/5 pb-5">
                <div>
                  <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Service Categories Manager</h1>
                  <p className="text-xs text-gray-400 mt-1 font-light">Calibrate maximum hourly caps & coordinate co-op categories.</p>
                </div>
                <Button variant="primary" className="text-xs py-2 px-4 flex items-center gap-1"><Plus className="w-4 h-4" /> Add Category</Button>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl">
                <table className="w-full border-collapse text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">
                      <th className="px-6 py-4">Category Name</th>
                      <th className="px-6 py-4">Price Upper Cap</th>
                      <th className="px-6 py-4">Active registry nodes</th>
                      <th className="px-6 py-4">Fee Share</th>
                      <th className="px-6 py-4 text-right">Calibrate</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">Plumbing Speciality</td>
                      <td className="px-6 py-4 text-emerald-400 font-semibold">₹600 / hr</td>
                      <td className="px-6 py-4 text-gray-300">28 online</td>
                      <td className="px-6 py-4 text-gray-400">5% (standard)</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-coop-400 hover:text-white cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5">Update Cap</button>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-bold text-white">Electrical Works</td>
                      <td className="px-6 py-4 text-emerald-400 font-semibold">₹750 / hr</td>
                      <td className="px-6 py-4 text-gray-300">14 online</td>
                      <td className="px-6 py-4 text-gray-400">5% (standard)</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-coop-400 hover:text-white cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5">Update Cap</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 5: bookings log */}
          {currentPath === '/admin/bookings' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-5">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Monitoring Ledger Bookings</h1>
                <p className="text-xs text-gray-400 mt-1 font-light">Inspect all transaction dispatches across co-op ledger chains.</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl">
                <table className="w-full border-collapse text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">
                      <th className="px-6 py-4">Booking Link</th>
                      <th className="px-6 py-4">Client</th>
                      <th className="px-6 py-4">Assigned Worker</th>
                      <th className="px-6 py-4">Ledger Cost</th>
                      <th className="px-6 py-4">Dispatch Progress</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-coop-300 font-bold">bk_129</td>
                      <td className="px-6 py-4 text-white">Ravi</td>
                      <td className="px-6 py-4 text-white">Arun Kumar</td>
                      <td className="px-6 py-4 font-bold text-emerald-400">₹450</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-500/10 text-amber-400 border border-amber-500/20">Active</span>
                      </td>
                    </tr>
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-coop-300 font-bold">bk_128</td>
                      <td className="px-6 py-4 text-white">Elena Rostova</td>
                      <td className="px-6 py-4 text-white">David Miller</td>
                      <td className="px-6 py-4 font-bold text-emerald-400">₹500</td>
                      <td className="px-6 py-4">
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-sans">Completed</span>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 6: complaints ticket registry */}
          {currentPath === '/admin/complaints' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-5">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Dispute Resolution Tickets</h1>
                <p className="text-xs text-gray-400 mt-1 font-light">Moderate complaints, reviews dispute, and calibrate refunds.</p>
              </div>

              <div className="overflow-hidden rounded-2xl border border-white/5 bg-black/40 shadow-xl">
                <table className="w-full border-collapse text-left text-xs md:text-sm">
                  <thead>
                    <tr className="border-b border-white/5 bg-white/5 text-[10px] text-gray-500 font-mono uppercase tracking-widest font-bold">
                      <th className="px-6 py-4">Ticket Node</th>
                      <th className="px-6 py-4">Complainant</th>
                      <th className="px-6 py-4">Incident Log details</th>
                      <th className="px-6 py-4">Urgency</th>
                      <th className="px-6 py-4 text-right">Moderations</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/5 font-sans">
                    <tr className="hover:bg-white/5 transition-colors">
                      <td className="px-6 py-4 font-mono text-coop-300">#T-902</td>
                      <td className="px-6 py-4 text-white font-bold">Suresh Raj</td>
                      <td className="px-6 py-4 text-gray-300">Gardener did not clean tools after finishing lawn service work.</td>
                      <td className="px-6 py-4 text-amber-400">Medium</td>
                      <td className="px-6 py-4 text-right">
                        <button className="text-[10px] font-bold text-coop-400 hover:text-white cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5">Resolve Dispute</button>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Tab 7: Demand Analytics maps logs */}
          {currentPath === '/admin/analytics' && (
            <div className="space-y-6">
              <div className="border-b border-white/5 pb-5">
                <h1 className="text-2xl md:text-3xl font-bold tracking-tight">Geographical Demand Logs</h1>
                <p className="text-xs text-gray-400 mt-1 font-light">High request coordinates analysis calculated by AI match weights.</p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                  <h3 className="text-base font-bold text-white">Sector 4, Indiranagar Node</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    Plumbing repair inquiries grew by **24%** this week. Recommended to broadcast active worker incentives to verify stability bounds.
                  </p>
                </div>
                <div className="bg-white/5 p-6 rounded-3xl border border-white/5 space-y-4">
                  <h3 className="text-base font-bold text-white">HSR Layout Node</h3>
                  <p className="text-xs text-gray-400 leading-relaxed font-light">
                    Gardening requests grew by **12%**. Standard availability limits currently matched at 100% capacity.
                  </p>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;
