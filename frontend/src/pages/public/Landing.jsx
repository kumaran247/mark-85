import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import WebThreads from '../../components/common/WebThreads';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import { 
  Search, ShieldCheck, MapPin, Star, HeartHandshake, Compass, 
  TrendingUp, Award, Users, ChevronRight, HelpCircle, CheckCircle2, 
  ArrowRight, Shield, Zap, Sparkles, Navigation, DollarSign, Clock, FileText 
} from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();
  const [activeFaq, setActiveFaq] = useState(null);
  const [activeWorkflowStep, setActiveWorkflowStep] = useState(0);

  const categories = [
    { name: 'Electrical Works', count: '142 Workers Available', icon: Zap, color: 'text-amber-400 bg-amber-400/10' },
    { name: 'Plumbing & Pipefitting', count: '98 Workers Available', icon: Compass, color: 'text-sky-400 bg-sky-400/10' },
    { name: 'Carpentry & Woodwork', count: '76 Workers Available', icon: Award, color: 'text-orange-400 bg-orange-400/10' },
    { name: 'House Cleaning & Sanitization', count: '120 Workers Available', icon: Sparkles, color: 'text-teal-400 bg-teal-400/10' },
    { name: 'Gardening & Landscaping', count: '54 Workers Available', icon: HeartHandshake, color: 'text-emerald-400 bg-emerald-400/10' },
    { name: 'Appliance Repair', count: '89 Workers Available', icon: TrendingUp, color: 'text-indigo-400 bg-indigo-400/10' },
  ];

  const workflowSteps = [
    { title: 'REQUEST', desc: 'Create a request with job details, photos, and estimated schedule.', icon: FileText },
    { title: 'AI MATCH', desc: 'Our transparent algorithms scan and score nearby matching co-op workers.', icon: Sparkles },
    { title: 'VERIFY', desc: 'System double checks credentials, background certificates, and availability.', icon: ShieldCheck },
    { title: 'ASSIGN', desc: 'Get fair upfront pricing estimates, match accepted, worker assigned.', icon: CheckCircle2 },
    { title: 'TRACK', desc: 'Follow worker path in real-time, get ETA notifications, chat securely.', icon: Navigation },
    { title: 'COMPLETE', desc: 'Approve completed work, release payment, and rate your co-op provider.', icon: Star },
  ];

  const coopValues = [
    {
      title: 'Fair Upfront Pricing',
      description: 'Zero hidden fees. We match requests using standard local rates defined collectively by co-op members to keep prices fair for customers and profitable for workers.',
      icon: DollarSign,
      color: 'from-sky-500/20 to-sky-500/5 text-sky-400'
    },
    {
      title: 'Worker Welfare',
      description: 'As a cooperative platform, workers receive 95% of their service earnings along with health insurance options and shared governance rights.',
      icon: Users,
      color: 'from-coop-500/20 to-coop-500/5 text-coop-400'
    },
    {
      title: 'Community Reinvestment',
      description: 'A portion of every transaction supports local training academies and neighborhood repair funds, creating stronger local communities.',
      icon: HeartHandshake,
      color: 'from-emerald-500/20 to-emerald-500/5 text-emerald-400'
    }
  ];

  const workers = [
    {
      name: 'Marcus Vance',
      role: 'Certified Electrician',
      rating: 4.9,
      reviews: 184,
      experience: '8 years exp.',
      avatar: '⚡',
      badge: 'Gold Level Partner',
      skills: ['Wiring', 'Panel Upgrades', 'Smart Home Setup']
    },
    {
      name: 'Elena Rostova',
      role: 'Master Plumber',
      rating: 4.8,
      reviews: 142,
      experience: '6 years exp.',
      avatar: '🔧',
      badge: 'Top Rated',
      skills: ['Leak Detection', 'Pipe Repair', 'Water Heaters']
    },
    {
      name: 'Jordan Brooks',
      role: 'Cabinetry Maker & Carpenter',
      rating: 5.0,
      reviews: 95,
      experience: '12 years exp.',
      avatar: '🔨',
      badge: 'Veteran Craftsman',
      skills: ['Furniture Assembly', 'Custom Shelving', 'Decking']
    }
  ];

  const faqs = [
    {
      q: 'How does the Cooperative model differ from traditional gig apps?',
      a: 'Unlike standard gig platforms that charge high commission fees and restrict worker rights, Cooperative Gig is owned and governed by the workers. We keep commission minimal (only 5% to cover platform costs), and all profits are distributed back to worker-members. This guarantees higher quality services from motivated, fairly compensated professionals.'
    },
    {
      q: 'Is the pricing estimate guaranteed?',
      a: 'Yes. Our AI engine uses transparent historical rates for similar tasks in your area to compute fair quotes. Once you receive and accept a matching worker’s quote, that estimate is locked in, preventing unexpected billing surprises.'
    },
    {
      q: 'How are workers verified?',
      a: 'Every cooperative member goes through a multi-stage background check, credential validation, and professional interview process. Additionally, the admin verification panel validates identity certificates, professional licenses, and safety training logs before any worker can pick up jobs.'
    },
    {
      q: 'How does real-time tracking work?',
      a: 'Once a worker accepts your job request and begins their journey to your location, you can view their real-time location on a live interactive map, ensuring you know exactly when they will arrive.'
    }
  ];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Navbar */}
      <header className="fixed top-0 left-0 right-0 z-50 glassmorphism border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-600 to-coop-400 flex items-center justify-center font-bold text-white shadow-lg shadow-coop-500/20">
            C
          </div>
          <span className="font-semibold text-lg md:text-xl text-white tracking-wide">
            Coop<span className="text-coop-400 font-bold">Gig</span>
          </span>
        </div>
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-gray-300">
          <a href="#how-it-works" className="hover:text-white transition-colors">How It Works</a>
          <a href="#categories" className="hover:text-white transition-colors">Services</a>
          <a href="#values" className="hover:text-white transition-colors">Cooperative Welfare</a>
          <a href="#faq" className="hover:text-white transition-colors">FAQ</a>
        </nav>
        <div className="flex items-center gap-4">
          <button 
            onClick={() => navigate('/signin')}
            className="text-sm font-medium text-gray-300 hover:text-white transition-colors px-3 py-1 cursor-pointer"
          >
            Sign In
          </button>
          <Button 
            onClick={() => navigate('/signup')}
            variant="primary" 
            className="text-sm px-5 py-2"
          >
            Get Started
          </Button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex flex-col items-center justify-center text-center px-6 pt-32 pb-20">
        {/* Background Threads canvas wrapper */}
        <div className="absolute inset-0 z-0">
          <WebThreads
            color1="#5227FF"
            color2="#FF9FFC"
            color3="#FFFFFF"
            speed={0.2}
            threadCount={6}
            frequency={5}
            spread={0.18}
            taper={1}
            position={0.5}
            fanMode="center"
            glow={0.02}
            falloff={0.6}
            thickness={1.1}
            brightness={0.6}
            opacity={0.8}
            mirror
            shimmer={false}
            grain
            grainIntensity={0.05}
            mouseInteraction
            mouseStrength={0.3}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-[#030307]/50 via-transparent to-[#030307]" />
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center gap-6">
          <Badge variant="primary" className="animate-pulse-slow">
            <span className="flex items-center gap-1.5"><Shield className="w-3.5 h-3.5 text-coop-400" /> Fully Owned & Run By Local Workers</span>
          </Badge>
          
          <h1 className="text-4xl sm:text-6xl md:text-7xl font-bold tracking-tight text-white leading-tight">
            Local work. Trusted people.<br />
            <span className="text-gradient">Stronger communities.</span>
          </h1>

          <p className="text-lg md:text-xl text-gray-400 max-w-2xl font-light">
            Find verified local workers, get fair service estimates, and track every job from request to completion on the community owned services network.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 mt-6 w-full max-w-md justify-center">
            <Button 
              onClick={() => navigate('/signin')}
              variant="primary" 
              className="text-base group"
            >
              Find a Worker <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button 
              onClick={() => navigate('/signup')}
              variant="secondary" 
              className="text-base"
            >
              Join as a Worker
            </Button>
          </div>
        </div>
      </section>

      {/* Visual Workflow Section */}
      <section id="how-it-works" className="relative py-24 px-6 md:px-12 bg-gradient-to-b from-transparent to-[#05050d]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            How The Matching Flow Works
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            A fully transparent, automated process that ensures quality assurance, fair distribution of labor, and real-time validation.
          </p>

          {/* Interactive visual workflow layout */}
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 lg:gap-6">
            {workflowSteps.map((step, idx) => {
              const Icon = step.icon;
              return (
                <div 
                  key={idx}
                  onClick={() => setActiveWorkflowStep(idx)}
                  className={`p-6 rounded-2xl transition-all duration-300 cursor-pointer relative border text-left flex flex-col justify-between h-48 ${
                    activeWorkflowStep === idx 
                      ? 'bg-gradient-to-tr from-coop-950 to-coop-900/50 border-coop-500/50 shadow-lg shadow-coop-500/10'
                      : 'glassmorphism border-white/5 hover:border-white/10 hover:bg-white/5'
                  }`}
                >
                  <div className="flex justify-between items-center">
                    <span className={`text-xs font-bold font-mono tracking-widest ${
                      activeWorkflowStep === idx ? 'text-coop-400' : 'text-gray-500'
                    }`}>
                      0{idx + 1}
                    </span>
                    <Icon className={`w-5 h-5 ${
                      activeWorkflowStep === idx ? 'text-coop-400' : 'text-gray-400'
                    }`} />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white uppercase tracking-wider mb-1">
                      {step.title}
                    </h3>
                    <p className="text-xs text-gray-400 leading-relaxed line-clamp-2">
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Detailed step panel display */}
          <div className="mt-8 p-8 rounded-3xl glassmorphism border-white/5 text-left max-w-3xl mx-auto flex flex-col md:flex-row gap-6 items-center">
            <div className="w-16 h-16 rounded-2xl bg-coop-500/10 flex items-center justify-center text-coop-400 shrink-0">
              {React.createElement(workflowSteps[activeWorkflowStep].icon, { className: 'w-8 h-8' })}
            </div>
            <div>
              <div className="flex items-center gap-3 mb-2">
                <span className="text-xs font-mono font-bold text-coop-400 tracking-wider">STEP 0{activeWorkflowStep + 1}</span>
                <h4 className="text-xl font-bold text-white uppercase tracking-wider">{workflowSteps[activeWorkflowStep].title}</h4>
              </div>
              <p className="text-gray-400 text-sm leading-relaxed">
                {workflowSteps[activeWorkflowStep].desc}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Service Categories Section */}
      <section id="categories" className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-6">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
                Popular Service Cooperatives
              </h2>
              <p className="text-gray-400 max-w-xl text-lg">
                Find certified and pre-vetted specialists in plumbing, electrical diagnostics, masonry, cabinetry, and home welfare services.
              </p>
            </div>
            <Button variant="outline" className="text-sm shrink-0">
              Browse All Categories <ChevronRight className="w-4 h-4" />
            </Button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((cat, idx) => {
              const IconComp = cat.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-2xl glassmorphism border-white/5 hover:border-coop-500/30 hover:bg-[#121222] transition-all duration-300 group flex items-start gap-5 cursor-pointer"
                >
                  <div className={`p-4 rounded-xl shrink-0 ${cat.color} group-hover:scale-110 transition-transform duration-300`}>
                    <IconComp className="w-6 h-6" />
                  </div>
                  <div className="flex flex-col text-left">
                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-coop-300 transition-colors">
                      {cat.name}
                    </h3>
                    <span className="text-xs text-gray-500 font-medium">
                      {cat.count}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* AI Matching explanation */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#05050d] to-[#0a0a18] relative">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="text-left space-y-6">
            <Badge variant="primary">AI Algorithms</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Transparent, Ethical AI Matching.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We don't use manipulative pricing spikes or algorithmic black boxes. Our matching engine selects workers solely based on proximity, credentials, cooperative membership tier, and historical work feedback scores.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold">Proximity & Availability Matches</h4>
                  <p className="text-sm text-gray-400">Matches the nearest cooperative partner qualified for your specific issue.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-1" />
                <div>
                  <h4 className="text-white font-semibold">Fair Labor Distribution</h4>
                  <p className="text-sm text-gray-400">Our engine prevents worker burnout by dynamically balancing gig distribution.</p>
                </div>
              </div>
            </div>
          </div>

          {/* AI Matching visual simulation mockup */}
          <div className="p-8 rounded-3xl glassmorphism border-white/5 relative overflow-hidden flex flex-col gap-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <span className="text-sm font-semibold text-white flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-coop-400" /> Matching Engine Active
              </span>
              <span className="text-xs text-coop-400 font-mono">Verifying...</span>
            </div>
            
            <div className="space-y-4">
              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-coop-500/20 text-coop-400 flex items-center justify-center font-bold">JD</div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white">Julius Diaz</h4>
                    <span className="text-xs text-gray-500">HVAC Specialist • 1.2 miles away</span>
                  </div>
                </div>
                <Badge variant="success">98% Match</Badge>
              </div>

              <div className="p-4 rounded-xl bg-coop-500/10 border border-coop-500/20 flex items-center justify-between animate-pulse-slow">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-coop-500/20 text-coop-400 flex items-center justify-center font-bold">ER</div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white">Elena Rostova</h4>
                    <span className="text-xs text-gray-400">Master Plumber • 0.8 miles away</span>
                  </div>
                </div>
                <Badge variant="primary">99% Match</Badge>
              </div>

              <div className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between opacity-50">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-coop-500/20 text-coop-400 flex items-center justify-center font-bold">SM</div>
                  <div className="text-left">
                    <h4 className="text-sm font-bold text-white">Sean Mills</h4>
                    <span className="text-xs text-gray-500">General Carpentry • 3.5 miles away</span>
                  </div>
                </div>
                <Badge variant="info">85% Match</Badge>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Verified Worker Section */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Meet Our Verified Cooperative Members
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Every specialist on our platform is a shareholder in the co-op, with full background vetting, identity validation, and skills certification.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {workers.map((worker, idx) => (
              <div 
                key={idx}
                className="p-8 rounded-3xl glassmorphism border-white/5 hover:border-coop-500/20 transition-all duration-300 text-left flex flex-col justify-between group shadow-lg"
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-coop-500/10 flex items-center justify-center text-3xl">
                      {worker.avatar}
                    </div>
                    <div className="flex flex-col text-right">
                      <span className="text-xs font-semibold text-coop-400">{worker.badge}</span>
                      <span className="text-xs text-gray-500">{worker.experience}</span>
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-white group-hover:text-coop-300 transition-colors">
                    {worker.name}
                  </h3>
                  <p className="text-sm text-gray-400 mb-4">{worker.role}</p>

                  <div className="flex items-center gap-2 mb-6">
                    <div className="flex text-amber-400">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-amber-400" />
                      ))}
                    </div>
                    <span className="text-sm font-bold text-white">{worker.rating}</span>
                    <span className="text-xs text-gray-500">({worker.reviews} reviews)</span>
                  </div>
                </div>

                <div>
                  <div className="flex flex-wrap gap-2 mb-6">
                    {worker.skills.map((skill, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/5 border border-white/5 text-gray-300">
                        {skill}
                      </span>
                    ))}
                  </div>

                  <Button variant="secondary" className="w-full text-sm py-2">
                    View Profile
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Tracking Preview Section */}
      <section className="py-24 px-6 md:px-12 bg-gradient-to-b from-[#0a0a18] to-[#030307]">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Tracking simulator mockup */}
          <div className="p-8 rounded-3xl glassmorphism border-white/5 relative overflow-hidden flex flex-col gap-6 shadow-2xl h-[420px] justify-between">
            {/* Map styling and tracking line using canvas/svg simulation */}
            <div className="absolute inset-0 bg-[#07070f] opacity-80" />
            
            {/* Simulated map graphic */}
            <div className="absolute inset-0 z-0 p-8 flex items-center justify-center">
              <svg width="100%" height="100%" viewBox="0 0 400 300" className="opacity-40">
                <path d="M 50 150 Q 150 100 200 200 T 350 150" fill="none" stroke="#1e1b4b" strokeWidth="6" />
                <path d="M 50 150 Q 150 100 200 200 T 350 150" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="6, 4" className="animate-pulse" />
                {/* Pins */}
                <circle cx="50" cy="150" r="8" fill="#10b981" />
                <circle cx="350" cy="150" r="8" fill="#8b5cf6" />
              </svg>
            </div>

            <div className="relative z-10 flex items-center justify-between bg-white/5 border border-white/5 p-4 rounded-2xl">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                  <MapPin className="w-5 h-5" />
                </div>
                <div className="text-left">
                  <h4 className="text-sm font-bold text-white">Live Tracking</h4>
                  <span className="text-xs text-gray-400">Worker en-route</span>
                </div>
              </div>
              <span className="text-sm font-bold text-emerald-400">ETA 8 mins</span>
            </div>

            <div className="relative z-10 flex items-center gap-4 bg-black/40 border border-white/5 p-4 rounded-2xl mt-auto">
              <div className="w-12 h-12 rounded-full bg-coop-500/20 text-3xl flex items-center justify-center">🔧</div>
              <div className="text-left grow">
                <h4 className="text-sm font-bold text-white">Elena Rostova</h4>
                <p className="text-xs text-gray-400">Master Plumber</p>
              </div>
              <div className="flex gap-2">
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer text-white hover:bg-white/10">
                  💬
                </div>
                <div className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center cursor-pointer text-white hover:bg-white/10">
                  📞
                </div>
              </div>
            </div>
          </div>

          <div className="text-left space-y-6">
            <Badge variant="primary">Realtime GPS</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white leading-tight">
              Interactive Live Dispatching.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              Track the exact route of your assigned partner, coordinate key entry instructions, and stay updated with real-time push notifications.
            </p>
            <div className="space-y-4">
              <div className="flex gap-3">
                <Clock className="w-5 h-5 text-coop-400 shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">Minute-by-minute updates from booking to site departure.</p>
              </div>
              <div className="flex gap-3">
                <Shield className="w-5 h-5 text-coop-400 shrink-0 mt-0.5" />
                <p className="text-gray-400 text-sm">Encrypted direct calls & messaging to safeguard customer privacy.</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Cooperative Core Values Section */}
      <section id="values" className="py-24 px-6 md:px-12 relative border-t border-white/5 bg-[#030307]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
            <Badge variant="primary">Platform Ethics</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white">
              Why We Stand For Cooperative Values
            </h2>
            <p className="text-gray-400 text-lg">
              We built this cooperative model to change local services. By reinvesting in workers and community wellness, we ensure higher standard service quality.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {coopValues.map((val, idx) => {
              const Icon = val.icon;
              return (
                <div 
                  key={idx}
                  className="p-8 rounded-3xl glassmorphism border-white/5 relative overflow-hidden flex flex-col justify-between text-left h-[320px] hover:border-coop-500/20 transition-all duration-300"
                >
                  <div className="space-y-6">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-tr ${val.color} flex items-center justify-center shrink-0`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{val.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{val.description}</p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Platform Statistics Section */}
      <section className="py-20 px-6 md:px-12 bg-gradient-to-tr from-coop-950/20 via-transparent to-transparent">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 p-12 rounded-3xl glassmorphism border-white/5 text-center">
            <div>
              <span className="block text-4xl sm:text-5xl font-bold text-white mb-2">$2.4M+</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Distributed to Workers</span>
            </div>
            <div>
              <span className="block text-4xl sm:text-5xl font-bold text-white mb-2">12,000+</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Jobs Successfully Completed</span>
            </div>
            <div>
              <span className="block text-4xl sm:text-5xl font-bold text-white mb-2">480+</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Verified Coop Partners</span>
            </div>
            <div>
              <span className="block text-4xl sm:text-5xl font-bold text-white mb-2">99.2%</span>
              <span className="text-xs sm:text-sm text-gray-400 font-medium">Customer Rating Average</span>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6 md:px-12 relative">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-3xl md:text-5xl font-bold text-white mb-4">
            Loved by Customers, Trusted by Providers
          </h2>
          <p className="text-gray-400 max-w-2xl mx-auto mb-16 text-lg">
            Hear directly from the community members who power our local marketplace.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="p-8 rounded-3xl glassmorphism border-white/5 text-left flex flex-col justify-between">
              <p className="text-gray-300 italic text-base leading-relaxed mb-6">
                "I hired a carpenter through CoopGig to remodel my shop cabinets. The craftsmanship was stellar, but what blew me away was finding out that 95% of my money goes directly into the worker’s household, rather than VC pockets. Highly recommend!"
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coop-500/20 flex items-center justify-center text-lg">👩</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Sarah Jenkins</h4>
                  <span className="text-xs text-gray-500">Retail Store Owner</span>
                </div>
              </div>
            </div>

            <div className="p-8 rounded-3xl glassmorphism border-white/5 text-left flex flex-col justify-between">
              <p className="text-gray-300 italic text-base leading-relaxed mb-6">
                "Being part of this cooperative has changed my work life. I get steady gig matching, a vote in how the platform runs, and clean tool benefits. The transparent AI matching means I am always matched with local jobs in my neighborhood."
              </p>
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-coop-500/20 flex items-center justify-center text-lg">👨</div>
                <div>
                  <h4 className="text-white font-bold text-sm">Elena Rostova</h4>
                  <span className="text-xs text-gray-500">Plumber & Co-op Shareholder</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section id="faq" className="py-24 px-6 md:px-12 relative bg-gradient-to-b from-[#030307] to-[#06060f]">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-16 space-y-4">
            <Badge variant="primary">Support</Badge>
            <h2 className="text-3xl md:text-5xl font-bold text-white">Frequently Asked Questions</h2>
          </div>

          <div className="space-y-4 text-left">
            {faqs.map((faq, idx) => (
              <div 
                key={idx}
                className="rounded-2xl glassmorphism border-white/5 overflow-hidden transition-all duration-300"
              >
                <button
                  onClick={() => setActiveFaq(activeFaq === idx ? null : idx)}
                  className="w-full p-6 text-left font-semibold text-white flex justify-between items-center focus:outline-none hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <HelpCircle className={`w-5 h-5 text-coop-400 transform transition-transform duration-300 ${
                    activeFaq === idx ? 'rotate-180' : ''
                  }`} />
                </button>
                <div className={`transition-all duration-300 ease-in-out ${
                  activeFaq === idx ? 'max-h-96 border-t border-white/5 p-6 opacity-100' : 'max-h-0 opacity-0 pointer-events-none'
                }`}>
                  <p className="text-gray-400 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 bg-[#030307] py-16 px-6 md:px-12 relative z-10 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-coop-600 to-coop-400 flex items-center justify-center font-bold text-white">
                C
              </div>
              <span className="font-semibold text-xl text-white">
                Coop<span className="text-coop-400">Gig</span>
              </span>
            </div>
            <p className="text-sm text-gray-500">
              Premium worker owned gig network ensuring fair wages, certified specialists, and transparent local community progress.
            </p>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Services</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Electrical Repairs</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Plumbing Works</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Wood Joinery</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Smart Home Installations</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Cooperative</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Governance Model</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Worker Equity</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Training Academies</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Impact Reports</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-bold text-sm mb-4 uppercase tracking-wider">Contact & Support</h4>
            <ul className="space-y-2 text-sm text-gray-400">
              <li><a href="#" className="hover:text-white transition-colors">Platform Help Center</a></li>
              <li><a href="#" className="hover:text-white transition-colors">Support Cooperative</a></li>
              <li><a href="#" className="hover:text-white transition-colors">General Inquiries</a></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto border-t border-white/5 mt-12 pt-6 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-gray-500">
          <span>&copy; 2026 Cooperative Gig Services Inc. Owned collectively by its members.</span>
          <div className="flex gap-6">
            <a href="#" className="hover:text-white transition-colors">Terms of Governance</a>
            <a href="#" className="hover:text-white transition-colors">Data Privacy Policy</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
