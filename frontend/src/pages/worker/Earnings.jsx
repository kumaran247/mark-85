import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, TrendingUp, ShieldCheck, DollarSign, Calendar, Sparkles } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const WorkerEarnings = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const metrics = [
    { label: "Today's Earnings", value: '₹1,250', desc: 'Direct wallet transfers' },
    { label: 'This Month Payouts', value: '₹24,500', desc: 'August member earnings' },
    { label: 'Completed Jobs', value: '47', desc: 'Total tasks completed' },
    { label: 'Average Job Value', value: '₹521', desc: 'Gross payout average' }
  ];

  const weeklyData = [
    { day: 'Mon', amount: 800 },
    { day: 'Tue', amount: 1250 },
    { day: 'Wed', amount: 0 },
    { day: 'Thu', amount: 1500 },
    { day: 'Fri', amount: 950 },
    { day: 'Sat', amount: 1800 },
    { day: 'Sun', amount: 450 }
  ];

  const serviceCategories = [
    { category: 'Plumbing Works', count: 28, pct: 60, color: 'bg-coop-500' },
    { category: 'Sanitization Deep Checks', count: 12, pct: 25, color: 'bg-emerald-500' },
    { category: 'Emergency Callouts', count: 7, pct: 15, color: 'bg-amber-500' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-4xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-8 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/worker/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Earnings & Ledgers</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1.5"><TrendingUp className="w-3.5 h-3.5 text-coop-400" /> Shareholder Ledger</Badge>
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

        {/* Charts Sections: Custom CSS bars graphs */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Weekly Payouts Bar Chart */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Weekly Earnings Analytics</h3>
              <p className="text-[10px] text-gray-500">Calculated over active work days</p>
            </div>
            
            <div className="h-56 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="colorAmount" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" vertical={false} />
                  <XAxis 
                    dataKey="day" 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="rgba(255,255,255,0.3)" 
                    fontSize={10} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(v) => `₹${v}`}
                  />
                  <Tooltip 
                    contentStyle={{ 
                      background: 'rgba(10, 5, 20, 0.9)', 
                      border: '1px solid rgba(139, 92, 246, 0.2)', 
                      borderRadius: '12px', 
                      color: '#fff',
                      fontSize: '11px'
                    }}
                    itemStyle={{ color: '#a78bfa' }}
                    labelStyle={{ color: '#fff', fontWeight: 'bold' }}
                    formatter={(value) => [`₹${value}`, 'Earnings']}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="amount" 
                    stroke="#a78bfa" 
                    strokeWidth={3} 
                    fillOpacity={1} 
                    fill="url(#colorAmount)" 
                    dot={{ r: 4, stroke: '#a78bfa', strokeWidth: 2, fill: '#0a0712' }}
                    activeDot={{ r: 6, fill: '#a78bfa' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Job categories pie distribution equivalent bars */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6">
            <div className="space-y-1">
              <h3 className="text-sm font-bold text-white">Jobs by Service Category</h3>
              <p className="text-[10px] text-gray-500">Co-op activity distributions</p>
            </div>

            <div className="space-y-4 pt-2">
              {serviceCategories.map((item, idx) => (
                <div key={idx} className="space-y-1.5">
                  <div className="flex justify-between text-xs font-semibold">
                    <span className="text-gray-300">{item.category} ({item.count} jobs)</span>
                    <span className="text-white">{item.pct}%</span>
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

export default WorkerEarnings;
