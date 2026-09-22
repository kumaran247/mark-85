import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Sidebar from '../../components/common/Sidebar';
import CosmicGlowButton from '../../components/common/CosmicGlowButton';
import { 
  Search, MapPin, Star, ShieldCheck, CheckCircle2, 
  Settings, LogOut, X, Sparkles, Navigation, Phone, MessageSquare,
  LayoutDashboard, ClipboardList, MapPinned, CreditCard, ReceiptText,
  History, Bell, Heart, CircleHelp, UserRound, Clock3, AlertCircle,
  WalletCards, CalendarDays, BriefcaseBusiness, Plus, Minus, LocateFixed, Layers
} from 'lucide-react';

const UserDashboard = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();
  
  const [searchQuery, setSearchQuery] = useState('');
  const [locationStatus, setLocationStatus] = useState('');
  const [isDetecting, setIsDetecting] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedWorker, setSelectedWorker] = useState(null);
  
  // Live Tracking Module states
  const [trackingWorker, setTrackingWorker] = useState(null);
  const [trackingDistance, setTrackingDistance] = useState(2.4);
  const [trackingETA, setTrackingETA] = useState(12);
  const [progressPercent, setProgressPercent] = useState(0);
  const [trackingStatus, setTrackingStatus] = useState('Searching matching workers...');
  const [acceptanceState, setAcceptanceState] = useState(0);
  
  const intervalRef = useRef(null);

  const metrics = [
    { title: 'ACTIVE REQUEST', value: trackingWorker ? '1' : '0', desc: trackingWorker ? 'Worker en-route' : 'No active requests', icon: ClipboardList, color: trackingWorker ? 'border-coop-500/50 text-coop-400' : 'border-white/5 text-gray-400' },
    { title: 'UPCOMING SERVICE', value: '0', desc: 'No scheduled visits', icon: CalendarDays, color: 'border-white/5 text-sky-400' },
    { title: 'COMPLETED JOBS', value: '14', desc: 'All-time services', icon: CheckCircle2, color: 'border-white/5 text-emerald-400' },
    { title: 'TOTAL SPENT', value: '₹6,450', desc: 'Community service spending', icon: WalletCards, color: 'border-white/5 text-white' }
  ];

  const categories = [
    { id: 'All', label: 'All Services' },
    { id: 'Electrician', label: 'Electrician' },
    { id: 'Plumber', label: 'Plumber' },
    { id: 'Cleaner', label: 'Cleaner' },
    { id: 'Carpenter', label: 'Carpenter' },
    { id: 'Painter', label: 'Painter' },
    { id: 'Gardener', label: 'Gardener' },
    { id: 'Technician', label: 'Technician' },
    { id: 'Driver', label: 'Driver' }
  ];

  const workers = [
    {
      id: 'w1',
      name: 'Ramesh Kumar',
      role: 'Electrician',
      rating: 4.8,
      reviews: 142,
      distance: 1.8,
      rate: 450,
      avatar: '👨‍🔧',
      verified: true,
      bio: 'Over 8 years experience in smart home wiring, inverter installation, and safety checks.'
    },
    {
      id: 'w2',
      name: 'Elena Rostova',
      role: 'Plumber',
      rating: 4.9,
      reviews: 98,
      distance: 2.4,
      rate: 500,
      avatar: '👩‍🔧',
      verified: true,
      bio: 'Master Plumber specializing in copper piping, leak containment, and water heater servicing.'
    },
    {
      id: 'w3',
      name: 'Julius Diaz',
      role: 'Cleaner',
      rating: 4.7,
      reviews: 110,
      distance: 3.1,
      rate: 350,
      avatar: '🧹',
      verified: true,
      bio: 'Professional sanitization and deep cleaning certified associate.'
    },
    {
      id: 'w4',
      name: 'Jordan Brooks',
      role: 'Carpenter',
      rating: 5.0,
      reviews: 75,
      distance: 2.9,
      rate: 600,
      avatar: '🔨',
      verified: true,
      bio: 'Cabinet restoration and furniture assembly specialist.'
    },
    {
      id: 'w5',
      name: 'Amit Sharma',
      role: 'Painter',
      rating: 4.6,
      reviews: 84,
      distance: 4.2,
      rate: 550,
      avatar: '🎨',
      verified: true,
      bio: 'Interior custom paint and wall texture craftsman.'
    },
    {
      id: 'w6',
      name: 'Sunita Patel',
      role: 'Gardener',
      rating: 4.9,
      reviews: 62,
      distance: 1.5,
      rate: 400,
      avatar: '🌿',
      verified: true,
      bio: 'Horticulturist, specializing in native plant layouts and lawn maintenance.'
    }
  ];

  const handleUseLocation = () => {
    setIsDetecting(true);
    setLocationStatus('1. Current Location: Scanning coordinates...');
    
    setTimeout(() => {
      setLocationStatus('2. Nearby Workers: Scanning radius matches...');
      setTimeout(() => {
        setLocationStatus('3. Distance: Calculating ETA vectors...');
        setTimeout(() => {
          setLocationStatus('Location active: Coimbatore, Tamil Nadu. Pre-vetted matches loaded.');
          setIsDetecting(false);
        }, 800);
      }, 800);
    }, 800);
  };

  const handleBookRequest = (worker) => {
    setSelectedWorker(null);
    setTrackingWorker(worker);
    setTrackingDistance(2.4);
    setTrackingETA(12);
    setProgressPercent(0);
    setTrackingStatus('Request sent...');
    setAcceptanceState(0);

    // Simulate route tracking updates
    if (intervalRef.current) clearInterval(intervalRef.current);
    
    let counter = 0;
    intervalRef.current = setInterval(() => {
      counter += 1;
      if (counter === 1) {
        setAcceptanceState(1); // Viewed request
        setTrackingStatus('Worker viewed request...');
      } else if (counter === 2) {
        setAcceptanceState(2); // Accepted request
        setTrackingStatus('Request accepted! Worker en-route 🚗');
      } else if (counter >= 3) {
        // Progress car towards user
        setProgressPercent((prev) => {
          const next = prev + 10;
          if (next >= 100) {
            clearInterval(intervalRef.current);
            setTrackingStatus('Worker Arrived! 📍');
            setTrackingDistance(0);
            setTrackingETA(0);
            return 100;
          }
          
          // Calculate linear decrease
          setTrackingDistance((d) => Math.max(0, (2.4 * (1 - next / 100)).toFixed(1)));
          setTrackingETA((e) => Math.max(0, Math.round(12 * (1 - next / 100))));
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

  const filteredWorkers = workers.filter(worker => {
    const matchesCategory = selectedCategory === 'All' || worker.role === selectedCategory;
    const matchesSearch = worker.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          worker.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0a0712] via-[#05050c] to-black text-white flex">
      <Sidebar />
      <div className="grow overflow-y-auto h-screen">
      {/* Header */}
      <header className="glassmorphism sticky top-0 left-0 right-0 z-40 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-600 to-coop-400 flex items-center justify-center font-bold text-white shadow-lg">
            C
          </div>
          <span className="font-semibold text-lg text-white tracking-wider">
            Coop<span className="text-coop-400 font-bold">Gig</span>
          </span>
        </div>
        
        <div className="flex items-center gap-6">
          <div className="hidden md:flex items-center gap-2 text-xs text-gray-400">
            <MapPin className="w-4 h-4 text-coop-400 animate-pulse" />
            <div className="text-left leading-tight">
              <span className="block text-[9px] text-gray-500 font-bold uppercase tracking-wider">Location active</span>
              <span className="text-white font-medium">Coimbatore, Tamil Nadu</span>
            </div>
          </div>

          <button 
            onClick={() => navigate('/user/notifications')}
            className="relative p-2 rounded-xl bg-white/5 border border-white/5 text-gray-300 hover:text-white transition-colors cursor-pointer"
          >
            <Bell className="w-4 w-4" />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-coop-500" />
          </button>

          <div className="flex items-center gap-2.5 pl-4 border-l border-white/5">
            <div className="w-8 h-8 rounded-full bg-coop-500/20 border border-coop-500/30 flex items-center justify-center font-bold text-white text-xs">
              M
            </div>
            <div className="hidden sm:block text-left leading-none">
              <span className="block text-xs font-bold text-white">Mukesh</span>
              <span className="text-[9px] text-gray-500">Standard Member</span>
            </div>
            <button 
              onClick={signout}
              className="text-xs text-gray-400 hover:text-red-400 pl-2 cursor-pointer transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
        {/* Greetings Hero Section */}
        <div className="text-left space-y-3 flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-white/5 pb-6">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest block">GOOD MORNING</span>
            <h1 className="text-3xl md:text-5xl font-bold text-white tracking-tight">
              Good morning, Mukesh.
            </h1>
            <p className="text-gray-400 text-sm font-light">What can we help you get done today?</p>
          </div>

          <div className="flex items-center gap-2 bg-white/5 border border-white/5 px-3.5 py-1.5 rounded-full text-xs text-gray-400">
            <MapPin className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
            <span>Using your current location: <strong className="text-white font-medium">Coimbatore, TN</strong></span>
          </div>
        </div>

        {/* Service Search & AI Matcher Panel */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative grow">
              <Search className="absolute left-4 top-3.5 text-gray-500 w-5 h-5" />
              <input
                type="text"
                placeholder="Search for a service or describe what you need..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-12 pr-4 py-3.5 rounded-xl bg-black/40 border border-white/5 text-white placeholder-gray-500 focus:outline-none focus:border-coop-500 text-xs md:text-sm"
              />
            </div>
            <Button 
              variant="secondary" 
              onClick={handleUseLocation} 
              disabled={isDetecting}
              className="shrink-0 flex items-center gap-2 text-xs md:text-sm py-3.5"
            >
              <MapPin className="w-4 h-4 text-coop-400" /> Use my location
            </Button>
            <Button 
              variant="outline" 
              onClick={() => navigate('/user/workers')}
              className="shrink-0 flex items-center gap-2 text-xs md:text-sm py-3.5"
            >
              Filters
            </Button>
            
            <CosmicGlowButton
              color="hsl(265, 90%, 65%)"
              speed="7s"
              onClick={() => navigate('/user/ai-match')}
              className="shrink-0 flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              Find with AI
            </CosmicGlowButton>
          </div>
          {locationStatus && (
            <div className="text-xs text-coop-300 font-semibold text-left animate-pulse-slow bg-coop-500/10 p-3 rounded-lg border border-coop-500/20">
              {locationStatus}
            </div>
          )}
        </div>

        {/* Statistics Metrics Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {metrics.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx} 
                onClick={() => {
                  if (card.title === 'ACTIVE REQUEST') {
                    if (trackingWorker) {
                      navigate('/user/booking/bk_78241');
                    } else {
                      navigate('/user/request');
                    }
                  }
                }}
                className={`p-6 rounded-2xl glassmorphism border text-left space-y-3 cursor-pointer hover:border-coop-500/20 hover:-translate-y-1 transition-all duration-300 ${card.color}`}
              >
                <div className="flex justify-between items-start">
                  <span className="text-[10px] text-gray-500 font-mono font-bold tracking-widest">{card.title}</span>
                  <div className="p-1.5 rounded-lg bg-white/5 border border-white/5 shrink-0">
                    <Icon className="w-4 h-4 text-coop-400" />
                  </div>
                </div>
                <div>
                  <h3 className="text-2xl sm:text-3xl font-bold text-white tracking-tight">{card.value}</h3>
                  <p className="text-xs text-gray-400 font-light mt-1">{card.desc}</p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Categories */}
        <div className="space-y-4 text-left">
          <h2 className="text-xl md:text-2xl font-bold text-white">Nearby Services</h2>
          <div className="flex flex-wrap gap-2.5">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setSelectedCategory(cat.id)}
                className={`px-5 py-2.5 rounded-xl text-sm font-medium transition-all cursor-pointer ${
                  selectedCategory === cat.id
                    ? 'bg-coop-600 text-white shadow-md shadow-coop-600/20'
                    : 'bg-white/5 text-gray-400 border border-white/5 hover:border-white/10 hover:text-white'
                }`}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>

        {/* Nearby Verified Workers */}
        <div className="space-y-6 text-left">
          <div className="flex justify-between items-end border-b border-white/5 pb-3">
            <div>
              <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">Trusted workers near you</h2>
              <p className="text-xs text-gray-400">Verified professionals available in your area.</p>
            </div>
            <button 
              onClick={() => navigate('/user/workers')}
              className="text-xs font-semibold text-coop-450 hover:text-white transition-colors cursor-pointer"
            >
              View all
            </button>
          </div>

          {filteredWorkers.length === 0 ? (
            <div className="p-12 rounded-3xl glassmorphism border-white/5 text-center text-gray-500">
              No verified workers found matching your filter criteria.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredWorkers.map((worker) => (
                <div 
                  key={worker.id}
                  className="p-6 rounded-3xl bg-white/5 border border-white/5 hover:border-coop-500/30 hover:-translate-y-1 transition-all duration-300 text-left flex flex-col justify-between h-[360px] group shadow-lg"
                >
                  <div>
                    <div className="flex justify-between items-start mb-6">
                      <div className="w-14 h-14 rounded-2xl bg-coop-500/15 border border-coop-500/20 flex items-center justify-center font-bold text-white text-lg">
                        {worker.name.charAt(0)}
                      </div>
                      <div className="text-right">
                        <span className="inline-flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10">
                          <ShieldCheck className="w-3.5 h-3.5" /> Verified
                        </span>
                        <span className="block text-[10px] text-gray-500 mt-1.5 flex items-center gap-1"><MapPin className="w-3 h-3" /> {worker.distance} km away</span>
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-coop-300 transition-colors">
                      {worker.name}
                    </h3>
                    <p className="text-xs text-gray-400 font-medium mt-0.5">{worker.role}</p>

                    <div className="flex items-center gap-2 mt-4 text-xs">
                      <span className="flex items-center gap-1 text-white font-bold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {worker.rating}
                      </span>
                      <span className="text-gray-500">({worker.reviews} reviews)</span>
                    </div>

                    <div className="mt-4 flex items-center gap-1.5 text-xs text-emerald-400 font-semibold">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                      <span>Available now</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[10px] text-gray-500 uppercase font-mono block">Estimated Starting</span>
                      <span className="text-sm font-bold text-white">From ₹{worker.rate}</span>
                    </div>
                    <div className="flex gap-2">
                      <Button variant="secondary" className="text-[10px] py-1.5 px-3" onClick={() => setSelectedWorker(worker)}>
                        View Profile
                      </Button>
                      <Button variant="primary" className="text-[10px] py-1.5 px-3 bg-gradient-to-r from-coop-600 to-coop-500" onClick={() => handleBookRequest(worker)}>
                        Request
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>

      {/* Worker Profile Detail Modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-lg rounded-3xl glassmorphism border-white/10 p-6 md:p-8 space-y-6 relative">
            <button 
              onClick={() => setSelectedWorker(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer bg-white/5 p-1.5 rounded-lg border border-white/5"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-5 items-start text-left">
              <div className="w-20 h-20 rounded-2xl bg-coop-500/10 flex items-center justify-center text-5xl">
                {selectedWorker.avatar}
              </div>
              <div className="space-y-1.5">
                <span className="inline-flex items-center gap-1 text-[10px] text-emerald-400 font-bold bg-emerald-500/5 px-2 py-0.5 rounded border border-emerald-500/10 uppercase">
                  ✓ Verified co-op member
                </span>
                <h3 className="text-2xl font-bold text-white">{selectedWorker.name}</h3>
                <p className="text-sm text-coop-400">{selectedWorker.role}</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  <strong className="text-white">{selectedWorker.rating}</strong>
                  <span>({selectedWorker.reviews} ratings)</span>
                  <span>•</span>
                  <span>{selectedWorker.distance} km away</span>
                </div>
              </div>
            </div>

            <div className="text-left space-y-2">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Biography</h4>
              <p className="text-sm text-gray-300 leading-relaxed bg-white/5 p-4 rounded-xl border border-white/5">
                {selectedWorker.bio}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left">
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase font-mono block">Base Service Rate</span>
                <span className="text-lg font-bold text-white flex items-center gap-1">
                  <IndianRupee className="w-4 h-4 text-coop-400" /> {selectedWorker.rate}
                </span>
              </div>
              <div className="bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-[10px] text-gray-500 uppercase font-mono block">Calendar Availability</span>
                <span className="text-xs font-semibold text-emerald-400 mt-1 block">Available Today</span>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <Button variant="secondary" className="grow text-sm py-2.5" onClick={() => setSelectedWorker(null)}>
                Cancel
              </Button>
              <Button variant="primary" className="grow text-sm py-2.5" onClick={() => handleBookRequest(selectedWorker)}>
                Request Worker Match
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Live Map Dispatch and Route Tracker Overlay */}
      {trackingWorker && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-xl rounded-3xl glassmorphism border-white/10 p-6 md:p-8 space-y-6 relative overflow-hidden text-center shadow-2xl">
            <button 
              onClick={() => {
                setTrackingWorker(null);
                if (intervalRef.current) clearInterval(intervalRef.current);
              }}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer bg-white/5 p-1.5 rounded-lg border border-white/5 z-20"
            >
              <X className="w-4 h-4" />
            </button>

            {/* Map Header Status metrics */}
            <div className="text-left space-y-2">
              <Badge variant="primary" className="font-mono">{trackingStatus}</Badge>
              <div className="flex justify-between items-end">
                <div>
                  <h3 className="text-2xl font-bold text-white">{trackingWorker.name}</h3>
                  <p className="text-xs text-gray-400">Co-op Assigned Specialty: {trackingWorker.role}</p>
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
                    <h4 className="text-base font-bold text-white">Waiting for {trackingWorker.name} to accept...</h4>
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

            {/* Quick Contact controls */}
            <div className="flex items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl">
              <div className="w-10 h-10 rounded-full bg-coop-500/10 flex items-center justify-center text-xl shrink-0">
                💬
              </div>
              <div className="text-left grow">
                <span className="text-xs text-gray-500 block">Direct Secure Chat</span>
                <span className="text-sm font-semibold text-white">Ask worker to bring extra spare tools</span>
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

            {progressPercent === 100 && (
              <div className="p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold animate-pulse-slow">
                ✓ Worker has reached Sector 4, Indiranagar. Please guide them at the gate!
              </div>
            )}
          </div>
        </div>
      )}
      </div>
    </div>
  );
};

export default UserDashboard;
