import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Star, Heart, ShieldCheck, Hammer } from 'lucide-react';

const SavedWorkers = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [savedList, setSavedList] = useState([
    { id: 'w1', name: 'Arun Kumar', role: 'Plumbing Specialist', rating: 4.9, reviews: 142, avatar: '👷', rate: 350 },
    { id: 'w2', name: 'Marcus Vance', role: 'Senior Electrician', rating: 4.8, reviews: 95, avatar: '⚡', rate: 450 },
    { id: 'w3', name: 'Elena Rostova', role: 'Master Pipefitter', rating: 4.9, reviews: 110, avatar: '👩‍🔧', rate: 500 }
  ]);

  const handleRemove = (id) => {
    setSavedList((prev) => prev.filter((item) => item.id !== id));
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
              onClick={() => navigate('/user/dashboard')}
              className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <h1 className="text-xl font-bold text-white">Saved Workers</h1>
          </div>
          <Badge variant="primary" className="flex items-center gap-1"><Heart className="w-3.5 h-3.5 text-coop-400 fill-coop-400" /> {savedList.length} Saved</Badge>
        </header>

        {savedList.length === 0 ? (
          <div className="p-12 text-center text-gray-500 rounded-2xl bg-white/5 border border-white/5">
            Your saved worker register catalog is currently empty.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {savedList.map((worker) => (
              <div 
                key={worker.id}
                className="p-5 rounded-2xl glassmorphism border-white/5 hover:border-coop-500/20 transition-all flex flex-col justify-between h-56 text-left shadow-sm group"
              >
                <div>
                  <div className="flex justify-between items-start">
                    <div className="w-11 h-11 rounded-lg bg-coop-500/10 flex items-center justify-center text-2xl">
                      {worker.avatar}
                    </div>
                    <button 
                      onClick={() => handleRemove(worker.id)}
                      className="text-gray-500 hover:text-red-400 cursor-pointer bg-white/5 hover:bg-white/10 p-1.5 rounded-lg border border-white/5"
                    >
                      <Heart className="w-3.5 h-3.5 fill-red-400 text-red-400" />
                    </button>
                  </div>

                  <h3 className="text-base font-bold text-white mt-4 group-hover:text-coop-300 transition-colors">
                    {worker.name}
                  </h3>
                  <p className="text-xs text-gray-400">{worker.role}</p>

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500">
                    <span className="flex items-center gap-1 text-white">
                      <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {worker.rating}
                    </span>
                    <span>({worker.reviews} reviews)</span>
                  </div>
                </div>

                <div className="border-t border-white/5 pt-3 mt-4 flex justify-between items-center text-xs">
                  <span className="text-[10px] text-gray-500 font-mono">Est. Rate: ₹{worker.rate}/hr</span>
                  <Button variant="outline" className="text-[10px] py-1 px-3" onClick={() => navigate('/user/request')}>
                    Book Job
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default SavedWorkers;
