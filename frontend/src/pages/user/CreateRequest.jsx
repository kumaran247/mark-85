import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Input from '../../components/common/Input';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { 
  Sparkles, Calendar, Clock, MapPin, ShieldCheck, 
  ArrowLeft, UploadCloud, IndianRupee, AlertCircle 
} from 'lucide-react';

const CreateRequest = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [service, setService] = useState('Plumbing');
  const [description, setDescription] = useState('');
  const [location, setLocation] = useState('Sector 4, Indiranagar, Bengaluru');
  const [isChangingLocation, setIsChangingLocation] = useState(false);
  const [prefDate, setPrefDate] = useState('');
  const [prefTime, setPrefTime] = useState('');
  const [urgency, setUrgency] = useState('Medium');
  const [budget, setBudget] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [photos, setPhotos] = useState([]);
  const fileInputRef = useRef(null);

  const handlePhotoChange = (e) => {
    if (e.target.files) {
      const fileList = Array.from(e.target.files);
      setPhotos((prev) => [...prev, ...fileList]);
    }
  };

  const removePhoto = (index) => {
    setPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Dynamic AI pricing estimate matrix
  const estimates = {
    Plumbing: { min: 350, max: 500 },
    Electrical: { min: 450, max: 700 },
    Cleaner: { min: 300, max: 450 },
    Carpenter: { min: 500, max: 800 },
    Painter: { min: 600, max: 1200 },
    Gardener: { min: 300, max: 500 },
    Technician: { min: 400, max: 650 },
    Driver: { min: 500, max: 900 }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate small dispatch buffer
    setTimeout(() => {
      setIsSubmitting(false);
      // Route straight to the AI recommendations matching screen
      navigate('/user/ai-match');
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      {/* Background canvas */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.15} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-2xl">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        <div className="rounded-3xl glassmorphism border-white/5 p-8 shadow-2xl space-y-6 text-left">
          <div className="space-y-2 border-b border-white/5 pb-4">
            <Badge variant="primary" className="flex items-center gap-1.5 w-fit">
              <Sparkles className="w-3.5 h-3.5 text-coop-400" /> Cooperative Work Dispatch
            </Badge>
            <h1 className="text-3xl font-bold text-white">Create Work Request</h1>
            <p className="text-sm text-gray-400">Fill in details. AI calculates estimates matching standard member rates.</p>
          </div>

          <form onSubmit={handleFormSubmit} className="space-y-5">
            {/* Service category selection */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Service Needed</label>
              <select
                value={service}
                onChange={(e) => setService(e.target.value)}
                className="w-full px-4 py-3.5 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-coop-500"
              >
                <option value="Plumbing">Plumbing Works</option>
                <option value="Electrical">Electrical Repairs</option>
                <option value="Cleaner">Cleaning & Sanitization</option>
                <option value="Carpenter">Carpentry & Joinery</option>
                <option value="Painter">Painting Services</option>
                <option value="Gardener">Gardening & Pruning</option>
                <option value="Technician">Appliance Service Technician</option>
                <option value="Driver">Local Chauffeur/Driver</option>
              </select>
            </div>

            {/* Problem description */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Problem Description</label>
              <textarea
                placeholder="Briefly describe the leak, repair detail, or task requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows="3"
                className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-coop-500 text-sm leading-relaxed"
                required
              />
            </div>

            {/* Photo upload simulator */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Reference Photos</label>
              
              <input 
                type="file" 
                ref={fileInputRef}
                multiple 
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border border-dashed border-white/10 hover:border-coop-500/50 rounded-xl p-6 text-center cursor-pointer transition-colors bg-black/20 flex flex-col items-center gap-2"
              >
                <UploadCloud className="w-8 h-8 text-gray-500" />
                <span className="text-xs text-gray-300 font-semibold">Upload job references</span>
                <span className="text-[10px] text-gray-500">Supports PNG, JPEG up to 10MB</span>
              </div>

              {photos.length > 0 && (
                <div className="flex flex-wrap gap-3 mt-2">
                  {photos.map((file, idx) => (
                    <div key={idx} className="relative w-16 h-16 rounded-xl overflow-hidden border border-white/10 group">
                      <img 
                        src={URL.createObjectURL(file)} 
                        alt="preview" 
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => removePhoto(idx)}
                        className="absolute inset-0 bg-black/60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity text-red-400 font-bold text-xs"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Location selector */}
            <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-3">
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Service Node Location</span>
              
              {!isChangingLocation ? (
                <div className="flex justify-between items-center bg-black/40 px-4 py-3 rounded-lg border border-white/5">
                  <span className="text-xs text-white flex items-center gap-1.5">
                    <MapPin className="w-4 h-4 text-emerald-400 animate-pulse-slow" /> {location}
                  </span>
                  <button 
                    type="button" 
                    onClick={() => setIsChangingLocation(true)}
                    className="text-xs text-coop-400 hover:underline cursor-pointer bg-transparent border-none font-semibold"
                  >
                    [Change Location]
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="grow px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white text-xs"
                    placeholder="Enter custom location address"
                  />
                  <Button variant="secondary" className="text-xs shrink-0 py-1.5" onClick={() => setIsChangingLocation(false)}>
                    Save
                  </Button>
                </div>
              )}
            </div>

            {/* Date & Time Preferences */}
            <div className="grid grid-cols-2 gap-4">
              <Input
                label="Preferred Date"
                type="date"
                value={prefDate}
                onChange={(e) => setPrefDate(e.target.value)}
                required
              />
              <Input
                label="Preferred Time"
                type="time"
                value={prefTime}
                onChange={(e) => setPrefTime(e.target.value)}
                required
              />
            </div>

            {/* Urgency buttons */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Urgency Level</label>
              <div className="grid grid-cols-3 gap-3">
                {['Low', 'Medium', 'High'].map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setUrgency(level)}
                    className={`py-2.5 rounded-xl text-xs font-bold transition-all cursor-pointer border ${
                      urgency === level
                        ? level === 'High' 
                          ? 'bg-red-500/20 text-red-400 border-red-500' 
                          : level === 'Medium'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500'
                          : 'bg-emerald-500/20 text-emerald-400 border-emerald-500'
                        : 'bg-white/5 text-gray-400 border-white/5 hover:border-white/10'
                    }`}
                  >
                    {level} Priority
                  </button>
                ))}
              </div>
            </div>

            {/* Budget and AI Pricing Estimate indicator */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-end bg-[#121222] p-5 rounded-2xl border border-coop-500/20">
              <Input
                label="Your Target Budget (₹)"
                type="number"
                placeholder="e.g. 400"
                value={budget}
                onChange={(e) => setBudget(e.target.value)}
                required
              />

              <div className="space-y-1.5 text-left border-l border-white/5 pl-4">
                <span className="text-[10px] text-gray-500 uppercase tracking-widest font-mono flex items-center gap-1">
                  <Sparkles className="w-3.5 h-3.5 text-coop-400 animate-pulse-slow" /> AI Estimated Rate
                </span>
                <strong className="text-xl text-white block">
                  ₹{estimates[service]?.min} – ₹{estimates[service]?.max}
                </strong>
                <span className="text-[10px] text-gray-400 block font-light">Based on co-op standard rates in Sector 4</span>
              </div>
            </div>

            <Button
              type="submit"
              variant="primary"
              className="w-full mt-6 py-3 font-semibold text-sm"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting request...' : 'Find Best Worker'}
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateRequest;
