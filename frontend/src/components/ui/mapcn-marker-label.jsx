import React, { createContext, useContext, useEffect, useRef, useState } from 'react';
import * as maplibregl from 'maplibre-gl';
import 'maplibre-gl/dist/maplibre-gl.css';

const MapContext = createContext(null);

export const useMap = () => {
  const context = useContext(MapContext);
  if (!context) {
    throw new Error('useMap must be used within a Map component');
  }
  return context;
};

export const Map = ({ 
  children, 
  center = [76.9558, 11.0168], // Coimbatore center
  zoom = 13, 
  className = '', 
  onMapInstance 
}) => {
  const mapContainerRef = useRef(null);
  const [map, setMap] = useState(null);
  const mapRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current || mapRef.current) return;

    // Use completely free OpenFreeMap dark style (No CORS or API keys required)
    const mapInstance = new maplibregl.Map({
      container: mapContainerRef.current,
      style: 'https://tiles.openfreemap.org/styles/dark',
      center: center,
      zoom: zoom,
      attributionControl: false
    });

    mapRef.current = mapInstance;

    mapInstance.on('load', () => {
      setMap(mapInstance);
      if (onMapInstance) onMapInstance(mapInstance);
      setTimeout(() => {
        if (mapRef.current) {
          mapRef.current.resize();
        }
      }, 200);
    });

    return () => {
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div ref={mapContainerRef} className={`relative w-full h-full overflow-hidden ${className}`}>
      {map && (
        <MapContext.Provider value={map}>
          {children}
        </MapContext.Provider>
      )}
    </div>
  );
};

export const MapMarker = ({ children, position, map }) => {
  const mapInstance = useMap();
  const markerRef = useRef(null);
  const mapMarkerRef = useRef(null);

  useEffect(() => {
    if (!mapInstance || !position) return;

    // Create container element for custom React marker content
    const el = document.createElement('div');
    el.className = 'custom-map-marker overflow-visible';
    markerRef.current = el;

    const marker = new maplibregl.Marker({ element: el })
      .setLngLat(position)
      .addTo(mapInstance);

    mapMarkerRef.current = marker;

    return () => {
      marker.remove();
    };
  }, [mapInstance]);

  useEffect(() => {
    if (mapMarkerRef.current && position) {
      mapMarkerRef.current.setLngLat(position);
    }
  }, [position]);

  return (
    markerRef.current ? (
      <div style={{ display: 'none' }}>
        {React.createPortal(children, markerRef.current)}
      </div>
    ) : null
  );
};

export const MarkerContent = ({ children, className = '' }) => {
  return (
    <div className={`relative flex flex-col items-center justify-center ${className}`}>
      {children}
    </div>
  );
};

export const MarkerTooltip = ({ children, className = '' }) => {
  return (
    <div className={`absolute bottom-full mb-2 bg-black/90 border border-white/10 px-2 py-1 rounded text-[10px] text-white whitespace-nowrap shadow-xl z-50 pointer-events-none ${className}`}>
      {children}
    </div>
  );
};

export const MarkerLabel = ({ children, className = '' }) => {
  return (
    <div className={`absolute top-full mt-1 bg-[#12121e] border border-coop-500/25 px-2 py-0.5 rounded-full text-[9px] text-coop-300 font-bold uppercase tracking-wider font-mono shadow-md whitespace-nowrap ${className}`}>
      {children}
    </div>
  );
};
