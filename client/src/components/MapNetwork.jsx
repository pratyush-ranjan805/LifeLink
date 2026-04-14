import React, { useState, useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icon in react-leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

// Custom Icons for different nodes
const createIcon = (color) => {
  return L.divIcon({
    className: 'custom-icon',
    html: `<div style="background-color: ${color}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid #fff; box-shadow: 0 0 10px ${color}"></div>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const hospitalIcon = createIcon('var(--cyan)');
const bankIcon = createIcon('var(--red)');
const donorIcon = createIcon('var(--green)');

const MapNetwork = () => {
  const chennaiPosition = [13.0827, 80.2707];

  // Dummy coordinates based around Chennai
  const nodes = [
    { type: 'H', name: 'Apollo Hospital', pos: [13.0760, 80.2570], icon: hospitalIcon },
    { type: 'H', name: 'MIOT Hospital', pos: [13.0180, 80.1800], icon: hospitalIcon },
    { type: 'H', name: 'Fortis Hospital', pos: [13.0130, 80.2580], icon: hospitalIcon },
    { type: 'B', name: 'City Blood Bank', pos: [13.0800, 80.2700], icon: bankIcon },
    { type: 'B', name: 'Govt Blood Bank', pos: [13.0900, 80.2750], icon: bankIcon },
    { type: 'D', name: 'Aarav Sharma', pos: [13.0200, 80.2600], icon: donorIcon },
    { type: 'D', name: 'Ravi Kumar', pos: [13.0300, 80.2200], icon: donorIcon },
    { type: 'D', name: 'Priya Rajan', pos: [13.0800, 80.2100], icon: donorIcon },
    { type: 'D', name: 'Karthik S', pos: [12.9800, 80.2200], icon: donorIcon },
  ];

  // Draw some lines connecting banks to hospitals and donors
  const lines = [
    [[13.0800, 80.2700], [13.0760, 80.2570]], // City BB to Apollo
    [[13.0800, 80.2700], [13.0130, 80.2580]], // City BB to Fortis
    [[13.0180, 80.1800], [13.0300, 80.2200]], // MIOT to Ravi
    [[13.0760, 80.2570], [13.0800, 80.2100]], // Apollo to Priya
  ];

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-hd-left">
          <h1>Network Map</h1>
          <p>Real-time spatial visualization using Leaflet</p>
        </div>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-accent"></div>
        <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'center', marginBottom: '1rem' }}>
          <span style={{ fontSize: '0.74rem', color: 'var(--gray)', fontWeight: 700 }}>LEGEND</span>
          <span style={{ fontSize: '0.76rem', color: 'var(--cyan)', fontWeight: 700 }}>● Hospitals</span>
          <span style={{ fontSize: '0.76rem', color: 'var(--red)', fontWeight: 700 }}>● Blood Banks</span>
          <span style={{ fontSize: '0.76rem', color: 'var(--green)', fontWeight: 700 }}>● Donors</span>
        </div>
        
        <div className="networkMapContainer" style={{ height: '500px' }}>
          <MapContainer center={chennaiPosition} zoom={12} style={{ height: '100%', width: '100%', zIndex: 0 }}>
            {/* Using a dark map style for matching theme (CartoDB Dark Matter) */}
            <TileLayer
              url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
            />
            {nodes.map((n, idx) => (
              <Marker key={idx} position={n.pos} icon={n.icon}>
                <Popup><span style={{ color: '#000', fontWeight: 'bold' }}>{n.name}</span></Popup>
              </Marker>
            ))}
            {lines.map((posPair, idx) => (
              <Polyline key={idx} positions={posPair} color="rgba(0, 200, 255, 0.4)" dashArray="5, 10" />
            ))}
          </MapContainer>
        </div>
      </div>

      <div className="g2">
        <div className="card">
          <div className="card-accent"></div>
          <div className="card-title">Graph Statistics</div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
            <div style={{ background: 'rgba(0,200,255,0.03)', borderRadius: '10px', padding: '12px' }}><div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>1,302</div><div style={{ fontSize: '0.68rem', color: 'var(--gray)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '3px' }}>Total Nodes</div></div>
            <div style={{ background: 'rgba(0,200,255,0.03)', borderRadius: '10px', padding: '12px' }}><div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>4,847</div><div style={{ fontSize: '0.68rem', color: 'var(--gray)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '3px' }}>Edge Connections</div></div>
            <div style={{ background: 'rgba(0,200,255,0.03)', borderRadius: '10px', padding: '12px' }}><div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>7.4</div><div style={{ fontSize: '0.68rem', color: 'var(--gray)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '3px' }}>Avg Degree</div></div>
            <div style={{ background: 'rgba(0,200,255,0.03)', borderRadius: '10px', padding: '12px' }}><div style={{ fontSize: '1.4rem', fontWeight: 800, letterSpacing: '-0.03em' }}>3.2</div><div style={{ fontSize: '0.68rem', color: 'var(--gray)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '3px' }}>BFS Avg Depth</div></div>
          </div>
        </div>
        <div className="card">
          <div className="card-accent amber"></div>
          <div className="card-title">Algorithm Complexity</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ background: 'rgba(0,200,255,0.03)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1 }}><div style={{ fontSize: '0.82rem', fontWeight: 700 }}>BFS Proximity Search</div><div style={{ fontSize: '0.7rem', color: 'var(--gray)', fontWeight: 600 }}>Donor matching</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--cyan)' }}>O(V + E)</div><div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--gray)' }}>S: O(V)</div></div>
            </div>
            <div style={{ background: 'rgba(0,200,255,0.03)', borderRadius: '10px', padding: '10px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ flex: 1 }}><div style={{ fontSize: '0.82rem', fontWeight: 700 }}>TSP Route Optimization</div><div style={{ fontSize: '0.7rem', color: 'var(--gray)', fontWeight: 600 }}>Delivery logistics</div></div>
              <div style={{ textAlign: 'right' }}><div style={{ fontFamily: 'var(--mono)', fontSize: '0.75rem', color: 'var(--cyan)' }}>O(2ⁿ · n²)</div><div style={{ fontFamily: 'var(--mono)', fontSize: '0.68rem', color: 'var(--gray)' }}>S: O(2ⁿ · n)</div></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MapNetwork;
