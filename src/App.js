import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useNavigate } from 'react-router-dom';
import Users from './components/Users';
import UserForm from './components/UserForm';
import 'bootstrap/dist/css/bootstrap.min.css';
import axios from 'axios';
import PrivateRoute from './PrivateRoute';
import Header from './components/Header';

const App = () => {
  const apiUrl = process.env.REACT_APP_API_URL ?? 'http://localhost:3000';
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem('token') ? true : false);
  const [error, setError] = useState('');
  const navigate = useNavigate();


  useEffect(() => {
    if (isLoggedIn) {
      navigate('/users');
    }
  }, []);


  const handleLogin = async (credentials) => {
    try {
      // Replace with your actual login logic using credentials (username, password)
      const response = await axios.post(`${apiUrl}/auth/signin`, credentials);
      console.log('response:', response);
      if (response.data && response.data.token) {
        localStorage.setItem('token', response.data.token);
        setIsLoggedIn(true);
        navigate('/users');

      }
      //Simulating login success by setting isLoggedIn to true and storing token in localStorage

    } catch (error) {
      console.error('Error logging in:', error);
      setError('Invalid email or password');
      navigate('/');

    }
  };


  return (
    <>
      <Header setIsLoggedIn={setIsLoggedIn} isLoggedIn={isLoggedIn}/>
      <Routes>
        <React.Fragment>
          <Route path="/" element={<SignIn handleLogin={handleLogin} />} />

          <Route element={<PrivateRoute loginStatus={isLoggedIn} />}>
            <Route path='/users' element={<Users />} />
            <Route path='/users/create' element={<UserForm />} />
          </Route>


        </React.Fragment>
      </Routes>
    </>
  );
};


const SignIn = ({ handleLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await handleLogin({ email, password });
      navigate('/users');
      // return <Navigate to="/users" />;
    } catch (error) {
      console.log('Error signing in:', error);
      // setError('Invalid email or password');
      navigate('/');
    }
  };


  return (
    <div className="container">
      <div className="card">
        <h5 className="card-header">Sign In</h5>
        <div className="card-body">

          <form onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="email">Username:</label>
              <input
                type="email"
                className="form-control"

                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                className="form-control"

                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="col-12 d-md-flex justify-content-md-end">
              <button type="submit" className="btn btn-success">
                Submit
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default App;
