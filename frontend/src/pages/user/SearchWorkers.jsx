import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import Input from '../../components/common/Input';
import { 
  Search, MapPin, Star, ShieldCheck, IndianRupee, ArrowLeft, 
  SlidersHorizontal, Check, ArrowUpDown, Clock, X, HeartHandshake 
} from 'lucide-react';

const SearchWorkers = () => {
  const navigate = useNavigate();
  const { signout } = useAuth();

  // Filters State
  const [searchTerm, setSearchTerm] = useState('');
  const [locationTerm, setLocationTerm] = useState('');
  const [maxDistance, setMaxDistance] = useState(10);
  const [minRating, setMinRating] = useState(0);
  const [maxPrice, setMaxPrice] = useState(1000);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [coopOnly, setCoopOnly] = useState(false);
  const [availability, setAvailability] = useState('any'); // any, today, week

  // Sorting State
  const [sortBy, setSortBy] = useState('best-match');

  // Selected worker details modal
  const [selectedWorker, setSelectedWorker] = useState(null);

  // Mock Workers Data
  const workers = [
    {
      id: 'w1',
      name: 'Ramesh Kumar',
      role: 'Electrician',
      rating: 4.8,
      reviews: 142,
      distance: 1.8,
      rate: 450,
      avatar: '👨‍🔧',
      verified: true,
      coopMember: true,
      arrivalMins: 15,
      location: 'Indiranagar',
      bio: 'Over 8 years experience in domestic wiring, smart home setup, and electric panel maintenance.'
    },
    {
      id: 'w2',
      name: 'Elena Rostova',
      role: 'Plumber',
      rating: 4.9,
      reviews: 98,
      distance: 2.4,
      rate: 500,
      avatar: '👩‍🔧',
      verified: true,
      coopMember: true,
      arrivalMins: 12,
      location: 'Indiranagar',
      bio: 'Master plumber with expertise in high-pressure leak sealing, water heaters, and pipe routing.'
    },
    {
      id: 'w3',
      name: 'Julius Diaz',
      role: 'Cleaner',
      rating: 4.7,
      reviews: 110,
      distance: 3.1,
      rate: 350,
      avatar: '🧹',
      verified: true,
      coopMember: true,
      arrivalMins: 20,
      location: 'Koramangala',
      bio: 'Eco-friendly deep cleaning associate specialized in sanitization procedures.'
    },
    {
      id: 'w4',
      name: 'Jordan Brooks',
      role: 'Carpenter',
      rating: 5.0,
      reviews: 75,
      distance: 2.9,
      rate: 600,
      avatar: '🔨',
      verified: true,
      coopMember: true,
      arrivalMins: 25,
      location: 'HSR Layout',
      bio: 'Custom furniture assembly and cabinetry restoration services.'
    },
    {
      id: 'w5',
      name: 'Amit Sharma',
      role: 'Painter',
      rating: 4.6,
      reviews: 84,
      distance: 4.2,
      rate: 750,
      avatar: '🎨',
      verified: true,
      coopMember: false, // Standard registry user
      arrivalMins: 35,
      location: 'Koramangala',
      bio: 'Expert wall painting and texture coating specialist.'
    },
    {
      id: 'w6',
      name: 'Sunita Patel',
      role: 'Gardener',
      rating: 4.9,
      reviews: 62,
      distance: 1.5,
      rate: 400,
      avatar: '🌿',
      verified: false, // Pending full co-op verification
      coopMember: true,
      arrivalMins: 10,
      location: 'Indiranagar',
      bio: 'Landscape layout gardening, custom pruning, and botanical consulting.'
    }
  ];

  // Filtering Logic
  const filteredWorkers = useMemo(() => {
    return workers.filter((worker) => {
      // Search Term matches role or name
      const matchesSearch = 
        worker.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        worker.role.toLowerCase().includes(searchTerm.toLowerCase());

      // Location match
      const matchesLocation = 
        worker.location.toLowerCase().includes(locationTerm.toLowerCase());

      // Numeric filter boundary tests
      const matchesDistance = worker.distance <= maxDistance;
      const matchesRating = worker.rating >= minRating;
      const matchesPrice = worker.rate <= maxPrice;

      // Verification checks
      const matchesVerification = !verifiedOnly || worker.verified;
      const matchesCoop = !coopOnly || worker.coopMember;

      return matchesSearch && matchesLocation && matchesDistance && matchesRating && matchesPrice && matchesVerification && matchesCoop;
    });
  }, [searchTerm, locationTerm, maxDistance, minRating, maxPrice, verifiedOnly, coopOnly, availability]);

  // Sorting Logic
  const sortedWorkers = useMemo(() => {
    const arr = [...filteredWorkers];
    if (sortBy === 'nearest') {
      return arr.sort((a, b) => a.distance - b.distance);
    }
    if (sortBy === 'highest-rated') {
      return arr.sort((a, b) => b.rating - a.rating);
    }
    if (sortBy === 'lowest-price') {
      return arr.sort((a, b) => a.rate - b.rate);
    }
    if (sortBy === 'fastest-arrival') {
      return arr.sort((a, b) => a.arrivalMins - b.arrivalMins);
    }
    // Default: best match (weight of rating and closeness)
    return arr.sort((a, b) => (b.rating / b.distance) - (a.rating / a.distance));
  }, [filteredWorkers, sortBy]);

  return (
    <div className="min-h-screen bg-[#030307] text-white">
      {/* Header */}
      <header className="glassmorphism sticky top-0 left-0 right-0 z-40 border-b border-white/5 py-4 px-6 md:px-12 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-semibold text-lg text-white">
            Coop<span className="text-coop-400 font-bold">Registry</span>
          </span>
        </div>
        <div className="flex gap-4">
          <Button variant="secondary" className="text-xs px-3.5 py-1.5" onClick={signout}>
            Sign Out
          </Button>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-1 lg:grid-cols-4 gap-8">
        {/* Filters Sidebar */}
        <aside className="lg:col-span-1 rounded-3xl glassmorphism border-white/5 p-6 space-y-6 h-fit text-left">
          <div className="flex justify-between items-center border-b border-white/5 pb-4">
            <span className="font-bold flex items-center gap-2 text-white">
              <SlidersHorizontal className="w-4 h-4 text-coop-400" /> Filters
            </span>
            <button 
              onClick={() => {
                setSearchTerm('');
                setLocationTerm('');
                setMaxDistance(10);
                setMinRating(0);
                setMaxPrice(1000);
                setVerifiedOnly(false);
                setCoopOnly(false);
              }}
              className="text-xs text-gray-500 hover:text-coop-400 cursor-pointer"
            >
              Reset All
            </button>
          </div>

          <div className="space-y-4">
            {/* Service Search */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Service Category</label>
              <input
                type="text"
                placeholder="e.g. Electrician"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-black/40 border border-white/5 text-white"
              />
            </div>

            {/* Location Search */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Location Node</label>
              <input
                type="text"
                placeholder="e.g. Indiranagar"
                value={locationTerm}
                onChange={(e) => setLocationTerm(e.target.value)}
                className="w-full px-3.5 py-2.5 text-sm rounded-xl bg-black/40 border border-white/5 text-white"
              />
            </div>

            {/* Max Distance Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Max Distance</span>
                <span className="text-coop-400">{maxDistance} km</span>
              </div>
              <input
                type="range"
                min="1"
                max="15"
                value={maxDistance}
                onChange={(e) => setMaxDistance(Number(e.target.value))}
                className="w-full accent-coop-500 bg-white/10 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Price Cap Slider */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-gray-400">Max Price Cap</span>
                <span className="text-coop-400">₹{maxPrice}/hr</span>
              </div>
              <input
                type="range"
                min="200"
                max="1000"
                step="50"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="w-full accent-coop-500 bg-white/10 rounded-lg h-1.5 cursor-pointer"
              />
            </div>

            {/* Minimum Rating Selection */}
            <div className="space-y-1">
              <label className="text-xs font-semibold text-gray-400">Minimum Rating</label>
              <select
                value={minRating}
                onChange={(e) => setMinRating(Number(e.target.value))}
                className="w-full px-3 py-2.5 text-sm rounded-xl bg-black/40 border border-white/5 text-white"
              >
                <option value="0">Any Rating</option>
                <option value="4">4.0 ★ & Above</option>
                <option value="4.5">4.5 ★ & Above</option>
                <option value="4.8">4.8 ★ & Above</option>
              </select>
            </div>

            {/* Verified toggle checkbox */}
            <div className="pt-2 space-y-3">
              <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={verifiedOnly}
                  onChange={(e) => setVerifiedOnly(e.target.checked)}
                  className="accent-coop-500 rounded border-white/10 w-4 h-4"
                />
                Verified Only ✓
              </label>

              <label className="flex items-center gap-2.5 text-sm text-gray-300 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={coopOnly}
                  onChange={(e) => setCoopOnly(e.target.checked)}
                  className="accent-coop-500 rounded border-white/10 w-4 h-4"
                />
                Co-op Shareholder
              </label>
            </div>
          </div>
        </aside>

        {/* Search Results Area */}
        <section className="lg:col-span-3 space-y-6 text-left">
          {/* Header & Sorting controls */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white/5 border border-white/5 p-4 rounded-2xl">
            <div>
              <h2 className="text-xl font-bold text-white">Matching Service Providers</h2>
              <p className="text-xs text-gray-400">{sortedWorkers.length} matches found</p>
            </div>

            <div className="flex items-center gap-2 text-sm shrink-0">
              <ArrowUpDown className="w-4 h-4 text-coop-400" />
              <span className="text-gray-400">Sort:</span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="bg-black/40 border border-white/5 text-white px-3 py-2 rounded-xl text-xs focus:outline-none"
              >
                <option value="best-match">Best Match</option>
                <option value="nearest">Nearest Distance</option>
                <option value="highest-rated">Highest Rated</option>
                <option value="lowest-price">Lowest Price</option>
                <option value="fastest-arrival">Fastest Arrival</option>
              </select>
            </div>
          </div>

          {/* Workers Grid */}
          {sortedWorkers.length === 0 ? (
            <div className="p-16 rounded-3xl glassmorphism border-white/5 text-center text-gray-500">
              No cooperative registry matches matching your parameters.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {sortedWorkers.map((worker) => (
                <div 
                  key={worker.id}
                  className="p-6 rounded-3xl glassmorphism border-white/5 hover:border-coop-500/30 transition-all duration-300 flex flex-col justify-between h-80 group shadow-lg"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-12 h-12 rounded-xl bg-coop-500/10 flex items-center justify-center text-3xl">
                        {worker.avatar}
                      </div>
                      <div className="flex flex-col gap-1 text-right">
                        {worker.verified && (
                          <Badge variant="success" className="text-[9px]">Verified</Badge>
                        )}
                        {worker.coopMember && (
                          <span className="text-[9px] font-bold text-coop-400 flex items-center gap-1"><HeartHandshake className="w-3 h-3" /> Shareholder</span>
                        )}
                      </div>
                    </div>

                    <h3 className="text-lg font-bold text-white group-hover:text-coop-300 transition-colors">
                      {worker.name}
                    </h3>
                    <p className="text-xs text-gray-400">{worker.role} • {worker.location}</p>

                    <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500 mt-4">
                      <span className="flex items-center gap-1 text-white font-semibold">
                        <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" /> {worker.rating}
                      </span>
                      <span>({worker.reviews} reviews)</span>
                      <span>•</span>
                      <span>{worker.distance} km</span>
                      <span>•</span>
                      <span className="text-emerald-400 font-semibold">{worker.arrivalMins} min ETA</span>
                    </div>
                  </div>

                  <div className="border-t border-white/5 pt-4 flex items-center justify-between">
                    <div>
                      <span className="text-[9px] text-gray-500 block uppercase font-mono">Hourly Rate</span>
                      <span className="text-sm font-bold text-white">₹{worker.rate}/hr</span>
                    </div>
                    <Button variant="secondary" className="text-xs py-1.5 px-3.5" onClick={() => setSelectedWorker(worker)}>
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </main>

      {/* Profile view modal */}
      {selectedWorker && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-3xl glassmorphism border-white/10 p-6 md:p-8 space-y-6 relative">
            <button 
              onClick={() => setSelectedWorker(null)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white cursor-pointer bg-white/5 p-1.5 rounded-lg border border-white/5 z-20"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="flex gap-4 items-start text-left">
              <div className="w-16 h-16 rounded-xl bg-coop-500/10 flex items-center justify-center text-4xl">
                {selectedWorker.avatar}
              </div>
              <div>
                <h3 className="text-xl font-bold text-white">{selectedWorker.name}</h3>
                <p className="text-xs text-coop-400 font-semibold">{selectedWorker.role} Specialist</p>
                <div className="flex items-center gap-1.5 text-xs text-gray-400 mt-1">
                  <Star className="w-3 h-3 fill-amber-400 text-amber-400" />
                  <strong className="text-white">{selectedWorker.rating}</strong>
                  <span>({selectedWorker.reviews} ratings)</span>
                </div>
              </div>
            </div>

            <div className="text-left space-y-1.5 bg-white/5 p-4 rounded-xl border border-white/5">
              <h4 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Expertise Bio</h4>
              <p className="text-xs text-gray-300 leading-relaxed">{selectedWorker.bio}</p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-left text-xs bg-black/20 p-4 rounded-xl border border-white/5">
              <div>
                <span className="text-gray-500 block">Distance away</span>
                <strong className="text-white text-sm">{selectedWorker.distance} km</strong>
              </div>
              <div>
                <span className="text-gray-500 block">Fastest ETA</span>
                <strong className="text-emerald-400 text-sm">{selectedWorker.arrivalMins} minutes</strong>
              </div>
              <div className="mt-2">
                <span className="text-gray-500 block">Base service fee</span>
                <strong className="text-white text-sm">₹{selectedWorker.rate} onwards</strong>
              </div>
              <div className="mt-2">
                <span className="text-gray-500 block">Governance Class</span>
                <strong className="text-coop-300 text-sm">Active Shareholder</strong>
              </div>
            </div>

            <div className="flex gap-4 pt-4 border-t border-white/5">
              <Button variant="secondary" className="grow text-xs py-2" onClick={() => setSelectedWorker(null)}>
                Close
              </Button>
              <Button variant="primary" className="grow text-xs py-2" onClick={() => {
                setSelectedWorker(null);
                navigate(`/user/tracking/bk_${Math.floor(Math.random() * 90000 + 10000)}`);
              }}>
                Book Service
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchWorkers;
