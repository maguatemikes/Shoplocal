import { useEffect, useRef } from 'react';

interface MapMarker {
  id: string;
  name: string;
  lat: number;
  lng: number;
  specialty: string;
  categoryIcon?: string;
  rating: number;
  location: string;
}

interface LeafletMapProps {
  markers: MapMarker[];
  onMarkerClick: (id: string) => void;
  onBoundsChange?: (bounds: { north: number; south: number; east: number; west: number }) => void;
  onVendorSelect?: (vendorId: string) => void;
  selectedVendorId?: string | null;
}

export function LeafletMap({ markers, onMarkerClick, onBoundsChange, onVendorSelect, selectedVendorId }: LeafletMapProps) {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);
  const markersLayerRef = useRef<any>(null);
  const isInitializedRef = useRef(false);

  // Initialize map only once
  useEffect(() => {
    if (!mapRef.current || isInitializedRef.current) return;

    const loadLeaflet = async () => {
      // Add CSS
      if (!document.getElementById('leaflet-css')) {
        const link = document.createElement('link');
        link.id = 'leaflet-css';
        link.rel = 'stylesheet';
        link.href = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.css';
        link.crossOrigin = 'anonymous';
        document.head.appendChild(link);
      }

      // Load Leaflet JS
      if (!(window as any).L) {
        const script = document.createElement('script');
        script.src = 'https://unpkg.com/leaflet@1.9.4/dist/leaflet.js';
        script.crossOrigin = 'anonymous';
        document.head.appendChild(script);
        
        await new Promise((resolve) => {
          script.onload = resolve;
        });
      }

      const L = (window as any).L;
      
      if (!L) {
        console.error('Leaflet failed to load');
        return;
      }

      // Initialize map
      if (!mapInstanceRef.current && mapRef.current) {
        const map = L.map(mapRef.current).setView([40.012976, -75.048402], 10);
        mapInstanceRef.current = map;
        isInitializedRef.current = true;

        // Add OpenStreetMap tiles
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          attribution: '© OpenStreetMap contributors',
          maxZoom: 19
        }).addTo(map);

        // Create marker layer
        markersLayerRef.current = L.layerGroup().addTo(map);

        // Handle bounds change
        if (onBoundsChange) {
          map.on('moveend', () => {
            const bounds = map.getBounds();
            onBoundsChange({
              north: bounds.getNorth(),
              south: bounds.getSouth(),
              east: bounds.getEast(),
              west: bounds.getWest()
            });
          });
        }
      }
    };

    loadLeaflet();

    // Cleanup only on unmount
    return () => {
      if (mapInstanceRef.current) {
        mapInstanceRef.current.remove();
        mapInstanceRef.current = null;
        markersLayerRef.current = null;
        isInitializedRef.current = false;
      }
    };
  }, []); // Only run once on mount

  // Update markers when they change
  useEffect(() => {
    const L = (window as any).L;
    if (!L || !mapInstanceRef.current || !markersLayerRef.current) return;

    const map = mapInstanceRef.current;
    const markersLayer = markersLayerRef.current;

    // Clear existing markers safely
    try {
      markersLayer.clearLayers();
    } catch (e) {
      console.warn('Error clearing markers:', e);
    }

    if (markers.length === 0) {
      // Default view if no markers
      map.setView([40.012976, -75.048402], 10);
      return;
    }

    // Add markers
    const bounds: any[] = [];
    
    markers.forEach((marker, idx) => {
      // Create custom icon - use category icon if available, otherwise numbered pin
      const customIcon = marker.categoryIcon 
        ? L.divIcon({
            className: 'custom-marker-icon',
            html: `
              <div style="position: relative; width: 40px; height: 50px;">
                <svg width="40" height="50" viewBox="0 0 40 50" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                  <!-- Pin Shape -->
                  <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
                    fill="#0EA5E9" 
                    stroke="white" 
                    stroke-width="2"/>
                </svg>
                <!-- Category Icon Image -->
                <img 
                  src="${marker.categoryIcon}" 
                  alt="${marker.specialty}"
                  style="
                    position: absolute;
                    top: 4px;
                    left: 50%;
                    transform: translateX(-50%);
                    width: 22px;
                    height: 22px;
                    object-fit: contain;
                    pointer-events: none;
                    user-select: none;
                  "
                />
              </div>
            `,
            iconSize: [40, 50],
            iconAnchor: [20, 50],
            popupAnchor: [0, -50]
          })
        : L.divIcon({
            className: 'custom-marker',
            html: `
              <div style="position: relative; width: 40px; height: 50px;">
                <svg width="40" height="50" viewBox="0 0 40 50" style="filter: drop-shadow(0 2px 4px rgba(0,0,0,0.3));">
                  <!-- Pin Shape -->
                  <path d="M20 0C11.716 0 5 6.716 5 15c0 8.284 15 35 15 35s15-26.716 15-35c0-8.284-6.716-15-15-15z" 
                    fill="#0EA5E9" 
                    stroke="white" 
                    stroke-width="2"/>
                  <!-- White circle background for number -->
                  <circle cx="20" cy="15" r="8" fill="white"/>
                </svg>
                <!-- Number text -->
                <div style="
                  position: absolute;
                  top: 7px;
                  left: 50%;
                  transform: translateX(-50%);
                  color: #0EA5E9;
                  font-weight: bold;
                  font-size: 14px;
                  pointer-events: none;
                  user-select: none;
                ">${idx + 1}</div>
              </div>
            `,
            iconSize: [40, 50],
            iconAnchor: [20, 50],
            popupAnchor: [0, -50]
          });

      const leafletMarker = L.marker([marker.lat, marker.lng], {
        icon: customIcon
      })
        .bindPopup(`
          <div style="min-width: 200px;">
            <h3 style="margin: 0 0 8px 0; font-size: 14px; font-weight: 600;">${marker.name}</h3>
            <p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">${marker.specialty}</p>
            <div style="display: flex; align-items: center; gap: 4px; margin-bottom: 4px;">
              <span style="color: #f59e0b; font-size: 12px;">★</span>
              <span style="font-size: 12px;">${marker.rating}</span>
            </div>
            <p style="margin: 0; font-size: 11px; color: #999;">📍 ${marker.location}</p>
          </div>
        `)
        .on('click', () => {
          onMarkerClick(marker.id);
          if (onVendorSelect) {
            onVendorSelect(marker.id);
          }
        })
        .addTo(markersLayer);

      bounds.push([marker.lat, marker.lng]);
    });

    // Fit map to show all markers
    if (bounds.length > 0) {
      try {
        map.fitBounds(bounds, { padding: [50, 50] });
      } catch (e) {
        console.warn('Error fitting bounds:', e);
      }
    }
  }, [markers, onMarkerClick, onVendorSelect]); // Update when markers or callbacks change

  return (
    <div 
      ref={mapRef} 
      style={{ 
        width: '100%', 
        height: '100%',
        minHeight: '400px',
        borderRadius: '16px',
        overflow: 'hidden'
      }}
    />
  );
}