import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, TrendingUp, Sparkles, Map } from 'lucide-react';

const AdminAnalytics = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const demandHeatmap = [
    { area: 'Karur North', demand: 'HIGH 🔴', specialty: 'Plumbing', color: 'text-red-400', mapColor: 'fill-red-500/25 stroke-red-500' },
    { area: 'Karur South', demand: 'MEDIUM 🟡', specialty: 'Electrical', color: 'text-yellow-400', mapColor: 'fill-yellow-500/25 stroke-yellow-500' },
    { area: 'Karur East', demand: 'LOW 🟢', specialty: 'Gardening', color: 'text-emerald-400', mapColor: 'fill-emerald-500/25 stroke-emerald-500' }
  ];

  const serviceDemand = [
    { label: 'Plumbing Service Demand', value: '45%', pct: 45, color: 'bg-red-500' },
    { label: 'Electrical Repair Demand', value: '35%', pct: 35, color: 'bg-amber-500' },
    { label: 'Deep Clean Services', value: '20%', pct: 20, color: 'bg-emerald-500' }
  ];

  const metrics = [
    { label: 'Worker Partner Growth', value: '+18%', desc: 'Registered Q3 2026' },
    { label: 'Weekly Active Bookings', value: '142', desc: 'Active tasks logs' },
    { label: 'Platform Revenue Share (5%)', value: '₹24,500', desc: 'Direct ledger fee allocations' },
    { label: 'Average Ratings Stands', value: '4.85 ★', desc: '1.2k customer votes' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-5xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-8 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Analytics & Heatmaps</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5" /> Registry Insights</Badge>
        </header>

        {/* Numeric stats cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((item, idx) => (
            <div key={idx} className="p-5 rounded-2xl glassmorphism border border-white/5 space-y-1.5 text-left">
              <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono font-medium">{item.label}</span>
              <h3 className="text-xl sm:text-2xl font-bold text-white mt-1">{item.value}</h3>
              <p className="text-[10px] text-gray-500 font-light mt-1">{item.desc}</p>
            </div>
          ))}
        </div>

        {/* Charts & Heatmap Sections */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          
          {/* Heatmap visual layout */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Location Demand Heatmap</h3>
              <p className="text-[10px] text-gray-500">Dispatch nodes density calibrations</p>
            </div>

            {/* SVG Visual map of Karur sectors */}
            <div className="relative h-64 bg-[#07070f] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
              <div className="absolute inset-0 bg-grid-pattern opacity-10" />
              
              <svg width="85%" height="85%" viewBox="0 0 400 200" className="relative z-10 overflow-visible">
                {/* Sector 1: Karur North (High demand) */}
                <path d="M 50 20 L 180 20 L 150 100 L 50 100 Z" className="fill-red-500/15 stroke-red-500 stroke-2" strokeDasharray="3,3" />
                <text x="100" y="60" fill="#f87171" fontSize="10" fontWeight="bold" textAnchor="middle">Karur North (🔴 HIGH)</text>

                {/* Sector 2: Karur South (Medium demand) */}
                <path d="M 180 20 L 350 20 L 320 100 L 150 100 Z" className="fill-yellow-500/15 stroke-yellow-500 stroke-2" strokeDasharray="3,3" />
                <text x="250" y="60" fill="#facc15" fontSize="10" fontWeight="bold" textAnchor="middle">Karur South (🟡 MEDIUM)</text>

                {/* Sector 3: Karur East (Low demand) */}
                <path d="M 100 100 L 300 100 L 250 180 L 150 180 Z" className="fill-emerald-500/15 stroke-emerald-500 stroke-2" strokeDasharray="3,3" />
                <text x="200" y="140" fill="#34d399" fontSize="10" fontWeight="bold" textAnchor="middle">Karur East (🟢 LOW)</text>
              </svg>
            </div>

            {/* Text description listing */}
            <div className="space-y-2 text-xs">
              {demandHeatmap.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center bg-black/20 p-2.5 rounded-xl border border-white/5">
                  <span className="font-semibold text-white">{item.area} ({item.specialty} focus)</span>
                  <span className={`font-mono text-[10px] font-bold ${item.color}`}>Demand: {item.demand}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Service demand parameters bars */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Service Category Demand Allocations</h3>
              <p className="text-[10px] text-gray-500">Cooperative category volumes</p>
            </div>

            <div className="space-y-4 pt-2">
              {serviceDemand.map((item, idx) => (
                <div key={idx} className="space-y-1.5 text-xs">
                  <div className="flex justify-between font-semibold">
                    <span className="text-gray-300">{item.label}</span>
                    <span className="text-white">{item.value}</span>
                  </div>
                  <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full overflow-hidden">
                    <div className={`${item.color} h-full`} style={{ width: `${item.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;
