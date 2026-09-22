import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, User, Hammer, MapPin, IndianRupee, CreditCard, Bell, ShieldCheck, CheckCircle2, Camera } from 'lucide-react';

const WorkerProfile = () => {
  const navigate = useNavigate();
  const { user, signout } = useAuth();

  const [activeTab, setActiveTab] = useState('profile');
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [profilePic, setProfilePic] = useState(null);
  const avatarInputRef = useRef(null);

  const handleAvatarChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setProfilePic(URL.createObjectURL(e.target.files[0]));
    }
  };

  const tabs = [
    { id: 'profile', label: 'Personal Profile', icon: User },
    { id: 'skills', label: 'Skills & Specialty', icon: Hammer },
    { id: 'area', label: 'Service Area', icon: MapPin },
    { id: 'pricing', label: 'Base Pricing', icon: IndianRupee },
    { id: 'bank', label: 'Bank Details', icon: CreditCard },
    { id: 'notifications', label: 'Notifications', icon: Bell }
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
            onClick={() => navigate('/worker/dashboard')}
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
          {activeTab === 'profile' && (
            <form onSubmit={handleSave} className="space-y-6">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Personal Details</h2>
              
              {/* Profile Avatar Upload Section */}
              <div className="flex flex-col sm:flex-row items-center gap-6 bg-white/5 p-5 rounded-2xl border border-white/5">
                <input 
                  type="file"
                  ref={avatarInputRef}
                  accept="image/*"
                  onChange={handleAvatarChange}
                  className="hidden"
                />
                <div 
                  onClick={() => avatarInputRef.current?.click()}
                  className="w-24 h-24 rounded-full bg-coop-500/10 border border-coop-500/30 flex items-center justify-center font-bold text-white overflow-hidden relative cursor-pointer group shadow-lg shrink-0"
                >
                  {profilePic ? (
                    <img src={profilePic} alt="avatar" className="w-full h-full object-cover" />
                  ) : (
                    <User className="w-10 h-10 text-gray-400 group-hover:scale-110 transition-transform" />
                  )}
                  <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center text-[10px] text-coop-300 font-semibold gap-1">
                    <Camera className="w-4.5 h-4.5 text-white" />
                    Change
                  </div>
                </div>
                <div className="text-left space-y-1">
                  <h3 className="text-sm font-bold text-white">Profile Photo</h3>
                  <p className="text-xs text-gray-500 font-light">
                    Upload a high-resolution headshot. This is visible to co-op customers booking your services.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Full Name" defaultValue={user?.name || 'Arun Kumar'} required />
                <Input label="Email Address" defaultValue={user?.email || 'arun.kumar@gmail.com'} required />
                <Input label="Phone Number" defaultValue="+91 99887 76655" required />
              </div>
              <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold">
                Save Changes
              </Button>
            </form>
          )}

          {activeTab === 'skills' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Skills & Specialty</h2>
              <div className="space-y-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-semibold text-gray-400">Primary Skill Node</label>
                  <select className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none text-xs">
                    <option value="Plumbing">Plumbing specialist</option>
                    <option value="Electrical">Electrical works</option>
                  </select>
                </div>
                <Input label="Years of Experience" type="number" defaultValue="7" required />
              </div>
              <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold">
                Update Skills
              </Button>
            </form>
          )}

          {activeTab === 'area' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Service Area</h2>
              <div className="space-y-3">
                <Input label="Primary Dispatch Node" defaultValue="Indiranagar, Bengaluru" required />
                <Input label="Service Radius Coverage (km)" type="number" defaultValue="5" required />
              </div>
              <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold">
                Update Service Area
              </Button>
            </form>
          )}

          {activeTab === 'pricing' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Base Pricing Settings</h2>
              <div className="space-y-3">
                <Input label="Target Base Rate (₹ / Hour)" type="number" defaultValue="350" required />
                <span className="text-[10px] text-gray-500 block leading-relaxed font-light">
                  Standard member rate limit bound: ₹300 min to ₹600 max. Updates subject to trustee registry calibrations.
                </span>
              </div>
              <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold">
                Save Price Settings
              </Button>
            </form>
          )}

          {activeTab === 'bank' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Bank Details</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Input label="Bank Account Number" defaultValue="123456789012" required />
                <Input label="Bank IFSC Code" defaultValue="HDFC0000123" required />
                <Input label="Beneficiary Holder" defaultValue="Arun Kumar" required />
              </div>
              <Button type="submit" variant="primary" className="py-2.5 text-xs font-semibold">
                Save Bank Details
              </Button>
            </form>
          )}

          {activeTab === 'notifications' && (
            <form onSubmit={handleSave} className="space-y-4">
              <h2 className="text-xl font-bold text-white border-b border-white/5 pb-3">Notification Options</h2>
              <div className="space-y-3">
                <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-coop-500 rounded border-white/10 w-4 h-4" />
                  Alert on new client request matches (SMS)
                </label>
                <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                  <input type="checkbox" defaultChecked className="accent-coop-500 rounded border-white/10 w-4 h-4" />
                  Alert on certificate expiry warning notifications
                </label>
              </div>
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

export default WorkerProfile;
