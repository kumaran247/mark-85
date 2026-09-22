import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { 
  Sparkles, CheckCircle2, ShieldCheck, MapPin, Star, Clock, 
  ArrowLeft, X, Phone, MessageSquare, IndianRupee, Navigation 
} from 'lucide-react';

const AIRecommendations = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [inputVal, setInputVal] = useState('');
  const [matchStep, setMatchStep] = useState(0); // 0: Input, 1: Scanning, 2: Complete
  const [activeChecklist, setActiveChecklist] = useState([]);
  
  // Tracking modal simulation states
  const [assignedWorker, setAssignedWorker] = useState(null);
  const [trackingDistance, setTrackingDistance] = useState(1.8);
  const [trackingETA, setTrackingETA] = useState(10);
  const [progressPercent, setProgressPercent] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState('Dispatching match request...');
  const [acceptanceState, setAcceptanceState] = useState(0);

  const intervalRef = useRef(null);

  const analysisSteps = [
    { text: 'Service identified: Plumbing', val: 'Plumbing' },
    { text: 'Location coordinates identified', val: 'Sector 4, Indiranagar' },
    { text: 'Urgency tier assessed: Medium', val: 'Medium' },
    { text: 'Worker availability scanned', val: '6 online' },
    { text: 'Worker distance paths calculated', val: 'Calibrated' },
    { text: 'Cooperative rating weights analyzed', val: 'Weighted' },
    { text: 'Standard price bounds estimated', val: '₹350 onwards' }
  ];

  const handleStartMatch = (e) => {
    e.preventDefault();
    if (!inputVal.trim()) return;

    setMatchStep(1);
    setActiveChecklist([]);

    if (intervalRef.current) clearInterval(intervalRef.current);

    // Sequentially run loading logs
    let index = 0;
    intervalRef.current = setInterval(() => {
      if (index < analysisSteps.length) {
        setActiveChecklist((prev) => [...prev, analysisSteps[index]]);
        index++;
      } else {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
        setTimeout(() => setMatchStep(2), 600);
      }
    }, 600);
  };

  const handleAssignWork = (worker) => {
    setAssignedWorker(worker);
    setTrackingDistance(worker.distance);
    setTrackingETA(worker.arrivalMins);
    setProgressPercent(0);
    setTrackingStatus('Request sent...');
    setAcceptanceState(0);

    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let counter = 0;
    intervalRef.current = setInterval(() => {
      counter += 1;
      if (counter === 1) {
        setAcceptanceState(1); // Viewed request
        setTrackingStatus('Worker viewed request...');
      } else if (counter === 2) {
        setAcceptanceState(2); // Worker accepted
        setTrackingStatus('Request accepted! Worker en-route 🚗');
      } else if (counter >= 3) {
        setProgressPercent((prev) => {
          const next = prev + 20;
          if (next >= 100) {
            clearInterval(intervalRef.current);
            setTrackingStatus('Worker Arrived! 📍');
            setTrackingDistance(0);
            setTrackingETA(0);
            return 100;
          }
          setTrackingDistance((d) => Math.max(0, (worker.distance * (1 - next / 100)).toFixed(1)));
          setTrackingETA((eta) => Math.max(0, Math.round(worker.arrivalMins * (1 - next / 100))));
          return next;
        });
      }
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const bestMatch = {
    name: 'Arun',
    match: 96,
    avatar: '👷',
    distance: 1.8,
    rating: 4.9,
    experience: 7,
    arrivalMins: 10,
    rate: 350,
    role: 'Plumber',
    bio: 'Professional plumber specializing in bathroom fixture maintenance, leak control, and drain cleaning.'
  };

  const alternatives = [
    { name: 'Elena Rostova', match: 92, avatar: '👩‍🔧', distance: 2.4, rating: 4.9, experience: 6, arrivalMins: 12, rate: 500, role: 'Plumber' },
    { name: 'Sunita Patel', match: 88, avatar: '🌿', distance: 1.5, rating: 4.9, experience: 4, arrivalMins: 10, rate: 400, role: 'Gardener' },
    { name: 'Jordan Brooks', match: 84, avatar: '🔨', distance: 2.9, rating: 5.0, experience: 12, arrivalMins: 25, rate: 600, role: 'Carpenter' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.15} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        {matchStep === 0 && (
          <div className="max-w-xl mx-auto rounded-3xl glassmorphism border-white/5 p-8 shadow-2xl space-y-6 text-left">
            <div className="space-y-2">
              <Badge variant="primary" className="flex items-center gap-1.5 w-fit"><Sparkles className="w-3.5 h-3.5 text-coop-400" /> AI Cooperative Matcher</Badge>
              <h1 className="text-3xl font-bold text-white">What do you need help with?</h1>
              <p className="text-sm text-gray-400">Describe the issue in your own words, and our transparent algorithm will match verified co-op partners.</p>
            </div>

            <form onSubmit={handleStartMatch} className="space-y-4">
              <textarea
                placeholder="Describe your request..."
                value={inputVal}
                onChange={(e) => setInputVal(e.target.value)}
                rows="4"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-coop-500 text-sm leading-relaxed"
                required
              />

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setInputVal('My kitchen tap is leaking.')}
                  className="text-xs px-3 py-1.5 rounded-lg bg-white/5 border border-white/5 hover:bg-white/10 transition-colors text-gray-300 cursor-pointer"
                >
                  Try: "My kitchen tap is leaking."
                </button>
              </div>

              <Button type="submit" variant="primary" className="w-full py-3 font-semibold text-sm">
                Analyze & Find Matches
              </Button>
            </form>
          </div>
        )}

        {matchStep === 1 && (
          <div className="max-w-md mx-auto rounded-3xl glassmorphism border-white/5 p-8 shadow-2xl space-y-6 text-left">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <h2 className="text-sm font-mono font-bold text-coop-400 flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 animate-spin text-coop-400" /> AI ANALYZING REQUEST...
              </h2>
              <span className="text-[10px] text-gray-500">Processing vectors...</span>
            </div>

            {/* Simulated verification step log */}
            <div className="space-y-3.5 min-h-[220px]">
              {activeChecklist.map((step, idx) => {
                if (!step) return null;
                return (
                  <div key={idx} className="flex items-center gap-2.5 text-sm text-gray-300 animate-pulse-slow">
                    <CheckCircle2 className="w-4.5 h-4.5 text-emerald-400 shrink-0" />
                    <span>{step.text}</span>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {matchStep === 2 && (
          <div className="space-y-8">
            <div className="text-center space-y-2">
              <Badge variant="primary" className="mx-auto flex items-center gap-1 w-fit">
                <Sparkles className="w-3.5 h-3.5 text-coop-400" /> Matches Found
              </Badge>
              <h2 className="text-3xl font-bold text-white">AI Recommended Workers</h2>
              <p className="text-sm text-gray-400">Cooperative matching complete. Select your preferred partner.</p>
            </div>

            {/* Best Match Deck */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Highlight Card */}
              <div className="lg:col-span-2 rounded-3xl bg-gradient-to-tr from-coop-950/40 via-white/5 to-white/5 border border-coop-500/30 p-8 text-left space-y-6 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 p-6">
                  <span className="px-4 py-1.5 rounded-full text-xs font-bold font-mono text-emerald-400 bg-emerald-500/10 border border-emerald-500/20">
                    BEST MATCH — {bestMatch.match}%
                  </span>
                </div>

                <div className="flex gap-5 items-start">
                  <div className="w-20 h-20 rounded-2xl bg-coop-500/10 flex items-center justify-center text-5xl">
                    {bestMatch.avatar}
                  </div>
                  <div className="space-y-1">
                    <span className="inline-flex items-center gap-1 text-[10px] text-coop-400 font-bold bg-coop-500/5 px-2.5 py-0.5 rounded border border-coop-500/10">
                      <ShieldCheck className="w-3.5 h-3.5" /> Verified ✓
                    </span>
                    <h3 className="text-2xl font-bold text-white">{bestMatch.name}</h3>
                    <p className="text-sm text-gray-400">{bestMatch.role} Specialist</p>
                  </div>
                </div>

                <p className="text-sm text-gray-300 leading-relaxed bg-black/20 p-4 rounded-xl border border-white/5">
                  {bestMatch.bio}
                </p>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs font-semibold">
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="text-gray-500 block">Distance</span>
                    <span className="text-sm text-white">{bestMatch.distance} km</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="text-gray-500 block">Rating</span>
                    <span className="text-sm text-white flex items-center gap-1">
                      <Star className="w-3.5 h-3.5 text-amber-400 fill-amber-400" /> {bestMatch.rating}
                    </span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="text-gray-500 block">Experience</span>
                    <span className="text-sm text-white">{bestMatch.experience} years</span>
                  </div>
                  <div className="bg-white/5 p-3 rounded-xl">
                    <span className="text-gray-500 block">Arrival</span>
                    <span className="text-sm text-emerald-400 font-bold">{bestMatch.arrivalMins} min</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-6 flex items-center justify-between">
                  <div>
                    <span className="text-[10px] text-gray-500 uppercase font-mono block">Estimated Cost</span>
                    <span className="text-lg font-bold text-white">₹{bestMatch.rate}</span>
                  </div>
                  <Button variant="primary" className="text-sm px-6 py-2.5" onClick={() => handleAssignWork(bestMatch)}>
                    Assign Work
                  </Button>
                </div>
              </div>

              {/* Alternatives List */}
              <div className="lg:col-span-1 space-y-4 text-left">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Alternative Matches</h4>
                {alternatives.map((worker, idx) => (
                  <div 
                    key={idx}
                    className="p-5 rounded-2xl glassmorphism border-white/5 hover:border-white/10 transition-all text-left flex justify-between items-center group shadow-md"
                  >
                    <div className="flex gap-3 items-center">
                      <div className="w-10 h-10 rounded-lg bg-coop-500/10 flex items-center justify-center text-xl">
                        {worker.avatar}
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white">{worker.name}</h4>
                        <span className="text-[10px] text-gray-400">{worker.role} • {worker.distance} km away</span>
                      </div>
                    </div>
                    <div className="text-right flex flex-col items-end gap-1.5">
                      <span className="text-[10px] font-bold font-mono text-coop-400 bg-coop-500/5 px-2 py-0.5 rounded border border-coop-500/10">
                        {worker.match}% Match
                      </span>
                      <button 
                        onClick={() => handleAssignWork(worker)}
                        className="text-[10px] text-white hover:underline cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5"
                      >
                        Assign
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Live Map Dispatch Overlay */}
      {assignedWorker && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl glassmorphism border-white/10 p-6 md:p-8 space-y-6 relative overflow-hidden text-center shadow-2xl">
            <button 
              onClick={() => {
                setAssignedWorker(null);
                if (intervalRef.current) clearInterval(intervalRef.current);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer bg-white/5 p-1.5 rounded-lg border border-white/5 z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Map Header Status */}
            <div className="text-left space-y-2">
              <Badge variant="primary" className="font-mono">{trackingStatus}</Badge>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold text-white">{assignedWorker.name}</h3>
                  <p className="text-xs text-gray-400">Co-op Assigned Specialty: {assignedWorker.role}</p>
                </div>
                <div className="text-right">
                  <span className="block text-xl font-bold text-emerald-400 animate-pulse-slow">
                    {trackingDistance} km away
                  </span>
                  <span className="text-xs text-gray-400">
                    Est. arrival: {trackingETA} mins
                  </span>
                </div>
              </div>
            </div>

            {/* SVG roadmap path tracing progress or Acceptance checklist state */}
            {acceptanceState < 2 ? (
              <div className="p-8 rounded-2xl bg-white/5 border border-white/5 space-y-6 text-left relative overflow-hidden">
                <div className="flex items-center gap-3 animate-pulse-slow">
                  <div className="w-12 h-12 rounded-2xl bg-coop-500/10 flex items-center justify-center text-2xl shrink-0">
                    ✉️
                  </div>
                  <div>
                    <h4 className="text-base font-bold text-white">Waiting for {assignedWorker.name} to accept...</h4>
                    <span className="text-xs text-gray-500 font-medium font-mono">REQUEST SENT ➔ AWAITING TRUSTEE LOCK</span>
                  </div>
                </div>

                <div className="space-y-4 border-t border-white/5 pt-5 text-sm font-semibold">
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">●</span>
                    <span className="text-white">Notification sent</span>
                  </div>
                  <div className="flex items-center gap-3">
                    {acceptanceState >= 1 ? (
                      <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center text-xs">●</span>
                    ) : (
                      <span className="w-5 h-5 rounded-full bg-white/5 text-gray-600 flex items-center justify-center text-xs">○</span>
                    )}
                    <span className={acceptanceState >= 1 ? "text-white" : "text-gray-500"}>Worker viewed request</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="w-5 h-5 rounded-full bg-white/5 text-gray-600 flex items-center justify-center text-xs animate-ping">○</span>
                    <span className="text-gray-500">Worker acceptance</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="relative h-64 bg-[#07070f] border border-white/5 rounded-2xl overflow-hidden flex items-center justify-center">
                <div className="absolute inset-0 bg-grid-pattern opacity-10" />
                
                <svg width="80%" height="80%" viewBox="0 0 400 200" className="relative z-10 overflow-visible">
                  <path d="M 0 50 L 400 50 M 0 150 L 400 150 M 100 0 L 100 200 M 300 0 L 300 200" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="4" />
                  <path d="M 80 150 Q 200 110 320 50" fill="none" stroke="rgba(139, 92, 246, 0.15)" strokeWidth="6" strokeLinecap="round" />
                  <path d="M 80 150 Q 200 110 320 50" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6, 4" strokeLinecap="round" />

                  <g transform="translate(80, 150)">
                    <circle cx="0" cy="0" r="10" fill="#10b981" className="animate-ping opacity-75" />
                    <circle cx="0" cy="0" r="6" fill="#10b981" />
                    <text y="-14" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold">📍 You</text>
                  </g>

                  {(() => {
                    const t = 1 - (progressPercent / 100);
                    const x = (1 - t) * (1 - t) * 80 + 2 * (1 - t) * t * 200 + t * t * 320;
                    const y = (1 - t) * (1 - t) * 150 + 2 * (1 - t) * t * 110 + t * t * 50;
                    return (
                      <g transform={`translate(${x}, ${y})`}>
                        <circle cx="0" cy="0" r="16" fill="rgba(139,92,246,0.2)" className="animate-ping" />
                        <rect x="-10" y="-10" width="20" height="20" rx="4" fill="#8b5cf6" />
                        <text x="0" y="4" textAnchor="middle" fontSize="12">🚗</text>
                        <text y="-16" textAnchor="middle" fill="#a78bfa" fontSize="10" fontWeight="bold">Worker</text>
                      </g>
                    );
                  })()}
                </svg>
              </div>
            )}

            {/* Tracking Progress Indicator Bar */}
            <div className="space-y-1 text-left">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Dispatch Node</span>
                <span>En-Route Destination</span>
              </div>
              <div className="w-full bg-white/5 border border-white/5 h-2 rounded-full overflow-hidden">
                <div 
                  className="bg-coop-500 h-full transition-all duration-500" 
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Secure direct chat options */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-coop-500/10 flex items-center justify-center text-xl shrink-0">
                💬
              </div>
              <div className="text-left grow">
                <span className="text-xs text-gray-500 block">Direct Secure Chat</span>
                <span className="text-sm font-semibold text-white">Coordinate entrance codes</span>
              </div>
              <div className="flex gap-2">
                <Button variant="secondary" className="px-3.5 py-2 text-xs flex items-center gap-1">
                  <Phone className="w-3.5 h-3.5" /> Call
                </Button>
                <Button variant="secondary" className="px-3.5 py-2 text-xs flex items-center gap-1">
                  <MessageSquare className="w-3.5 h-3.5" /> Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AIRecommendations;
