// ProtectedRoute.jsx
import React,{useState,useEffect} from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  // Get user from localStorage (assuming it's stored as JSON string)
  const [isAdmin, setIsAdmin] = useState(null);
  
  useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData?.admin) {
        setIsAdmin(true);
      }
      else{
        setIsAdmin(false)
      }
    }, []);
  if (isAdmin === null) {
    // Still checking user role
    return <div>Loading...</div>;
  }

  if (!isAdmin) {
    // Logged in but not admin
    return <Navigate to="/home" />;
  }
   return children;
  // Authorized as admin
 
};

export default ProtectedRoute;
