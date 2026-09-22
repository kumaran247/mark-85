import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, CheckCircle2, Navigation2, Clock, MapPin, Sparkles, FileText, Camera } from 'lucide-react';

const WorkerJobDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signout } = useAuth();

  // Status timeline stages:
  // 0: Awaiting Acceptance, 1: Accepted, 2: On the Way, 3: Arrived, 4: Work Started, 5: Work Completed
  const [jobStatus, setJobStatus] = useState(1);
  const [notification, setNotification] = useState('');

  const mockJob = {
    id: id || 'bk_128',
    customer: 'Ravi',
    service: 'Plumbing Repair',
    problem: 'Kitchen sink tap dripping continuously, causing puddle collection near cabinet base.',
    location: 'Sector 4, Indiranagar, Bengaluru (Landmark: Near Co-op Bank)',
    estimatedPrice: 450,
    time: '2:30 PM today'
  };

  const handleStatusChange = (newStatus, msg) => {
    setJobStatus(newStatus);
    setNotification(`Status trigger: ${msg} notification dispatched to customer ${mockJob.customer}.`);
    
    if (newStatus === 5) {
      setTimeout(() => {
        navigate(`/user/bills/${mockJob.id}`);
      }, 1500);
    } else {
      setTimeout(() => setNotification(''), 4000);
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-2xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/worker/jobs')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Job Details</h1>
          </div>
          <Badge variant="primary" className="font-mono">{mockJob.id}</Badge>
        </header>

        {notification && (
          <div className="p-3 bg-coop-500/10 border border-coop-500/20 text-coop-300 text-xs font-semibold rounded-xl animate-pulse-slow">
            {notification}
          </div>
        )}

        {/* Client details deck */}
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Customer</span>
              <strong className="text-base text-white">{mockJob.customer}</strong>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Service Scope</span>
              <strong className="text-base text-white">{mockJob.service}</strong>
            </div>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1">
            <span className="text-[10px] text-gray-500 uppercase font-mono block">Reported Problem</span>
            <p className="text-xs text-gray-300 leading-relaxed">{mockJob.problem}</p>
          </div>

          <div className="bg-white/5 p-4 rounded-xl border border-white/5 flex items-start gap-2.5">
            <MapPin className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
            <div className="space-y-0.5">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Service Destination</span>
              <p className="text-xs text-gray-300">{mockJob.location}</p>
            </div>
          </div>

          {/* Photo slots mockup */}
          <div className="space-y-1.5 text-xs text-gray-400">
            <span className="text-[10px] text-gray-500 uppercase font-mono block">Customer Reference Photos</span>
            <div className="flex gap-2">
              <div className="w-16 h-16 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-500 text-sm hover:border-coop-500/20 cursor-pointer">
                <Camera className="w-5 h-5" />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4 border-t border-white/5">
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Est. Payout</span>
              <span className="text-lg font-bold text-white">₹{mockJob.estimatedPrice}</span>
            </div>
            <div>
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Preferred Time</span>
              <span className="text-sm font-semibold text-white">{mockJob.time}</span>
            </div>
          </div>
        </div>

        {/* Action Flow triggers */}
        <div className="border-t border-white/5 pt-6 space-y-3">
          <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono">Job Action Pipeline</span>
          
          <div className="grid grid-cols-2 gap-3">
            <Button 
              variant="outline" 
              className="text-xs py-2.5 font-semibold flex items-center justify-center gap-1.5"
              onClick={() => navigate(`/worker/navigation/${mockJob.id}`)}
            >
              <Navigation2 className="w-4 h-4 text-coop-400" /> Start Navigation Map
            </Button>

            <Button 
              variant={jobStatus === 1 ? 'primary' : 'secondary'}
              className="text-xs py-2.5 font-semibold"
              onClick={() => handleStatusChange(2, 'ACCEPTED (On the Way)')}
              disabled={jobStatus > 1}
            >
              Accept Job
            </Button>
            
            <Button 
              variant={jobStatus === 2 || jobStatus === 3 ? 'primary' : 'secondary'}
              className="text-xs py-2.5 font-semibold"
              onClick={() => handleStatusChange(4, 'WORK STARTED (Arrived)')}
              disabled={jobStatus !== 2 && jobStatus !== 3}
            >
              Start Work
            </Button>

            <Button 
              variant={jobStatus === 4 ? 'primary' : 'secondary'}
              className="text-xs py-2.5 font-semibold"
              onClick={() => handleStatusChange(5, 'WORK COMPLETED')}
              disabled={jobStatus !== 4}
            >
              Complete Work
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WorkerJobDetails;
