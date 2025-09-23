import React, { useState, useEffect } from 'react';
import ApprovePlayerForm from './ApprovePlayerForm';
import Axios from 'axios';

const RequestRegister = () => {
  const [playername, setPlayername] = useState('');
  const [playertype, setPlayertype] = useState('');
  const [matches, setMatches] = useState(0);
  const [runs, setRuns] = useState(0);
  const [wickets, setWickets] = useState(0);
  const [sendreq, setSendreq] = useState(false);
  const [age, setAge] = useState('');
  const [userid, setUserid] = useState('');
  const [accepted, setAccepted]= useState(null);

  useEffect(() => {
    const id = localStorage.getItem('userid') || '';
    setUserid(id);

    // Check if request was sent for this specific user
    const isaccepted = localStorage.getItem('accepted') 
    if (isaccepted === 'true') {
      setAccepted(true);
    }
    if(isaccepted==='false'){
      setAccepted(false)
    }
    const isSent = localStorage.getItem(`requestSent_${id}`);
    if (isSent === 'true') {
      setSendreq(true);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

   Axios.post(
  'https://dncc.onrender.com/approve/player-approval',
  {
    userid,
    playername,
    playertype,
    matches: Number(matches),
    runs: Number(runs),
    wickets: Number(wickets),
    age: Number(age),
  },
  {
    headers: {
      Authorization: `Bearer ${localStorage.getItem('token')}`, // <-- send the JWT
    },
  }
).then((res) => {
        if (res.data.status) {
          alert(res.data.message);
          localStorage.setItem(`requestSent_${userid}`, 'true'); // store request state for this user
          setSendreq(true);
        } else {
          alert(res.data.message);
          setSendreq(false);
        }
      })
      .catch((err) => {
        console.error(err);
        alert('Something went wrong while sending the request.');
      });
  };

return (
  <div id="register">
    {!sendreq && (
      <ApprovePlayerForm
        playername={playername}
        setPlayername={setPlayername}
        playertype={playertype}
        setPlayertype={setPlayertype}
        matches={matches}
        setMatches={setMatches}
        runs={runs}
        setRuns={setRuns}
        wickets={wickets}
        setWickets={setWickets}
        age={age}
        setAge={setAge}
        handleSubmit={handleSubmit}
      />
    )}

    {sendreq && (
      <div
        className="request-sent"
        style={{
          textAlign: 'center',
          marginTop: '50px',
          height: '30vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center'
        }}
      >
        {accepted === null && (
          <p style={{ fontSize: '20px' }}>Loading...</p>
        )}

        {accepted === true && (
          <p style={{ fontSize: '20px', color: 'green' }}>
             wait for some time you request has been sent
          </p>
        )}

        {accepted === false && (
          <p style={{ fontSize: '20px', color: 'white' }}>
             Your request was rejected.
          </p>
        )}

        <p style={{ fontSize: '25px', marginTop: '10px' }}>
          Request Sent Successfully!<br />
          You will be notified once it is approved.
        </p>
      </div>
    )}
  </div>
);

};

export default RequestRegister;
