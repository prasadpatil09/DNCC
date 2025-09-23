import React, { useState } from 'react';
import Axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Addsec = () => {
  const navigate = useNavigate();
  const [type, setType] = useState('');
  const [paidby, setPaidby] = useState('');
  const [amount, setAmount] = useState(0);
  const [moneyinfo, setMoneyinfo] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.post('https://dncc.onrender.com/home/add-account',
      { type, paidby, amount, moneyinfo },
      { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } }
    ).then(res => {
      alert(res.data.message);
      if (res.data.status) navigate('/home');
    }).catch(err => alert(err.response?.data?.message || err.message));
  }

  return (
    <div className='add-account'>
      <div className='account-form'>
        <form onSubmit={handleSubmit}>
          <label>Type:</label>
          <input type="text" className="textname" value={type} onChange={e => setType(e.target.value)} required />
          <label>Paid By:</label>
          <input type="text" className="textname" value={paidby} onChange={e => setPaidby(e.target.value)} required />
          <label>Amount Details:</label>
          <textarea value={moneyinfo} onChange={e => setMoneyinfo(e.target.value)} />
          <label>Amount:</label>
          <input type="number" className="textname" value={amount} onChange={e => setAmount(e.target.value)} required /><br/>          
          <button type="submit" className='btn'>Add</button>
        </form>
      </div>
    </div>
  );
}

export default Addsec;
