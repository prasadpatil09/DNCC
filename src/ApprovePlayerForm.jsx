import React from 'react';
import './ApprovePlayerForm.css'; 
const ApprovePlayerForm = ({
  playername,
  setPlayername,
  playertype,
  setPlayertype,
  matches,
  setMatches,
  runs,
  setRuns,
  wickets,
  setWickets,
  age,
  setAge,
  handleSubmit,
}) => {
  return (
    <div className='wrapper'>
    <div className="approve-player-form">
      <h2>Approve Player</h2>
      <form onSubmit={handleSubmit}>
        <label>Player Name:</label>
        <input
          type="text"
          value={playername}
          onChange={(e) => setPlayername(e.target.value)}
          required
        />

        <label>Player Type:</label>
        <select
          value={playertype}
          onChange={(e) => setPlayertype(e.target.value)}
          required
        >
          <option value="">--Select Type--</option>
          <option value="Batsman">Batsman</option>
          <option value="Bowler">Bowler</option>
          <option value="All-Rounder">All-Rounder</option>
          <option value="Wicket-Keeper">Wicket-Keeper</option>
        </select>
        <label htmlFor="">Age</label>
        <input type="number" value={age} onChange={(e)=>setAge(e.target.value)}/>

        <label>Matches:</label>
        <input
          type="number"
          value={matches}
          onChange={(e) => setMatches(e.target.value)}
          min="0"
        />

        <label>Runs:</label>
        <input
          type="number"
          value={runs}
          onChange={(e) => setRuns(e.target.value)}
          min="0"
        />

        <label>Wickets:</label>
        <input
          type="number"
          value={wickets}
          onChange={(e) => setWickets(e.target.value)}
          min="0"
        />

        <button type="submit">Approve Player</button>
      </form>
    </div>
    </div>
  );
};

export default ApprovePlayerForm;
