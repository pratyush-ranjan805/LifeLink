import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useToast } from '../context/ToastContext';
import { API_URL } from '../config';

const Donors = () => {
  const [donors, setDonors] = useState([]);
  const [search, setSearch] = useState('');
  const [bloodType, setBloodType] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    fetchDonors();
  }, [search, bloodType]);

  const fetchDonors = async () => {
    try {
      const res = await axios.get(`${API_URL}/donors`, {
        params: { search, bloodGroup: bloodType }
      });
      // Merge with hardcoded fallback if API fails or is empty, for simulation purposes.
      if (res.data.length > 0) {
        setDonors(res.data);
      } else {
        setDonors([
          { _id: '1', name: 'Aarav Sharma', bloodGroup: 'O-', location: 'Adyar', lastDonated: '2024-12-15', donationCount: 14, status: 'active' },
          { _id: '2', name: 'Priya Rajan', bloodGroup: 'A+', location: 'Anna Nagar', lastDonated: '2025-01-03', donationCount: 8, status: 'active' },
          { _id: '3', name: 'Karthik Selvan', bloodGroup: 'B+', location: 'Velachery', lastDonated: '2024-11-20', donationCount: 22, status: 'active' },
          { _id: '4', name: 'Divya Nair', bloodGroup: 'AB-', location: 'T. Nagar', lastDonated: '2025-01-10', donationCount: 5, status: 'pending' },
        ].filter(d => (!bloodType || d.bloodGroup === bloodType) && (!search || d.name.toLowerCase().includes(search.toLowerCase()))));
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

  const registerDonor = async () => {
    try {
      await axios.post(`${API_URL}/donors`, {
        name: 'New Volunteer',
        bloodGroup: 'B+',
        location: 'T. Nagar',
        donationCount: 0,
        status: 'active'
      });
      toast('Registration saved to DB!', 'success');
      fetchDonors();
    } catch (err) {
      toast('Failed to register donor', 'danger');
    }
  };

  return (
    <div className="page">
      <div className="page-hd">
        <div className="page-hd-left">
          <h1>Donor Registry</h1>
          <p>All registered donors · BFS proximity search enabled</p>
        </div>
        <button className="btn sm" onClick={registerDonor}>+ Register Donor</button>
      </div>

      <div className="card" style={{ padding: '1rem', marginBottom: '1rem' }}>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input className="search-input" style={{ flex: 2, minWidth: '200px' }} placeholder="🔍  Search by name, location..." value={search} onChange={(e) => setSearch(e.target.value)} />
          <select className="input" style={{ width: '130px' }} value={bloodType} onChange={(e) => setBloodType(e.target.value)}>
            <option value="">All Blood Types</option>
            <option>A+</option><option>A-</option><option>B+</option><option>B-</option><option>AB+</option><option>AB-</option><option>O+</option><option>O-</option>
          </select>
          <select className="input" style={{ width: '130px' }}>
            <option>All Status</option><option>Active</option><option>Pending</option><option>Inactive</option>
          </select>
        </div>
      </div>

      <div className="card">
        <div className="card-accent"></div>
        <div className="card-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          Registered Donors <span style={{ fontSize: '0.8rem', color: 'var(--gray)', fontWeight: 600, textTransform: 'none', letterSpacing: 0 }}>({donors.length} donors)</span>
        </div>
        <div className="table-wrap">
          <table>
            <thead>
              <tr><th>Name</th><th>Blood</th><th>Location</th><th>Last Donated</th><th>Count</th><th>Status</th><th>Action</th></tr>
            </thead>
            <tbody>
              {donors.map((d) => {
                const sc = d.status === 'active' ? 'c-active' : d.status === 'pending' ? 'c-pending' : 'c-inactive';
                const sl = d.status.charAt(0).toUpperCase() + d.status.slice(1);
                return (
                  <tr key={d._id} className="donor-row">
                    <td style={{ fontWeight: 700 }}>{d.name}</td>
                    <td><span className={`blood ${getBloodClass(d.bloodGroup)}`}>{d.bloodGroup}</span></td>
                    <td style={{ color: 'var(--gray)', fontSize: '0.8rem' }}>{d.location}, Chennai</td>
                    <td style={{ fontFamily: 'var(--mono)', fontSize: '0.79rem', color: 'var(--gray)' }}>{d.lastDonated ? new Date(d.lastDonated).toLocaleDateString() : 'N/A'}</td>
                    <td style={{ color: 'var(--cyan)', fontFamily: 'var(--mono)', fontWeight: 700 }}>{d.donationCount || parseInt(d.c) || 0}</td>
                    <td><span className={`chip ${sc}`}>{sl}</span></td>
                    <td><button className="btn outline xs" onClick={() => toast(`Contacting ${d.name}...`, 'success')}>Contact</button></td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Donors;
