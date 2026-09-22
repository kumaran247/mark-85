import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Clock, ShieldAlert } from 'lucide-react';

const AdminComplaints = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [complaints, setComplaints] = useState([
    { id: 'dsp_8817', text: 'Materials charge exceeds estimate bounds', user: 'Ravi', worker: 'Arun Kumar', priority: 'High', status: 'INVESTIGATING' },
    { id: 'dsp_8818', text: 'Late arrival and incomplete diagnostic logs', user: 'Sonia', worker: 'Marcus Vance', priority: 'Medium', status: 'NEW' },
    { id: 'dsp_8819', text: 'Work request cancellation refund claims', user: 'Rohan', worker: 'Sunita Patel', priority: 'Low', status: 'RESOLVED' }
  ]);

  const workflow = ['NEW', 'INVESTIGATING', 'RESOLVED', 'CLOSED'];

  const handleAdvanceStatus = (id, currentStatus) => {
    const currentIndex = workflow.indexOf(currentStatus);
    const nextStatus = workflow[Math.min(currentIndex + 1, workflow.length - 1)];
    setComplaints((prev) => prev.map((c) => c.id === id ? { ...c, status: nextStatus } : c));
  };

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
            <h1 className="text-xl font-bold text-white">Dispute Registry Board</h1>
          </div>
          <Badge variant="warning" className="flex items-center gap-1"><ShieldAlert className="w-3.5 h-3.5" /> {complaints.length} Disputes</Badge>
        </header>

        {/* Complaints Table */}
        <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-bold uppercase tracking-wider">
                <th className="p-4">Complaint Description</th>
                <th className="p-4">Customer</th>
                <th className="p-4">Worker Partner</th>
                <th className="p-4">Priority Class</th>
                <th className="p-4">Resolution Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {complaints.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 text-white">
                    <span className="block font-bold">{item.text}</span>
                    <span className="text-[10px] text-gray-500 font-mono mt-0.5">{item.id}</span>
                  </td>
                  <td className="p-4 text-gray-300">{item.user}</td>
                  <td className="p-4 text-gray-300">{item.worker}</td>
                  <td className="p-4">
                    <Badge variant={item.priority === 'High' ? 'warning' : 'info'}>{item.priority}</Badge>
                  </td>
                  <td className="p-4">
                    <Badge variant={item.status === 'CLOSED' ? 'success' : item.status === 'RESOLVED' ? 'info' : 'warning'} className="font-mono text-[9px]">
                      {item.status}
                    </Badge>
                  </td>
                  <td className="p-4 text-right">
                    <Button 
                      variant="primary" 
                      className="text-[9px] py-1 px-3 inline-block font-semibold"
                      onClick={() => handleAdvanceStatus(item.id, item.status)}
                      disabled={item.status === 'CLOSED'}
                    >
                      {item.status === 'CLOSED' ? 'Resolved' : 'Advance Status'}
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

export default AdminComplaints;
