import Cookies from 'js-cookie';
import React from 'react'
import { Navigate, Outlet } from 'react-router-dom';

const Protect = () => {
   const userToken = Cookies.get('token');
   return userToken ? <Outlet /> : <Navigate to='/login' replace={true} />
}

export default Protect