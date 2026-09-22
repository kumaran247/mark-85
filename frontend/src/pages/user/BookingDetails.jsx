import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { 
  Sparkles, CheckCircle2, Circle, Clock, ShieldCheck, 
  ArrowLeft, Key, DollarSign, HeartHandshake, FileText, Star 
} from 'lucide-react';

const BookingDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signout } = useAuth();

  // Status index: 
  // 0: Request Created, 1: Worker Accepted, 2: Started Journey, 3: Arriving
  // 4: Work Started, 5: Work Completed, 6: Bill Generated
  const [currentStep, setCurrentStep] = useState(3);
  const [ratingValue, setRatingValue] = useState(5);
  const [feedbackMsg, setFeedbackMsg] = useState('');

  const timelineSteps = [
    { title: 'Request Created', desc: 'Job request submitted to local registry.' },
    { title: 'Worker Accepted', desc: 'Arun accepted matching request.' },
    { title: 'Worker Started Journey', desc: 'Transit route calibrated. ETA active.' },
    { title: 'Worker Arriving', desc: 'Worker approaching service destination.' },
    { title: 'Work Started', desc: 'Worker has arrived and initiated task logs.' },
    { title: 'Work Completed', desc: 'Repair completed and safety checks signed off.' },
    { title: 'Bill Generated', desc: 'Invoice calibrated on member ledger rates.' }
  ];

  const handleNextStep = (targetStep) => {
    setCurrentStep(targetStep);
  };

  const handleRateSubmit = (e) => {
    e.preventDefault();
    setFeedbackMsg('Thank you! Rating details saved to member logs.');
    setTimeout(() => setFeedbackMsg(''), 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.12} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-3xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        {/* Left column: Vertical Timeline */}
        <section className="md:col-span-2 rounded-3xl glassmorphism border-white/5 p-6 md:p-8 space-y-6 text-left shadow-2xl">
          <div className="space-y-1.5 border-b border-white/5 pb-4">
            <Badge variant="primary" className="font-mono">ID: {id || 'bk_78241'}</Badge>
            <h1 className="text-2xl md:text-3xl font-bold">Booking Tracking</h1>
            <p className="text-xs text-gray-400 font-light">Status updates synched with co-op worker GPS logs.</p>
          </div>

          {/* Vertical Timeline Nodes */}
          <div className="relative pl-6 border-l border-white/5 space-y-6">
            {timelineSteps.map((step, idx) => {
              const isDone = idx < currentStep;
              const isActive = idx === currentStep;
              const isPending = idx > currentStep;

              return (
                <div key={idx} className="relative text-left space-y-1">
                  {/* Bullet Marker */}
                  <div className={`absolute left-[-31px] w-4.5 h-4.5 rounded-full flex items-center justify-center border font-bold text-[10px] ${
                    isDone 
                      ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                      : isActive 
                      ? 'bg-coop-500/20 border-coop-500 text-coop-400 animate-pulse'
                      : 'bg-black/40 border-white/10 text-gray-600'
                  }`}>
                    {isDone ? '✓' : idx + 1}
                  </div>

                  <h4 className={`text-sm font-bold tracking-wider ${
                    isDone ? 'text-emerald-400' : isActive ? 'text-coop-300' : 'text-gray-500'
                  }`}>
                    {step.title}
                  </h4>
                  <p className="text-xs text-gray-400 font-light leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </section>

        {/* Right column: Simulation & Invoice Panel */}
        <aside className="md:col-span-1 space-y-6 text-left">
          {/* Simulator Console */}
          <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-coop-400" /> Dispatch Simulator
            </span>
            <p className="text-xs text-gray-400">Advance status manually to review worker flows:</p>
            
            <div className="flex flex-col gap-2.5">
              <Button 
                variant={currentStep === 3 ? 'primary' : 'secondary'} 
                className="text-xs py-2 w-full font-semibold"
                onClick={() => handleNextStep(4)}
                disabled={currentStep > 3}
              >
                1. Simulate Work Started
              </Button>
              <Button 
                variant={currentStep === 4 ? 'primary' : 'secondary'} 
                className="text-xs py-2 w-full font-semibold"
                onClick={() => handleNextStep(5)}
                disabled={currentStep !== 4}
              >
                2. Simulate Work Completed
              </Button>
              <Button 
                variant={currentStep === 5 ? 'primary' : 'secondary'} 
                className="text-xs py-2 w-full font-semibold"
                onClick={() => handleNextStep(6)}
                disabled={currentStep !== 5}
              >
                3. Simulate Bill Generated
              </Button>
            </div>
          </div>

          {/* Invoice Display once Step 6 is active */}
          {currentStep === 6 && (
            <div className="p-6 rounded-3xl bg-gradient-to-tr from-coop-950/20 to-white/5 border border-coop-500/30 space-y-5 animate-pulse-slow">
              <span className="text-xs font-bold text-coop-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
                <FileText className="w-3.5 h-3.5" /> Ledger Invoice
              </span>

              <div className="space-y-3.5 text-xs">
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Base Plumbing Repair</span>
                  <span className="text-white font-bold">₹350.00</span>
                </div>
                <div className="flex justify-between border-b border-white/5 pb-2">
                  <span className="text-gray-400">Cooperative Fee (5%)</span>
                  <span className="text-white font-bold">₹17.50</span>
                </div>
                <div className="flex justify-between font-bold text-sm text-emerald-400 pb-2">
                  <span>Grand Total</span>
                  <span>₹367.50</span>
                </div>
              </div>

              <div className="bg-white/5 p-3 rounded-lg border border-white/5 text-[10px] text-gray-400 flex items-start gap-1.5">
                <HeartHandshake className="w-4 h-4 text-coop-400 shrink-0 mt-0.5" />
                <span>₹350 goes directly to Arun's wallet, supporting local workers.</span>
              </div>

              {/* Rating review input simulator */}
              <form onSubmit={handleRateSubmit} className="space-y-3 pt-3 border-t border-white/5">
                <label className="text-[10px] text-gray-400 uppercase font-mono block">Rate Arun's Service</label>
                <div className="flex gap-1.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => setRatingValue(star)}
                      className="cursor-pointer bg-transparent border-none focus:outline-none"
                    >
                      <Star className={`w-5 h-5 ${
                        star <= ratingValue ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                      }`} />
                    </button>
                  ))}
                </div>
                <Button type="submit" variant="outline" className="w-full py-1.5 text-[10px] font-bold">
                  Submit Co-op Rating
                </Button>
                {feedbackMsg && (
                  <span className="text-[10px] text-emerald-400 block">{feedbackMsg}</span>
                )}
              </form>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
};

export default BookingDetails;
