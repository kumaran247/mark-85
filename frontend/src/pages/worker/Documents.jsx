import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, CheckCircle2, ShieldAlert, Award, FileText, Calendar } from 'lucide-react';

const WorkerDocuments = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const documents = [
    { name: 'Government Identity Proof', status: 'Verified ✓', val: 'Aadhaar Card ending in 4812', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
    { name: 'Local Address Verification', status: 'Verified ✓', val: 'Electricity utility statement', color: 'text-emerald-400 border-emerald-500/20 bg-emerald-500/5' },
    { name: 'Academy Skill Certificate', status: 'Expiring in 42 days ⚠️', val: 'National Plumbing Institute Level 2', color: 'text-amber-400 border-amber-500/20 bg-amber-500/5' }
  ];

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
            <h1 className="text-xl font-bold text-white">Trustee Documents</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1"><FileText className="w-3.5 h-3.5" /> Registry Verified</Badge>
        </header>

        {/* Expiry alerts banner */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-start gap-3 animate-pulse-slow">
          <ShieldAlert className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1">
            <h4 className="text-xs font-bold text-amber-400 uppercase tracking-widest font-mono">Registry Alert: Document Expiry</h4>
            <p className="text-xs text-gray-300 leading-relaxed font-sans font-light">
              Your Academy Skill Certificate expires in <strong className="text-white">42 days</strong>. Please upload updated credentials before expiry to maintain dashboard matching access.
            </p>
          </div>
        </div>

        {/* Documents listing */}
        <div className="space-y-4">
          {documents.map((doc, idx) => (
            <div 
              key={idx}
              className={`p-5 rounded-2xl border flex justify-between items-center gap-4 ${doc.color}`}
            >
              <div className="space-y-1 text-left">
                <h3 className="text-sm font-bold text-white">{doc.name}</h3>
                <span className="text-[10px] text-gray-400 font-mono block">{doc.val}</span>
              </div>
              <Badge variant={doc.status.includes('Verified') ? 'success' : 'warning'}>
                {doc.status}
              </Badge>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WorkerDocuments;
