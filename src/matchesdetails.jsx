import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

const SeasonDetails = () => {
  const { id } = useParams();
  const [season, setSeason] = useState(null);

  useEffect(() => {
    Axios.get(`http://localhost:8500/create/getseasonbyid/${id}`)
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
      <ul>
        {season.matches.map((m, i) => (
          <li key={i}>
            {m.team1} vs {m.team2}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SeasonDetails;
