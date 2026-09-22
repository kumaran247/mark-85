import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Bell, Calendar, Sparkles, MessageSquare, AlertCircle } from 'lucide-react';

const UserNotifications = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const notifications = [
    { text: 'Please rate your worker', time: '10 mins ago', desc: 'Submit feedback for Arun Kumar to complete co-op records.', action: '/user/rating/bk_123', type: 'rate' },
    { text: 'Payment successful', time: '15 mins ago', desc: 'Transaction of ₹510 verified on ledger.', action: '/user/history', type: 'payment' },
    { text: 'Bill generated', time: '18 mins ago', desc: 'Invoice calibrated for Plumbing task. Grand Total: ₹510.', action: '/user/bills/bk_123', type: 'bill' },
    { text: 'Service completed', time: '40 mins ago', desc: 'Arun Kumar completed leak repair logs.', action: '/user/booking/bk_123', type: 'done' },
    { text: 'Worker is 5 minutes away', time: '1 hour ago', desc: 'Arun is approaching Sector 4, Indiranagar.', action: '/user/tracking/bk_123', type: 'tracking' },
    { text: 'Worker accepted your request', time: '1 hour ago', desc: 'Arun has locked your Plumbing match request.', action: '/user/booking/bk_123', type: 'accept' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/user/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Notifications</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1.5"><Bell className="w-3.5 h-3.5" /> 6 Alerts</Badge>
        </header>

        <div className="space-y-4">
          {notifications.map((item, idx) => (
            <div 
              key={idx}
              className="p-5 rounded-2xl glassmorphism border-white/5 hover:border-coop-500/20 transition-all duration-200 flex justify-between items-start gap-4 shadow-sm"
            >
              <div className="flex gap-4 items-start">
                <div className="w-10 h-10 rounded-xl bg-coop-500/10 flex items-center justify-center text-xl shrink-0">
                  🔔
                </div>
                <div className="space-y-1">
                  <h4 className="text-sm font-bold text-white flex items-center gap-2">
                    {item.text}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {item.desc}
                  </p>
                  <span className="text-[10px] text-gray-500 block font-mono font-medium">{item.time}</span>
                </div>
              </div>
              <Button 
                variant="outline" 
                className="text-[10px] py-1.5 px-3 shrink-0"
                onClick={() => navigate(item.action)}
              >
                Inspect
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default UserNotifications;
