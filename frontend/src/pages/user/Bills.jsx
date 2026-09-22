import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { 
  ArrowLeft, CheckCircle2, DollarSign, Download, 
  HeartHandshake, ShieldCheck, AlertCircle, Sparkles 
} from 'lucide-react';

const Bills = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signout } = useAuth();
  
  const [paymentStatus, setPaymentStatus] = useState('Pending');
  const [showSuccess, setShowSuccess] = useState(false);
  
  // Work flow enforcement state
  const [workCompleted, setWorkCompleted] = useState(false);
  const [workerNotified, setWorkerNotified] = useState(false);

  const handlePayNow = () => {
    if (!workCompleted) return;
    setPaymentStatus('Completed');
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 4000);
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent('COOPERATIVE SERVICE BILL\n\nWorker: Arun Kumar\nService: Plumbing\nTotal: ₹510\nPayment Status: Paid'));
    link.setAttribute('download', `bill_${id || 'bk_123'}.txt`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Simulates worker completing task and sending invoice notification to customer
  const handleSimulateWorkerComplete = () => {
    setWorkCompleted(true);
    setWorkerNotified(true);
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-md rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-center">
        {/* Simulation Sandbox Control Banner */}
        <div className="bg-[#120822] border border-coop-500/30 p-3.5 rounded-2xl text-left space-y-2">
          <span className="text-[9px] text-coop-450 uppercase font-mono font-bold tracking-wider block flex items-center gap-1">
            <Sparkles className="w-3 h-3 text-coop-400" /> Simulation Sandbox Controls
          </span>
          <p className="text-[10px] text-gray-400">
            Work must be marked completed by the worker before payment is unlocked.
          </p>
          {!workCompleted ? (
            <button 
              onClick={handleSimulateWorkerComplete}
              className="w-full py-1.5 rounded-lg bg-coop-600 hover:bg-coop-500 text-[10px] font-bold transition-all cursor-pointer text-white"
            >
              Simulate: Worker Marks Work Completed & Sends Bill
            </button>
          ) : (
            <span className="block text-[10px] text-emerald-400 font-bold">
              ✓ Simulation Active: Worker has notified completion.
            </span>
          )}
        </div>

        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        <div className="text-left space-y-2 border-b border-white/5 pb-4">
          <Badge variant="primary" className="font-mono">Ledger Node: {id || 'bk_123'}</Badge>
          <h1 className="text-2xl font-bold text-white">Service Invoice</h1>
          <p className="text-xs text-gray-400 font-light">Calibrated under standard co-op rates.</p>
        </div>

        {/* Dynamic status warnings */}
        {!workCompleted && (
          <div className="bg-amber-500/10 border border-amber-500/20 p-4 rounded-2xl text-left flex gap-3 text-xs text-amber-400 leading-normal">
            <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block">Awaiting Work Completion</span>
              <span>The worker has not marked this job finished. Payments are locked until work completion is verified.</span>
            </div>
          </div>
        )}

        {workerNotified && paymentStatus !== 'Completed' && (
          <div className="bg-coop-500/10 border border-coop-500/20 p-4 rounded-2xl text-left flex gap-3 text-xs text-coop-300 leading-normal">
            <CheckCircle2 className="w-5 h-5 shrink-0 mt-0.5 text-coop-400" />
            <div>
              <span className="font-bold block">Bill Generated & Notified</span>
              <span>Arun Kumar has marked the plumbing job completed. Payment is now unlocked.</span>
            </div>
          </div>
        )}

        {/* Bill Receipt layout */}
        <div className="border border-white/5 bg-black/40 rounded-2xl p-6 text-left font-mono text-sm leading-relaxed space-y-4">
          <div className="text-center font-bold border-b border-white/5 pb-3">
            COOPERATIVE SERVICE BILL
          </div>

          <div className="space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-500">Worker:</span>
              <span className="text-white">Arun Kumar</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Service:</span>
              <span className="text-white">Plumbing</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-500">Visit:</span>
              <span className="text-white">25 Aug 2026</span>
            </div>
          </div>

          <div className="border-t border-dashed border-white/10 pt-3 space-y-1">
            <div className="flex justify-between">
              <span className="text-gray-400">Service Charge</span>
              <span className="text-white">₹400</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Materials</span>
              <span className="text-white">₹80</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-400">Travel</span>
              <span className="text-white">₹30</span>
            </div>
          </div>

          <div className="border-t border-white/5 pt-3 flex justify-between font-bold text-base text-emerald-400">
            <span>Total</span>
            <span>₹510</span>
          </div>

          <div className="border-t border-dashed border-white/10 pt-3 flex justify-between items-center text-xs font-sans">
            <span className="text-gray-500">Payment Status:</span>
            <Badge variant={paymentStatus === 'Completed' ? 'success' : workCompleted ? 'warning' : 'danger'}>
              {paymentStatus === 'Completed' ? 'Completed' : workCompleted ? 'Awaiting Payment' : 'Locked'}
            </Badge>
          </div>
        </div>

        <div className="p-3 bg-white/5 border border-white/5 rounded-xl text-[10px] text-gray-500 text-left flex items-start gap-2 font-sans">
          <HeartHandshake className="w-4 h-4 text-coop-400 shrink-0 mt-0.5" />
          <span>95% (₹484.50) goes directly to Arun, 5% goes to co-op operations.</span>
        </div>

        {/* Success Modal Notification */}
        {showSuccess && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl text-left flex items-start gap-2">
            <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
            <span>Payment successfully validated on cooperative ledgers!</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <Button 
            variant="secondary" 
            className="grow flex items-center justify-center gap-1.5 text-xs py-2.5" 
            onClick={handleDownload}
          >
            <Download className="w-4 h-4" /> Download Bill
          </Button>
          <Button 
            variant="primary" 
            className="grow text-xs py-2.5 font-bold" 
            onClick={handlePayNow}
            disabled={paymentStatus === 'Completed' || !workCompleted}
          >
            {paymentStatus === 'Completed' 
              ? 'Already Paid' 
              : !workCompleted 
              ? 'Payment Locked' 
              : 'Pay Now'}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Bills;
