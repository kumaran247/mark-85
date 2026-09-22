import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, UploadCloud, CheckCircle2, ShieldAlert } from 'lucide-react';

const WorkerVerification = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();
  
  const [step, setStep] = useState(0); // 0: Uploading, 1: Submitted, 2: Verified (Simulated)

  const handleUploadSubmit = (e) => {
    e.preventDefault();
    setStep(1); // Transition to under review
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.12} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Trustee Verification</h1>
          </div>
          <Badge variant="warning">Step {step + 1} of 3</Badge>
        </header>

        {step === 0 && (
          <form onSubmit={handleUploadSubmit} className="space-y-5">
            <div className="space-y-1">
              <h2 className="text-base font-bold text-white">Upload Registration Proofs</h2>
              <p className="text-xs text-gray-400 font-light">Co-op trustees require valid documents before credential activation.</p>
            </div>

            {/* Document upload mock slots */}
            {['Identity Proof (Aadhaar / Passport)', 'Address Proof (Utility Bill)', 'Skill Certificate (Govt / Academy)', 'Experience Certificate Proof'].map((docName, idx) => (
              <div key={idx} className="border border-dashed border-white/10 hover:border-coop-500/50 rounded-xl p-4 text-center cursor-pointer transition-colors bg-black/20 flex flex-col items-center gap-1.5">
                <UploadCloud className="w-6 h-6 text-gray-500" />
                <span className="text-xs text-gray-300 font-semibold">{docName}</span>
                <span className="text-[9px] text-gray-500">Click to upload PDF, JPG up to 10MB</span>
              </div>
            ))}

            <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-semibold">
              Submit Documents
            </Button>
          </form>
        )}

        {step === 1 && (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-amber-500/10 text-amber-400 flex items-center justify-center mx-auto text-3xl animate-pulse-slow">
              ⏳
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Documents Under Review</h2>
              <p className="text-xs text-gray-400 max-w-sm mx-auto">
                Trustee registers are validating your safety proofs. This screening takes up to 24 hours.
              </p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="secondary" className="text-xs py-2 px-5" onClick={signout}>
                Sign Out
              </Button>
              <Button variant="primary" className="text-xs py-2 px-5" onClick={() => setStep(2)}>
                Simulate Approval
              </Button>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 text-center py-6">
            <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-3xl">
              ✓
            </div>
            <div className="space-y-2">
              <h2 className="text-xl font-bold text-white">Trustee Approved ✓</h2>
              <p className="text-xs text-gray-400">Your co-op credentials have been verified. Access granted.</p>
            </div>
            <Button variant="primary" className="w-full py-2.5 text-xs font-semibold" onClick={() => navigate('/worker/dashboard')}>
              Go to Worker Dashboard
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default WorkerVerification;
