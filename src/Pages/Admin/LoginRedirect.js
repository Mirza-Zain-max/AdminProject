// import React, { useEffect } from 'react';
// import { Navigate } from 'react-router-dom';

// const AdminLoginRedirect = () => {
//   useEffect(() => {
//     const user = JSON.parse(localStorage.getItem("user"));
//     if (user) {
//       // Check if user is already an admin
//       if (user.role === 'admin') {
//         // Redirect directly to the admin dashboard
//         window.location.href = '/admin/dashboard';
//       }
//     }
//   }, []);

//   return <Navigate to="/admin/dashboard" />;
// };

// export default AdminLoginRedirect;
