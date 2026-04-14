import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { useToast } from '../context/ToastContext';
import { useNavigate } from 'react-router-dom';

const Auth = () => {
  const [isLogin, setIsLogin] = useState(true);
  const { login, signup } = useContext(AuthContext);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Login state
  const [email, setEmail] = useState('demo@lifelink.io');
  const [password, setPassword] = useState('demo1234');

  // Signup state
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [sEmail, setSEmail] = useState('');
  const [sPassword, setSPassword] = useState('');
  const [blood, setBlood] = useState('A+');
  const [role, setRole] = useState('donor');
  const [city, setCity] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      toast('Please enter email and password', 'danger');
      return;
    }
    try {
      await login(email, password);
      toast('Welcome back! 👋', 'success');
      navigate('/dashboard');
    } catch (err) {
      toast(err.response?.data?.message || 'Login failed', 'danger');
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await signup({
        name: `${firstName} ${lastName}`,
        email: sEmail,
        password: sPassword,
        role,
        bloodGroup: blood,
        city
      });
      toast('Account created!', 'success');
      navigate('/dashboard');
    } catch (err) {
      toast(err.response?.data?.message || 'Signup failed', 'danger');
    }
  };

  return (
    <div className="auth-wrap">
      {isLogin ? (
        <div className="auth-card">
          <div className="auth-logo">
            <h1>LIFE<span>LINK</span></h1>
            <p>Connecting donors · Saving lives · Chennai</p>
          </div>
          <form onSubmit={handleLogin}>
            <div className="field">
              <label>Email</label>
              <input type="email" className="input" placeholder="you@example.com" value={email} onChange={(e) => setEmail(e.target.value)} />
            </div>
            <div className="field">
              <label>Password</label>
              <input type="password" className="input" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
            </div>
            <div style={{ textAlign: 'right', margin: '-4px 0 12px' }}>
              <a style={{ fontSize: '0.78rem', color: 'var(--cyan)', cursor: 'pointer', fontWeight: 700 }}>Forgot password?</a>
            </div>
            <button type="submit" className="btn">Sign In →</button>
          </form>
          <div className="divider">or continue as</div>
          <div className="role-btns">
            <div className="role-btn"><span className="ri">🩸</span>Donor</div>
            <div className="role-btn"><span className="ri">🏥</span>Hospital</div>
            <div className="role-btn"><span className="ri">🏦</span>Blood Bank</div>
          </div>
          <div className="auth-toggle">No account? <a onClick={() => setIsLogin(false)}>Create one</a></div>
        </div>
      ) : (
        <div className="auth-card">
          <div className="auth-logo">
            <h1>LIFE<span>LINK</span></h1>
            <p>Join the network — save lives</p>
          </div>
          <form onSubmit={handleSignup}>
            <div className="two-col">
              <div className="field"><label>First Name</label><input type="text" className="input" placeholder="Aarav" value={firstName} onChange={e => setFirstName(e.target.value)} /></div>
              <div className="field"><label>Last Name</label><input type="text" className="input" placeholder="Sharma" value={lastName} onChange={e => setLastName(e.target.value)} /></div>
            </div>
            <div className="field"><label>Email</label><input type="email" className="input" placeholder="you@example.com" value={sEmail} onChange={e => setSEmail(e.target.value)} /></div>
            <div className="field"><label>Password</label><input type="password" className="input" placeholder="Min 8 characters" value={sPassword} onChange={e => setSPassword(e.target.value)} /></div>
            <div className="two-col">
              <div className="field"><label>Blood Type</label>
                <select className="input" value={blood} onChange={e => setBlood(e.target.value)}>
                  {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(b => <option key={b}>{b}</option>)}
                </select>
              </div>
              <div className="field"><label>Role</label>
                <select className="input" value={role} onChange={e => setRole(e.target.value)}>
                  <option value="donor">Donor</option>
                  <option value="hospital">Hospital</option>
                  <option value="bank">Blood Bank</option>
                </select>
              </div>
            </div>
            <div className="field"><label>City</label><input type="text" className="input" placeholder="Chennai" value={city} onChange={e => setCity(e.target.value)} /></div>
            <button type="submit" className="btn">Create Account →</button>
          </form>
          <div className="auth-toggle">Have an account? <a onClick={() => setIsLogin(true)}>Sign in</a></div>
        </div>
      )}
    </div>
  );
};

export default Auth;
