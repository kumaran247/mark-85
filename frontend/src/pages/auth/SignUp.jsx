import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import { Shield, Hammer, Users, ArrowLeft, ArrowRight, Lock, Mail, User, Sparkles } from 'lucide-react';
import WebThreads from '../../components/common/WebThreads';

const SignUp = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  
  const [step, setStep] = useState(1);
  const [role, setRole] = useState(null);
  
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    adminCode: '',
    workerCategory: 'Electrical',
    experience: ''
  });
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const roles = [
    {
      id: 'customer',
      title: 'Customer',
      description: 'Find trusted local workers, schedule jobs, and track live status.',
      icon: Users,
      badge: 'COMMUNITY MEMBER',
      color: 'border-coop-500/20 hover:border-coop-500 hover:shadow-coop-500/10'
    },
    {
      id: 'worker',
      title: 'Worker',
      description: 'Join the service cooperative, pick up verified gigs, and earn fair rates.',
      icon: Hammer,
      badge: 'CO-OP PARTNER',
      color: 'border-emerald-500/20 hover:border-emerald-500 hover:shadow-emerald-500/10'
    },
    {
      id: 'admin',
      title: 'Admin',
      description: 'Govern the cooperative register, verify credentials, and view metrics.',
      icon: Shield,
      badge: 'REGISTRY TRUSTEE',
      color: 'border-amber-500/20 hover:border-amber-500 hover:shadow-amber-500/10'
    }
  ];

  const handleRoleSelect = (selectedRoleId) => {
    setRole(selectedRoleId);
    setStep(2);
  };

  const validate = () => {
    let tempErrors = {};
    if (!form.name.trim()) tempErrors.name = 'Full name is required';
    if (!form.email.trim()) tempErrors.email = 'Email address is required';
    else if (!/\S+@\S+\.\S+/.test(form.email)) tempErrors.email = 'Invalid email address';
    
    if (!form.password) tempErrors.password = 'Password is required';
    else if (form.password.length < 6) tempErrors.password = 'Password must be at least 6 characters';
    
    if (role === 'admin' && form.adminCode !== 'COOP2026') {
      tempErrors.adminCode = 'Invalid registry authorization code';
    }
    
    if (role === 'worker' && !form.experience) {
      tempErrors.experience = 'Please enter years of work experience';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;
    
    setIsSubmitting(true);
    try {
      const registeredUser = await signup({
        name: form.name,
        email: form.email,
        role: role,
        workerCategory: form.workerCategory,
        experience: form.experience
      });
      
      // Redirect based on backend confirmed role
      if (registeredUser.role === 'customer') {
        navigate('/user/dashboard');
      } else if (registeredUser.role === 'worker') {
        navigate('/worker/dashboard');
      } else if (registeredUser.role === 'admin') {
        navigate('/admin/dashboard');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#030307] px-4 py-16">
      {/* Background WebThreads */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.15} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-4xl">
        {step === 1 ? (
          <div className="space-y-12 text-center">
            <div className="space-y-4">
              <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                How will you use the platform?
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto text-base">
                Choose your registration pathway to join the service cooperative network.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {roles.map((item) => {
                const Icon = item.icon;
                return (
                  <div
                    key={item.id}
                    onClick={() => handleRoleSelect(item.id)}
                    className={`p-8 rounded-3xl glassmorphism text-left cursor-pointer transition-all duration-300 border hover:scale-105 flex flex-col justify-between h-80 ${item.color}`}
                  >
                    <div>
                      <div className="flex justify-between items-start mb-6">
                        <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-white">
                          <Icon className="w-6 h-6" />
                        </div>
                        <Badge variant="primary" className="text-[10px]">
                          {item.badge}
                        </Badge>
                      </div>
                      <h3 className="text-2xl font-bold text-white mb-2">{item.title}</h3>
                      <p className="text-sm text-gray-400 leading-relaxed">{item.description}</p>
                    </div>
                    <div className="flex items-center gap-2 text-xs font-semibold text-coop-400 mt-6">
                      Select Role <ArrowRight className="w-3.5 h-3.5" />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ) : (
          <div className="max-w-md mx-auto rounded-3xl glassmorphism border-white/5 p-8 shadow-2xl space-y-6">
            <button
              onClick={() => setStep(1)}
              className="flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors cursor-pointer"
            >
              <ArrowLeft className="w-4 h-4" /> Back to Role Selection
            </button>

            <div className="text-left space-y-2">
              <Badge variant="primary" className="uppercase font-mono tracking-wider">
                {role} registration
              </Badge>
              <h2 className="text-2xl font-bold text-white">Create your account</h2>
              <p className="text-sm text-gray-400">Please provide authentication details below.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <Input
                label="Full Name"
                placeholder="Enter full name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                error={errors.name}
                required
              />

              <Input
                label="Email Address"
                type="email"
                placeholder="name@domain.com"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                error={errors.email}
                required
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => setForm({ ...form, password: e.target.value })}
                error={errors.password}
                required
              />

              {role === 'worker' && (
                <>
                  <div className="text-left flex flex-col gap-1.5">
                    <label className="text-sm font-medium text-gray-300">Primary Skill Category</label>
                    <select
                      value={form.workerCategory}
                      onChange={(e) => setForm({ ...form, workerCategory: e.target.value })}
                      className="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white focus:outline-none focus:border-coop-500"
                    >
                      <option value="Electrical" className="bg-[#12121e]">Electrical</option>
                      <option value="Plumbing" className="bg-[#12121e]">Plumbing</option>
                      <option value="Carpentry" className="bg-[#12121e]">Carpentry</option>
                      <option value="Sanitization" className="bg-[#12121e]">Sanitization</option>
                    </select>
                  </div>
                  <Input
                    label="Years of Experience"
                    type="number"
                    placeholder="e.g. 5"
                    value={form.experience}
                    onChange={(e) => setForm({ ...form, experience: e.target.value })}
                    error={errors.experience}
                    required
                  />
                </>
              )}

              {role === 'admin' && (
                <div className="space-y-1">
                  <Input
                    label="Registry Access Key"
                    type="password"
                    placeholder="Secret Admin Access Key"
                    value={form.adminCode}
                    onChange={(e) => setForm({ ...form, adminCode: e.target.value })}
                    error={errors.adminCode}
                    required
                  />
                  <span className="text-[10px] text-gray-500 block text-left">
                    Hint: Enter <code className="text-coop-300 font-mono">COOP2026</code> to authorize simulated admin status.
                  </span>
                </div>
              )}

              <Button
                type="submit"
                variant="primary"
                className="w-full mt-6 py-3 font-semibold"
                disabled={isSubmitting}
              >
                {isSubmitting ? 'Registering...' : 'Register Profile'}
              </Button>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default SignUp;
