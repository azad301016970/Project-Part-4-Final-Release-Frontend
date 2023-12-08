import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, Navigate, useNavigate } from 'react-router-dom';


const Header = ({ setIsLoggedIn, isLoggedIn }) => {
    const navigate = useNavigate();

    const handleLogout = () => {
        // Remove token from localStorage and set isLoggedIn to false
        localStorage.removeItem('token');
        setIsLoggedIn(false);
        navigate('/');
    };

    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        {isLoggedIn && (
                            <React.Fragment>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users">
                                        Users
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/users/create">
                                        Create User
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <button className="btn btn-outline-danger" onClick={handleLogout}>
                                        Logout
                                    </button>
                                </li>
                            </React.Fragment>
                        )}
                    </ul>
                </div>
            </nav>
        </div>

    );
};

export default Header