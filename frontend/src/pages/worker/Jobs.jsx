import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Clock, MapPin, IndianRupee, ShieldAlert, Sparkles } from 'lucide-react';

const WorkerJobs = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [jobs, setJobs] = useState([
    {
      id: 'bk_128',
      service: 'Plumbing',
      customer: 'Ravi',
      distance: 2.4,
      rate: 450,
      requestedTime: '2:30 PM',
      location: 'Sector 4, Indiranagar',
      description: 'Kitchen sink tap dripping continuously, causing water collection.'
    },
    {
      id: 'bk_129',
      service: 'Electrical Repair',
      customer: 'Priya Sen',
      distance: 1.8,
      rate: 550,
      requestedTime: '3:00 PM',
      location: 'Sector 2, Indiranagar',
      description: 'Inverter output socket failed. Need switchboard inspection.'
    }
  ]);

  const [notification, setNotification] = useState('');

  const handleAccept = (jobId, customer) => {
    setNotification(`Job request accepted! Dispatch navigation active for ${customer}.`);
    setTimeout(() => {
      setNotification('');
      navigate(`/worker/jobs/${jobId}`);
    }, 2000);
  };

  const handleReject = (jobId) => {
    setJobs((prev) => prev.filter((job) => job.id !== jobId));
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
              onClick={() => navigate('/worker/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Requests Board</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1.5"><Sparkles className="w-3.5 h-3.5 text-coop-400" /> {jobs.length} Matching Gigs</Badge>
        </header>

        {notification && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl animate-pulse-slow">
            {notification}
          </div>
        )}

        <div className="space-y-4">
          {jobs.length === 0 ? (
            <div className="p-12 text-center text-gray-500 rounded-2xl bg-white/5 border border-white/5">
              No matching client requests found in your service area.
            </div>
          ) : (
            jobs.map((job) => (
              <div 
                key={job.id}
                className="p-6 rounded-2xl glassmorphism border-white/5 hover:border-white/10 transition-all flex flex-col justify-between gap-6 shadow-sm text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-6">
                  <Badge variant="primary" className="font-mono text-[9px]">{job.id}</Badge>
                </div>

                <div className="space-y-3">
                  <span className="text-[10px] text-coop-400 uppercase font-mono font-bold">New Request Match</span>
                  <h3 className="text-lg font-bold text-white leading-tight">{job.service} Service</h3>
                  
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs text-gray-400 pt-2 border-t border-white/5">
                    <div>
                      <span className="block text-[10px] text-gray-500">Customer</span>
                      <strong className="text-white">{job.customer}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500">Distance</span>
                      <strong className="text-white flex items-center gap-0.5"><MapPin className="w-3.5 h-3.5 text-emerald-400" /> {job.distance} km</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500">Requested time</span>
                      <strong className="text-white flex items-center gap-0.5"><Clock className="w-3.5 h-3.5 text-amber-400" /> {job.requestedTime}</strong>
                    </div>
                    <div>
                      <span className="block text-[10px] text-gray-500">Est. payout</span>
                      <strong className="text-emerald-400">₹{job.rate}</strong>
                    </div>
                  </div>
                </div>

                <div className="flex gap-3 justify-end border-t border-white/5 pt-4">
                  <Button variant="secondary" className="text-xs py-2 px-4" onClick={() => handleReject(job.id)}>
                    Reject
                  </Button>
                  <Button variant="outline" className="text-xs py-2 px-4" onClick={() => navigate(`/worker/jobs/${job.id}`)}>
                    View Details
                  </Button>
                  <Button variant="primary" className="text-xs py-2 px-4" onClick={() => handleAccept(job.id, job.customer)}>
                    Accept
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default WorkerJobs;
