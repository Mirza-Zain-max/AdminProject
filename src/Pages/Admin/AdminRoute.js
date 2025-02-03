import React, { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { fireStore } from '../../Config/firebase';
import { doc, getDoc } from 'firebase/firestore';
import ScreenLoader from '../ScreenLoader/ScreenLoader';

const AdminRoutes = () => {
  const [isAdmin, setIsAdmin] = useState(null); // State to handle async check
  const [loading, setLoading] = useState(true); // To show loading while checking

  useEffect(() => {
    const checkIfAdmin = async () => {
      const user = JSON.parse(localStorage.getItem("user")); // Get user data from localStorage

      if (user) {
        const userDocRef = doc(fireStore, "admins", user.uid);
        const userDoc = await getDoc(userDocRef);
        if (userDoc.exists() && userDoc.data().role === 'admin') {
          setIsAdmin(true); // User is admin
        } else {
          setIsAdmin(false); // User is not admin
        }
      } else {
        setIsAdmin(false); // No user logged in
      }

      setLoading(false); // Finished checking
    };

    checkIfAdmin();
  }, []);

  if (loading) {
    return <ScreenLoader/>; // Optional: You can show a loading spinner or message
  }

  return isAdmin ? <Outlet /> : <Navigate to="/admin" />; // If not admin, redirect to login
};

export default AdminRoutes;
