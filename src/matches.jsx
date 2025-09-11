import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

const Matches = () => {
  const [seasons, setSeasons] = useState([]);
   const [isAdmin, setIsAdmin] = useState(false);
  
    useEffect(() => {
      const userData = JSON.parse(localStorage.getItem('user'));
      if (userData?.admin) setIsAdmin(true);
    }, []);

  useEffect(() => {
    Axios.get("http://localhost:8500/create/getseason")
      .then((res) => {
        if (res.data.status) {
          setSeasons(res.data.season);
        }
      })
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className="matches">
      <Link to="/addseasons">
        {isAdmin && <button>Add new seasons</button>}
      </Link>
      <h1>Seasons</h1>

      {seasons.map((s) => (
        <div key={s._id} className="season-block">
          <h2>Season {s.season} <Link to={`/seasons/${s._id}`}>
            <button>View More</button>
          </Link></h2>
         
        </div>
      ))}
    </div>
  );
};

export default Matches;


