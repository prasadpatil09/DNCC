import React,{useState} from 'react'
import './login.css'
import { Link, useNavigate } from 'react-router-dom'
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect } from 'react'
import Axios from 'axios';


const Signup = () => {
    const navigate=useNavigate()
     const [username,SetUsername]=useState('');
     const [password,SetPassword]=useState('');
     const [mail,SetMail]=useState('');
     const [show,SetShow]=useState(false)
     const handleeye=() => SetShow(false)
     const handleeye2=() => SetShow(true)
     const handlesubmit=(e) => {
            e.preventDefault();
            Axios.post('http://localhost:8500/auth/signup',{username,mail,password}).then(response=>{
              if(response.data.status){
                navigate('/')
                alert(response.data.message)
              }
              else{
                alert(response.data.message)
              }
             
            }).catch(err=>{
              alert(err)
            })
            
          }
     
  return (
        <div className='container' >
      <div className='login'>
      <div>
        <h3>SignUp</h3>
      </div>
       
       <div className='form'>
       <form onSubmit={handlesubmit} >
        <div className="name">
        <label htmlFor="name">UserName:</label><br />
        <input type="text" value={username} onChange={(e)=>{ SetUsername(e.target.value)
        }}  name="text" id="name" required /><br />
        </div>
        <div className="email">
           <label htmlFor="name">Gmail:</label><br />
        <input type="email" value={mail} onChange={(e)=>{ SetMail(e.target.value)
        }} name="mail" id="mail"  required/>
        
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
              onClick={handleeye}
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
              onClick={handleeye2}
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
        <input type="submit"  value="sign-up" id='submit'  />
        </div>
        
       </form>
       <p>Already have an acount? <Link to="/">login</Link></p>
       </div>
       
       </div>
    </div>
  )
}

export default Signup;
