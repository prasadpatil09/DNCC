import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import './ApprovePlayerForm.css'; 
import { useNavigate, useParams } from 'react-router-dom'

const Playerupdate = () => {
  const navigate = useNavigate()
  const { id } = useParams()

  // States for each field
  const [playername, setPlayername] = useState("")
  const [playertype, setPlayertype] = useState("")
  const [age, setAge] = useState("")
  const [matches, setMatches] = useState("")
  const [runs, setRuns] = useState("")
  const [wickets, setWickets] = useState("")
  const [loading, setLoading] = useState(true)

  // Fetch player details on mount
  useEffect(() => {
    Axios.get(`http://localhost:8500/approve/player-view/${id}`)
      .then(res => {
        const data = res.data
        setPlayername(data.playername || "")
        setPlayertype(data.playertype || "")
        setAge(data.age || "")
        setMatches(data.matches || "")
        setRuns(data.runs || "")
        setWickets(data.wickets || "")
        setLoading(false)
      })
      .catch(() => {
        alert("Error fetching player details")
        setLoading(false)
      })
  }, [id])

  // Submit handler
  const handleSubmit = (e) => {
    e.preventDefault()
    Axios.put(
      `http://localhost:8500/approve/player-update/${id}`,
      { playername, playertype, age, matches, runs, wickets },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    )
    .then((res) => {
      alert(res.data.message)
      if (res.data.status) {
        navigate('/home')
      }
    })
    .catch(err => alert(err))
  }

  if (loading) return <p>Loading...</p>

  return (
    <div className='wrapper'>
      <div className="approve-player-form">
        <h2>Update Player</h2>
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

          <label>Age</label>
          <input type="number" value={age} onChange={(e) => setAge(e.target.value)} />

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

          <button type="submit">Update Player</button>
        </form>
      </div>
    </div>
  )
}

export default Playerupdate
