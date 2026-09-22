import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, CheckCircle2, ShieldAlert, Sparkles, MessageSquare, Clock } from 'lucide-react';

const Complaints = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [complaintType, setComplaintType] = useState('Report incorrect bill');
  const [description, setDescription] = useState('');
  const [success, setSuccess] = useState(false);

  // Status index mapping: 0: Submitted, 1: Under Review, 2: Resolution, 3: Closed
  const [activeComplaint, setActiveComplaint] = useState({
    id: 'dsp_8817',
    type: 'Report incorrect bill',
    date: '25 Aug 2026',
    step: 1, // Under Review
    desc: 'Ledger calculated materials fee of ₹80, which exceeds estimate threshold.'
  });

  const pipelineSteps = [
    { label: 'Submitted', desc: 'Case logged on ledger registry.' },
    { label: 'Under Review', desc: 'Trustee assigned to evaluate transaction logs.' },
    { label: 'Resolution', desc: 'Adjustment payout or adjustment verified.' },
    { label: 'Closed', desc: 'Complaint closed with mutual resolution agreement.' }
  ];

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setSuccess(true);
    
    // Create new mock active complaint
    setActiveComplaint({
      id: 'dsp_' + Math.floor(Math.random() * 9000 + 1000),
      type: complaintType,
      date: '25 Aug 2026',
      step: 0, // Submitted
      desc: description
    });

    setDescription('');
    setTimeout(() => setSuccess(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        {/* Left columns: Active Disputes & Status Tracker */}
        <section className="md:col-span-2 rounded-3xl glassmorphism border-white/5 p-6 md:p-8 space-y-6 text-left shadow-2xl">
          <div className="space-y-1.5 border-b border-white/5 pb-4">
            <h1 className="text-2xl md:text-3xl font-bold">Complaints & Support</h1>
            <p className="text-xs text-gray-400 font-light">Cooperative governance dispute resolution pipelines.</p>
          </div>

          {activeComplaint && (
            <div className="space-y-6">
              <div className="flex justify-between items-start bg-white/5 p-4 rounded-xl border border-white/5">
                <div>
                  <Badge variant="warning" className="font-mono text-[9px] mb-1.5">ID: {activeComplaint.id}</Badge>
                  <h3 className="text-base font-bold text-white">{activeComplaint.type}</h3>
                  <p className="text-xs text-gray-400 font-light mt-1">{activeComplaint.desc}</p>
                </div>
                <span className="text-[10px] text-gray-500 font-mono font-medium shrink-0">{activeComplaint.date}</span>
              </div>

              {/* Dispute pipeline tracker */}
              <div className="space-y-4">
                <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Dispute Pipeline Status</h4>
                <div className="grid grid-cols-4 gap-2 relative">
                  {pipelineSteps.map((step, idx) => {
                    const isDone = idx < activeComplaint.step;
                    const isActive = idx === activeComplaint.step;
                    const isPending = idx > activeComplaint.step;

                    return (
                      <div key={idx} className="text-center space-y-1.5 relative z-10">
                        <div className={`w-8 h-8 rounded-full mx-auto flex items-center justify-center border text-xs font-bold ${
                          isDone 
                            ? 'bg-emerald-500/20 border-emerald-500 text-emerald-400' 
                            : isActive 
                            ? 'bg-coop-500/20 border-coop-500 text-coop-400 animate-pulse'
                            : 'bg-black/40 border-white/10 text-gray-600'
                        }`}>
                          {isDone ? '✓' : idx + 1}
                        </div>
                        <span className={`block text-[10px] font-bold ${
                          isDone ? 'text-emerald-400' : isActive ? 'text-coop-300' : 'text-gray-500'
                        }`}>
                          {step.label}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}
        </section>

        {/* Right column: File Complaint form */}
        <aside className="md:col-span-1 rounded-3xl glassmorphism border-white/5 p-6 text-left h-fit space-y-5 shadow-2xl">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <ShieldAlert className="w-3.5 h-3.5 text-coop-400 animate-pulse" /> File Dispute
          </span>

          <form onSubmit={handleFormSubmit} className="space-y-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400">Dispute Type</label>
              <select
                value={complaintType}
                onChange={(e) => setComplaintType(e.target.value)}
                className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-coop-500"
              >
                <option value="Report issue">Report issue</option>
                <option value="Request refund">Request refund</option>
                <option value="Report worker">Report worker</option>
                <option value="Report incorrect bill">Report incorrect bill</option>
                <option value="Contact support">Contact support</option>
              </select>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400">Statement Details</label>
              <textarea
                placeholder="Explain the dispute details..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full px-3 py-2 text-xs rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-coop-500"
                required
              />
            </div>

            {success && (
              <div className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg flex items-start gap-1">
                <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
                <span>Dispute logged on registry.</span>
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full py-2 text-xs font-semibold">
              File Case
            </Button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default Complaints;
