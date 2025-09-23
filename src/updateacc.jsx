import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, useParams } from 'react-router-dom';
import './account.css'
const Updateacc = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [type, setType] = useState('');
  const [paidby, setPaidby] = useState('');
  const [amount, setAmount] = useState(0);
  const [moneyinfo, setMoneyinfo] = useState('');

  useEffect(() => {
    Axios.get(`https://dncc.onrender.com/home/get-account/${id}`, {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
    })
    .then(res => {
      setType(res.data.type);
      setPaidby(res.data.paidby);
      setAmount(res.data.amount);
      setMoneyinfo(res.data.moneyinfo);
    })
    .catch(err => alert(err.response?.data?.message || err.message));
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    Axios.patch(
      `https://dncc.onrender.com/home/update-account/${id}`,
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
          <input type="number" className="textname" value={amount} onChange={e => setAmount(e.target.value)} required />
         <br />
          <button type="submit" className='btn'>Update</button>
        </form>
      </div>
    </div>
  );
}

export default Updateacc;
