import React, { useState } from 'react';
import './login.css';
import Axios from 'axios';
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';
const Reset = () => {
  const [password, SetPassword] = useState('');
  const [show, SetShow] = useState(false);
  const {token}=useParams()
  const navigate=useNavigate()

  const handlesubmit = (e) => {
    e.preventDefault();
    Axios.post('http://localhost:8500/auth/reset/'+token, { password })
      .then(response => {
       if(response.data.status){
         alert(response.data.message);
         navigate('/')
       }
       console.log(response.data)
      })
      .catch(err => {
        alert(err.message || 'Something went wrong');
      });
  };

  return (
    <div className='forgot'>
      <form onSubmit={handlesubmit}>
        <h3 style={{ fontSize: '20px' }}>Reset password</h3>
        <div className="password">
          <label htmlFor="password">Password:</label><br />
          <div style={{ position: 'relative' }}>
            <input
              type={show ? "text" : "password"}
              value={password}
              onChange={(e) => SetPassword(e.target.value)}
              name="pass"
              id="password"
              required
              maxLength={10}
              minLength={8}
              style={{ paddingRight: "30px" }}
            />
            {show ? (
              <FaRegEye
                className="input-icon"
                onClick={() => SetShow(false)}
                style={{
                  color: 'white',
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }}
              />
            ) : (
              <FaRegEyeSlash
                className="input-icon"
                onClick={() => SetShow(true)}
                style={{
                  color: 'white',
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  cursor: 'pointer'
                }}
              />
            )}
          </div>
          <br />
        </div>
        <div className='button'>
          <input type="submit" value="submit" id='submit' />
        </div>
      </form>
    </div>
  );
};

export default Reset;
