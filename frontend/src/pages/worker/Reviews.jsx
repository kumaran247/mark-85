import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Star, MessageSquare } from 'lucide-react';

const WorkerReviews = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const breakdowns = [
    { label: 'Work Quality', rating: 4.9, pct: 98, color: 'bg-emerald-500' },
    { label: 'Professionalism', rating: 4.8, pct: 95, color: 'bg-coop-500' },
    { label: 'Communication', rating: 4.9, pct: 97, color: 'bg-coop-500' },
    { label: 'Punctuality', rating: 4.7, pct: 92, color: 'bg-amber-500' },
    { label: 'Price Fairness', rating: 4.8, pct: 96, color: 'bg-emerald-500' }
  ];

  const clientReviews = [
    { customer: 'Ravi', rating: 5, date: '25 Aug 2026', comment: 'Arun resolved my kitchen sink leak quickly. He explained the standard ledger pricing and was extremely professional.' },
    { customer: 'Sonia', rating: 4, date: '20 Aug 2026', comment: 'Installed the faucet. Great work quality but arrived 10 mins late due to traffic. Highly recommended.' },
    { customer: 'Rohan', rating: 5, date: '12 Aug 2026', comment: 'Outstanding plumbing support. Checked all bathrooms leaks and didn’t charge extra. Cooperative ethics at its best!' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-3xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/worker/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Ratings & Reviews</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1.5"><Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> Overall: 4.8 ★</Badge>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
          {/* Rating parameters breakdown */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Parameters Breakdown</h3>
            {breakdowns.map((item, idx) => (
              <div key={idx} className="space-y-1 text-xs">
                <div className="flex justify-between font-semibold">
                  <span className="text-gray-300">{item.label}</span>
                  <span className="text-white">{item.rating} ★</span>
                </div>
                <div className="w-full bg-white/5 border border-white/5 h-1.5 rounded-full overflow-hidden">
                  <div className={`${item.color} h-full`} style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>

          {/* Customer Reviews feed */}
          <div className="space-y-4">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Customer Logs Feedback</h3>
            <div className="space-y-3 max-h-72 overflow-y-auto pr-2">
              {clientReviews.map((item, idx) => (
                <div key={idx} className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-2 text-left">
                  <div className="flex justify-between items-center text-xs">
                    <span className="font-bold text-white">{item.customer}</span>
                    <div className="flex text-amber-400 font-mono">
                      {item.rating} ★
                    </div>
                  </div>
                  <p className="text-[11px] text-gray-400 leading-relaxed font-light font-sans">"{item.comment}"</p>
                  <span className="text-[9px] text-gray-500 block text-right font-mono">{item.date}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerReviews;
