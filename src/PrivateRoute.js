import React, { useEffect, useState } from 'react';
import { Outlet, Navigate } from 'react-router-dom';


const PrivateRoute = ({loginStatus}) => {
    const [token, setToken] = useState(false);

    // useEffect(() => {
    //     // Check if token exists in local storage
    //     const token = localStorage.getItem('token');
    //     if (token) {
    //         alert(token);
    //         setToken(true);
    //     } else {
    //         alert('No token found');
    //         setToken(false);
    //     }

    // }, []); // Empty dependency array means this effect runs only once after initial render

    return loginStatus ? <Outlet /> : <Navigate to="/" />;
};
export default PrivateRoute
