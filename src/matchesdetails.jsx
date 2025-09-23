import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";
import "./seasonDetails.css"; // custom CSS

// Map team names to logo image paths
const teamLogos = {
  Fighters: "/Dnccfighters.jpg",
  SuperKings: "/Dnccsuperkings.jpg",
  Titans: "/Dncctitan.jpg",
  Challengers: "/Dncceagle.jpg",
  // add more teams if needed
};

const SeasonDetails = () => {
  const { id } = useParams();
  const [season, setSeason] = useState(null);

  useEffect(() => {
    Axios.get(`https://dncc.onrender.com/create/getseasonbyid/${id}`)
      .then((res) => {
        if (res.data.status) {
          setSeason(res.data.season);
        }
      })
      .catch((err) => console.log(err));
  }, [id]);

  if (!season) return <p>Loading...</p>;

  return (
    <div className="season-details">
      <h1>Season {season.season}</h1>
      <h2>Matches:</h2>

      <div className="matches-list">
        {season.matches.map((m, i) => (
          <div key={i} className="match-card">
            <div className="team">
              <img
                src={teamLogos[m.team1] || "/images/default.png"}
                alt={m.team1}
              />
              <span>{m.team1}</span>
            </div>

            <div className="vs">VS</div>

            <div className="team">
              <img
                src={teamLogos[m.team2] || "/images/default.png"}
                alt={m.team2}
              />
              <span>{m.team2}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SeasonDetails;
