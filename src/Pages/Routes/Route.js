import React from 'react';
import { Route, Routes, Navigate } from 'react-router-dom';
import Login from '../Auth/Login';
import Register from '../Auth/Register';
import Forgot from '../Auth/Forgot';
import PrivateRoutes from './PrivateRoutes';
import PublicRoutes from './PublicRoutes';
import AddRider from '../DashBoard/AddRider';
import ShowData from '../DashBoard/ShowData';
import RunSheet from '../DashBoard/RunSheet';
import ViewSheet from '../DashBoard/ViewSheet';
import TrackShipment from '../DashBoard/Tracking';
import Dashboard from '../DashBoard/Dashboard';
import AdminDashboard from '../Admin/Dashboard';
import AdminRoutes from '../Admin/AdminRoute';
import AdminRegister from '../Admin/AdminAuth/AdminRegister';
import AdminLogin from '../Admin/AdminAuth/AdminLogin';
import AdminForgot from '../Admin/AdminAuth/AdminForgot';

const FrontEnd = () => {
  return (
    <Routes>
      <Route element={<PublicRoutes />}>
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/register" element={<Register />} />
        <Route path="/auth/forgot" element={<Forgot />} />
      </Route>
      <Route path="/admin/auth/register" element={<AdminRegister />} />
      <Route path="/admin/auth/login" element={<AdminLogin />} />
      <Route path="/admin/auth/forgot" element={<AdminForgot />} />
      <Route element={<PrivateRoutes />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/add" element={<AddRider />} />
        <Route path="/showData" element={<ShowData />} />
        <Route path="/make-delivery" element={<RunSheet />} />
        <Route path="/track-shipment" element={<TrackShipment />} />
        <Route path="/view-sheet" element={<ViewSheet />} />
      </Route>
      <Route path="/admin" element={<Navigate to="/admin/auth/register" />} />
      <Route element={<AdminRoutes />}>
        <Route path="/admin" element={<AdminDashboard />} />
      </Route>
    </Routes>
  );
};

export default FrontEnd;
