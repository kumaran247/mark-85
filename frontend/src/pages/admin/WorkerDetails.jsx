import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, CheckCircle2, ShieldAlert, Award, FileText, MapPin } from 'lucide-react';

const AdminWorkerDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signout } = useAuth();
  
  const [status, setStatus] = useState('Pending');
  const [notification, setNotification] = useState('');

  const mockWorker = {
    id: id || 'w1',
    name: 'Arun Kumar',
    email: 'arun.kumar@gmail.com',
    phone: '+91 99887 76655',
    skill: 'Electrician',
    experience: '7 years',
    location: 'Karur North',
    docs: [
      { name: 'Identity Proof', file: 'Aadhaar_Card_Arun.pdf', verified: true },
      { name: 'Address Proof', file: 'Utility_Bill_Karur.pdf', verified: true },
      { name: 'Academy Certificate', file: 'Plumbing_Trade_NTC.pdf', verified: true }
    ],
    reviews: [
      { customer: 'Ravi', rating: 5, text: 'Great switchboard assembly support.' }
    ]
  };

  const handleApprove = () => {
    setStatus('Approved');
    setNotification('✓ Worker access granted. Account registered successfully.');
    setTimeout(() => {
      setNotification('');
      navigate('/admin/workers/verification');
    }, 2000);
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
              onClick={() => navigate('/admin/workers/verification')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Verification Inspector</h1>
          </div>
          <Badge variant={status === 'Approved' ? 'success' : 'warning'}>{status}</Badge>
        </header>

        {notification && (
          <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-xl animate-pulse-slow">
            {notification}
          </div>
        )}

        <div className="space-y-4 text-xs text-gray-300">
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Worker</span>
              <strong className="text-sm text-white">{mockWorker.name}</strong>
              <span className="block text-[10px] text-gray-500">{mockWorker.email} • {mockWorker.phone}</span>
            </div>
            <div className="bg-white/5 p-4 rounded-xl border border-white/5 space-y-1">
              <span className="text-[10px] text-gray-500 uppercase font-mono block">Skill specialty</span>
              <strong className="text-sm text-white">{mockWorker.skill}</strong>
              <span className="block text-[10px] text-gray-500">{mockWorker.experience} experience • {mockWorker.location}</span>
            </div>
          </div>

          {/* Documents logs */}
          <div className="space-y-3">
            <span className="text-[10px] text-gray-500 uppercase font-mono block">Documents Checklist</span>
            {mockWorker.docs.map((doc, idx) => (
              <div key={idx} className="flex justify-between items-center bg-black/20 p-3 rounded-xl border border-white/5">
                <span className="font-semibold text-white flex items-center gap-2">
                  <FileText className="w-4 h-4 text-coop-400" /> {doc.name}: {doc.file}
                </span>
                <Badge variant="success">Verified</Badge>
              </div>
            ))}
          </div>
        </div>

        {/* Actions panel */}
        <div className="border-t border-white/5 pt-6 grid grid-cols-3 gap-3">
          <Button variant="secondary" className="text-[10px] py-2.5 font-semibold" onClick={() => navigate('/admin/workers/verification')}>
            Request Info
          </Button>
          <Button variant="outline" className="text-[10px] py-2.5 font-semibold" onClick={() => navigate('/admin/workers/verification')}>
            Reject Worker
          </Button>
          <Button variant="primary" className="text-[10px] py-2.5 font-bold" onClick={handleApprove} disabled={status === 'Approved'}>
            Approve Worker
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkerDetails;
