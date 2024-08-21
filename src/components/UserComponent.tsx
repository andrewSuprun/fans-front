import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useUserStore } from '../context/useUserStore';
import { useCookies } from 'react-cookie';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const API_URL = 'http://localhost:3000'; // Replace with your API base URL

const UserProfile: React.FC = () => {
  const { user: contextUser, setUser, clearUser } = useUserStore();
  const [cookies, removeCookie] = useCookies(['token']); // Get removeCookie function
  const token = cookies.token;
  const navigate = useNavigate(); // Initialize useNavigate
  const user = localStorage.getItem('user');

  useEffect(() => {
    const fetchUserData = async () => {
      if (token) {
        try {
          const response = await axios.get(
            `${API_URL}/api/v1/get-me`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          const { data } = response;
          const refetchedUser = {
            name: data.name,
            email: data.email,
            phone: data.phone,
          };
          setUser(refetchedUser);
        } catch (error) {
          console.error('Error fetching user data:', error);
          // Optionally handle errors, e.g., redirect to login or show a message
        }
      }
    };

    fetchUserData();
  }, [user, setUser, token]);

  const handleLogout = async () => {
    // Remove the token from cookies
    removeCookie('token', []);
    // Clear user data from localStorage
    localStorage.removeItem('user');
    // Clear user data from the context
    clearUser();
    try {
      const response = await axios.post(
        `${API_URL}/auth/logout`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
     } catch (error) {
      console.log(error, 'error while logging out');
     }
    // Redirect to login page or homepage
    navigate('/login'); 
   // or any other route
  };


  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header text-center">
              <h5 className="card-title">User Profile</h5>
            </div>
            <div className="card-body">
              <div className="d-flex align-items-center mb-4">
                <div className="avatar me-3">
                  <img
                    src="https://via.placeholder.com/100"
                    alt="User Avatar"
                    className="rounded-circle"
                    width="100"
                    height="100"
                  />
                </div>
                <div>
                  <h5 className="card-subtitle mb-2 text-muted">
                    {contextUser?.name}
                  </h5>
                  <p className="card-text">{contextUser?.email}</p>
                  <p className="card-text">{contextUser?.phone}</p>
                </div>
              </div>
              <a href="/edit-profile" className="btn btn-primary">
                Edit Profile
              </a>
              <button onClick={handleLogout} className="btn btn-secondary ms-2">
                Logout
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
