import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import Axios from 'axios';
import './account.css'; // External CSS import

const AccountSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [account, setAccount] = useState([]);

  useEffect(() => {
    Axios.get('http://localhost:8500/home/account')
      .then((res) => setAccount(res.data))
      .catch((err) => console.error('Error fetching accounts:', err));
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`http://localhost:8500/home/delete/${id}`, {
  headers: {
    Authorization: `Bearer ${localStorage.getItem("token")}` // send the JWT
  }
})
.then((res) => {
  alert(res.data.message);
  if (res.data.status) window.location.reload();
})
.catch((err) => {
  // If you want to see server errors clearly
  console.error(err.response?.data || err);
  alert(err.response?.data?.message || "Error occurred");
});

  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('user'));
    if (userData?.admin) setIsAdmin(true);
  }, []);

  return (
    <div id="account" className="account-section">
      <h1>Account Section</h1>

      <div className="account-details">
        {isAdmin && (
          <Link to="/home/account-add" className="add-button">
            + Add New
          </Link>
        )}

        {account.map((acc, index) => (
          <div className="account-item" key={index}>
            <p>Type: {acc.type}</p>
            <p>Paid By: {acc.paidby}</p>
            <p>Amount: ₹{acc.amount}</p>
            <p>Amount Details:{acc.moneyinfo}</p>
             <p>Date: {acc.date}</p>
             
            {isAdmin && (
              <div className="admin-actions">
                <Link
                  to={`/home/account-update/${acc._id}`}
                  className="update-button"
                >
                  Update
                </Link>
                <button
                  onClick={() => handleDelete(acc._id)}
                  className="delete-button"
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AccountSection;
