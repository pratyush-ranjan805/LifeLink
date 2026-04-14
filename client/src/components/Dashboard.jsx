import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();

  const types = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];
  const pcts = [82, 45, 71, 30, 88, 25, 55, 15];
  const colors = [
    'linear-gradient(90deg,var(--cyan),var(--cyan2))',
    'linear-gradient(90deg,var(--cyan),var(--cyan2))',
    'linear-gradient(90deg,var(--green),#69f0ae)',
    'linear-gradient(90deg,var(--amber),#ffcc44)',
    'linear-gradient(90deg,var(--green),#69f0ae)',
    'linear-gradient(90deg,var(--red),#ff6b84)',
    'linear-gradient(90deg,var(--amber),#ffcc44)',
    'linear-gradient(90deg,var(--red),#ff6b84)'
  ];

  const acts = [
    { icon: '🩸', msg: 'Ravi Kumar donated A+ at Apollo Blood Bank', time: '12 min ago', cls: 'c-active' },
    { icon: '🚨', msg: 'Emergency request: B− at Fortis Hospital', time: '23 min ago', cls: 'c-critical' },
    { icon: '✅', msg: 'Priya Sharma completed donation screening', time: '1 hr ago', cls: 'c-active' },
    { icon: '🔔', msg: 'New donor registered: Chennai North Zone', time: '2 hr ago', cls: 'c-pending' },
    { icon: '📦', msg: '12 units O+ transferred to MIOT Hospital', time: '3 hr ago', cls: 'c-inactive' },
  ];

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-hd-left">
          <h1 id="dashTitle">Welcome back, {user?.name || 'User'}</h1>
          <p>LifeLink Donor Network · {user?.city || 'Chennai Region'} · <span style={{ color: 'var(--green)' }}>●</span> Live</p>
        </div>
      </div>

      <div className="alert-banner">
        <div className="alert-icon">🚨</div>
        <div className="alert-text" style={{ flex: 1 }}>
          <h3>CRITICAL: O− Blood Needed</h3>
          <p>Apollo Hospital, Adyar · 2.3km away · Posted 8 minutes ago</p>
        </div>
        <button className="btn red sm" onClick={() => toast('Emergency response sent! Donors being notified.', 'success')}>Respond Now</button>
      </div>

      <div className="stats-grid">
        <div className="stat">
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '65%', background: 'linear-gradient(90deg,var(--cyan),var(--cyan2))' }}></div></div>
          <span className="stat-icon">🩸</span><div className="stat-num">1,284</div><div className="stat-lbl">Total Donors</div><div className="stat-change" style={{ color: 'var(--green)' }}>↑ 12% this month</div>
        </div>
        <div className="stat danger">
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '85%', background: 'linear-gradient(90deg,var(--red),#ff6b84)' }}></div></div>
          <span className="stat-icon">🚨</span><div className="stat-num">7</div><div className="stat-lbl">Active Emergencies</div><div className="stat-change" style={{ color: 'var(--red)' }}>↑ 3 in last hour</div>
        </div>
        <div className="stat success">
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '72%', background: 'linear-gradient(90deg,var(--green),#69f0ae)' }}></div></div>
          <span className="stat-icon">✅</span><div className="stat-num">342</div><div className="stat-lbl">Donations Today</div><div className="stat-change" style={{ color: 'var(--green)' }}>↑ 8% vs yesterday</div>
        </div>
        <div className="stat warn">
          <div className="stat-bar"><div className="stat-bar-fill" style={{ width: '30%', background: 'linear-gradient(90deg,var(--amber),#ffcc44)' }}></div></div>
          <span className="stat-icon">⚠️</span><div className="stat-num">3</div><div className="stat-lbl">Critical Low Banks</div><div className="stat-change" style={{ color: 'var(--amber)' }}>Needs attention</div>
        </div>
      </div>

      <div className="g2" style={{ marginBottom: '1rem' }}>
        <div className="card">
          <div className="card-accent"></div>
          <div className="card-title">Blood Type Availability</div>
          <div>
            {types.map((t, i) => (
              <div key={t} style={{ marginBottom: '10px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', fontWeight: 700 }}>
                  <span style={{ fontFamily: 'var(--mono)' }}>{t}</span>
                  <span style={{ color: pcts[i] < 30 ? 'var(--red)' : pcts[i] < 60 ? 'var(--amber)' : 'var(--green)' }}>{pcts[i]}%</span>
                </div>
                <div className="prog-bar"><div className="prog-fill" style={{ width: `${pcts[i]}%`, background: colors[i] }}></div></div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div className="card-accent green"></div>
          <div className="card-title">Recent Activity</div>
          <div>
            {acts.map((a, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '10px' }}>
                <span style={{ fontSize: '0.95rem', marginTop: '1px' }}>{a.icon}</span>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.82rem', fontWeight: 600, lineHeight: 1.3 }}>{a.msg}</div>
                  <div style={{ fontSize: '0.7rem', color: 'var(--gray)', marginTop: '2px', fontWeight: 600 }}>{a.time}</div>
                </div>
                <span className={`chip ${a.cls}`}></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="card">
        <div className="card-accent"></div>
        <div className="card-title">Nearby Active Requests</div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Hospital</th><th>Blood</th><th>Units</th><th>Distance</th><th>Urgency</th><th>Action</th></tr>
            </thead>
            <tbody>
              <tr><td style={{ fontWeight: 700 }}>Apollo Hospital</td><td><span className="blood bO">O−</span></td><td>3</td><td style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>2.3 km</td><td><span className="chip c-critical">Critical</span></td><td><button className="btn outline xs" onClick={() => toast('Connecting to Apollo Hospital...','info')}>Connect</button></td></tr>
              <tr><td style={{ fontWeight: 700 }}>Fortis Malar</td><td><span className="blood bB">B−</span></td><td>2</td><td style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>4.1 km</td><td><span className="chip c-critical">Critical</span></td><td><button className="btn outline xs" onClick={() => toast('Connecting to Fortis Malar...','info')}>Connect</button></td></tr>
              <tr><td style={{ fontWeight: 700 }}>MIOT International</td><td><span className="blood bAB">AB+</span></td><td>5</td><td style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>7.2 km</td><td><span className="chip c-pending">Moderate</span></td><td><button className="btn outline xs" onClick={() => toast('Connecting to MIOT...','info')}>Connect</button></td></tr>
              <tr><td style={{ fontWeight: 700 }}>Sri Ramachandra</td><td><span className="blood bA">A+</span></td><td>8</td><td style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)' }}>9.8 km</td><td><span className="chip c-active">Low</span></td><td><button className="btn outline xs" onClick={() => toast('Connecting to Sri Ramachandra...','info')}>Connect</button></td></tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
