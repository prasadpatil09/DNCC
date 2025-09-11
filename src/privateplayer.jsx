import React, { useEffect, useState } from 'react';
import { Navigate, useParams } from 'react-router-dom';
import Axios from 'axios';

const Privateplayer = ({ children }) => {
  const { id } = useParams(); // player id from route
  const [isAllowed, setIsAllowed] = useState(null); // null = loading
  const userData = JSON.parse(localStorage.getItem('user'));
  const userId = localStorage.getItem('userid');

  useEffect(() => {
    const checkAccess = async () => {
      try {
        // If admin, allow directly
        if (userData?.admin) {
          setIsAllowed(true);
          return;
        }

        // Otherwise fetch player details to check ownership
        const res = await Axios.get(`http://localhost:8500/approve/player-view/${id}`);
        const player = res.data;

        if (player.userRef === userId) {
          setIsAllowed(true);
        } else {
          setIsAllowed(false);
        }
      } catch (err) {
        console.error("Error checking player access:", err);
        setIsAllowed(false);
      }
    };

    checkAccess();
  }, [id, userData, userId]);

  if (isAllowed === null) {
    return <div>Loading...</div>; // still checking
  }

  return isAllowed ? children : <Navigate to="/home" />;
};

export default Privateplayer;
