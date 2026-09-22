import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, User, MapPin, Settings, Bell, CreditCard, Lock, Sparkles, CheckCircle2 } from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const [activeTab, setActiveTab] = useState('personal');
  const [saveSuccess, setSaveSuccess] = useState(false);

  const tabs = [
    { id: 'personal', label: 'Personal Details', icon: User },
    { id: 'addresses', label: 'Saved Addresses', icon: MapPin },
    { id: 'preferences', label: 'Preferences', icon: Settings },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'payment', label: 'Payment Methods', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock }
  ];

  const handleSave = (e) => {
    e.preventDefault();
    setSaveSuccess(true);
    setTimeout(() => setSaveSuccess(false), 3000);
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-4xl grid grid-cols-1 md:grid-cols-4 gap-8">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        {/* Left Sidebar Tab Navigation */}
        <aside className="md:col-span-1 rounded-3xl glassmorphism border-white/5 p-4 space-y-2 h-fit text-left shadow-2xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 text-xs font-semibold rounded-xl transition-all cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-coop-600 text-white shadow-md'
                    : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <Icon className="w-4 h-4 shrink-0" />
                <span>{tab.label}</span>
              </button>
            );
          })}
        </aside>

        {/* Right Content Form Area */}
        <section className="md:col-span-3 rounded-3xl glassmorphism border-white/5 p-6 md:p-8 space-y-6 text-left shadow-2xl">
          {activeTab === 'personal' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Personal Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue={user?.name || 'Rohan Sen'} required />
                <Input label="Email Address" defaultValue={user?.email || 'rohan.sen@gmail.com'} required />
                <Input label="Phone Number" defaultValue="+91 98765 43210" required />
              </div>
              <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold">
                Save Changes
              </Button>
            </form>
          )}

          {activeTab === 'addresses' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Saved Addresses</h2>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-1">
                  <Badge variant="primary" className="text-[9px]">Home</Badge>
                  <p className="text-xs text-white font-semibold">Sector 4, Indiranagar, Bengaluru, 560038</p>
                </div>
                <div className="bg-white/5 border border-white/5 p-4 rounded-xl space-y-1">
                  <Badge variant="primary" className="text-[9px]">Office</Badge>
                  <p className="text-xs text-white font-semibold font-light">6th Block, Koramangala, Bengaluru, 560095</p>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'preferences' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Service Preferences</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-coop-500 rounded border-white/10 w-4 h-4" />
                  Prioritize Gold-certified worker matchings
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-coop-500 rounded border-white/10 w-4 h-4" />
                  Show eco-friendly cleaner products filter
                </label>
              </div>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Notification Settings</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-coop-500 rounded border-white/10 w-4 h-4" />
                  Email invoices upon bill generations
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-coop-500 rounded border-white/10 w-4 h-4" />
                  SMS alerts when worker en-route
                </label>
              </div>
            </form>
          )}

          {activeTab === 'payment' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Payment Methods</h2>
              <div className="space-y-3">
                <div className="bg-white/5 border border-white/5 p-4 rounded-xl flex justify-between items-center text-xs">
                  <span className="font-semibold text-white">UPI: rohan@okhdfc</span>
                  <Badge variant="success">Primary</Badge>
                </div>
              </div>
            </form>
          )}

          {activeTab === 'security' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Account Security</h2>
              <div className="space-y-4">
                <Input label="Current Password" type="password" placeholder="••••••••" required />
                <Input label="New Password" type="password" placeholder="••••••••" required />
              </div>
              <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold">
                Change Password
              </Button>
            </form>
          )}

          {saveSuccess && (
            <div className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-lg flex items-start gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>Profile settings successfully saved to node register.</span>
            </div>
          )}
        </section>
      </div>
    </div>
  );
};

export default Profile;
