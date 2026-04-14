import React, { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';

const Profile = () => {
  const { user } = useContext(AuthContext);
  const { toast } = useToast();
  const [name, setName] = useState(user?.name || 'User');

  const handleSave = () => {
    toast('Profile updated successfully!', 'success');
  };

  const [notifs, setNotifs] = useState([
    { l: 'Emergency blood requests nearby', on: true },
    { l: 'Donation eligibility reminders', on: true },
    { l: 'Blood bank stock alerts', on: false },
    { l: 'Monthly donation summary', on: true },
  ]);

  const toggleNotif = (index) => {
    const newNotifs = [...notifs];
    newNotifs[index].on = !newNotifs[index].on;
    setNotifs(newNotifs);
    toast(newNotifs[index].on ? 'Notification enabled' : 'Notification disabled', 'info');
  };

  const getBloodClass = (b) => {
    if (!b) return 'bO';
    const t = b.replace(/[^A-Z]/gi, '');
    if (t === 'AB') return 'bAB';
    if (t === 'A') return 'bA';
    if (t === 'B') return 'bB';
    return 'bO';
  };

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-hd-left">
          <h1>My Profile</h1>
          <p>Manage your account and settings</p>
        </div>
      </div>
      <div className="g2">
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-accent"></div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div className="profile-ava" id="profileAva">{name.substring(0, 2).toUpperCase()}</div>
              <div>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, letterSpacing: '-0.02em' }}>{name}</div>
                <div style={{ color: 'var(--gray)', fontSize: '0.8rem', fontWeight: 600, marginTop: '2px' }}>
                  {user?.role ? user.role.charAt(0).toUpperCase() + user.role.slice(1) : 'Donor'} · {user?.city || 'Chennai'}
                </div>
                <div style={{ marginTop: '8px' }}><span className={`blood ${getBloodClass(user?.bloodGroup || 'O-')}`}>{user?.bloodGroup || 'O-'}</span></div>
              </div>
            </div>
            <div className="field"><label>Full Name</label><input className="input" value={name} onChange={(e) => setName(e.target.value)} /></div>
            <div className="field"><label>Email</label><input className="input" value={user?.email || ''} readOnly /></div>
            <div className="field"><label>City</label><input className="input" value={user?.city || 'Chennai'} readOnly /></div>
            <button className="btn" onClick={handleSave}>Save Changes</button>
          </div>
        </div>
        <div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-accent green"></div>
            <div className="card-title">Donation History</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'rgba(0,200,255,0.03)', borderRadius: '8px' }}><div style={{ flex: 1 }}><div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Apollo Hospital</div><div style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>Jan 15, 2025</div></div><span className="blood bO">O−</span><span className="chip c-active">Done</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'rgba(0,200,255,0.03)', borderRadius: '8px' }}><div style={{ flex: 1 }}><div style={{ fontSize: '0.85rem', fontWeight: 700 }}>MIOT Blood Bank</div><div style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>Oct 12, 2024</div></div><span className="blood bO">O−</span><span className="chip c-active">Done</span></div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '8px', background: 'rgba(0,200,255,0.03)', borderRadius: '8px' }}><div style={{ flex: 1 }}><div style={{ fontSize: '0.85rem', fontWeight: 700 }}>Fortis Malar</div><div style={{ fontSize: '0.72rem', color: 'var(--gray)' }}>Jul 08, 2024</div></div><span className="blood bO">O−</span><span className="chip c-active">Done</span></div>
            </div>
          </div>
          <div className="card" style={{ marginBottom: '1rem' }}>
            <div className="card-accent amber"></div>
            <div className="card-title">Your Impact</div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--cyanDim)', borderRadius: '10px', border: '1px solid rgba(0,200,255,0.1)' }}><div className="impact-num" style={{ color: 'var(--cyan)' }}>4</div><div style={{ fontSize: '0.68rem', color: 'var(--gray)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>Total Donations</div></div>
              <div style={{ textAlign: 'center', padding: '1rem', background: 'var(--greenDim)', borderRadius: '10px', border: '1px solid rgba(0,230,118,0.1)' }}><div className="impact-num" style={{ color: 'var(--green)' }}>12</div><div style={{ fontSize: '0.68rem', color: 'var(--gray)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.08em', marginTop: '4px' }}>Lives Impacted</div></div>
            </div>
          </div>
          <div className="card">
            <div className="card-accent"></div>
            <div className="card-title">Notification Settings</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {notifs.map((s, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                  <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{s.l}</span>
                  <div className="toggle" onClick={() => toggleNotif(i)} style={{ background: s.on ? 'var(--cyan)' : 'rgba(255,255,255,0.1)' }}>
                    <div className="toggle-knob" style={{ left: s.on ? '21px' : '3px' }}></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
