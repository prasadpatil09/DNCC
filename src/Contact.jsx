import React from 'react';
import './contact.css'
import  Axios  from 'axios';
import { useState } from 'react';
const ContactSection = () => {
  const [contactname,setContactname]=useState()
  const [contactmail,setContactmail]=useState()
  const [contactmessage,setContactmessage]=useState()
  const handlesubmit=(e)=>{
   e.preventDefault()
   Axios.post('https://dncc.onrender.com/contact/contact-us',{ contactname,contactmail,contactmessage},).then(res=>{
  if(res.data.status){
    alert(res.data.message)
    setContactname("")
    setContactmail("")
    setContactmessage("")
  }
  else{
    alert(res.data.message)
  }
 }).catch(err=>{
  console.log(err)
 })
  }
  return (
    <div id="contact" className='contact'>
      <h1 > Contact Us </h1>
      <div className="form-location" >
     <div className="form-wrapper" style={{display:'flex',justifyContent:'center',flexDirection:"column",alignItems:"center"}}>
      <h1>Form</h1>
       <div className="formcontact">
        <form onSubmit={handlesubmit}>
          
          <label htmlFor="">NAME:</label>
             <input type="text" value={contactname} onChange={(e)=>setContactname(e.target.value)} className="textname" name="" id="" required/>
          <label htmlFor="">MAIL:</label>
          <input type="email" value={contactmail} onChange={(e)=>{setContactmail(e.target.value)}} className="textname" name="" id="" required/>
          <label htmlFor="">MESSAGE:</label>
          <textarea name="" value={contactmessage} onChange={(e)=>{setContactmessage(e.target.value)
          }} id="" required></textarea> <br />
          <button type='submit' className='btn'>Submit</button>
        </form>
      </div>
     </div>
      <div className="Location">
          <h1>Our Location</h1>
          <p>Dwarkesh Nagar, Saidham ,Sarawali, <br/> Palghar Road 401508</p>
        </div>
        </div>
    </div>
  );
};

export default ContactSection;
