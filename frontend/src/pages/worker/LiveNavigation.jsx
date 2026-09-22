import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Navigation2, MapPin, CheckCircle2, Navigation, AlertCircle } from 'lucide-react';

const WorkerNavigation = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signout } = useAuth();
  
  const [distance, setDistance] = useState(2.4);
  const [eta, setEta] = useState(12);
  const [progress, setProgress] = useState(0);
  const [journeyStarted, setJourneyStarted] = useState(false);
  const [statusMsg, setStatusMsg] = useState('Awaiting journey start...');

  const intervalRef = useRef(null);

  const handleStartJourney = () => {
    setJourneyStarted(true);
    setStatusMsg('Alert: Journey started. Customer notified.');
    
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 10;
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setDistance(0);
          setEta(0);
          setStatusMsg('Destination reached! Customer notified of your arrival. You can now complete the job and submit the bill.');
          return 100;
        }
        setDistance(Number((2.4 * (1 - next / 100)).toFixed(1)));
        setEta(Math.round(12 * (1 - next / 100)));
        return next;
      });
    }, 1500);
  };

  const handleButtonClick = () => {
    if (!journeyStarted) {
      handleStartJourney();
    } else if (progress === 100) {
      // Completed job - navigate to worker dashboard or jobs queue
      navigate(`/worker/jobs`);
    }
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.12} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-center">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate(`/worker/jobs`)}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Jobs</span>
        </header>

        <div className="text-left space-y-1.5 border-b border-white/5 pb-4">
          <Badge variant="primary" className="font-mono">Route Tracker ID: {id || 'bk_128'}</Badge>
          <h1 className="text-2xl font-bold text-white">Live Navigation</h1>
          <div className="flex gap-4 text-xs font-semibold text-gray-400">
            <span className="text-emerald-400">{distance} km away</span>
            <span>•</span>
            <span className="text-coop-300">Arrival ETA: {eta} min</span>
          </div>
        </div>

        {/* SVG Route Map */}
        <div className="relative h-64 bg-[#07070f] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center shadow-inner">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          <svg width="80%" height="80%" viewBox="0 0 400 200" className="relative z-10 overflow-visible">
            <path d="M 0 50 L 400 50 M 0 150 L 400 150 M 100 0 L 100 200 M 300 0 L 300 200" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="4" />
            <path d="M 80 150 Q 200 110 320 50" fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="6" strokeLinecap="round" />
            <path d="M 80 150 Q 200 110 320 50" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6, 4" strokeLinecap="round" />

            {/* Customer location */}
            <g transform="translate(80, 150)">
              <circle cx="0" cy="0" r="10" fill="#10b981" className="animate-ping opacity-75" />
              <circle cx="0" cy="0" r="6" fill="#10b981" />
              <text y="-14" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">Client Location</text>
            </g>

            {/* Worker Pin location tracing progress */}
            {(() => {
              const t = progress / 100;
              const x = (1 - t) * (1 - t) * 320 + 2 * (1 - t) * t * 200 + t * t * 80;
              const y = (1 - t) * (1 - t) * 50 + 2 * (1 - t) * t * 110 + t * t * 150;
              return (
                <g transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="16" fill="rgba(139,92,246,0.2)" className="animate-ping" />
                  <circle cx="0" cy="0" r="8" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" />
                  <text y="-16" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">You</text>
                </g>
              );
            })()}
          </svg>
        </div>

        {statusMsg && (
          <div className="p-4 bg-white/5 border border-white/5 rounded-2xl text-xs text-left text-gray-300 flex items-start gap-2.5 leading-normal">
            <AlertCircle className="w-4.5 h-4.5 text-coop-400 shrink-0 mt-0.5" />
            <span>{statusMsg}</span>
          </div>
        )}

        <Button 
          variant="primary" 
          className="w-full py-3 font-semibold text-sm" 
          onClick={handleButtonClick}
          disabled={journeyStarted && progress < 100}
        >
          {journeyStarted 
            ? (progress === 100 ? 'Complete Work & Generate Bill' : 'Transit Active...') 
            : 'Start Journey'}
        </Button>
      </div>
    </div>
  );
};

export default WorkerNavigation;
