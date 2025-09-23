import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";
import "./account.css"; // styling for neon theme

const AccountSection = () => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [accounts, setAccounts] = useState([]);

  useEffect(() => {
    Axios.get("https://dncc.onrender.com/home/account")
      .then((res) => setAccounts(res.data))
      .catch((err) => console.error("Error fetching accounts:", err));
  }, []);

  const handleDelete = (id) => {
    Axios.delete(`https://dncc.onrender.com/home/delete/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        alert(res.data.message);
        if (res.data.status) window.location.reload();
      })
      .catch((err) => {
        console.error(err.response?.data || err);
        alert(err.response?.data?.message || "Error occurred");
      });
  };

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (userData?.admin) setIsAdmin(true);
  }, []);

  return (
    <div className="account-section" id="account"  style={{padding:"20px"}}>
      <h1 style={{color:"white"}} >Account Section</h1>

      {isAdmin && (
        <Link to="/home/account-add" className="add-button">
          + Add New
        </Link>
      )}

      <div className="container">
        {accounts.map((acc, index) => (
          <div className="card" key={index}>
            <p>
              <b>Type:</b> {acc.type}
            </p>
            <p>
              <b>Paid By:</b> {acc.paidby}
            </p>
            <p>
              <b>Amount:</b> ₹{acc.amount}
            </p>
            <p>
              <b>Details:</b> {acc.moneyinfo}
            </p>
            <p>
              <b>Date:</b> {acc.date}
            </p>

            {isAdmin && (
              <div className="buttons">
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
