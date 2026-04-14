import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';

const BloodBank = () => {
  const [banks, setBanks] = useState([]);
  const { toast } = useToast();

  useEffect(() => {
    fetchInventory();
  }, []);

  const fetchInventory = async () => {
    try {
      const res = await axios.get('http://localhost:5000/bloodbank/inventory');
      if (res.data.length > 0) {
        setBanks(res.data);
      } else {
        setBanks([
          { _id: '1', bankName: 'Apollo Blood Bank', stock: { 'A+': 12, 'A-': 3, 'B+': 8, 'B-': 1, 'AB+': 5, 'AB-': 0, 'O+': 9, 'O-': 1 }, status: 'Critical' },
          { _id: '2', bankName: 'Fortis Blood Centre', stock: { 'A+': 25, 'A-': 8, 'B+': 19, 'B-': 4, 'AB+': 11, 'AB-': 2, 'O+': 22, 'O-': 4 }, status: 'Normal' },
          { _id: '3', bankName: 'MIOT Blood Bank', stock: { 'A+': 18, 'A-': 6, 'B+': 14, 'B-': 2, 'AB+': 8, 'AB-': 1, 'O+': 15, 'O-': 2 }, status: 'Normal' },
          { _id: '4', bankName: 'Govt. Blood Centre', stock: { 'A+': 8, 'A-': 1, 'B+': 5, 'B-': 0, 'AB+': 3, 'AB-': 0, 'O+': 6, 'O-': 0 }, status: 'Critical' },
          { _id: '5', bankName: 'Sri Ramachandra BB', stock: { 'A+': 31, 'A-': 11, 'B+': 24, 'B-': 6, 'AB+': 15, 'AB-': 3, 'O+': 28, 'O-': 6 }, status: 'Normal' },
          { _id: '6', bankName: 'Kauvery Blood Bank', stock: { 'A+': 4, 'A-': 0, 'B+': 3, 'B-': 0, 'AB+': 2, 'AB-': 0, 'O+': 4, 'O-': 0 }, status: 'Critical' },
        ]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  const scheduleTSP = async () => {
    try {
      const res = await axios.post('http://localhost:5000/bloodbank/tsp', {
        stops: ['Apollo Blood Bank', 'Fortis Blood Centre', 'MIOT Blood Bank']
      });
      toast(`TSP assigned! Route: ${res.data.orderedStops.join(' → ')}`, 'success');
    } catch (err) {
      toast('Failed to calculate TSP route', 'danger');
    }
  };

  const getCol = (val, type) => {
    if (type.includes('-') && val < 2) return 'var(--red)';
    if (val < 5) return 'var(--amber)';
    return 'var(--green)';
  };

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-hd-left">
          <h1>Blood Bank Inventory</h1>
          <p>Real-time stock levels · TSP delivery optimization</p>
        </div>
        <button className="btn sm" onClick={() => {toast('Inventory sync requested', 'info'); fetchInventory()}}>↻ Sync</button>
      </div>

      <div className="stats-grid">
        <div className="stat success"><div className="stat-bar"><div className="stat-bar-fill" style={{ width: '80%', background: 'linear-gradient(90deg,var(--green),#69f0ae)' }}></div></div><span className="stat-icon">✅</span><div className="stat-num">2,847</div><div className="stat-lbl">Total Units Available</div></div>
        <div className="stat danger"><div className="stat-bar"><div className="stat-bar-fill" style={{ width: '50%', background: 'linear-gradient(90deg,var(--red),#ff6b84)' }}></div></div><span className="stat-icon">⚠️</span><div className="stat-num">3</div><div className="stat-lbl">Critical Stock Banks</div></div>
        <div className="stat"><div className="stat-bar"><div className="stat-bar-fill" style={{ width: '40%', background: 'linear-gradient(90deg,var(--cyan),var(--cyan2))' }}></div></div><span className="stat-icon">🚗</span><div className="stat-num">5</div><div className="stat-lbl">Active Deliveries</div></div>
        <div className="stat warn"><div className="stat-bar"><div className="stat-bar-fill" style={{ width: '60%', background: 'linear-gradient(90deg,var(--amber),#ffcc44)' }}></div></div><span className="stat-icon">⏰</span><div className="stat-num">48h</div><div className="stat-lbl">Avg Expiry Buffer</div></div>
      </div>

      <div className="card" style={{ marginBottom: '1rem' }}>
        <div className="card-accent"></div>
        <div className="card-title">Bank Inventory Status</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Blood Bank</th><th>A+</th><th>A−</th><th>B+</th><th>B−</th><th>AB+</th><th>AB−</th><th>O+</th><th>O−</th><th>Status</th></tr>
            </thead>
            <tbody>
              {banks.map(b => (
                <tr key={b._id}>
                  <td style={{ fontWeight: 700 }}>{b.bankName || (b.bankId && b.bankId.name)}</td>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(type => (
                    <td key={type} className="inv-val" style={{ color: getCol(b.stock[type], type) }}>{b.stock[type]}</td>
                  ))}
                  <td><span className={b.status === 'Critical' ? 'chip c-critical' : 'chip c-active'}>{b.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="card">
        <div className="card-accent amber"></div>
        <div className="card-title">TSP Route Optimization · Active Deliveries</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <div className="route-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div><div style={{ fontWeight: 700, fontSize: '0.88rem' }}>📍 Apollo → MIOT → Fortis → Return</div><div style={{ fontSize: '0.74rem', color: 'var(--gray)', marginTop: '4px' }}>🩸 O−, B−, A− &nbsp;·&nbsp; 18.4 km &nbsp;·&nbsp; 3 stops &nbsp;·&nbsp; ETA: 25 min</div></div>
              <span className="chip c-active">In Transit</span>
            </div>
            <div className="prog-bar" style={{ marginTop: '10px' }}><div className="prog-fill" style={{ width: '60%', background: 'linear-gradient(90deg,var(--green),#69f0ae)' }}></div></div>
          </div>
          <div className="route-card">
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
              <div><div style={{ fontWeight: 700, fontSize: '0.88rem' }}>📍 Govt. Centre → Kauvery → SR → Return</div><div style={{ fontSize: '0.74rem', color: 'var(--gray)', marginTop: '4px' }}>🩸 AB−, O− &nbsp;·&nbsp; 24.1 km &nbsp;·&nbsp; 3 stops &nbsp;·&nbsp; ETA: 42 min</div></div>
              <span className="chip c-pending">Scheduled</span>
            </div>
            <div className="prog-bar" style={{ marginTop: '10px' }}><div className="prog-fill" style={{ width: '20%', background: 'linear-gradient(90deg,var(--amber),#ffcc44)' }}></div></div>
          </div>
          <button className="btn outline sm" style={{ alignSelf: 'flex-start' }} onClick={scheduleTSP}>+ Schedule New Delivery Route (TSP)</button>
        </div>
      </div>
    </div>
  );
};

export default BloodBank;
