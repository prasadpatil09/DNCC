import React, { useState } from 'react'
import Axios from 'axios'
import './login.css'

const Forgot = () => {
    const [mail,SetMail]=useState('')
    const handlesubmit=(e)=>{
         e.preventDefault();
            Axios.post('http://localhost:8500/auth/forgot',{mail}).then(response=>{
              if(response.data.status){
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
    <div className='forgot'>
        <form onSubmit={handlesubmit}>
            <h3 style={{fontSize:'20px'}}>Forgot password</h3>
            <div className='mail'>
                <label htmlFor="">Email:</label>
            <input type="email" vlaue={mail}  onChange={(e)=>{ SetMail(e.target.value)}} name="mail" id="mail" required/>
            </div>
            <div className='button'>
            <input type="submit" value="submit" id='submit' />
            </div>
        </form>
    </div>
  )
}

export default Forgot