import React, { useState } from 'react'
import './matches.css'
import Axios from 'axios'

const Matchadd = () => {
  const [season, setSeason] = useState("")
  const [team1, setTeam1] = useState("")
  const [team2, setTeam2] = useState("")

const handleSubmit = (e) => {
  e.preventDefault();

  if (team1 === team2) {
    alert("Team1 and Team2 cannot be the same!");
    return;
  }

  const token = localStorage.getItem("token");
  console.log("Sending token:", token);

  Axios.post(
    "https://dncc.onrender.com/create/createseason",
    { season, team1, team2 },
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    }
  )
    .then((res) => {
      
      alert(res.data.message);
    })
    .catch((err) => {
      console.error("Error:", err.response?.data || err.message);
      alert(err|| "Something went wrong!");
    });
};


  return (
    <div className='seasonform'>
      <h1>Add new season</h1>
      <div className='formadd'>
        <form onSubmit={handleSubmit}>
          <label htmlFor="season">Season no:</label>
          <input
            type="number"
            id="season"
            value={season}
            onChange={(e) => setSeason(e.target.value)}
            required
          />

          <label htmlFor="team1">Team 1</label>
          <select
            id="team1"
            value={team1}
            onChange={(e) => setTeam1(e.target.value)}
            required
          >
            <option value="">-- Select Team --</option>
            <option value="Challengers">Challengers</option>
            <option value="Fighters">Fighters</option>
            <option value="Titans">Titans</option>
            <option value="SuperKings">SuperKings</option>
          </select>

          <label htmlFor="team2">Team 2</label>
          <select
            id="team2"
            value={team2}
            onChange={(e) => setTeam2(e.target.value)}
            required
          >
            <option value="">-- Select Team --</option>
            <option value="Challengers">Challengers</option>
            <option value="Fighters">Fighters</option>
            <option value="Titans">Titans</option>
            <option value="SuperKings">SuperKings</option>
          </select>

          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Matchadd
