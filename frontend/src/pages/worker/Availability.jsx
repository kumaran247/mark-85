import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, CheckCircle2, Clock, Calendar } from 'lucide-react';

const WorkerAvailability = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [availableNow, setAvailableNow] = useState(true);
  const [schedule, setSchedule] = useState({
    Monday: true,
    Tuesday: true,
    Wednesday: false,
    Thursday: true,
    Friday: true,
    Saturday: false,
    Sunday: false
  });
  
  const [timeStart, setTimeStart] = useState('09:00');
  const [timeEnd, setTimeEnd] = useState('18:00');
  const [saveMsg, setSaveMsg] = useState('');

  const handleToggleDay = (day) => {
    setSchedule((prev) => ({ ...prev, [day]: !prev[day] }));
  };

  const handleSave = (e) => {
    e.preventDefault();
    setSaveMsg('Availability settings updated on cooperative directory!');
    setTimeout(() => setSaveMsg(''), 4000);
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.1} threadCount={4} opacity={0.5} />
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/worker/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        <div className="text-left space-y-1.5 border-b border-white/5 pb-4">
          <h1 className="text-2xl font-bold text-white">Availability Calendar</h1>
          <p className="text-xs text-gray-400 font-light font-sans">Set active hours for co-op dispatch assignment matching.</p>
        </div>

        {/* Live dispatch status trigger */}
        <div className="p-4 rounded-2xl bg-white/5 border border-white/5 flex justify-between items-center">
          <div className="space-y-0.5">
            <span className="text-xs font-semibold text-white">Available Now</span>
            <p className="text-[10px] text-gray-500 leading-none">Receive instant job matching alerts nearby.</p>
          </div>
          <button 
            onClick={() => setAvailableNow(!availableNow)}
            className={`w-12 h-6.5 rounded-full p-1 transition-colors duration-200 cursor-pointer ${
              availableNow ? 'bg-emerald-500' : 'bg-white/10'
            }`}
          >
            <div className={`w-4.5 h-4.5 bg-white rounded-full transition-transform duration-200 ${
              availableNow ? 'translate-x-5.5' : 'translate-x-0'
            }`} />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-6">
          {/* Days checklist */}
          <div className="space-y-3">
            <label className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono block">Weekly Days Schedule</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {Object.keys(schedule).map((day) => (
                <button
                  key={day}
                  type="button"
                  onClick={() => handleToggleDay(day)}
                  className={`py-2 px-3.5 rounded-xl text-xs font-semibold border flex items-center justify-between transition-all cursor-pointer ${
                    schedule[day]
                      ? 'bg-coop-500/20 border-coop-500 text-coop-400 font-bold'
                      : 'bg-white/5 border-white/5 text-gray-500 hover:text-white'
                  }`}
                >
                  <span>{day}</span>
                  <span className="text-[10px]">{schedule[day] ? '✓' : '✕'}</span>
                </button>
              ))}
            </div>
          </div>

          {/* Time range inputs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-gray-400">Shift Start</label>
              <input
                type="time"
                value={timeStart}
                onChange={(e) => setTimeStart(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-coop-500 text-xs"
              />
            </div>
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-semibold text-gray-400">Shift End</label>
              <input
                type="time"
                value={timeEnd}
                onChange={(e) => setTimeEnd(e.target.value)}
                className="w-full px-3 py-2 rounded-xl bg-black/40 border border-white/10 text-white focus:outline-none focus:border-coop-500 text-xs"
              />
            </div>
          </div>

          {saveMsg && (
            <div className="text-[10px] text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl flex items-start gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 shrink-0 mt-0.5" />
              <span>{saveMsg}</span>
            </div>
          )}

          <Button type="submit" variant="primary" className="w-full py-2.5 text-xs font-semibold">
            Save Availability Changes
          </Button>
        </form>
      </div>
    </div>
  );
};

export default WorkerAvailability;
