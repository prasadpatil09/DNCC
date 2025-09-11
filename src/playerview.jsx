import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useParams,useNavigate } from 'react-router-dom';
import './account.css'
import { Link } from 'react-router-dom';

const Playerview = () => {
 const { id } = useParams();
  const navigate = useNavigate();

  const [player, setPlayer] = useState(null);
  const [error, setError] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const userid = localStorage.getItem('userid');

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.admin) setIsAdmin(true);
  }, []);

  useEffect(() => {
    Axios.get(`http://localhost:8500/approve/player-view/${id}`)
      .then(res => setPlayer(res.data))
      .catch(err => setError('Error fetching player details.'));
  }, [id]);

  const handleDelete = () => {
    Axios.delete(`http://localhost:8500/approve/player-delete/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    }).then(res => {
      alert(res.data.message);
      localStorage.setItem("accepted","false")
      if (res.data.status) navigate('/home');

    }).catch(err => console.error(err));
  }

  if (error) return <p>{error}</p>;
  if (!player) return <p>Loading player data...</p>;
 
  return (
   
    <div className="playercontainer">
    <div className="player-view" style={{ padding: '30px' }}>
      <h1>Player Details</h1>
      <div className="player-details" style={{ fontSize: '18px' }}>
        <p><strong>Player Name:</strong> {player.playername}</p>
        <p><strong>Player Type:</strong> {player.playertype}</p>
        <p><strong>Age:</strong> {player.age}</p>
        <p><strong>Matches:</strong> {player.matches}</p>
        <p><strong>Runs:</strong> {player.runs}</p>
        <p><strong>Wickets:</strong> {player.wickets}</p>
         
        <div className="buttons-up-del">
             
           {(isAdmin || player.userRef===userid) && <Link 
  to={`/playerupdate/${id}`} 
  onClick={() => localStorage.setItem('playerup', 'true')}
>
  <button className="btn-up">Update</button>
</Link> }

{isAdmin && (
  <button className="btn-del" onClick={() => handleDelete(id)}>
    Delete
  </button>
)}

        </div>
      </div>
    </div>
    </div>
  );
};

export default Playerview;
