import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Users, ShieldAlert } from 'lucide-react';

const AdminUsers = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [users, setUsers] = useState([
    { id: 'usr_1', name: 'Ravi', email: 'ravi@gmail.com', role: 'Customer', status: 'Active' },
    { id: 'usr_2', name: 'Arun Kumar', email: 'arun@gmail.com', role: 'Worker', status: 'Active' },
    { id: 'usr_3', name: 'Marcus Vance', email: 'marcus@gmail.com', role: 'Worker', status: 'Suspended' }
  ]);

  const handleAction = (id, newStatus) => {
    setUsers((prev) => prev.map((u) => u.id === id ? { ...u, status: newStatus } : u));
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
            <h1 className="text-xl font-bold text-white">Registry Users</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1"><Users className="w-3.5 h-3.5" /> {users.length} Users</Badge>
        </header>

        <div className="overflow-x-auto rounded-xl border border-white/5 bg-black/20">
          <table className="w-full text-left border-collapse text-xs">
            <thead>
              <tr className="border-b border-white/5 bg-white/5 text-gray-400 font-bold uppercase tracking-wider">
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">Role</th>
                <th className="p-4">Status</th>
                <th className="p-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((item) => (
                <tr key={item.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="p-4 font-bold text-white">{item.name}</td>
                  <td className="p-4 text-gray-300">{item.email}</td>
                  <td className="p-4 text-gray-300">{item.role}</td>
                  <td className="p-4">
                    <Badge variant={item.status === 'Active' ? 'success' : 'warning'}>{item.status}</Badge>
                  </td>
                  <td className="p-4 text-right flex justify-end gap-2">
                    <button 
                      onClick={() => handleAction(item.id, 'Active')}
                      className="text-[10px] text-emerald-400 hover:underline cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5"
                    >
                      Activate
                    </button>
                    <button 
                      onClick={() => handleAction(item.id, 'Suspended')}
                      className="text-[10px] text-amber-400 hover:underline cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5"
                    >
                      Suspend
                    </button>
                    <button 
                      onClick={() => handleAction(item.id, 'Blocked')}
                      className="text-[10px] text-red-400 hover:underline cursor-pointer bg-white/5 px-2.5 py-1 rounded border border-white/5"
                    >
                      Block
                    </button>
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

export default AdminUsers;
