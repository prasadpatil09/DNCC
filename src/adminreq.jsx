import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import './account.css'; 


const Adminreq = () => {
  const [playerreq, setPlayerreq] = useState([]);
  

    useEffect(() => {
    Axios.get('https://dncc.onrender.com/approve/player-req', {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => setPlayerreq(res.data))
    .catch(err => console.error(err));
  }, []);

  const handleAccept = (id) => {
    Axios.patch(`https://dncc.onrender.com/approve/player-accept/${id}`, {}, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      alert(res.data.message);
      if (res.data.status) setPlayerreq(playerreq.filter(p => p._id !== id));
    }).catch(err => console.error(err));
  }

  const handleReject = (id) => {
    Axios.delete(`https://dncc.onrender.com/approve/player-reject/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      alert(res.data.message);
      localStorage.setItem("accepted",'false')
      if (res.data.status) setPlayerreq(playerreq.filter(p => p._id !== id));
    }).catch(err => console.error(err));
  }

  return (
    <div className="admin-container">
      <div className="admin-content">
        <h1>Player Requests</h1>
        {playerreq.map((player, index) => (
          <div className="admin-player-card" key={index}>
            <p><strong>Player Name:</strong> {player.playername}</p>
            <p><strong>Player Type:</strong> {player.playertype}</p>
            <p><strong>Age:</strong> {player.age}</p>
            <p><strong>Matches:</strong> {player.matches}</p>
            <p><strong>Runs:</strong> {player.runs}</p>
            <p><strong>Wickets:</strong> {player.wickets}</p>
            <div className='buttonsreq'>
                <button type='submit'onClick={()=>{handleAccept(player._id)}}>Accept</button>
                <button type='submit' onClick={()=>{handleReject(player._id)}}>Reject</button>
            </div>
            
          </div>
        ))}
      </div>
    </div>
  );
};

export default Adminreq;
