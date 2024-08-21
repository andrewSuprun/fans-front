import 'bootstrap/dist/css/bootstrap.min.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginForm  from './components/LoginComponent';
import  UserProfile from './components/UserComponent';

const App: React.FC = () => {
  return (
      <Router>
        <Routes>
          <Route path="/login" element={<LoginForm />} />
          <Route path="/user" element={<UserProfile />} />
        </Routes>
      </Router>
  );
};

export default App;
