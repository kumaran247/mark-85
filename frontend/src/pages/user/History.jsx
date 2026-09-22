import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Clock, CheckCircle2, XCircle, Search, SlidersHorizontal } from 'lucide-react';

const UserHistory = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();
  
  const [filter, setFilter] = useState('All');

  const historyItems = [
    { id: 'bk_123', service: 'Plumbing', worker: 'Arun Kumar', date: '25 Aug 2026', price: 510, status: 'Completed' },
    { id: 'bk_124', service: 'Electrical Works', worker: 'Marcus Vance', date: '18 Aug 2026', price: 750, status: 'Completed' },
    { id: 'bk_125', service: 'House Cleaning', worker: 'Julius Diaz', date: '10 Aug 2026', price: 350, status: 'Completed' },
    { id: 'bk_126', service: 'Gardening Repair', worker: 'Sunita Patel', date: '04 Aug 2026', price: 400, status: 'Cancelled' },
    { id: 'bk_127', service: 'Cabinet Assembly', worker: 'Jordan Brooks', date: '01 Aug 2026', price: 600, status: 'Pending' }
  ];

  const filteredItems = useMemo(() => {
    if (filter === 'All') return historyItems;
    return historyItems.filter((item) => item.status === filter);
  }, [filter]);

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-3xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/user/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Service History</h1>
          </div>
          
          {/* Query Filter tabs */}
          <div className="flex gap-1 bg-black/40 border border-white/5 p-1 rounded-xl">
            {['All', 'Completed', 'Cancelled', 'Pending'].map((opt) => (
              <button
                key={opt}
                onClick={() => setFilter(opt)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold cursor-pointer transition-all ${
                  filter === opt ? 'bg-coop-600 text-white' : 'text-gray-500 hover:text-white'
                }`}
              >
                {opt}
              </button>
            ))}
          </div>
        </header>

        <div className="space-y-4">
          {filteredItems.map((item) => (
            <div 
              key={item.id}
              className="p-5 rounded-2xl glassmorphism border-white/5 hover:border-white/10 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-sm"
            >
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <h3 className="text-base font-bold text-white">{item.service}</h3>
                  <Badge 
                    variant={
                      item.status === 'Completed' 
                        ? 'success' 
                        : item.status === 'Cancelled'
                        ? 'warning'
                        : 'info'
                    }
                    className="text-[9px] font-mono tracking-wider"
                  >
                    {item.status === 'Completed' ? 'Completed ✓' : item.status}
                  </Badge>
                </div>
                <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-gray-400">
                  <span>Worker: <strong className="text-white font-medium">{item.worker}</strong></span>
                  <span>•</span>
                  <span>Date: {item.date}</span>
                  <span>•</span>
                  <span className="text-emerald-400 font-semibold">₹{item.price}</span>
                </div>
              </div>

              {/* Action shortcuts */}
              <div className="flex gap-2.5 shrink-0">
                <Button 
                  variant="outline" 
                  className="text-[10px] py-1.5 px-3"
                  onClick={() => navigate(`/user/booking/${item.id}`)}
                >
                  View Details
                </Button>
                
                {item.status === 'Completed' && (
                  <>
                    <Button 
                      variant="secondary" 
                      className="text-[10px] py-1.5 px-3"
                      onClick={() => navigate(`/user/bills/${item.id}`)}
                    >
                      View Bill
                    </Button>
                    <Button 
                      variant="primary" 
                      className="text-[10px] py-1.5 px-3"
                      onClick={() => navigate(`/user/rating/${item.id}`)}
                    >
                      Rate
                    </Button>
                  </>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserHistory;
