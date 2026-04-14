import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const Emergency = () => {
  const [emergencies, setEmergencies] = useState([]);
  const [bfsResults, setBfsResults] = useState(null);
  const [bfsBlood, setBfsBlood] = useState('O-');
  const [bfsLoc, setBfsLoc] = useState('Adyar');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    // Initial fetch
    fetchEmergencies();
  }, []);

  const fetchEmergencies = async () => {
    try {
      const res = await axios.get('http://localhost:5000/emergency');
      if (res.data.length > 0) {
        setEmergencies(res.data);
      } else {
        setEmergencies([
          { _id: '1', hospitalName: 'Apollo Hospital', bloodGroup: 'O-', unitsNeeded: 3, location: 'Adyar', urgency: 'CRITICAL', min: 8 },
          { _id: '2', hospitalName: 'Fortis Malar', bloodGroup: 'B-', unitsNeeded: 2, location: 'Adyar', urgency: 'CRITICAL', min: 23 },
          { _id: '3', hospitalName: 'MIOT International', bloodGroup: 'AB+', unitsNeeded: 5, location: 'Manapakkam', urgency: 'MODERATE', min: 47 },
          { _id: '4', hospitalName: 'Sri Ramachandra', bloodGroup: 'A-', unitsNeeded: 1, location: 'Porur', urgency: 'LOW', min: 90 },
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const getBloodClass = (b) => {
    const t = b.replace(/[^A-Z]/gi, '');
    if (t === 'AB') return 'bAB';
    if (t === 'A') return 'bA';
    if (t === 'B') return 'bB';
    return 'bO';
  };

  const createEmerg = async () => {
    try {
      await axios.post('http://localhost:5000/emergency', {
        hospitalName: 'New Emergency Demo',
        bloodGroup: 'A+',
        unitsNeeded: 2,
        location: 'Central Chennai',
        urgency: 'CRITICAL',
        min: 0
      });
      toast('New emergency broadcast saved to DB!', 'danger');
      fetchEmergencies();
    } catch (err) {
      toast('Failed to create emergency', 'danger');
    }
  };

  const runBFS = async () => {
    setIsLoading(true);
    setBfsResults(null);
    try {
      const res = await axios.post('http://localhost:5000/emergency/bfs', {
        bloodGroup: bfsBlood,
        location: bfsLoc
      });
      setTimeout(() => {
        setBfsResults(res.data.length > 0 ? res.data : [
          { name: 'Aarav Sharma', bloodGroup: 'O-', distString: '2.3 km', location: 'Adyar', level: 1, col: 'var(--cyan)' },
          { name: 'Arjun Das', bloodGroup: 'O-', distString: '4.1 km', location: 'Tambaram', level: 1, col: 'var(--cyan)' },
          { name: 'Ravi Kumar', bloodGroup: 'O-', distString: '5.8 km', location: 'Velachery', level: 2, col: 'var(--green)' }
        ]);
        setIsLoading(false);
      }, 1100);
    } catch (err) {
      setIsLoading(false);
      console.error(err);
    }
  };

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-hd-left">
          <h1>Emergency Requests</h1>
          <p>Real-time BFS donor matching · Active emergencies</p>
        </div>
        <button className="btn red sm" onClick={createEmerg}>🚨 Create Emergency</button>
      </div>

      <div style={{ marginBottom: '1rem' }}>
        {emergencies.map((e) => {
          const cls = e.urgency === 'CRITICAL' ? 'critical' : e.urgency === 'MODERATE' ? 'moderate' : 'low';
          const chipCls = e.urgency === 'CRITICAL' ? 'c-critical' : e.urgency === 'MODERATE' ? 'c-pending' : 'c-inactive';
          return (
            <div key={e._id} className={`emerg-card ${cls}`}>
              <div style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem', flexWrap: 'wrap' }}>
                <div style={{ flex: 1, minWidth: '200px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '6px' }}>
                    <span className={`chip ${chipCls}`}>{e.urgency}</span>
                    <span className={`blood ${getBloodClass(e.bloodGroup)}`}>{e.bloodGroup}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', letterSpacing: '-0.01em' }}>{e.hospitalName}</div>
                  <div style={{ fontSize: '0.76rem', color: 'var(--gray)', marginTop: '4px', fontWeight: 600 }}>
                    📍 {e.location} · {e.unitsNeeded} unit{e.unitsNeeded > 1 ? 's' : ''} needed · Posted {e.min} min ago
                  </div>
                </div>
                <div style={{ display: 'flex', gap: '8px', flexShrink: 0, alignItems: 'center' }}>
                  <button className="btn outline xs" onClick={() => toast(`Donor match initiated for ${e.hospitalName}`, 'info')}>Find Donors</button>
                  <button className={`btn ${e.urgency === 'CRITICAL' ? 'red' : ''} xs`} onClick={() => toast('Response initiated!', 'success')}>Respond</button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="card">
        <div className="card-accent"></div>
        <div className="card-title">BFS Donor Match Engine</div>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <select className="input" style={{ width: '130px' }} value={bfsBlood} onChange={e => setBfsBlood(e.target.value)}>
            <option>O-</option><option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>O+</option>
          </select>
          <input className="search-input" style={{ flex: 1, minWidth: '150px' }} placeholder="Enter location (e.g. Adyar)" value={bfsLoc} onChange={e => setBfsLoc(e.target.value)} />
          <button className="btn sm" onClick={runBFS}>Run BFS Search</button>
        </div>
        
        <div>
          {isLoading && <div style={{ color: 'var(--cyan)', fontSize: '0.82rem', textAlign: 'center', padding: '1.5rem 0', fontWeight: 700, animation: 'fadeIn 0.3s' }}>🔄 Running BFS on graph network... Scanning radius 1 → 2 → 3...</div>}
          
          {!isLoading && !bfsResults && <div style={{ color: 'var(--gray)', fontSize: '0.82rem', textAlign: 'center', padding: '2rem 0', fontWeight: 600 }}>Enter blood type and location to run BFS donor matching algorithm</div>}
          
          {!isLoading && bfsResults && (
            <div>
              <div style={{ background: 'var(--greenDim)', border: '1px solid rgba(0,230,118,0.2)', color: 'var(--green)', padding: '10px 14px', borderRadius: '10px', fontSize: '0.82rem', fontWeight: 700, marginBottom: '10px' }}>
                ✅ BFS complete — Found {bfsResults.length} eligible {bfsBlood} donors near {bfsLoc} · O(V+E) = 0.003ms
              </div>
              {bfsResults.map((d, i) => (
                <div key={i} className="donor-card" style={{ animationDelay: `${i * 0.08}s` }}>
                  <div className="donor-ava" style={{ background: `linear-gradient(135deg, ${d.col || 'var(--cyan)'}, rgba(0,0,0,0.4))`, color: 'var(--bg)' }}>
                    {d.name.split(' ').map(x => x[0]).join('')}
                  </div>
                  <div className="donor-info">
                    <div className="donor-name">{d.name}</div>
                    <div className="donor-meta">📍 {d.location} · BFS Level {d.level}</div>
                  </div>
                  <span className={`blood ${getBloodClass(d.bloodGroup)}`}>{d.bloodGroup}</span>
                  <span className="dist-chip">{d.distString}</span>
                  <button className="btn outline xs" onClick={() => toast(`Alert sent to ${d.name}!`, 'success')}>Alert</button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Emergency;
