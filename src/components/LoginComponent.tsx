import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import LoginModal from './LoginModalComponent';
import { useUserStore } from '../context/useUserStore';
import { useCookies } from 'react-cookie';

const API_URL = 'http://localhost:3000'; // Replace with your API base URL

const LoginForm: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState(''); // New state for name
  const [phone, setPhone] = useState(''); // New state for phone
  const [isSignup, setIsSignup] = useState(false);
  const [showModal, setShowModal] = useState(false); // Modal visibility state
  const { user, setUser } = useUserStore();
  const navigate = useNavigate();
  const [cookies, setCookie] = useCookies(['token']);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let response;
      if (isSignup) {
        // Handle signup logic
        response = await axios.post(`${API_URL}/api/v1/sign-up`, {
          email,
          password,
          name,
          phone,
        });
      } else {
        // Handle login logic
        response = await axios.post(`${API_URL}/auth/login`, {
          email,
          password,
        });
      }

      const { data } = response;
      const user = {
        name: data.user.name,
        email: data.user.email,
        phone: data.user.phone,
      };
      if (data.token) {
        setCookie('token', data.token);
        localStorage.setItem('user', JSON.stringify(user));
      }
        setUser(user);
        navigate('/user'); // Redirect after successful login/signup
    } catch (error) {
      console.error('Error during authentication:', error);
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4">
          <div className="card">
            <div className="card-body">
              <h5 className="card-title mb-4">
                {isSignup ? 'Sign Up' : 'Login'}
              </h5>
              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">
                    Email address
                  </label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {isSignup && (
                  <>
                    <div className="mb-3">
                      <label htmlFor="name" className="form-label">
                        Name
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <label htmlFor="phone" className="form-label">
                        Phone
                      </label>
                      <input
                        type="tel"
                        className="form-control"
                        id="phone"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                      />
                    </div>
                  </>
                )}
                <button type="submit" className="btn btn-primary">
                  {isSignup ? 'Sign Up' : 'Login'}
                </button>
              </form>
              <div className="mt-3">
                <button
                  type="button"
                  className="btn btn-link"
                  onClick={() => setIsSignup(!isSignup)}
                >
                  {isSignup
                    ? 'Already have an account? Login'
                    : 'Need an account? Sign Up'}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      {showModal && <LoginModal handleClose={() => setShowModal(false)} />}
    </div>
  );
};

export default LoginForm;
