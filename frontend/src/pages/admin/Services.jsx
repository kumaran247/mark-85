import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Plus, Settings2, Trash2 } from 'lucide-react';

const AdminServices = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [services, setServices] = useState([
    { id: '1', name: 'Plumbing Works', rate: 450, status: 'Active' },
    { id: '2', name: 'Electrical Repairs', rate: 550, status: 'Active' },
    { id: '3', name: 'Cabinet Assembly', rate: 600, status: 'Active' },
    { id: '4', name: 'House Sanitization', rate: 350, status: 'Disabled' }
  ]);

  const [newServiceName, setNewServiceName] = useState('');
  const [newServiceRate, setNewServiceRate] = useState('');
  const [saveMsg, setSaveMsg] = useState('');

  const handleAddService = (e) => {
    e.preventDefault();
    if (!newServiceName || !newServiceRate) return;

    setServices((prev) => [
      ...prev,
      {
        id: String(prev.length + 1),
        name: newServiceName,
        rate: Number(newServiceRate),
        status: 'Active'
      }
    ]);
    setNewServiceName('');
    setNewServiceRate('');
    setSaveMsg('New service category added successfully!');
    setTimeout(() => setSaveMsg(''), 3000);
  };

  const handleToggleStatus = (id) => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, status: s.status === 'Active' ? 'Disabled' : 'Active' } : s));
  };

  const handlePriceChange = (id, newRate) => {
    setServices((prev) => prev.map((s) => s.id === id ? { ...s, rate: Number(newRate) } : s));
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-8">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/admin/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        {/* Left columns: List & Config */}
        <section className="md:col-span-2 rounded-3xl glassmorphism border-white/5 p-6 md:p-8 space-y-6 text-left shadow-2xl">
          <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Service Categories</h2>
          
          <div className="space-y-4">
            {services.map((item) => (
              <div 
                key={item.id}
                className="p-4 rounded-xl bg-white/5 border border-white/5 flex items-center justify-between gap-4 text-xs"
              >
                <div className="space-y-1">
                  <strong className="text-sm text-white">{item.name}</strong>
                  <div className="flex gap-2.5 items-center">
                    <span className="text-gray-500">Base Price:</span>
                    <input 
                      type="number"
                      value={item.rate}
                      onChange={(e) => handlePriceChange(item.id, e.target.value)}
                      className="bg-black/40 border border-white/10 text-white rounded px-2 py-0.5 w-16 text-center font-bold"
                    />
                  </div>
                </div>

                <div className="flex gap-3 items-center">
                  <Badge variant={item.status === 'Active' ? 'success' : 'warning'}>{item.status}</Badge>
                  <Button variant="secondary" className="px-3.5 py-1.5 text-[10px]" onClick={() => handleToggleStatus(item.id)}>
                    {item.status === 'Active' ? 'Disable' : 'Enable'}
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Right column: Add Service form */}
        <aside className="md:col-span-1 rounded-3xl glassmorphism border-white/5 p-6 text-left h-fit space-y-5 shadow-2xl">
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono flex items-center gap-1.5">
            <Plus className="w-4 h-4 text-coop-400" /> Add Service
          </span>

          <form onSubmit={handleAddService} className="space-y-4">
            <Input 
              label="Service Name" 
              placeholder="e.g. Masonry Works"
              value={newServiceName}
              onChange={(e) => setNewServiceName(e.target.value)}
              required
            />
            <Input 
              label="Base Hourly Price (₹)" 
              type="number"
              placeholder="e.g. 500"
              value={newServiceRate}
              onChange={(e) => setNewServiceRate(e.target.value)}
              required
            />

            {saveMsg && (
              <div className="text-[10px] text-emerald-400 font-semibold bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg">
                {saveMsg}
              </div>
            )}

            <Button type="submit" variant="primary" className="w-full py-2 text-xs font-semibold">
              Create Category
            </Button>
          </form>
        </aside>
      </div>
    </div>
  );
};

export default AdminServices;
