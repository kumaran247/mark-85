import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { ArrowLeft, Star, Heart, CheckCircle2 } from 'lucide-react';

const Ratings = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { signout } = useAuth();

  const [ratings, setRatings] = useState({
    workQuality: 5,
    professionalism: 5,
    punctuality: 5,
    communication: 5,
    priceFairness: 5
  });

  const [review, setReview] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = [
    { key: 'workQuality', label: 'Work Quality' },
    { key: 'professionalism', label: 'Professionalism' },
    { key: 'punctuality', label: 'Punctuality' },
    { key: 'communication', label: 'Communication' },
    { key: 'priceFairness', label: 'Price Fairness' }
  ];

  const handleStarClick = (category, rating) => {
    setRatings((prev) => ({ ...prev, [category]: rating }));
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    setTimeout(() => {
      setIsSubmitting(false);
      setSuccessMsg('Rating successfully uploaded to co-op database!');
      setTimeout(() => {
        setSuccessMsg('');
        navigate('/user/dashboard');
      }, 2000);
    }, 1000);
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.12} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-lg rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-left">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        <div className="space-y-1.5 border-b border-white/5 pb-4">
          <Badge variant="primary">Booking Ref: {bookingId || 'bk_123'}</Badge>
          <h1 className="text-2xl font-bold text-white">Rate Worker Service</h1>
          <p className="text-xs text-gray-400 font-light">Your review establishes worker priority standings in the co-op register.</p>
        </div>

        <form onSubmit={handleFormSubmit} className="space-y-6">
          {/* Category-by-category rating stars */}
          <div className="space-y-4">
            {categories.map((cat) => (
              <div key={cat.key} className="flex justify-between items-center bg-white/5 p-3 rounded-xl border border-white/5">
                <span className="text-xs font-semibold text-gray-300">{cat.label}</span>
                <div className="flex gap-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      onClick={() => handleStarClick(cat.key, star)}
                      className="focus:outline-none cursor-pointer bg-transparent border-none"
                    >
                      <Star className={`w-4 h-4 ${
                        star <= ratings[cat.key] ? 'text-amber-400 fill-amber-400' : 'text-gray-600'
                      }`} />
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>

          {/* Written review textarea */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-wider">Write a review</label>
            <textarea
              placeholder="Explain how the plumbing work, clean checks, or custom fixes went..."
              value={review}
              onChange={(e) => setReview(e.target.value)}
              rows="3"
              className="w-full px-4 py-3 rounded-xl bg-black/40 border border-white/10 text-white placeholder-gray-500 focus:outline-none focus:border-coop-500 text-xs leading-relaxed"
            />
          </div>

          {successMsg && (
            <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl flex items-start gap-1.5 animate-pulse-slow">
              <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{successMsg}</span>
            </div>
          )}

          <Button
            type="submit"
            variant="primary"
            className="w-full py-3 font-semibold text-sm"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Uploading rating...' : 'Submit Feedback'}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default Ratings;
