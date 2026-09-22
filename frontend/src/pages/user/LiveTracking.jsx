import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import Button from '../../components/common/Button';
import Badge from '../../components/common/Badge';
import WebThreads from '../../components/common/WebThreads';
import { 
  Map, MapMarker, MarkerContent, MarkerTooltip, MarkerLabel 
} from '../../components/ui/mapcn-marker-label';
import { 
  ArrowLeft, Phone, MessageSquare, MapPin, Navigation, Sparkles, X,
  ShieldCheck, Clock3, MapPinned, Plus, Minus, LocateFixed, Maximize2,
  CheckCircle2, Circle, AlertCircle, Activity
} from 'lucide-react';

const LiveTracking = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { signout } = useAuth();
  
  const [distance, setDistance] = useState(2.1);
  const [eta, setEta] = useState(9);
  const [progress, setProgress] = useState(0);
  const [isCalling, setIsCalling] = useState(false);
  const [isMessaging, setIsMessaging] = useState(false);

  // Coimbatore geographic bounds coordinates
  const userLocation = [76.9558, 11.0168];
  // Worker starting offset coordinates
  const [workerLocation, setWorkerLocation] = useState([76.9758, 11.0268]);
  const [mapInstance, setMapInstance] = useState(null);

  const intervalRef = useRef(null);

  // Status index for timeline
  // 0: Request accepted, 1: Worker assigned, 2: Worker on the way, 3: Worker arrived, 4: Work started, 5: Service completed
  const currentStepIndex = progress === 100 ? 5 : progress >= 80 ? 4 : progress >= 50 ? 3 : 2;

  useEffect(() => {
    // Interpolate worker movement closer to user
    intervalRef.current = setInterval(() => {
      setProgress((prev) => {
        const next = prev + 5;
        if (next >= 100) {
          clearInterval(intervalRef.current);
          setDistance(0);
          setEta(0);
          setWorkerLocation(userLocation);
          return 100;
        }
        
        // Calculate dynamic linear decrease coordinates
        const ratio = next / 100;
        const newLng = 76.9758 - (76.9758 - 76.9558) * ratio;
        const newLat = 11.0268 - (11.0268 - 11.0168) * ratio;
        setWorkerLocation([newLng, newLat]);

        setDistance(Number((2.1 * (1 - ratio)).toFixed(1)));
        setEta(Math.round(9 * (1 - ratio)));
        return next;
      });
    }, 1500);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  // Visual Route drawing Layer
  useEffect(() => {
    if (!mapInstance) return;

    const sourceId = 'route-source';
    const layerId = 'route-layer';

    const geojson = {
      type: 'Feature',
      geometry: {
        type: 'LineString',
        coordinates: [userLocation, workerLocation]
      }
    };

    if (mapInstance.getSource(sourceId)) {
      mapInstance.getSource(sourceId).setData(geojson);
    } else {
      mapInstance.addSource(sourceId, {
        type: 'geojson',
        data: geojson
      });

      mapInstance.addLayer({
        id: layerId,
        type: 'line',
        source: sourceId,
        layout: {
          'line-join': 'round',
          'line-cap': 'round'
        },
        paint: {
          'line-color': '#a78bfa',
          'line-width': 4,
          'line-dasharray': [2, 2]
        }
      });
    }
  }, [mapInstance, workerLocation]);

  // Auto-resize and center route on load
  useEffect(() => {
    if (mapInstance) {
      setTimeout(() => {
        mapInstance.resize();
        const bounds = [
          [Math.min(userLocation[0], workerLocation[0]), Math.min(userLocation[1], workerLocation[1])],
          [Math.max(userLocation[0], workerLocation[0]), Math.max(userLocation[1], workerLocation[1])]
        ];
        mapInstance.fitBounds(bounds, { padding: 80, animate: true });
      }, 500);
    }
  }, [mapInstance]);

  // Zoom / Nav Controls helpers
  const handleZoomIn = () => mapInstance && mapInstance.zoomIn();
  const handleZoomOut = () => mapInstance && mapInstance.zoomOut();
  const handleLocateMe = () => mapInstance && mapInstance.flyTo({ center: userLocation, zoom: 15 });
  const handleFitRoute = () => {
    if (mapInstance) {
      const bounds = [
        [Math.min(userLocation[0], workerLocation[0]), Math.min(userLocation[1], workerLocation[1])],
        [Math.max(userLocation[0], workerLocation[0]), Math.max(userLocation[1], workerLocation[1])]
      ];
      mapInstance.fitBounds(bounds, { padding: 60 });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#030307] text-white flex items-center justify-center py-16 px-4">
      {/* Background */}
      <div className="absolute inset-0 z-0 opacity-40">
        <WebThreads speed={0.12} threadCount={4} opacity={0.6} />
      </div>

      <div className="relative z-10 w-full max-w-4xl rounded-3xl glassmorphism border-white/5 p-6 md:p-8 shadow-2xl space-y-6 text-center">
        <header className="absolute top-[-40px] left-0 flex items-center gap-3">
          <button 
            onClick={() => navigate('/user/dashboard')}
            className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center text-gray-300 hover:text-white cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5" />
          </button>
          <span className="font-bold text-sm text-gray-400">Back to Dashboard</span>
        </header>

        {/* Header Dispatch tracker */}
        <div className="text-left space-y-2 border-b border-white/5 pb-4 flex justify-between items-start">
          <div className="space-y-1">
            <span className="text-[10px] text-gray-500 font-mono font-bold uppercase tracking-widest block flex items-center gap-1.5">
              <MapPinned className="w-3.5 h-3.5 text-coop-400" /> Live Dispatch Tracker
            </span>
            <h1 className="text-2xl md:text-3xl font-bold text-white flex items-center gap-2">
              Arun is on the way
            </h1>
            <div className="flex items-center gap-2.5 text-xs text-gray-400">
              <span className="text-emerald-400 font-semibold">{distance} km away</span>
              <span>•</span>
              <span className="text-coop-300 flex items-center gap-1"><Clock3 className="w-3.5 h-3.5" /> Est. arrival: {eta} min</span>
            </div>
          </div>
          <Badge variant="primary" className="font-mono mt-1 text-[10px]">Job ID: {id || 'bk_78241'}</Badge>
        </div>

        {/* Vector SVG Map Container */}
        <div className="relative h-[420px] md:h-[480px] bg-[#07070f] border border-white/10 rounded-3xl overflow-hidden shadow-inner flex items-center justify-center">
          <div className="absolute inset-0 bg-grid-pattern opacity-10" />
          
          {/* Neon Vector Map Graphics */}
          <svg width="90%" height="90%" viewBox="0 0 500 300" className="relative z-10 overflow-visible font-sans">
            {/* Grid Coordinates Indicators */}
            <g opacity="0.15">
              <path d="M 0 50 L 500 50 M 0 100 L 500 100 M 0 150 L 500 150 M 0 200 L 500 200 M 0 250 L 500 250" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
              <path d="M 100 0 L 100 300 M 200 0 L 200 300 M 300 0 L 300 300 M 400 0 L 400 300" fill="none" stroke="rgba(255,255,255,0.4)" strokeWidth="1" />
            </g>

            {/* Coimbatore Outer Ring Road Mock Vector path */}
            <path d="M 20 40 L 480 40 M 20 260 L 480 260 M 100 10 L 100 290 M 400 10 L 400 290" fill="none" stroke="rgba(255,255,255,0.03)" strokeWidth="8" strokeLinecap="round" />
            <path d="M 20 40 L 480 40 M 20 260 L 480 260 M 100 10 L 100 290 M 400 10 L 400 290" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="2" strokeDasharray="5,5" strokeLinecap="round" />
            
            {/* Avinashi Road mockup highway */}
            <path d="M 50 240 Q 250 160 450 80" fill="none" stroke="rgba(255,255,255,0.02)" strokeWidth="12" strokeLinecap="round" />
            
            {/* Active Route Path Neon Trace */}
            <path d="M 420 90 Q 250 160 100 240" fill="none" stroke="rgba(139, 92, 246, 0.1)" strokeWidth="8" strokeLinecap="round" />
            <path d="M 420 90 Q 250 160 100 240" fill="none" stroke="#8b5cf6" strokeWidth="3" strokeDasharray="8,6" strokeLinecap="round" />

            {/* Client Destination (You) */}
            <g transform="translate(100, 240)">
              <circle cx="0" cy="0" r="14" fill="rgba(16, 185, 129, 0.15)" className="animate-ping" />
              <circle cx="0" cy="0" r="8" fill="#10b981" stroke="#ffffff" strokeWidth="2" />
              <text y="-16" textAnchor="middle" fill="#10b981" fontSize="10" fontWeight="bold" className="tracking-wider">YOU (COIMBATORE)</text>
            </g>

            {/* Moving Worker dispatch marker */}
            {(() => {
              const t = progress / 100;
              // Quadratic bezier curve interpolation for accurate coordinates
              // P0 = [420, 90], P1 = [250, 160], P2 = [100, 240]
              const x = (1 - t) * (1 - t) * 420 + 2 * (1 - t) * t * 250 + t * t * 100;
              const y = (1 - t) * (1 - t) * 90 + 2 * (1 - t) * t * 160 + t * t * 240;
              return (
                <g transform={`translate(${x}, ${y})`}>
                  <circle cx="0" cy="0" r="22" fill="rgba(139, 92, 246, 0.2)" className="animate-ping" />
                  <rect x="-16" y="-16" width="32" height="32" rx="10" fill="#8b5cf6" stroke="#ffffff" strokeWidth="1.5" className="shadow-lg" />
                  <text x="0" y="4" textAnchor="middle" fontSize="13">👷</text>
                  <text y="-22" textAnchor="middle" fill="#a78bfa" fontSize="9" fontWeight="bold" className="tracking-wider uppercase">Arun (Worker)</text>
                </g>
              );
            })()}
          </svg>

          {/* Floating Worker Card Overlay (Top Left) */}
          <div className="absolute top-5 left-5 bg-black/80 backdrop-blur-md border border-white/10 p-5 rounded-2xl text-left space-y-3 shadow-2xl z-20 max-w-[240px]">
            <div className="space-y-1">
              <span className="inline-flex items-center gap-1 text-[9px] font-bold text-emerald-400 bg-emerald-500/5 border border-emerald-500/10 px-2 py-0.5 rounded-full uppercase tracking-wider">
                <ShieldCheck className="w-3 h-3" /> Verified Worker
              </span>
              <h3 className="text-base font-bold text-white">Arun Kumar</h3>
              <p className="text-xs text-gray-400">Plumber specialty</p>
            </div>
            <div className="border-t border-white/5 pt-2 flex justify-between text-[11px]">
              <div>
                <span className="text-[9px] text-gray-500 uppercase block">Distance</span>
                <span className="text-white font-semibold">{distance} km</span>
              </div>
              <div className="text-right">
                <span className="text-[9px] text-gray-500 uppercase block">ETA</span>
                <span className="text-emerald-400 font-semibold">{eta} min</span>
              </div>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-coop-300 font-semibold pt-1">
              <span className="w-2 h-2 rounded-full bg-coop-500 animate-ping" />
              <span>{progress === 100 ? 'Arrived at site' : 'On the way'}</span>
            </div>
          </div>

          {/* Map Status Indicators (Top Right) */}
          <div className="absolute top-5 right-5 bg-black/80 backdrop-blur-md border border-white/10 px-4 py-2.5 rounded-xl text-left space-y-0.5 shadow-2xl z-20 text-[10px]">
            <span className="text-gray-500 block uppercase font-mono tracking-wider">GPS LINK STATUS</span>
            <span className="text-emerald-400 font-bold flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" /> ACTIVE FEED (OFFLINE MAP)
            </span>
          </div>
        </div>

        {/* Map Status below */}
        <div className="w-full bg-white/5 border border-white/5 rounded-2xl p-4 text-left flex items-center justify-between text-xs font-semibold">
          <div className="flex items-center gap-2">
            <Navigation className="w-4 h-4 text-coop-400 animate-pulse" />
            <span className="text-gray-300">
              {progress === 100 ? 'Worker Arrived!' : 'Worker is moving along Outer Ring Rd'}
            </span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 font-mono">
            <Activity className="w-4 h-4 text-gray-500" />
            <span>{progress}% Route completed</span>
          </div>
        </div>

        {/* Service timeline below */}
        <div className="p-6 rounded-3xl bg-white/5 border border-white/5 space-y-6 text-left">
          <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest font-mono">Service Progress</h3>
          <div className="grid grid-cols-2 md:grid-cols-6 gap-4 relative">
            {[
              'Request accepted',
              'Worker assigned',
              'Worker on the way',
              'Worker arrived',
              'Work started',
              'Service completed'
            ].map((step, idx) => {
              const isCompleted = idx < currentStepIndex;
              const isActive = idx === currentStepIndex;
              const isPending = idx > currentStepIndex;

              return (
                <div key={idx} className="space-y-2 text-center">
                  <div className="mx-auto flex items-center justify-center">
                    {isCompleted ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-400" />
                    ) : isActive ? (
                      <Clock3 className="w-6 h-6 text-coop-400 animate-spin-slow" />
                    ) : (
                      <Circle className="w-6 h-6 text-gray-600" />
                    )}
                  </div>
                  <span className={`block text-[10px] font-bold uppercase tracking-wider ${
                    isCompleted ? 'text-emerald-400' : isActive ? 'text-coop-300' : 'text-gray-500'
                  }`}>
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Communication CTAs */}
        <div className="grid grid-cols-2 gap-4 border-t border-white/5 pt-6">
          <Button variant="secondary" className="flex items-center justify-center gap-2 py-3" onClick={() => {
            setIsCalling(true);
            setTimeout(() => setIsCalling(false), 3000);
          }}>
            <Phone className="w-4 h-4 text-emerald-400" /> Call Arun
          </Button>
          <Button variant="secondary" className="flex items-center justify-center gap-2 py-3" onClick={() => {
            setIsMessaging(true);
            setTimeout(() => setIsMessaging(false), 3000);
          }}>
            <MessageSquare className="w-4 h-4 text-coop-400" /> Message
          </Button>
        </div>

        {isCalling && (
          <div className="text-xs text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 p-2.5 rounded-xl text-left animate-pulse-slow">
            📞 Masked audio call dialing... connecting secure co-op pipeline.
          </div>
        )}

        {isMessaging && (
          <div className="text-xs text-coop-300 bg-coop-500/10 border border-coop-500/20 p-2.5 rounded-xl text-left animate-pulse-slow">
            💬 Launching private messenger pipeline...
          </div>
        )}
      </div>
    </div>
  );
};

export default LiveTracking;
