import React from 'react'
import './login.css'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import Axios from 'axios'
import { FaRegEye } from "react-icons/fa";
import { FaRegEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigate=useNavigate()
  const [username,SetUsername]=useState('');
  const [password,SetPassword]=useState('');
  const [show,SetShow]=useState(false)
  Axios.defaults.withCredentials=true;
  const handlesubmit=(e)=>{
        e.preventDefault()
           Axios.post('https://dncc.onrender.com/auth/login',{username,password}).then(
            res=>{
              if(res.data.status){
                 localStorage.setItem('user',JSON.stringify({
                  username:res.data.user.username,
                  admin:res.data.user.admin,
                  player:res.data.user.player
                 }))
                 localStorage.setItem('token', res.data.token); 
                   localStorage.setItem('userid',res.data.user._id) 
                navigate('/home')
              }
              alert(res.data.message)
            }
           ).catch(
            err=>{console.log(err)}
            
           )

        }
      
  return (
    <div className='container' >
      <div className='login'>
      <div>
        <h3>Login</h3>
      </div>
       
       <div className='form'>
       <form onSubmit={handlesubmit}>
        <div className="name">
        <label htmlFor="name">UserName:</label><br />
        
        <input type="text" name="text"  value={username} onChange={(e)=>{ SetUsername(e.target.value)
        }} id="name" required/><br />
        </div>
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
      style={{ paddingRight: "30px" }} // make space for icon
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
        <div className="button">
        <input type="submit" value="login" id='submit'  />
      
        </div>
        <div className='sign' >
          <div>
            <p >Don't have an account? <Link to="/sign-up">Sign Up</Link> </p>
            </div>
            <div>
        <p> <Link to='/forgotpassword'>Forgot Password</Link></p>
        </div>
        </div>
       </form>
       </div>
       </div>
    </div>
  )
}

export default Login