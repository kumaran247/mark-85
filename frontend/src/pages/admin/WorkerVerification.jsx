import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, ShieldCheck, Search, Users } from 'lucide-react';

const AdminWorkerVerification = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const pendingWorkers = [
    { id: 'w1', name: 'Arun Kumar', skill: 'Electrician', location: 'Karur North', docs: 4, status: 'Pending' },
    { id: 'w2', name: 'Elena Rostova', skill: 'Master Plumber', location: 'Karur South', docs: 3, status: 'Pending' },
    { id: 'w3', name: 'Julius Diaz', skill: 'Deep Cleaner', location: 'Karur East', docs: 4, status: 'Pending' }
  ];

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-4xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="flex justify-between items-center border-b border-white/5 pb-4">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => navigate('/admin/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Verification Registry Board</h1>
          </div>
          <Badge variant="warning" className="flex items-center gap-1"><ShieldCheck className="w-3.5 h-3.5" /> {pendingWorkers.length} Pending</Badge>
        </header>

        {/* Workers Table */}
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-bold uppercase tracking-wider">
                <th className="p-4">Worker</th>
                <th className="p-4">Skill Specialty</th>
                <th className="p-4">Location Node</th>
                <th className="p-4">Documents Submits</th>
                <th className="p-4">Verification Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pendingWorkers.map((worker) => (
                <tr key={worker.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">{worker.name}</td>
                  <td className="p-4 text-gray-300">{worker.skill}</td>
                  <td className="p-4 text-gray-300">{worker.location}</td>
                  <td className="p-4 text-coop-300 font-semibold">{worker.docs} Proofs</td>
                  <td className="p-4">
                    <Badge variant="warning" className="text-[9px] font-mono">{worker.status}</Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="primary" 
                      className="text-[10px] py-1 px-3.5 inline-block"
                      onClick={() => navigate(`/admin/workers/${worker.id}`)}
                    >
                      Review
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminWorkerVerification;
